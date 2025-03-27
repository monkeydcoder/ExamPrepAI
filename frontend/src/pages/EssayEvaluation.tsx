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
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

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
      id={`essay-tabpanel-${index}`}
      aria-labelledby={`essay-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const EssayEvaluation = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [essayText, setEssayText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>(['llama3.1', 'llama3.2']);
  const [selectedModel, setSelectedModel] = useState('llama3.1');
  const [progress, setProgress] = useState(0);
  const [processingStartTime, setProcessingStartTime] = useState<number | null>(null);

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
  }, []);

  // Simulate progress to provide feedback during evaluation
  useEffect(() => {
    let interval: number | undefined;
    
    if (isLoading && processingStartTime) {
      const startTime = processingStartTime;
      const expectedDuration = 120000; // 2 minutes in ms
      
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
    // Clear previous feedback when switching tabs
    setFeedback(null);
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
            
            console.log('Sending image data to backend...');
            // Send the image data to the backend
            const response = await axios.post('http://localhost:3001/api/evaluate-essay', {
              imageData
            });
            
            console.log('Received response:', response.data);
            setFeedback(response.data.text);
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

  const handleTextEvaluate = async () => {
    if (!essayText.trim()) {
      setError('Please enter your essay text before evaluating.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    setProcessingStartTime(Date.now());
    setProgress(0);
    
    try {
      // First check if backend is reachable
      try {
        await axios.get('http://localhost:3001/api/status', { timeout: 5000 });
      } catch (statusError) {
        throw new Error('Cannot connect to the backend server. Please make sure the backend is running.');
      }
      
      console.log(`Sending essay text to backend using model: ${selectedModel}...`);
      console.log(`Essay length: ${essayText.length} characters`);
      
      const response = await axios.post('http://localhost:3001/api/evaluate-essay', {
        essayText,
        model: selectedModel
      }, {
        timeout: 180000 // 3 minutes timeout
      });
      
      console.log('Received response:', response.data);
      setFeedback(response.data.text);
      setProgress(100);
    } catch (err: any) {
      console.error('Error evaluating essay:', err);
      let errorMessage = 'Failed to evaluate the essay. Please try again later.';
      
      if (err.message?.includes('connect to the backend')) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        if (err.message.includes('timeout')) {
          errorMessage = 'Request timed out. The essay may be too long or the system is overloaded. Try again later or with a shorter essay (under 2000 characters for best results).';
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

  const renderFeedback = (feedback: string) => {
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
        {feedback}
      </ReactMarkdown>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={6}>
        <EditIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Essay Evaluation
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Get AI-powered feedback on your essays
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
              <Tab icon={<TextFieldsIcon />} label="Type Essay" />
              <Tab icon={<PhotoCameraIcon />} label="Upload Image" />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Type or Paste Your Essay
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Enter your essay text here..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
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
                onClick={handleTextEvaluate}
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    Evaluating Essay...
                  </Box>
                ) : (
                  'Evaluate Essay'
                )}
              </Button>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Upload Your Handwritten Essay
              </Typography>
              <Typography paragraph>
                Take a clear photo of your handwritten essay and upload it for instant feedback.
              </Typography>
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
                  id="essay-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="essay-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Uploading...' : 'Upload Essay'}
                  </Button>
                </label>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Supported formats: JPG, PNG, PDF (max 10MB)
              </Typography>
            </TabPanel>
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
                Feedback
              </Typography>
            </Box>
            
            {isLoading ? (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CircularProgress size={20} thickness={5} sx={{ mr: 2 }} />
                  <Typography>Analyzing your essay... {progress.toFixed(0)}%</Typography>
                </Box>
                <Box sx={{ width: '100%', mb: 4 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ height: 6, borderRadius: 5 }} 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Essay evaluation can take up to 2 minutes. Please be patient.
                </Typography>
                {progress > 60 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    This is taking longer than expected. Processing large essays may require more time.
                  </Typography>
                )}
              </Box>
            ) : feedback ? (
              <Box 
                sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto',
                  backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 1,
                  p: 2
                }}
              >
                {renderFeedback(feedback)}
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
                  Your essay feedback will appear here after evaluation.
                </Typography>
                
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  For best results, submit a clear, well-structured essay with under 2000 characters.
                </Typography>
              </Box>
            )}
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EssayEvaluation; 