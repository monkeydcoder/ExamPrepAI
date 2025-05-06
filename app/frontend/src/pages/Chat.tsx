import React, { useState, useRef, useEffect, ErrorInfo, ComponentType } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Avatar, 
  CircularProgress, 
  IconButton, 
  FormControlLabel, 
  Switch, 
  Chip, 
  Divider, 
  useTheme, 
  alpha,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  AlertTitle,
  Tooltip,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  ListItemIcon,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import BoltIcon from '@mui/icons-material/Bolt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionIconButton = motion(IconButton);
const MotionCard = motion(Card);

// Styled components
const StyledMessagePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: 0,
  borderRadius: 0,
  maxWidth: '100%',
  boxShadow: 'none',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f9fafb',
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.5) : theme.palette.primary.light,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1f2937',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    visibility: 'visible !important',
    opacity: 1,
    color: 'inherit',
  }
}));

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f3f4f6',
  borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#2d3748' : theme.palette.divider}`,
  transition: 'transform 0.3s ease-in-out',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
    zIndex: 10,
    transform: 'translateX(0)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    width: 280,
  },
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    marginLeft: 280, // Add left margin on desktop to account for sidebar
    width: 'calc(100% - 280px)'
  }
}));

const MessageArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3, 3, 10, 3),
  display: 'flex',
  flexDirection: 'column',
  scrollBehavior: 'smooth',
  gap: theme.spacing(3),
  backgroundImage: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#4a5568' : '#cbd5e1',
    borderRadius: '4px',
  },
}));

const UserMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  alignSelf: 'flex-start',
  width: '100%',
  maxWidth: '85%',
  position: 'relative',
  marginBottom: theme.spacing(2),
  '& .message-content': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    borderRadius: '18px 18px 4px 18px',
    padding: theme.spacing(2, 2.5),
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    width: '100%',
  },
}));

const AssistantMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: '85%',
  position: 'relative',
  marginBottom: theme.spacing(2),
  '& .message-content': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1f2937',
    borderRadius: '18px 18px 18px 4px',
    padding: theme.spacing(2, 2.5),
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    width: '100%',
  },
}));

const InputArea = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
  borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#2d3748' : '#e5e7eb'}`,
  zIndex: 2,
}));

const NewChatButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#f1f5f9',
  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
  border: `1px solid ${theme.palette.mode === 'dark' ? '#4a5568' : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  justifyContent: 'flex-start',
  margin: theme.spacing(2, 2, 0, 2),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: '#ffffff'
  },
}));

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  return (
    <Box position="relative" my={2} sx={{ fontFamily: 'monospace' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 0.5,
          zIndex: 1,
        }}
      >
        <Tooltip title="Copy code">
          <StyledIconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
            color="inherit"
            sx={{
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'background.default',
              },
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </StyledIconButton>
        </Tooltip>
      </Box>
      <SyntaxHighlighter
        language={language || 'javascript'}
        style={atomOneDark}
        customStyle={{
          borderRadius: '8px',
          marginTop: '8px',
          marginBottom: '8px',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </Box>
  );
};

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const sampleQuestions = [
  "What are the key strategies for preparing for competitive government exams?",
  "How should I approach the essay section in government exams?",
  "Can you explain different exam patterns for SSC, Banking, and Railway exams?",
  "What are effective revision techniques for large government exam syllabi?",
  "How can I improve my answer writing skills for descriptive papers?"
];

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Chat component error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Error Fallback UI
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error | null, resetErrorBoundary: () => void }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center'
      }}
    >
      <SmartToyIcon 
        sx={{ 
          fontSize: 60, 
          color: 'error.main',
          mb: 2,
          visibility: 'visible',
          opacity: 1
        }} 
      />
      <Typography variant="h5" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, maxWidth: 500 }}>
        The chat component has encountered an error. This could be due to a network issue or a problem with the API response.
      </Typography>
      <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 3, width: '100%', maxWidth: 500 }}>
        <Typography variant="body2" component="pre" sx={{ 
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          color: 'error.main',
          fontFamily: 'monospace',
          fontSize: '0.8rem'
        }}>
          {error?.toString() || 'Unknown error'}
        </Typography>
      </Paper>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={resetErrorBoundary}
        startIcon={<RestartAltIcon sx={{ visibility: 'visible', opacity: 1 }} />}
      >
        Reload Chat
      </Button>
    </Box>
  );
};

const Chat = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: "👋 Hello! I'm your Government exam preparation assistant. I can help you with study strategies, exam patterns, answer writing techniques, and more for various competitive exams including UPSC, SSC, Banking, Railways, and State PSCs. How can I assist you today?\n\n**Tips:**\n- Use Fast Mode for quicker responses\n- Keep questions specific for better answers\n- Try the sample questions below to get started",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fastMode, setFastMode] = useState(true);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('llama3.1');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [cancelRequest, setCancelRequest] = useState(false);
  const [modelMenuAnchor, setModelMenuAnchor] = useState<null | HTMLElement>(null);
  const [messageMenuAnchor, setMessageMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ id: string, title: string, messages: Message[] }[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('new');
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Progress timer for loading indicator
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          // Increase slowly, never reaching 100
          if (prevProgress >= 95) {
            return 95;
          }
          const increment = Math.max(1, Math.floor(20 / (prevProgress + 1)));
          return prevProgress + increment;
        });
      }, 1000);
    } else {
      setProgress(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isLoading]);

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        // First check if backend server is running
        const statusResponse = await axios.get('http://localhost:3001/api/status', { timeout: 5000 })
          .catch(error => {
            console.error('Backend status check failed:', error.message);
            throw new Error('Backend server is not responding. Please ensure it is running.');
          });
        
        console.log('Backend status:', statusResponse.data);
        
        if (statusResponse.data && statusResponse.data.ollamaStatus !== 'connected') {
          throw new Error('Ollama service is not running. Please start Ollama and restart the backend server.');
        }
        
        const response = await axios.get('http://localhost:3001/api/models', { timeout: 10000 });
        console.log('Models response:', response.data);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAvailableModels(response.data);
          // Default to the first model (typically the best/newest one)
          setSelectedModel(response.data[0]);
        } else {
          // Fallback to default models if response isn't as expected
          console.warn('Models response format is unexpected:', response.data);
          setAvailableModels(['llama3.1', 'llama3.2']);
          setSelectedModel('llama3.1');
          setError('Could not load models from Ollama. Using default models instead.');
        }
      } catch (error: any) {
        console.error('Failed to fetch models:', error.message);
        // Set default models based on local Ollama installation
        setAvailableModels(['llama3.1', 'llama3.2']);
        setSelectedModel('llama3.1');
        setError(error.message || 'Failed to connect to the backend server. Please ensure backend and Ollama are running.');
      }
    };
    fetchModels();
  }, []);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add debug logging effect to track state
  useEffect(() => {
    console.log("Current state:", {
      messages: messages.length,
      isLoading,
      fastMode,
      selectedModel,
      availableModels,
      error
    });
  }, [messages, isLoading, fastMode, selectedModel, availableModels, error]);

  const handleModelMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setModelMenuAnchor(event.currentTarget);
  };

  const handleModelMenuClose = () => {
    setModelMenuAnchor(null);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    handleModelMenuClose();
  };

  const handleMessageMenuOpen = (event: React.MouseEvent<HTMLElement>, messageId: string) => {
    event.stopPropagation();
    setSelectedMessageId(messageId);
    setMessageMenuAnchor(event.currentTarget);
  };

  const handleMessageMenuClose = () => {
    setMessageMenuAnchor(null);
    setSelectedMessageId(null);
  };

  const handleCopyMessage = () => {
    const message = messages.find(m => m.id === selectedMessageId);
    if (message) {
      navigator.clipboard.writeText(message.content);
    }
    handleMessageMenuClose();
  };

  const handleDeleteMessage = () => {
    setMessages(prev => prev.filter(m => m.id !== selectedMessageId));
    handleMessageMenuClose();
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleNewChat = () => {
    setCurrentChatId('new');
    setMessages([
      {
        id: '0',
        content: "👋 Hello! I'm your Government exam preparation assistant. I can help you with study strategies, exam patterns, answer writing techniques, and more for various competitive exams including UPSC, SSC, Banking, Railways, and State PSCs. How can I assist you today?\n\n**Tips:**\n- Use Fast Mode for quicker responses\n- Keep questions specific for better answers\n- Try the sample questions below to get started",
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
    setInput('');
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleChatSelect = (chatId: string) => {
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages);
      if (isMobile) {
        setDrawerOpen(false);
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    // Create a new user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    // Update UI with user message
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    
    try {
      // Create a typing indicator message for the assistant
      const tempAssistantMessageId = 'temp-' + Date.now().toString();
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          id: tempAssistantMessageId, 
          content: '...', 
          role: 'assistant', 
          timestamp: new Date() 
        }
      ]);
      
      // Scroll to bottom whenever messages update
      setTimeout(() => {
        if (messageAreaRef.current) {
          messageAreaRef.current.scrollTo({
            top: messageAreaRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
      
      // Check backend connection before making chat request
      try {
        await axios.get('http://localhost:3001/api/status', { timeout: 5000 });
      } catch (statusError) {
        // If the status check fails, throw a more specific error
        throw new Error('Cannot connect to the backend server. Please make sure the backend is running.');
      }
      
      // Send request to chat API
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: input,
        model: selectedModel,
        fastMode: fastMode,
      }, {
        timeout: 120000, // 2 minutes timeout
      });
      
      // Check if the request was cancelled during processing
      if (cancelRequest) {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== tempAssistantMessageId));
        setIsLoading(false);
        return;
      }
      
      // Create real assistant message to replace typing indicator
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response.data.text,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      // Replace typing indicator with real message
      setMessages(prevMessages => prevMessages.map(message => 
        message.id === tempAssistantMessageId ? assistantMessage : message
      ));
      
      // Scroll to bottom after new message
      setTimeout(() => {
        if (messageAreaRef.current) {
          messageAreaRef.current.scrollTo({
            top: messageAreaRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
      
    } catch (error: any) {
      console.error('Error submitting message:', error);
      
      // Generate useful error message based on error type
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.message?.includes('connect to the backend')) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        if (error.message.includes('timeout')) {
          errorMessage = 'Request timed out. The model is taking too long to respond. Check if Ollama is running properly.';
        } else if (error.message.includes('Network Error')) {
          errorMessage = 'Network error: Could not connect to the backend server. Please ensure the backend server is running.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      // Create error message from assistant
      const errorAssistantMessage: Message = {
        id: Date.now().toString(),
        content: `⚠️ ${errorMessage}`,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      // Replace typing indicator with error message
      setMessages(prevMessages => prevMessages.map(message => 
        message.id.startsWith('temp-') ? errorAssistantMessage : message
      ));
      
      // Show error alert
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCancelRequest(true);
    setIsLoading(false);
  };

  const handleClearChat = () => {
    const welcomeMessage = {
      id: '0',
      content: "👋 Hello! I'm your Government exam preparation assistant. I can help you with study strategies, exam patterns, answer writing techniques, and more for various competitive exams including UPSC, SSC, Banking, Railways, and State PSCs. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    
    // Update chat history or create a new chat
    if (currentChatId !== 'new') {
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages: [welcomeMessage] } : chat
      ));
    } else {
      handleNewChat();
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderMessageContent = (content: string) => {
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
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', position: 'relative' }}>
      {/* Mobile drawer for chat history */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8fafc',
            boxSizing: 'border-box',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {/* Sidebar content */}
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #2d3748' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon sx={{ visibility: 'visible !important', opacity: 1 }} />}
              onClick={handleNewChat}
              sx={{ 
                backgroundColor: theme.palette.primary.main,
                textTransform: 'none',
                color: '#ffffff'
              }}
            >
              New Chat
            </Button>
          </Box>
          {/* Chat history section */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
            <List sx={{ p: 0 }}>
              {chatHistory.map((chat) => (
                <ListItem
                  key={chat.id}
                  disableGutters
                  disablePadding
                  sx={{
                    borderBottom: '1px solid #2d3748',
                  }}
                >
                  <ListItemButton
                    selected={currentChatId === chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    sx={{
                      p: 2,
                      '&.Mui-selected': {
                        backgroundColor: '#2d3748',
                        '&:hover': {
                          backgroundColor: '#3e4c61',
                        }
                      },
                      '&:hover': {
                        backgroundColor: '#2d3748',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: '#a0aec0' }}>
                      <ChatIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={chat.title || 'New conversation'} 
                      primaryTypographyProps={{ 
                        noWrap: true,
                        sx: { color: '#e2e8f0' }
                      }}
                      secondary={new Date(chat.date).toLocaleDateString()}
                      secondaryTypographyProps={{ 
                        sx: { color: '#a0aec0' }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      {/* Main layout */}
      <MainContainer>
        {/* Desktop Sidebar */}
        <Sidebar sx={{ 
          display: { xs: 'none', md: 'block' }, 
          position: { md: 'fixed' }, 
          top: { md: 64 }, 
          left: { md: 0 }, 
          bottom: { md: 0 }, 
          zIndex: 1 
        }}>
          <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <NewChatButton
              variant="outlined"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleNewChat}
            >
              New chat
            </NewChatButton>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary }}>
              Recent chats
            </Typography>
            
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <List sx={{ p: 0 }}>
                {chatHistory.map((chat) => (
                  <ListItem 
                    key={chat.id} 
                    disablePadding
                    sx={{ mb: 0.5 }}
                  >
                    <ListItemButton 
                      onClick={() => handleChatSelect(chat.id)}
                      selected={currentChatId === chat.id}
                      sx={{ 
                        borderRadius: 1,
                        py: 1,
                        px: 1.5
                      }}
                    >
                      <PlayArrowIcon 
                        fontSize="small" 
                        sx={{ 
                          mr: 1, 
                          opacity: 0.7,
                          visibility: 'visible'
                        }} 
                      />
                      <ListItemText 
                        primary={chat.title} 
                        primaryTypographyProps={{
                          noWrap: true,
                          fontSize: 14
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={fastMode}
                    onChange={(e) => setFastMode(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {fastMode ? 
                      <BoltIcon fontSize="small" sx={{ mr: 0.5, visibility: 'visible !important', opacity: 1, color: theme.palette.primary.main }} /> : 
                      <ElectricBoltIcon fontSize="small" sx={{ mr: 0.5, visibility: 'visible !important', opacity: 1 }} />
                    }
                    <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary }}>Fast Mode</Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
        </Sidebar>

        {/* Chat Container */}
        <ChatContainer>
          {/* Mobile Header */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              p: 2,
              borderBottom: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? '#2d3748' : theme.palette.divider,
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2, color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary }}>
              AI Assistant
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
                px: 1,
                py: 0.5,
                cursor: 'pointer',
                gap: 1,
              }}
              onClick={handleModelMenuOpen}
            >
              <SmartToyIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary }}>
                {selectedModel}
              </Typography>
            </Box>
          </Box>

          {/* Chat header */}
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#4d4d4f' : theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                edge="start" 
                color="inherit" 
                onClick={handleDrawerToggle}
                sx={{ mr: 1, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {currentChatId === 'new' ? 'New Chat' : 
                  chatHistory.find(chat => chat.id === currentChatId)?.title || 'Chat'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={handleModelMenuOpen}
                size="small"
                startIcon={<SmartToyIcon sx={{ visibility: 'visible', opacity: 1 }} />}
                variant="outlined"
                color="primary"
                sx={{ 
                  textTransform: 'none', 
                  borderRadius: 1,
                  display: { xs: 'none', sm: 'flex' },
                  '& .MuiSvgIcon-root': {
                    visibility: 'visible',
                    opacity: 1
                  }
                }}
              >
                {selectedModel}
              </Button>
              
              <MotionIconButton
                color="primary"
                onClick={handleClearChat}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                sx={{
                  '& .MuiSvgIcon-root': {
                    visibility: 'visible',
                    opacity: 1
                  }
                }}
              >
                <RestartAltIcon />
              </MotionIconButton>
            </Box>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{ m: 2, borderRadius: 1 }}
              onClose={() => setError(null)}
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => setFastMode(true)}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      visibility: 'visible',
                      opacity: 1
                    }
                  }}
                >
                  Enable Fast Mode
                </Button>
              }
            >
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}

          {/* Messages */}
          <MessageArea ref={messageAreaRef}>
            {messages.map((message, index) => (
              <Box 
                key={message.id} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  width: '100%',
                  mb: 2
                }}
              >
                {message.role === 'user' ? (
                  <Box sx={{ display: 'flex', maxWidth: '85%' }}>
                    <Avatar
                      sx={{
                        bgcolor: '#ec4899',
                        width: 38,
                        height: 38,
                        mt: 0.5,
                        mr: 1.5,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <PersonIcon fontSize="small" />
                    </Avatar>
                    
                    <Box sx={{ position: 'relative' }}>
                      <Box 
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: '#ffffff',
                          borderRadius: '18px 18px 4px 18px',
                          padding: theme.spacing(2, 2.5),
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          wordBreak: 'break-word',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {renderMessageContent(message.content)}
                      </Box>
                      
                      <Box 
                        className="message-actions"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          display: 'flex',
                          gap: 0.5,
                          '&:hover': { opacity: 1 }
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={(e) => handleMessageMenuOpen(e, message.id)}
                          sx={{ 
                            p: 0.5,
                            color: theme.palette.mode === 'dark' ? '#c5c5d2' : 'inherit',
                            '&:hover': {
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', maxWidth: '85%' }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.mode === 'dark' ? '#3b82f6' : theme.palette.primary.main,
                        width: 38,
                        height: 38,
                        mt: 0.5,
                        mr: 1.5,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                    
                    <Box sx={{ position: 'relative' }}>
                      {index === 0 ? (
                        <Box>
                          <Box 
                            sx={{
                              backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                              color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1f2937',
                              borderRadius: '18px 18px 18px 4px',
                              padding: theme.spacing(2, 2.5),
                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                              wordBreak: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {renderMessageContent(message.content)}
                          </Box>
                          
                          <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                              Try asking:
                            </Typography>
                            <Grid container spacing={1}>
                              {sampleQuestions.map((question, idx) => (
                                <Grid item xs={12} sm={6} key={idx}>
                                  <MotionCard 
                                    elevation={0}
                                    sx={{ 
                                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : alpha(theme.palette.primary.main, 0.05),
                                      border: '1px solid',
                                      borderColor: theme.palette.mode === 'dark' ? '#2d3748' : theme.palette.divider,
                                      borderRadius: 1
                                    }}
                                    whileHover={{ 
                                      scale: 1.02,
                                      boxShadow: theme.shadows[2],
                                      borderColor: theme.palette.mode === 'dark' ? '#3b82f6' : theme.palette.primary.light
                                    }}
                                  >
                                    <CardActionArea onClick={() => handleSampleQuestion(question)}>
                                      <CardContent sx={{ py: 1.5, px: 2 }}>
                                        <Typography 
                                          variant="body2"
                                          sx={{ 
                                            color: theme.palette.mode === 'dark' ? '#e2e8f0' : theme.palette.text.primary 
                                          }}
                                        >
                                          {question}
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </MotionCard>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </Box>
                      ) : (
                        <Box 
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                            color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1f2937',
                            borderRadius: '18px 18px 18px 4px',
                            padding: theme.spacing(2, 2.5),
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {renderMessageContent(message.content)}
                        </Box>
                      )}
                      
                      <Box 
                        className="message-actions"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          display: 'flex',
                          gap: 0.5,
                          '&:hover': { opacity: 1 }
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={(e) => handleMessageMenuOpen(e, message.id)}
                          sx={{ 
                            p: 0.5,
                            color: theme.palette.mode === 'dark' ? '#c5c5d2' : 'inherit',
                            '&:hover': {
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            }
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            
            {/* Loading message */}
            {isLoading && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  width: '100%',
                  mb: 2
                }}
              >
                <Box sx={{ display: 'flex', maxWidth: '85%' }}>
                  <Avatar
                    sx={{
                      bgcolor: '#6366f1',
                      width: 38,
                      height: 38,
                      mt: 0.5,
                      mr: 1.5,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <SmartToyIcon fontSize="small" />
                  </Avatar>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Box 
                      sx={{
                        backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                        color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1f2937',
                        borderRadius: '18px 18px 18px 4px',
                        padding: theme.spacing(2, 2.5),
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        mb: 1
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CircularProgress size={16} thickness={6} sx={{ mr: 1.5 }} />
                        <Typography variant="body2">Generating response...</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={progress} 
                        sx={{ 
                          height: 4, 
                          borderRadius: 2,
                          maxWidth: 300,
                          bgcolor: alpha(theme.palette.primary.main, 0.1)
                        }} 
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ ml: 1 }}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={handleCancel}
                      sx={{ 
                        '& .MuiSvgIcon-root': {
                          opacity: 1
                        }
                      }}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}
            
            <div ref={messageEndRef} />
          </MessageArea>

          {/* Input Area */}
          <InputArea>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : theme.palette.background.paper,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? '#2d3748' : theme.palette.divider,
                borderRadius: 1.5,
                boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <TextField
                fullWidth
                placeholder="Ask your question here..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                multiline
                maxRows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f9fafb',
                    borderRadius: 1.5,
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#4a5568' : alpha(theme.palette.divider, 0.8),
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#718096' : theme.palette.primary.light,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1f2937',
                    fontSize: '0.95rem',
                    padding: '12px 16px',
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  right: 10,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {fastMode && (
                  <Tooltip title="Fast Mode enabled" arrow placement="top">
                    <BoltIcon 
                      color="primary" 
                      fontSize="small" 
                      sx={{ mr: 1, opacity: 1, visibility: 'visible' }} 
                    />
                  </Tooltip>
                )}
                <MotionIconButton
                  color="primary"
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  sx={{
                    backgroundColor: input.trim() 
                      ? theme.palette.primary.main 
                      : theme.palette.mode === 'dark' ? '#475569' : '#e5e7eb',
                    color: input.trim() 
                      ? 'white' 
                      : theme.palette.mode === 'dark' ? '#94a3b8' : '#9ca3af',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    marginLeft: 1,
                    '&:hover': {
                      backgroundColor: input.trim() 
                        ? theme.palette.primary.dark 
                        : theme.palette.mode === 'dark' ? '#64748b' : '#d1d5db',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#475569' : '#e5e7eb',
                      color: theme.palette.mode === 'dark' ? '#94a3b8' : '#9ca3af',
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <SendIcon />
                  )}
                </MotionIconButton>
              </Box>
            </Box>
          </InputArea>
        </ChatContainer>
      </MainContainer>

      {/* Menus and Snackbars */}
      <Menu
        anchorEl={modelMenuAnchor}
        open={Boolean(modelMenuAnchor)}
        onClose={handleModelMenuClose}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : 'background.paper',
            borderRadius: 1,
            border: theme.palette.mode === 'dark' ? '1px solid #1e293b' : 'none',
            boxShadow: theme.palette.mode === 'dark' ? '0 2px 10px rgba(0, 0, 0, 0.3)' : theme.shadows[4],
          }
        }}
      >
        {availableModels.length > 0 ? (
          availableModels.map((model) => (
            <MenuItem 
              key={model} 
              onClick={() => handleModelSelect(model)}
              selected={model === selectedModel}
              sx={{
                borderLeft: model === selectedModel ? `3px solid ${theme.palette.mode === 'dark' ? '#3b82f6' : theme.palette.primary.main}` : 'none',
                paddingLeft: model === selectedModel ? 1 : 2,
                backgroundColor: model === selectedModel 
                  ? theme.palette.mode === 'dark' 
                    ? alpha('#3b82f6', 0.1) 
                    : alpha(theme.palette.primary.main, 0.1) 
                  : 'inherit',
                '&:hover': {
                  backgroundColor: model === selectedModel 
                    ? theme.palette.mode === 'dark' 
                      ? alpha('#3b82f6', 0.15) 
                      : alpha(theme.palette.primary.main, 0.15) 
                    : theme.palette.mode === 'dark'
                      ? alpha('#1e293b', 0.5)
                      : alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              {model}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No models available</MenuItem>
        )}
      </Menu>

      <Menu
        anchorEl={messageMenuAnchor}
        open={Boolean(messageMenuAnchor)}
        onClose={handleMessageMenuClose}
      >
        <MenuItem onClick={handleCopyMessage}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Copy</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteMessage}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>

      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Chat;