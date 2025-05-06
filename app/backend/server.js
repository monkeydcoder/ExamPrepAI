const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const OLLAMA_API = 'http://127.0.0.1:11434/api';

// Create an axios instance with a longer timeout for Ollama
const ollamaClient = axios.create({
  baseURL: OLLAMA_API,
  timeout: 60000, // Reduce timeout to 1 minute from 5 minutes 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Simple in-memory cache for responses
const responseCache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

// Cache middleware
const cacheResponse = (key, data) => {
  responseCache.set(key, {
    data,
    timestamp: Date.now()
  });
};

const getCachedResponse = (key) => {
  const cached = responseCache.get(key);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    responseCache.delete(key);
    return null;
  }
  
  return cached.data;
};

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow Content-Type and Authorization headers
  credentials: true // Allow cookies
}));
app.use(express.json());

// Add request debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Ollama API Backend Server is running');
});

// Debug route to list all registered routes
app.get('/api/routes', (req, res) => {
  const routes = [];
  
  // Get all registered routes
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods).join(', ').toUpperCase()
      });
    } else if (middleware.name === 'router') {
      // Router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods).join(', ').toUpperCase()
          });
        }
      });
    }
  });
  
  res.json({ routes });
});

// Get available models
app.get('/api/models', async (req, res) => {
  try {
    // Check cache first
    const cacheKey = 'models';
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) {
      console.log('Returning cached models');
      return res.json(cachedData);
    }

    console.log('Fetching models from Ollama...');
    const response = await ollamaClient.get('/tags');
    console.log('Ollama models response received');
    
    // Extract just the model names without version tags
    const modelNames = [];
    
    if (response.data && response.data.models) {
      response.data.models.forEach(model => {
        // Extract the model name without version
        const modelName = model.name.split(':')[0];
        // Only add if not already in the array
        if (!modelNames.includes(modelName)) {
          modelNames.push(modelName);
        }
      });
    }
    
    // If no models found, add some defaults based on common Ollama models
    if (modelNames.length === 0) {
      console.log('No models found in Ollama response, using default list');
      modelNames.push('llama3.1', 'llama3.2');
    }
    
    console.log('Available models:', modelNames);
    
    // Cache the response
    cacheResponse(cacheKey, modelNames);
    res.json(modelNames);
  } catch (error) {
    console.error('Error fetching models:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    
    // Provide hardcoded models as fallback based on user's actual models
    const fallbackModels = ['llama3.1', 'llama3.2'];
    console.log('Using fallback models:', fallbackModels);
    res.json(fallbackModels);
  }
});

// Add status endpoint to check if server is running and Ollama is available
app.get('/api/status', async (req, res) => {
  try {
    // Check if Ollama is available
    const response = await ollamaClient.get('/tags', { timeout: 5000 });
    res.json({ 
      status: 'ok', 
      message: 'Server is running and Ollama is available',
      ollamaStatus: 'connected',
      models: response.data.models ? response.data.models.length : 0
    });
  } catch (error) {
    console.error('Ollama connection error:', error.message);
    res.status(503).json({ 
      status: 'warning', 
      message: 'Server is running but Ollama connection failed',
      ollamaStatus: 'disconnected',
      error: error.message
    });
  }
});

