import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  PaletteMode,
  CssBaseline,
  Box,
  Typography,
  Button,
  alpha
} from '@mui/material';
import { grey } from '@mui/material/colors';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExamSelection from './pages/ExamSelection';
import PatternAnalysis from './pages/PatternAnalysis';
import RevisionMap from './pages/RevisionMap';
import QuestionAssistant from './pages/EssayEvaluation';
import Login from './pages/Login';
import Chat from './pages/Chat';
import QuizGenerator from './pages/QuizGenerator';
import StarBackground from './components/ParticleBackground';
import SpaceshipBackground from './components/MeteorBackground';
import QuizProvider from './context/QuizContext';
import EssayProvider from './context/EssayContext';

// Create a theme instance with improved colors
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: '#00d1ff', // Cyan - first accent color
      light: '#33d9ff',
      dark: '#00a8cc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9b59b6', // Purple - second accent color
      light: '#b07cc6',
      dark: '#7c4594',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff2d55', // Pink - third accent color
      light: '#ff5777',
      dark: '#cc2444',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    success: {
      main: '#10b981', // Emerald green
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: '#00d1ff', // Cyan
      light: '#33d9ff',
      dark: '#00a8cc',
    },
    background: {
      default: '#101010', // Dark background
      paper: '#1a1a1a',   // Slightly lighter than background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#cccccc', // Light gray text
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12, // More rounded corners
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.03), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.04)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.04)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 10px 10px -5px rgba(0, 0, 0, 0.02)',
    '0px 25px 30px -8px rgba(0, 0, 0, 0.06), 0px 15px 15px -8px rgba(0, 0, 0, 0.03)',
    '0px 30px 35px -10px rgba(0, 0, 0, 0.07), 0px 20px 20px -10px rgba(0, 0, 0, 0.04)',
    // ... rest of the default shadows
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: 'none',
          padding: '8px 16px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0px 7px 14px rgba(0, 0, 0, 0.2), 0px 3px 6px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          color: '#ffffff',
          '&:hover': {
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
            filter: 'brightness(110%)',
          },
        },
        outlined: {
          borderColor: '#00d1ff',
          color: '#00d1ff',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: '#ff2d55',
            color: '#ff2d55',
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            borderWidth: '1.5px',
          },
        },
        text: {
          color: '#9b59b6',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            backgroundColor: 'rgba(255, 45, 85, 0.08)',
            color: '#ff2d55',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '0%',
            height: '2px',
            backgroundColor: '#ff2d55',
            transition: 'width 0.3s ease-in-out',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          margin: '2px 8px',
          padding: '8px 16px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
            transform: 'translateX(-100%)',
            zIndex: 0,
          },
          '&:hover': {
            backgroundColor: alpha('#00d1ff', 0.08),
            '&::before': {
              transform: 'translateX(100%)',
              transition: 'transform 0.6s ease',
            }
          },
          '&.Mui-selected': {
            backgroundColor: alpha('#00d1ff', 0.15),
            '&:hover': {
              backgroundColor: alpha('#00d1ff', 0.2),
            }
          }
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          borderRadius: 8,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          overflow: 'visible',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -6,
            left: 24,
            width: 12,
            height: 12,
            transform: 'rotate(45deg)',
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: 8,
          '&:focus': {
            backgroundColor: 'transparent',
          }
        },
        icon: {
          transition: 'transform 0.3s ease',
          color: alpha('#ffffff', 0.7),
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiSelect-icon': {
          transform: 'rotate(180deg)',
          color: '#00d1ff',
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#9b59b6',
          textDecoration: 'none',
          transition: 'color 0.2s ease-in-out',
          position: 'relative',
          '&:hover': {
            color: '#ff2d55',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -2,
            left: 0,
            width: '0%',
            height: '1px',
            backgroundColor: '#ff2d55',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        elevation1: {
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.4)',
        },
        elevation2: {
          boxShadow: '0 6px 30px -10px rgba(0, 0, 0, 0.3), 0 4px 20px 0 rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          backgroundColor: 'rgba(26, 26, 26, 0.6)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 14px 26px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateX(5px)',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          visibility: 'visible',
          opacity: 1,
          transition: 'color 0.2s ease-in-out, transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          overflowX: 'hidden',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#1a1a1a',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#444',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      },
    },
  },
});

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" paragraph>
            We apologize for the inconvenience. Please try refreshing the page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <AppContent theme={theme} />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// Separate component to use location hook
function AppContent({ theme }: { theme: any }) {
  const location = useLocation();
  const pathName = location.pathname;
  // Only hide particles on the chat (AI Assistant) page
  const showParticles = pathName !== '/chat';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(to bottom, #121212, #1a1a1a)' 
          : 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
        zIndex: 1,
      }}
    >
      <CssBaseline />
      {/* Show space background on all pages except AI Assistant */}
      {showParticles && <StarBackground />}
      {showParticles && <SpaceshipBackground shipCount={5} collisionFrequency={85} />}
      <Navbar />
      
      <Box sx={{ flexGrow: 1, zIndex: 1, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exam-selection" element={<ExamSelection />} />
          
          {/* Wrap quiz-related routes with QuizProvider */}
          <Route path="/quiz-generator" element={
            <QuizProvider>
              <QuizGenerator />
            </QuizProvider>
          } />
          
          <Route path="/pattern-analysis" element={<PatternAnalysis />} />
          <Route path="/pattern-analysis/:examId" element={<PatternAnalysis />} />
          <Route path="/revision-map" element={<RevisionMap />} />
          
          {/* Question Assistant (formerly Essay Evaluation) */}
          <Route path="/essay-evaluation" element={
            <EssayProvider>
              <QuestionAssistant />
            </EssayProvider>
          } />
          
          <Route path="/chat" element={<Chat />} />
          
          {/* 404 route */}
          <Route path="*" element={
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: '70vh',
                p: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
                404 - Page Not Found
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                The page you're looking for doesn't exist or has been moved.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => window.location.href = '/'}
                sx={{ mt: 3, fontWeight: 600 }}
              >
                Go Home
              </Button>
            </Box>
          } />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
