import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  alpha,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  IconButton,
  Alert,
  useTheme,
  Fade,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useQuiz } from '../context/QuizContext';

// Create motion components
const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.4
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

// Step names for the stepper
const steps = ['Upload PDF', 'Configure Quiz', 'Take Quiz', 'Results'];

// Interface for question structure
interface QuizQuestion {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

// QuizGenerator component
const QuizGenerator = () => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get quiz state from context
  const {
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswers,
    setSelectedAnswers,
    score,
    setScore,
    quizCompleted,
    setQuizCompleted,
    note,
    setNote,
    resetQuiz
  } = useQuiz();
  
  // Local component state
  const [activeStep, setActiveStep] = useState<number>(() => {
    // Auto-advance to quiz step if we have questions loaded from session storage
    if (questions.length > 0) {
      return quizCompleted ? 3 : 2;
    }
    return 0;
  });
  const [file, setFile] = useState<File | null>(null);
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    
    if (selectedFile) {
      // Check if file is PDF
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setFile(null);
        return;
      }
      
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size should not exceed 10MB');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };
  
  // Handle number of questions change
  const handleNumQuestionsChange = (event: any) => {
    setNumQuestions(event.target.value);
  };
  
  // Handle file upload click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle question answer selection
  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };
  
  // Handle next step
  const handleNext = async () => {
    if (activeStep === 0) {
      if (!file) {
        setError('Please upload a PDF file');
        return;
      }
      setActiveStep(1);
    } 
    else if (activeStep === 1) {
      await generateQuiz();
    }
    else if (activeStep === 2) {
      // Check if all questions are answered
      if (Object.keys(selectedAnswers).length < questions.length) {
        setError('Please answer all questions before submitting');
        return;
      }
      
      // Calculate score
      const correctAnswers = questions.filter(q => 
        selectedAnswers[q.id] === q.correctAnswer
      ).length;
      
      setScore(correctAnswers);
      setQuizCompleted(true);
      setActiveStep(3);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    if (activeStep === 3 && !quizCompleted) {
      setActiveStep(2);
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  // Reset the quiz
  const handleReset = () => {
    setActiveStep(0);
    setFile(null);
    setNumQuestions(5);
    setError(null);
    setLoadingStatus('');
    resetQuiz();
  };
  
  // Generate quiz from PDF
  const generateQuiz = async () => {
    if (!file) {
      setError('Please upload a PDF file');
      return;
    }
    
    setLoading(true);
    setError(null);
    setLoadingStatus('Preparing your PDF for processing...');
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('pdfFile', file);
      formData.append('numQuestions', numQuestions.toString());
      
      // Send request to API
      setLoadingStatus('Uploading PDF and extracting text...');
      
      // Set up a timer for loading status updates to give impression of progress
      const loadingMessages = [
        'Analyzing PDF content...',
        'Identifying key concepts and topics...',
        'Creating questions based on document content...',
        'Generating multiple-choice options...',
        'Finalizing your quiz questions...',
        'This is taking longer than expected. Still working on your quiz...',
        'Processing large documents may take a few minutes. Thank you for your patience...'
      ];
      
      let messageIndex = 0;
      const loadingInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
          setLoadingStatus(loadingMessages[messageIndex]);
          messageIndex++;
        }
      }, 8000); // Update message every 8 seconds
      
      const response = await fetch('http://localhost:3001/api/generate-quiz', {
        method: 'POST',
        body: formData,
      });
      
      // Clear the loading interval
      clearInterval(loadingInterval);
      
      // Check content type to avoid parsing HTML as JSON
      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to generate quiz');
        } else {
          // If not JSON, get text and provide a more helpful error
          const errorText = await response.text();
          console.error('Server returned non-JSON response:', errorText.substring(0, 150) + '...');
          throw new Error(`Server error (${response.status}): The server is not responding correctly`);
        }
      }
      
      // Verify we have JSON before parsing
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Expected JSON but received:', textResponse.substring(0, 150) + '...');
        throw new Error('Server returned an invalid response format');
      }
      
      const data = await response.json();
      
      if (data.quiz && Array.isArray(data.quiz) && data.quiz.length > 0) {
        setQuestions(data.quiz);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        if (data.note) {
          setNote(data.note);
        } else {
          setNote(null);
        }
        setLoadingStatus('');
        setActiveStep(2);
      } else {
        throw new Error('Invalid quiz data received');
      }
    } catch (err: any) {
      console.error('Quiz generation error:', err);
      setError(err.message || 'An error occurred while generating the quiz');
      setLoadingStatus('');
    } finally {
      setLoading(false);
    }
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Render the current question
  const renderQuestion = () => {
    if (questions.length === 0) return null;
    
    const question = questions[currentQuestionIndex];
    
    return (
      <>
        {note && (
          <Alert 
            severity="info" 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setNote(null)}
          >
            {note}
          </Alert>
        )}
        
        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden', 
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              bgcolor: theme.palette.primary.main,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.floor((currentQuestionIndex / questions.length) * 100)}% Complete
              </Typography>
            </Box>
            
            <Typography variant="h6" sx={{ mb: 4, lineHeight: 1.5 }}>
              {question.question}
            </Typography>
            
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                value={selectedAnswers[question.id] || ''}
                onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={
                      <Radio 
                        sx={{ 
                          '&.Mui-checked': { 
                            color: theme.palette.primary.main 
                          } 
                        }} 
                      />
                    }
                    label={
                      <Typography variant="body1">
                        <strong>{option.id})</strong> {option.text}
                      </Typography>
                    }
                    sx={{
                      py: 1,
                      px: 2,
                      my: 1,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                      ...(selectedAnswers[question.id] === option.id && {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                        boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                      }),
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={goToPrevQuestion}
                disabled={currentQuestionIndex === 0}
                startIcon={<NavigateBeforeIcon />}
              >
                Previous
              </Button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={goToNextQuestion}
                  endIcon={<NavigateNextIcon />}
                  disabled={!selectedAnswers[question.id]}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                  endIcon={<CheckCircleOutlineIcon />}
                  disabled={!selectedAnswers[question.id]}
                >
                  Submit Quiz
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </>
    );
  };
  
  // Render the quiz results
  const renderResults = () => {
    return (
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionPaper
          elevation={3}
          sx={{ p: 4, borderRadius: 3, mb: 4 }}
          variants={itemVariants}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Quiz Results
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
              my: 4 
            }}
          >
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `4px solid ${theme.palette.primary.main}`,
                mb: 2
              }}
            >
              <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>
                {score}/{questions.length}
              </Typography>
            </Box>
            
            <Typography variant="h5" sx={{ mb: 1 }}>
              {score === questions.length ? 'Perfect Score!' : 
               score >= questions.length * 0.8 ? 'Excellent Work!' : 
               score >= questions.length * 0.6 ? 'Good Job!' : 
               'Keep Practicing!'}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" align="center">
              You answered {score} out of {questions.length} questions correctly.
              {score < questions.length && ' Review the explanations below to learn more.'}
            </Typography>
          </Box>
        </MotionPaper>
        
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Question Review
        </Typography>
        
        {questions.map((question, index) => {
          const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
          
          return (
            <MotionPaper
              key={question.id}
              elevation={2}
              sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 2,
                borderLeft: '4px solid',
                borderLeftColor: isCorrect ? theme.palette.success.main : theme.palette.error.main
              }}
              variants={itemVariants}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ mr: 2, mt: 0.5 }}>
                  {isCorrect ? (
                    <CheckCircleOutlineIcon color="success" />
                  ) : (
                    <CancelOutlinedIcon color="error" />
                  )}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Question {index + 1}: {question.question}
                  </Typography>
                  
                  <Box sx={{ ml: 2, mb: 2 }}>
                    {question.options.map(option => (
                      <Typography 
                        key={option.id} 
                        variant="body1"
                        sx={{
                          py: 0.5,
                          color: option.id === question.correctAnswer 
                            ? theme.palette.success.main 
                            : option.id === selectedAnswers[question.id] && !isCorrect
                            ? theme.palette.error.main
                            : 'text.primary',
                          fontWeight: option.id === question.correctAnswer ? 700 : 400,
                        }}
                      >
                        {option.id}) {option.text}
                        {option.id === question.correctAnswer && ' ✓'}
                        {option.id === selectedAnswers[question.id] && !isCorrect && ' ✗'}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 2, p: 2, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.info.main }}>
                      Explanation:
                    </Typography>
                    <Typography variant="body2">
                      {question.explanation}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </MotionPaper>
          );
        })}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReset}
            startIcon={<RestartAltIcon />}
            size="large"
          >
            Create Another Quiz
          </Button>
        </Box>
      </MotionBox>
    );
  };
  
  return (
    <MotionContainer
      maxWidth="lg"
      sx={{ py: 4 }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <MotionBox variants={itemVariants}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}
        >
          PDF Quiz Generator
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ textAlign: 'center', mb: 5, color: 'text.secondary', maxWidth: 800, mx: 'auto' }}
        >
          Upload a PDF and we'll generate a custom quiz to help you test your knowledge on the content.
        </Typography>
      </MotionBox>

      <MotionBox variants={itemVariants}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </MotionBox>

      {error && (
        <Alert 
          severity="error" 
          onClose={() => setError(null)}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6">Generating Quiz...</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {loadingStatus}
          </Typography>
        </Box>
      ) : (
        <Box>
          {activeStep === 0 && (
            <MotionPaper
              elevation={3}
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 3,
                border: '2px dashed',
                borderColor: file ? theme.palette.primary.main : theme.palette.divider,
                bgcolor: file ? alpha(theme.palette.primary.main, 0.05) : 'background.paper'
              }}
              variants={itemVariants}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="application/pdf"
              />
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 4
                }}
              >
                <PictureAsPdfIcon 
                  sx={{ 
                    fontSize: 60, 
                    mb: 2, 
                    color: file ? theme.palette.primary.main : 'text.secondary' 
                  }} 
                />
                
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {file ? 'PDF Uploaded Successfully' : 'Upload Your PDF File'}
                </Typography>
                
                {file ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
                    Drag and drop your PDF file here, or click the button below to browse files.
                    Maximum file size: 10MB.
                  </Typography>
                )}
                
                <Button
                  variant={file ? "outlined" : "contained"}
                  onClick={handleUploadClick}
                  startIcon={<CloudUploadIcon />}
                  size="large"
                  sx={{ mt: 3 }}
                >
                  {file ? 'Change File' : 'Upload PDF'}
                </Button>
              </Box>
            </MotionPaper>
          )}
          
          {activeStep === 1 && (
            <MotionPaper
              elevation={3}
              sx={{ p: 4, borderRadius: 3 }}
              variants={itemVariants}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Configure Your Quiz
              </Typography>
              
              <Box sx={{ my: 4 }}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 4 }}>
                  <InputLabel id="num-questions-label">Number of Questions</InputLabel>
                  <Select
                    labelId="num-questions-label"
                    id="num-questions-select"
                    value={numQuestions}
                    onChange={handleNumQuestionsChange}
                    label="Number of Questions"
                  >
                    <MenuItem value={3}>3 Questions</MenuItem>
                    <MenuItem value={5}>5 Questions</MenuItem>
                    <MenuItem value={10}>10 Questions</MenuItem>
                    <MenuItem value={15}>15 Questions</MenuItem>
                    <MenuItem value={20}>20 Questions</MenuItem>
                  </Select>
                </FormControl>
                
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                  <Typography variant="body2">
                    We'll generate a quiz with {numQuestions} multiple-choice questions based on the content of your PDF.
                    Each question will have 4 possible answers.
                  </Typography>
                </Alert>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <QuizIcon sx={{ color: theme.palette.info.main, mr: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    The questions will be generated based on key concepts and information from your document.
                  </Typography>
                </Box>
              </Box>
            </MotionPaper>
          )}
          
          {activeStep === 2 && renderQuestion()}
          
          {activeStep === 3 && renderResults()}
          
          {activeStep !== 3 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ mr: 1 }}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !file) ||
                  (activeStep === 2 && !selectedAnswers[questions[currentQuestionIndex]?.id])
                }
              >
                {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </MotionContainer>
  );
};

export default QuizGenerator; 