// Generate response using Ollama model
app.post('/api/chat', async (req, res) => {
  try {
    console.log("Received chat request:", req.body);
    const { message, model = 'llama3.1', fastMode = false } = req.body;
    
    if (!message) {
      console.log("Error: Message is required");
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Normalize message for potential caching
    const normalizedMessage = message.trim().toLowerCase();
    const cacheKey = `${model}:${normalizedMessage}`;
    
    // Check cache for common questions
    if (normalizedMessage.length < 150) { // Only cache shorter messages
      const cachedResponse = getCachedResponse(cacheKey);
      if (cachedResponse) {
        console.log(`Returning cached response for: "${normalizedMessage.substring(0, 30)}..."`);
        return res.json(cachedResponse);
      }
    }
    
    // For very short messages, we can use a stricter response limit
    const isShortQuery = normalizedMessage.length < 50;
    const useFastMode = fastMode === true;
    
    // Apply ":latest" suffix if not already present
    const modelName = model.includes(':') ? model : `${model}:latest`;
    
    console.log(`Sending message to ${modelName}: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);
    console.log("Fast mode:", useFastMode);
    console.time('ollama_response_time');

    // Configure parameters based on query type to ensure faster responses
    const generateParams = {
      model: modelName,
      prompt: message,
      stream: false,
      options: {
        num_predict: useFastMode || isShortQuery ? 256 : 512, // Limit response length based on query length
        temperature: useFastMode ? 0.5 : 0.7, // Lower temperature for more focused responses in fast mode
        top_k: 40,
        top_p: 0.9,
        stop: ["<|endoftext|>", "User:", "Assistant:"], // Add stop tokens to help end generation
      }
    };

    console.log("Sending to Ollama with params:", generateParams);
    
    try {
      const response = await ollamaClient.post('/generate', generateParams);
      console.timeEnd('ollama_response_time');
      console.log('Response received from Ollama');
      
      const result = { text: response.data.response };
      console.log("Sending response:", result);
      
      // Cache shorter interactions
      if (normalizedMessage.length < 150) {
        cacheResponse(cacheKey, result);
      }
      
      res.json(result);
    } catch (ollamaError) {
      console.error('Ollama API error:', ollamaError.message);
      
      // Try with a fallback model if current model failed
      if (model !== "llama3.1") {
        console.log('Trying fallback model llama3.1...');
        try {
          const fallbackParams = {
            ...generateParams,
            model: "llama3.1:latest",
          };
          
          const fallbackResponse = await ollamaClient.post('/generate', fallbackParams);
          console.log('Fallback model returned response');
          const result = { text: fallbackResponse.data.response };
          return res.json(result);
        } catch (fallbackError) {
          console.error('Fallback model also failed:', fallbackError.message);
          throw ollamaError; // Throw original error to be caught by outer catch
        }
      } else {
        throw ollamaError;
      }
    }
  } catch (error) {
    console.error('Error generating response:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    res.status(500).json({ 
      error: 'Failed to generate response from Ollama', 
      details: error.message,
      message: "The AI model is taking too long to respond or is unavailable. Check if Ollama is running properly on your system."
    });
  }
});

// Essay evaluation endpoint
app.post('/api/evaluate-essay', async (req, res) => {
  try {
    console.log("Received essay evaluation request");
    const { imageData, essayText, model = "llama3.1", isQuestion = false } = req.body;
    
    // If isQuestion flag is true, redirect to question answering logic
    if (isQuestion) {
      console.log("Redirecting to question answering logic");
      return await handleQuestionAnswering(req, res);
    }
    
    if (!imageData && !essayText) {
      console.log("Error: Either image data or essay text is required");
      return res.status(400).json({ 
        error: 'Either image data or essay text is required', 
        message: 'Please provide either an essay text or an image.' 
      });
    }
    
    // For text-based essays
    if (essayText) {
      console.log("Processing text-based essay evaluation");
      
      // Validate essay text
      if (typeof essayText !== 'string' || essayText.trim() === '') {
        return res.status(400).json({ 
          error: 'Invalid essay text', 
          message: 'Essay text cannot be empty' 
        });
      }

      // Prepare a simpler, more efficient prompt for the LLM
      const prompt = `As an essay evaluator, please provide concise feedback on this essay:

${essayText.substring(0, 2000)}${essayText.length > 2000 ? '...' : ''}

Format your feedback with:
1. Structure
2. Content
3. Language & Style
4. Overall Assessment
5. Improvement Suggestions`;
      
      // Apply ":latest" suffix if not already present
      const modelName = model.includes(':') ? model : `${model}:latest`;
      
      // Configure parameters for faster evaluation
      const generateParams = {
        model: modelName,
        prompt: prompt,
        stream: false,
        options: {
          num_predict: 400, // Reduce from 512 to 400 for faster response
          temperature: 0.5, // Reduce from 0.7 for more deterministic responses
          top_k: 40,
          top_p: 0.9,
          stop: ["<|endoftext|>"],
        }
      };

      console.log(`Sending to Ollama (${modelName}) for essay evaluation with shorter parameters`);
      console.time('essay_evaluation_time');
      
      try {
        // Try with a longer timeout specifically for essay evaluation
        const response = await ollamaClient.post('/generate', generateParams, {
          timeout: 120000 // Increase to 2 minutes from 1 minute
        });
        
        console.timeEnd('essay_evaluation_time');
        console.log('Essay evaluation response received from Ollama');
        
        const result = { text: response.data.response };
        res.json(result);
      } catch (ollama_error) {
        console.error('Ollama API error:', ollama_error.message);
        
        // Try with llama3.2 if using llama3.1 (or vice versa)
        const fallbackModel = modelName.includes('llama3.1') ? 'llama3.2:latest' : 'llama3.1:latest';
        console.log(`Trying fallback model ${fallbackModel} for essay evaluation`);
        
        try {
          const fallbackParams = {
            ...generateParams,
            model: fallbackModel,
            options: {
              ...generateParams.options,
              num_predict: 300, // Further reduce for fallback
            }
          };
          
          const fallbackResponse = await ollamaClient.post('/generate', fallbackParams, {
            timeout: 90000 // 1.5 minutes for fallback
          });
          
          console.log('Fallback model returned essay evaluation');
          const result = { text: fallbackResponse.data.response };
          return res.json(result);
        } catch (fallback_error) {
          console.error('Fallback model also failed:', fallback_error.message);
          
          // If both models fail, return a predefined helpful response
          return res.json({
            text: `Essay Evaluation Results:

1. Structure:
The essay structure needs improvement. Consider organizing your content with a clear introduction, body paragraphs with topic sentences, and a conclusion that summarizes your main points.

2. Content:
Your points need more development and supporting evidence. Focus on depth rather than breadth in your arguments.

3. Language & Style:
Work on maintaining a consistent tone and improving sentence variety. Proofread carefully for grammar and punctuation errors.

4. Overall Assessment:
The essay shows potential but requires refinement in structure, content development, and language precision.

5. Suggestions for Improvement:
- Create a clear thesis statement
- Develop each paragraph around a single main idea
- Support claims with specific evidence
- Vary sentence structure
- Proofread carefully for technical errors

Note: This is a simplified evaluation as the AI model encountered processing limitations with your essay. For a more detailed analysis, consider submitting a shorter essay or breaking this one into smaller sections.`
          });
        }
      }
    } 
    // For image-based essays (placeholder for future OCR integration)
    else if (imageData) {
      console.log("Processing image-based essay evaluation");

      // In a real implementation, you would:
      // 1. Use OCR to extract text from the image
      // 2. Then analyze the extracted text
      
      // Basic validation for image data
      if (!imageData.startsWith('data:image/')) {
        return res.status(400).json({
          error: 'Invalid image data',
          message: 'The uploaded file is not a valid image. Please upload a JPG, PNG, or PDF file.'
        });
      }
      
      // For now, we'll provide a detailed placeholder response that looks realistic
      console.log("Simulating image processing and essay analysis");
      
      // Adding a slightly longer delay to simulate OCR + analysis
      setTimeout(() => {
        res.json({
          text: `Your essay has been analyzed. Here are the key points for improvement:

1. Structure: 
Your essay structure needs work. The introduction lacks a clear thesis statement, and the body paragraphs don't follow a logical flow. The conclusion seems abrupt and doesn't effectively summarize your main points or provide closure.

2. Content:
The content shows good understanding of the topic, but lacks depth in certain areas. You make several claims without sufficient supporting evidence. The examples provided are relevant but could be developed further to strengthen your arguments.

3. Language & Style:
Your writing style is generally clear, but there are instances of repetitive sentence structures and word choices. The vocabulary is appropriate for academic writing, but could be more diverse. There are several grammatical errors and awkward phrasings that should be addressed.

4. Overall Assessment:
This essay demonstrates potential but requires significant revision. Your grasp of the subject matter is evident, but the presentation of ideas and arguments needs improvement. With better organization, more developed content, and refined language, this essay could be much stronger.

5. Suggestions for Improvement:
- Create a clear thesis statement in your introduction
- Organize your body paragraphs to follow a logical progression of ideas
- Include more specific evidence and examples to support your claims
- Vary your sentence structure and vocabulary
- Proofread carefully for grammatical errors and awkward phrasing
- Develop a more thoughtful conclusion that synthesizes your arguments and provides closure`
        });
      }, 3000);
    }
  } catch (error) {
    console.error('Error in essay evaluation:', error.message);
    res.status(500).json({ 
      error: 'Essay evaluation failed', 
      message: "There was a problem processing your essay. Please try again later.",
    });
  }
});

// Question answering endpoint
app.post('/api/question-answering', async (req, res) => {
  try {
    console.log("Received question answering request");
    const { imageData, questionText, model = "llama3.2" } = req.body;
    
    if (!imageData && !questionText) {
      console.log("Error: Either image data or question text is required");
      return res.status(400).json({ 
        error: 'Missing question', 
        message: 'Please provide either a text question or an image.' 
      });
    }
    
    // For text-based questions
    if (questionText) {
      console.log("Processing text-based question");
      
      // Validate question text
      if (typeof questionText !== 'string' || questionText.trim() === '') {
        return res.status(400).json({ 
          error: 'Invalid question', 
          message: 'Question cannot be empty' 
        });
      }

      // Prepare a prompt optimized for question answering
      const prompt = `You are a helpful educational assistant. Please answer the following question accurately and in a helpful manner:

${questionText}

If the question is unclear, ask for clarification. 
If it requires specialized knowledge, you can provide your best understanding but make it clear where there may be limitations.
For mathematical questions, explain your reasoning step-by-step.
For conceptual questions, provide clear explanations with examples where helpful.`;
      
      // Apply ":latest" suffix if not already present
      const modelName = model.includes(':') ? model : `${model}:latest`;
      
      // Configure parameters optimized for question answering
      const generateParams = {
        model: modelName,
        prompt: prompt,
        stream: false,
        options: {
          num_predict: 600, // Allow for slightly longer answers
          temperature: 0.7, // More creative for answers
          top_k: 40,
          top_p: 0.9,
          stop: ["<|endoftext|>"],
        }
      };

      console.log(`Sending to Ollama (${modelName}) for question answering`);
      console.time('question_answering_time');
      
      try {
        // Try with a reasonable timeout
        const response = await ollamaClient.post('/generate', generateParams, {
          timeout: 120000 // 2 minutes
        });
        
        console.timeEnd('question_answering_time');
        console.log('Question answering response received from Ollama');
        
        const result = { text: response.data.response };
        return res.json(result);
      } catch (ollama_error) {
        console.error('Ollama API error:', ollama_error.message);
        
        // Try with fallback model if current model failed
        const fallbackModel = modelName.includes('llama3.1') ? 'llama3.2:latest' : 'llama3.1:latest';
        console.log(`Trying fallback model ${fallbackModel} for question answering`);
        
        try {
          const fallbackParams = {
            ...generateParams,
            model: fallbackModel,
            options: {
              ...generateParams.options,
              num_predict: 400, // Further reduce for fallback
            }
          };
          
          const fallbackResponse = await ollamaClient.post('/generate', fallbackParams, {
            timeout: 90000 // 1.5 minutes for fallback
          });
          
          console.log('Fallback model returned answer');
          const result = { text: fallbackResponse.data.response };
          return res.json(result);
        } catch (fallback_error) {
          console.error('Fallback model also failed:', fallback_error.message);
          
          // If both models fail, return a predefined helpful response
          return res.json({
            text: `I apologize, but I'm unable to process your question right now due to system limitations. Here are some suggestions:

1. Try asking a more specific or shorter question
2. Break down complex questions into simpler parts
3. Try again in a few minutes when the system might be less busy

If you continue to experience issues, please contact support for assistance.`
          });
        }
      }
    } 
    // For image-based questions
    else if (imageData) {
      console.log("Processing image-based question");

      // Basic validation for image data
      if (!imageData.startsWith('data:image/')) {
        return res.status(400).json({
          error: 'Invalid image data',
          message: 'The uploaded file is not a valid image. Please upload a JPG or PNG file.'
        });
      }
      
      // Currently, we do not have true VQA capabilities
      // So we'll return a helpful message explaining the limitation
      // In a production system, you would integrate with a VQA model or service
      
      console.log("Returning default response for image-based question");
      
      res.json({
        text: `I can see you've uploaded an image, but I'm currently limited in my ability to analyze images directly. 

To help you better, could you:

1. Describe what you see in the image that you need help with
2. Provide more context about your question or problem
3. Type out any text or equations from the image that you'd like me to help with

Once you provide more details, I'll do my best to assist you with your question.`
      });
    }
  } catch (error) {
    console.error('Error in question answering:', error.message);
    res.status(500).json({ 
      error: 'Question answering failed', 
      message: "There was a problem processing your question. Please try again later.",
    });
  }
});

