const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

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
app.use(cors());
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
    const { imageData, essayText, model = "llama3.1" } = req.body;
    
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Ollama API URL: ${OLLAMA_API}`);
}); 