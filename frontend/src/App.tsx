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
import EssayEvaluation from './pages/EssayEvaluation';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ParticleBackground from './components/ParticleBackground';

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
          transition: 'all 0.2s ease-in-out',
          backgroundColor: '#00d1ff',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#ff2d55',
            transform: 'translateY(-2px)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          borderColor: '#00d1ff',
          color: '#00d1ff',
          '&:hover': {
            borderColor: '#ff2d55',
            color: '#ff2d55',
          },
        },
        text: {
          color: '#9b59b6',
          '&:hover': {
            backgroundColor: 'rgba(255, 45, 85, 0.08)',
            color: '#ff2d55',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#9b59b6',
          textDecoration: 'none',
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            color: '#ff2d55',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          visibility: 'visible',
          opacity: 1,
          transition: 'color 0.2s ease-in-out',
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
  const [mode, setMode] = useState<PaletteMode>('light');
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
  const isChatPage = location.pathname === '/chat';
  
  // Create a local theme with dark colors specifically for the Chat page
  const chatLightTheme = React.useMemo(() => 
    createTheme({
      ...getDesignTokens('dark'),
      palette: {
        mode: 'dark',
        primary: {
          main: '#3b82f6', // Bright blue
          light: '#60a5fa',
          dark: '#2563eb',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#10b981', // Emerald green
          light: '#34d399',
          dark: '#059669',
          contrastText: '#ffffff',
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
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 8,
              fontWeight: 600,
              boxShadow: 'none',
              padding: '8px 16px',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#2563eb',
                transform: 'translateY(-2px)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              },
            },
            contained: {
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              },
            },
            outlined: {
              borderColor: '#3b82f6',
              color: '#3b82f6',
              '&:hover': {
                borderColor: '#2563eb',
                color: '#2563eb',
              },
            },
            text: {
              color: '#3b82f6',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                color: '#2563eb',
              },
            },
          },
        },
      },
    }), []);
  
  // Use custom theme for chat page, otherwise use the global theme
  const activeTheme = isChatPage ? chatLightTheme : theme;
  
  return (
    <ThemeProvider theme={activeTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: activeTheme.palette.background.default,
          transition: 'background 0.5s ease-in-out',
        }}
      >
        {/* Particle Background */}
        {!isChatPage && (
          <ParticleBackground 
            colors={['#00d1ff', '#9b59b6', '#ff2d55']}
            particleCount={120}
            particleSpeed={0.15}
            lineLength={150}
            lineWidth={0.8}
            particleMinRadius={1}
            particleMaxRadius={3}
            blendMode="lighter"
            particleOpacity={0.8}
            lineOpacity={0.3}
            enableHover={false}
            enableParallax={false}
            backgroundColor={theme.palette.background.default}
          />
        )}
        {isChatPage && (
          <ParticleBackground 
            colors={['#00d1ff', '#9b59b6', '#ff2d55']}
            particleCount={80}
            particleSpeed={0.1}
            lineLength={120}
            lineWidth={0.6}
            particleMinRadius={1}
            particleMaxRadius={2.5}
            blendMode="lighter"
            particleOpacity={0.7}
            lineOpacity={0.25}
            enableHover={false}
            enableParallax={false}
            backgroundColor={theme.palette.background.default}
          />
        )}
        
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: isChatPage ? 0 : 5,
            px: isChatPage ? 0 : { xs: 2, sm: 3, md: 5 },
            minHeight: 'calc(100vh - 64px)',
            position: 'relative',
            zIndex: 1,
            '& > *': {
              position: 'relative',
              zIndex: 2,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
              animation: isChatPage ? 'none' : 'fadeIn 0.5s ease-out',
            },
            '@keyframes fadeIn': {
              from: {
                opacity: 0,
                transform: 'translateY(10px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            '& .MuiPaper-root': isChatPage 
              ? {}
              : {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  borderRadius: 3,
                },
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam-selection" element={<ExamSelection />} />
            <Route path="/exam-selection/:type" element={<ExamSelection />} />
            <Route path="/pattern-analysis" element={<PatternAnalysis />} />
            <Route path="/revision-map" element={<RevisionMap />} />
            <Route path="/essay-evaluation" element={<EssayEvaluation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Box>
        
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            position: 'relative',
            zIndex: 5,
            py: 3,
            px: { xs: 2, md: 4 },
            mt: 'auto',
            backgroundColor: activeTheme.palette.background.default,
            backgroundImage: 'none',
            borderTop: `1px solid ${alpha(activeTheme.palette.divider, 0.2)}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ExamPrep Hub. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