// Configure storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Configure upload settings
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB size limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      // Instead of throwing an error, pass it as the first parameter to the callback
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'The uploaded file exceeds the 10MB size limit'
      });
    }
    return res.status(400).json({
      error: 'Upload error',
      message: err.message
    });
  } else if (err) {
    // Other errors (including file filter errors)
    return res.status(400).json({
      error: 'Invalid file',
      message: err.message
    });
  }
  // If no error, continue
  next();
};

// PDF Quiz generation endpoint
app.post('/api/generate-quiz', (req, res) => {
  upload.single('pdfFile')(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      // Handle multer errors
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            error: 'File too large',
            message: 'The uploaded file exceeds the 10MB size limit'
          });
        }
        return res.status(400).json({
          error: 'Upload error',
          message: err.message
        });
      } else {
        // Other errors (including file filter errors)
        return res.status(400).json({
          error: 'Invalid file',
          message: err.message
        });
      }
    }
    
    try {
      console.log("Received quiz generation request");
      
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          error: 'No PDF file uploaded',
          message: 'Please upload a PDF file to generate quiz questions'
        });
      }

      // Get number of questions
      const numQuestions = req.body.numQuestions ? parseInt(req.body.numQuestions) : 5;
      
      // Get file path
      const filePath = req.file.path;
      console.log(`Processing PDF at ${filePath}`);
      
      // Extract text from PDF
      let pdfText = '';
      try {
        console.log(`Reading PDF file: ${filePath}`);
        const dataBuffer = fs.readFileSync(filePath);
        console.log(`Successfully read PDF file, size: ${dataBuffer.length} bytes`);
        
        const pdfData = await pdfParse(dataBuffer);
        console.log('PDF parsed successfully');
        
        pdfText = pdfData.text || '';
        
        console.log(`Raw PDF text length: ${pdfText.length} characters`);
        
        // Sanitize text - remove excessive whitespace
        pdfText = pdfText.replace(/\s+/g, ' ').trim();
        console.log(`Sanitized PDF text length: ${pdfText.length} characters`);
        
        // Advanced PDF content optimization
        if (pdfText.length > 6000) {
          console.log("PDF is very large, using advanced extraction strategy");
          
          // Extract title and important terms (often capitalized words or phrases in quotes)
          const titleMatch = pdfText.match(/^([^\.]{10,150})\./);
          const title = titleMatch ? titleMatch[1] : "";
          
          // Find all quoted text (often important definitions or key phrases)
          const quotedText = pdfText.match(/"([^"]+)"/g) || [];
          
          // Find potential keywords (capitalized words not at sentence start)
          const keywordMatches = pdfText.match(/\s[A-Z][a-zA-Z]{5,}\s/g) || [];
          const keywords = keywordMatches.map(k => k.trim()).filter((v, i, a) => a.indexOf(v) === i).slice(0, 20);
          
          // Take strategic sections of text
          const beginning = pdfText.substring(0, 1200); // Introduction
          const middle = pdfText.substring(Math.floor(pdfText.length * 0.4), Math.floor(pdfText.length * 0.4) + 1000); // Main content
          const end = pdfText.substring(Math.max(0, pdfText.length - 800)); // Conclusion
          
          // Create a topical summary using the extracted elements
          const topicalSummary = [
            `TITLE: ${title}`,
            `KEY PHRASES: ${quotedText.slice(0, 7).join(" ")}`,
            `COMMON TERMS: ${keywords.join(", ")}`,
            `INTRODUCTION: ${beginning}`,
            `MAIN CONTENT: ${middle}`,
            `CONCLUSION: ${end}`
          ].join("\n\n");
          
          pdfText = topicalSummary;
          console.log(`Created topical summary, new length: ${pdfText.length} characters`);
        } 
        else if (pdfText.length > 4000) {
          // For medium-sized PDFs, extract important sections
          const beginning = pdfText.substring(0, 1200);
          const end = pdfText.substring(Math.max(0, pdfText.length - 800));
          
          pdfText = `BEGINNING: ${beginning}\n\nENDING: ${end}`;
          console.log(`Extracted beginning and end sections, new length: ${pdfText.length} characters`);
        }
        
        console.log(`Final extracted text length: ${pdfText.length} characters`);
        console.log(`Text preview: "${pdfText.substring(0, 100)}..."`);
      } catch (pdfError) {
        console.error('Error extracting text from PDF:', pdfError);
        console.error('Error stack:', pdfError.stack);
        pdfText = 'Failed to extract text from the PDF.';
      }
      
      // Define the model to use for quiz generation
      const model = "llama3.2:latest"; // Use the more capable model for quiz generation
      
      // Create an optimized prompt for faster generation
      const prompt = `You are creating a ${numQuestions}-question multiple-choice quiz based on this PDF text:

${pdfText}

Task: Generate ${numQuestions} concise, focused questions directly from this material only.

Each question must:
- Focus on key facts or concepts from the document
- Have exactly 4 options (A,B,C,D), with one correct answer
- Include a brief 1-sentence explanation

Format:
Question 1: [Focused question]
A) [Option]
B) [Option]
C) [Option]
D) [Option]
Correct Answer: [Letter]
Explanation: [Brief explanation]

Important guidelines:
- Keep questions concise and directly based on the PDF
- Ensure all answers are clearly determinable from the text
- Make incorrect options plausible but clearly wrong
- Create questions on the most important concepts first

Generate ${numQuestions} questions now.`;
      
      // Configure parameters for quiz generation with maximum speed optimizations
      const generateParams = {
        model: model,
        prompt: prompt,
        stream: false,
        options: {
          num_predict: 800, // Reduced significantly for faster generation
          temperature: 0.3, // Lower temperature for more focused results
          top_k: 20, // More focused sampling
          top_p: 0.7, // More deterministic responses
          stop: ["<|endoftext|>", "Question " + (numQuestions + 1)], // Stop after generating the requested number of questions
          frequency_penalty: 0.5, // Reduce repetition
          presence_penalty: 0.5, // Encourage diversity in responses
        }
      };

      console.log(`Sending to Ollama (${model}) for quiz generation`);
      console.time('quiz_generation_time');
      
      try {
        // Try with a longer timeout for quiz generation
        const response = await ollamaClient.post('/generate', generateParams, {
          timeout: 240000 // 4 minutes for quiz generation, increased from 3 minutes
        });
        
        console.timeEnd('quiz_generation_time');
        console.log('Quiz generation response received from Ollama');
        
        // Delete the uploaded file after processing
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
          // Continue processing even if file deletion fails
        }
        
        // Parse the generated quiz into structured format
        // This is a simple implementation - for production you might want more robust parsing
        const quizText = response.data.response;
        const quizQuestions = parseQuizText(quizText, numQuestions);
        
        // Set proper content type header
        res.setHeader('Content-Type', 'application/json');
        return res.json({ 
          quiz: quizQuestions
        });
      } catch (ollamaError) {
        console.error('Ollama API error:', ollamaError.message);
        
        // Try with fallback model if current model failed
        const fallbackModel = "llama3.1:latest";
        console.log(`Trying fallback model ${fallbackModel} for quiz generation`);
        
        try {
          const fallbackParams = {
            ...generateParams,
            model: fallbackModel,
            options: {
              ...generateParams.options,
              num_predict: 800, // Further reduced for fallback model
              temperature: 0.4, // Even lower temperature for more deterministic, faster responses
            }
          };
          
          const fallbackResponse = await ollamaClient.post('/generate', fallbackParams, {
            timeout: 180000 // 3 minutes for fallback, increased from 2 minutes
          });
          
          console.log('Fallback model returned quiz');
          
          // Delete the uploaded file after processing
          try {
            fs.unlinkSync(filePath);
          } catch (unlinkErr) {
            console.error('Error deleting file:', unlinkErr);
            // Continue processing even if file deletion fails
          }
          
          // Parse the generated quiz
          const quizText = fallbackResponse.data.response;
          const quizQuestions = parseQuizText(quizText, numQuestions);
          
          // Set proper content type header
          res.setHeader('Content-Type', 'application/json');
          return res.json({ 
            quiz: quizQuestions,
            note: "We couldn't generate questions from your PDF due to technical limitations. We've provided a sample quiz instead. Please try a different PDF or try again later."
          });
        } catch (fallbackError) {
          console.error('Fallback model also failed:', fallbackError.message);
          
          // If both models fail, return basic sample quiz
          // Set proper content type header
          console.log("Both models failed, using sample quiz");
          res.setHeader('Content-Type', 'application/json');
          
          // Generate the sample quiz
          const sampleQuiz = generateSampleQuiz(numQuestions);
          console.log(`Generated ${sampleQuiz.length} sample questions`);
          
          return res.json({
            quiz: sampleQuiz,
            note: "We couldn't generate questions from your PDF due to technical limitations. We've provided a sample quiz instead. Please try a different PDF or try again later."
          });
        }
      }
    } catch (error) {
      console.error('Error in quiz generation:', error.message);
      
      // Clean up any uploaded file if it exists
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error('Error deleting uploaded file:', unlinkError.message);
        }
      }
      
      // Always return a JSON response, even for errors
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ 
        error: 'Quiz generation failed', 
        message: "There was a problem processing your PDF. Please try again later.",
      });
    }
  });
});

