import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Alert,
  AlertTitle,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useQuestion } from '../context/EssayContext'; // Import useQuestion hook from the renamed context

const MotionPaper = motion(Paper);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`qa-tabpanel-${index}`}
      aria-labelledby={`qa-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const QuestionAssistant = () => {
  // Use context instead of local state
  const { 
    questionText, 
    setQuestionText, 
    imageData, 
    setImageData, 
    answer: savedAnswer, 
    setAnswer: setSavedAnswer,
    isAnswered,
    setIsAnswered
  } = useQuestion();
  
  const [tabValue, setTabValue] = useState(() => imageData ? 1 : 0); // Set tab based on whether image exists
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>(['llama3.1', 'llama3.2']);
  const [selectedModel, setSelectedModel] = useState('llama3.2');
  const [progress, setProgress] = useState(0);
  const [processingStartTime, setProcessingStartTime] = useState<number | null>(null);
  const [recentQuestions, setRecentQuestions] = useState<string[]>(() => {
    const saved = localStorage.getItem('recent_questions');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/models', { timeout: 5000 });
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAvailableModels(response.data);
          setSelectedModel(response.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch models:', err);
        // Use default models if fetch fails
      }
    };
    fetchModels();
    
    // Update document title
    document.title = 'Question Assistant | ExamPrep Hub';
    
    return () => {
      // Reset title when unmounting (optional)
      document.title = 'ExamPrep Hub';
    };
  }, []);

  // Save recent questions to localStorage when updated
  useEffect(() => {
    localStorage.setItem('recent_questions', JSON.stringify(recentQuestions));
  }, [recentQuestions]);

  // Simulate progress to provide feedback during processing
  useEffect(() => {
    let interval: number | undefined;
    
    if (isLoading && processingStartTime) {
      const startTime = processingStartTime;
      const expectedDuration = 90000; // 1.5 minutes in ms - adjusted for Q&A which should be faster than essay eval
      
      interval = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const calculatedProgress = Math.min(95, (elapsed / expectedDuration) * 100);
        setProgress(calculatedProgress);
      }, 1000);
    } else {
      setProgress(0);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isLoading, processingStartTime]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Don't clear feedback when switching tabs
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds the 10MB limit. Please upload a smaller file.');
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Read the file as data URL
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const imageData = reader.result as string;
            setImageData(imageData); // Save to context
            
            console.log('Sending image data to backend for question answering...');
            // Send the image data to the backend
            const response = await axios.post('http://localhost:3001/api/evaluate-essay', {
              imageData,
              isQuestion: true // Flag to indicate this is a question, not an essay
            });
            
            console.log('Received response:', response.data);
            setSavedAnswer(response.data); // Store answer in context
            setIsAnswered(true);
          } catch (err: any) {
            console.error('Error processing image:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to process the image. Please try again.';
            setError(errorMessage);
          } finally {
            setIsLoading(false);
          }
        };
        
        reader.readAsDataURL(file);
      } catch (err: any) {
        console.error('Error uploading file:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to upload the image. Please try again.';
        setError(errorMessage);
        setIsLoading(false);
      }
    }
  };

  const handleAskQuestion = async () => {
    if (!questionText.trim()) {
      setError('Please enter your question before submitting.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSavedAnswer(null);
    setIsAnswered(false);
    setProcessingStartTime(Date.now());
    setProgress(0);
    
    try {
      // First check if backend is reachable
      try {
        await axios.get('http://localhost:3001/api/status', { timeout: 5000 });
      } catch (statusError) {
        throw new Error('Cannot connect to the backend server. Please make sure the backend is running.');
      }
      
      console.log(`Sending question to backend using model: ${selectedModel}...`);
      console.log(`Question length: ${questionText.length} characters`);
      
      // Use the existing essay-evaluation endpoint temporarily - this should be updated to a dedicated endpoint
      const response = await axios.post('http://localhost:3001/api/evaluate-essay', {
        essayText: questionText,
        model: selectedModel,
        isQuestion: true // Flag to indicate this is a question, not an essay
      }, {
        timeout: 120000 // 2 minutes timeout
      });
      
      console.log('Received response:', response.data);
      setSavedAnswer(response.data);
      setIsAnswered(true);
      setProgress(100);
      
      // Add to recent questions list (keep only last 5)
      setRecentQuestions(prev => {
        const updated = [questionText, ...prev.filter(q => q !== questionText)].slice(0, 5);
        return updated;
      });
    } catch (err: any) {
      console.error('Error getting answer:', err);
      let errorMessage = 'Failed to get an answer. Please try again later.';
      
      if (err.message?.includes('connect to the backend')) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        if (err.message.includes('timeout')) {
          errorMessage = 'Request timed out. The system is currently busy. Please try again later or ask a shorter question.';
        } else if (err.message.includes('Network Error')) {
          errorMessage = 'Network error: Could not connect to the backend server. Please ensure the backend server is running.';
        } else {
          errorMessage = `Error: ${err.message}`;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setProcessingStartTime(null);
    }
  };

  const renderAnswer = (answer: string) => {
    return (
      <ReactMarkdown
        components={{
          p: ({ children }) => <Typography variant="body1" component="p" sx={{ mb: 1 }}>{children}</Typography>,
          strong: ({ children }) => <Typography component="strong" sx={{ fontWeight: 'bold' }}>{children}</Typography>,
          em: ({ children }) => <Typography component="em" sx={{ fontStyle: 'italic' }}>{children}</Typography>,
          ul: ({ children }) => <Typography component="ul" sx={{ pl: 2, mb: 1 }}>{children}</Typography>,
          ol: ({ children }) => <Typography component="ol" sx={{ pl: 2, mb: 1 }}>{children}</Typography>,
          li: ({ children }) => <Typography component="li" sx={{ mb: 0.5 }}>{children}</Typography>,
          h1: ({ children }) => <Typography variant="h4" component="h1" sx={{ mb: 2 }}>{children}</Typography>,
          h2: ({ children }) => <Typography variant="h5" component="h2" sx={{ mb: 2 }}>{children}</Typography>,
          h3: ({ children }) => <Typography variant="h6" component="h3" sx={{ mb: 2 }}>{children}</Typography>,
          code: ({ children }) => (
            <Typography
              component="code"
              sx={{
                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                padding: '0.2em 0.4em',
                borderRadius: 1,
                fontFamily: 'monospace'
              }}
            >
              {children}
            </Typography>
          ),
          pre: ({ children }) => (
            <Typography
              component="pre"
              sx={{
                backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                padding: 2,
                borderRadius: 1,
                overflow: 'auto',
                fontFamily: 'monospace',
                mb: 2
              }}
            >
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <Typography
              component="blockquote"
              sx={{
                borderLeft: theme => `4px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                pl: 2,
                my: 2,
                fontStyle: 'italic'
              }}
            >
              {children}
            </Typography>
          )
        }}
      >
        {answer}
      </ReactMarkdown>
    );
  };

  // Reset question and answer
  const handleReset = () => {
    const confirmReset = window.confirm("Are you sure you want to clear this question and answer?");
    if (confirmReset) {
      setQuestionText('');
      setImageData(null);
      setSavedAnswer(null);
      setIsAnswered(false);
    }
  };

  const loadRecentQuestion = (question: string) => {
    setQuestionText(question);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={6}>
        <HelpOutlineIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Question Assistant
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Get instant answers to your academic questions through text or images
        </Typography>
      </Box>

      {error && (
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ 
            p: 2, 
            mb: 4, 
            bgcolor: 'error.main',
            color: 'white'
          }}
        >
          <Typography fontWeight="medium">{error}</Typography>
        </MotionPaper>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <MotionPaper
            whileHover={{ scale: 1.02 }}
            sx={{ p: 0, height: '100%' }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab icon={<TextFieldsIcon />} label="Text Question" />
              <Tab icon={<PhotoCameraIcon />} label="Image Question" />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Type Your Question
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ask anything you want to know about your subject..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              {recentQuestions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Recent Questions:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {recentQuestions.map((q, i) => (
                      <Chip 
                        key={i} 
                        label={q.length > 30 ? q.substring(0, 30) + '...' : q}
                        size="small"
                        onClick={() => loadRecentQuestion(q)}
                        icon={<ChatIcon fontSize="small" />}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="model-select-label">AI Model</InputLabel>
                <Select
                  labelId="model-select-label"
                  id="model-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  label="AI Model"
                >
                  {availableModels.map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                color="primary"
                onClick={handleAskQuestion}
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    Finding Answer...
                  </Box>
                ) : (
                  'Get Answer'
                )}
              </Button>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Upload an Image with Your Question
              </Typography>
              <Typography paragraph>
                Take a picture of a problem, diagram, or handwritten question to get help.
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="(Optional) Add text to explain what you're asking about the image..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  mb: 2
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="question-image-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="question-image-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                </label>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Supported formats: JPG, PNG (max 10MB)
              </Typography>
              
              {/* Preview uploaded image if available */}
              {imageData && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Uploaded Image:</Typography>
                  <Box 
                    component="img" 
                    src={imageData}
                    alt="Uploaded question" 
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px',
                      borderRadius: 1
                    }}
                  />
                </Box>
              )}
            </TabPanel>
            
            {/* Reset button */}
            {(questionText || imageData || savedAnswer) && (
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                  size="small"
                >
                  Clear Question & Answer
                </Button>
              </Box>
            )}
          </MotionPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                Answer
              </Typography>
            </Box>
            
            {isLoading ? (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CircularProgress size={20} thickness={5} sx={{ mr: 2 }} />
                  <Typography>Answering your question... {progress.toFixed(0)}%</Typography>
                </Box>
                <Box sx={{ width: '100%', mb: 4 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ height: 6, borderRadius: 5 }} 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Processing your question. This usually takes less than a minute.
                </Typography>
                {progress > 60 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    This is taking longer than expected. Complex questions may require more time.
                  </Typography>
                )}
              </Box>
            ) : savedAnswer ? (
              <Box 
                sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto',
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 1,
                  p: 2
                }}
              >
                {renderAnswer(savedAnswer.text)}
              </Box>
            ) : (
              <Box 
                sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexDirection: 'column',
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 1,
                  p: 3
                }}
              >
                <Typography variant="body1" color="text.secondary" align="center">
                  Your answer will appear here after you ask a question.
                </Typography>
                
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  Ask anything related to your studies - definitions, concepts, problem-solving, and more.
                </Typography>
              </Box>
            )}
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionAssistant; 