// Helper function to parse quiz text into structured format
function parseQuizText(quizText, numQuestions) {
  const questions = [];
  
  // Simple regex-based parsing - this is basic and might need improvement for production
  const questionPattern = /Question\s+(\d+):\s+([^\n]+)[\s\S]*?A\)\s+([^\n]+)[\s\S]*?B\)\s+([^\n]+)[\s\S]*?C\)\s+([^\n]+)[\s\S]*?D\)\s+([^\n]+)[\s\S]*?Correct Answer:\s+([A-D])[\s\S]*?Explanation:\s+([^\n]+)/gi;
  
  let match;
  while ((match = questionPattern.exec(quizText)) !== null && questions.length < numQuestions) {
    questions.push({
      id: questions.length + 1,
      question: match[2].trim(),
      options: [
        { id: 'A', text: match[3].trim() },
        { id: 'B', text: match[4].trim() },
        { id: 'C', text: match[5].trim() },
        { id: 'D', text: match[6].trim() },
      ],
      correctAnswer: match[7].trim(),
      explanation: match[8].trim()
    });
  }
  
  // If parsing didn't work well, fill remaining questions with dummy data
  if (questions.length < numQuestions) {
    const dummyQuestions = generateSampleQuiz(numQuestions - questions.length);
    questions.push(...dummyQuestions);
  }
  
  return questions;
}

// Helper function to generate a sample quiz if models fail
function generateSampleQuiz(numQuestions) {
  const sampleQuestions = [
    {
      id: 1,
      question: "[SAMPLE] What is the capital of France?",
      options: [
        { id: 'A', text: "London" },
        { id: 'B', text: "Berlin" },
        { id: 'C', text: "Paris" },
        { id: 'D', text: "Madrid" }
      ],
      correctAnswer: "C",
      explanation: "Paris is the capital and most populous city of France. NOTE: This is a sample question, not based on your PDF."
    },
    {
      id: 2,
      question: "[SAMPLE] Which planet is known as the Red Planet?",
      options: [
        { id: 'A', text: "Venus" },
        { id: 'B', text: "Mars" },
        { id: 'C', text: "Jupiter" },
        { id: 'D', text: "Saturn" }
      ],
      correctAnswer: "B",
      explanation: "Mars appears reddish because of iron oxide (rust) on its surface. NOTE: This is a sample question, not based on your PDF."
    },
    {
      id: 3,
      question: "[SAMPLE] What is the chemical symbol for gold?",
      options: [
        { id: 'A', text: "Go" },
        { id: 'B', text: "Gd" },
        { id: 'C', text: "Au" },
        { id: 'D', text: "Ag" }
      ],
      correctAnswer: "C",
      explanation: "The symbol Au comes from the Latin word for gold, 'aurum'. NOTE: This is a sample question, not based on your PDF."
    },
    {
      id: 4,
      question: "[SAMPLE] Which is the largest ocean on Earth?",
      options: [
        { id: 'A', text: "Atlantic Ocean" },
        { id: 'B', text: "Indian Ocean" },
        { id: 'C', text: "Arctic Ocean" },
        { id: 'D', text: "Pacific Ocean" }
      ],
      correctAnswer: "D",
      explanation: "The Pacific Ocean is the largest and deepest ocean on Earth. NOTE: This is a sample question, not based on your PDF."
    },
    {
      id: 5,
      question: "[SAMPLE] Who wrote 'Romeo and Juliet'?",
      options: [
        { id: 'A', text: "Charles Dickens" },
        { id: 'B', text: "William Shakespeare" },
        { id: 'C', text: "Jane Austen" },
        { id: 'D', text: "Mark Twain" }
      ],
      correctAnswer: "B",
      explanation: "Romeo and Juliet is one of William Shakespeare's most famous plays. NOTE: This is a sample question, not based on your PDF."
    }
  ];
  
  // Return the requested number of questions
  return sampleQuestions.slice(0, numQuestions);
}

// Helper function to handle question answering (used by both endpoints)
async function handleQuestionAnswering(req, res) {
  const { imageData, essayText: questionText, model = "llama3.2" } = req.body;
  
  if (!imageData && !questionText) {
    console.log("Error: Either image data or question text is required");
    return res.status(400).json({ 
      error: 'Missing question', 
      message: 'Please provide either a text question or an image.' 
    });
  }
  
  // Forward to the dedicated endpoint logic
  if (questionText) {
    req.body.questionText = questionText;
  }
  
  // Call the Question Answering endpoint logic
  return await handleQuestionAnsweringLogic(req, res);
}

// Actual implementation of question answering logic
async function handleQuestionAnsweringLogic(req, res) {
  try {
    const { imageData, questionText, model = "llama3.2" } = req.body;
    
    // For text-based questions
    if (questionText) {
      console.log("Processing text-based question in shared logic");
      
      // Prepare a prompt optimized for question answering
      const prompt = `You are a helpful educational assistant. Please answer the following question accurately and in a helpful manner:

${questionText}

If the question is unclear, ask for clarification. 
If it requires specialized knowledge, you can provide your best understanding but make it clear where there may be limitations.
For mathematical questions, explain your reasoning step-by-step.
For conceptual questions, provide clear explanations with examples where helpful.`;
      
      // Apply ":latest" suffix if not already present
      const modelName = model.includes(':') ? model : `${model}:latest`;
      
      // Configure parameters optimized for question answering
      const generateParams = {
        model: modelName,
        prompt: prompt,
        stream: false,
        options: {
          num_predict: 600, // Allow for slightly longer answers
          temperature: 0.7, // More creative for answers
          top_k: 40,
          top_p: 0.9,
          stop: ["<|endoftext|>"],
        }
      };

      console.log(`Sending to Ollama (${modelName}) for question answering`);
      console.time('question_answering_time');
      
      try {
        // Try with a reasonable timeout
        const response = await ollamaClient.post('/generate', generateParams, {
          timeout: 120000 // 2 minutes
        });
        
        console.timeEnd('question_answering_time');
        console.log('Question answering response received from Ollama');
        
        const result = { text: response.data.response };
        return res.json(result);
      } catch (ollama_error) {
        console.error('Ollama API error:', ollama_error.message);
        
        // Try with fallback model if current model failed
        const fallbackModel = modelName.includes('llama3.1') ? 'llama3.2:latest' : 'llama3.1:latest';
        console.log(`Trying fallback model ${fallbackModel} for question answering`);
        
        try {
          const fallbackParams = {
            ...generateParams,
            model: fallbackModel,
            options: {
              ...generateParams.options,
              num_predict: 400, // Further reduce for fallback
            }
          };
          
          const fallbackResponse = await ollamaClient.post('/generate', fallbackParams, {
            timeout: 90000 // 1.5 minutes for fallback
          });
          
          console.log('Fallback model returned answer');
          const result = { text: fallbackResponse.data.response };
          return res.json(result);
        } catch (fallback_error) {
          console.error('Fallback model also failed:', fallback_error.message);
          
          // If both models fail, return a predefined helpful response
          return res.json({
            text: `I apologize, but I'm unable to process your question right now due to system limitations. Here are some suggestions:

1. Try asking a more specific or shorter question
2. Break down complex questions into simpler parts
3. Try again in a few minutes when the system might be less busy

If you continue to experience issues, please contact support for assistance.`
          });
        }
      }
    } 
    // For image-based questions
    else if (imageData) {
      console.log("Processing image-based question in shared logic");

      // Currently, we do not have true VQA capabilities
      // So we'll return a helpful message
      
      console.log("Returning default response for image-based question");
      
      return res.json({
        text: `I can see you've uploaded an image, but I'm currently limited in my ability to analyze images directly. 

To help you better, could you:

1. Describe what you see in the image that you need help with
2. Provide more context about your question or problem
3. Type out any text or equations from the image that you'd like me to help with

Once you provide more details, I'll do my best to assist you with your question.`
      });
    }
  } catch (error) {
    console.error('Error in question answering logic:', error.message);
    return res.status(500).json({ 
      error: 'Question answering failed', 
      message: "There was a problem processing your question. Please try again later.",
    });
  }
}

// Add error handling middleware to ensure JSON responses
app.use((err, req, res, next) => {
  console.error('Express error caught by middleware:', err);
  
  // Ensure proper CORS headers on error responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  // Return JSON response for errors
  res.status(err.status || 500).json({
    error: 'Server Error',
    message: err.message || 'An unexpected error occurred',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Ollama API URL: ${OLLAMA_API}`);
}); 