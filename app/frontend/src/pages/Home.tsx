import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button,
  Paper,
  Grid,
  useTheme,
  alpha
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BookIcon from '@mui/icons-material/Book';
import QuizIcon from '@mui/icons-material/Quiz';

// Create motion components
const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Home = () => {
  const theme = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 } 
    },
    tap: { scale: 0.95 }
  };

  return (
    <MotionContainer 
      maxWidth="lg" 
      sx={{ 
        mt: 4, 
        mb: 4, 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: 'calc(100vh - 80px)'
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <MotionPaper 
        elevation={6} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 4, 
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.mode === 'dark' ? '#1e293b' : '#0f766e'} 0%, ${theme.palette.mode === 'dark' ? '#0f172a' : '#0d9488'} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
        variants={itemVariants}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            zIndex: 0,
            opacity: 0.1,
            backgroundImage: 'url(/backgrounds/pattern-bg.svg)',
            backgroundSize: '100px',
            backgroundRepeat: 'repeat'
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <MotionTypography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}
            variants={itemVariants}
          >
            Welcome to ExamPrep Hub
          </MotionTypography>

          <MotionTypography 
            variant="h5" 
            paragraph 
            sx={{ 
              mb: 4,
              textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
              maxWidth: '800px'
            }}
            variants={itemVariants}
          >
            Your AI-powered companion for comprehensive competitive exam preparation, offering personalized guidance and advanced tools for multiple exams including UPSC, SSC, GATE, and more.
          </MotionTypography>

          <MotionBox 
            sx={{ 
              mt: 5, 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap' 
            }}
            variants={itemVariants}
          >
            <MotionButton 
              component={Link} 
              to="/chat" 
              variant="contained" 
              size="large"
              startIcon={<ChatIcon />}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              sx={{ 
                px: 3, 
                py: 1.5, 
                borderRadius: 3, 
                fontSize: '1.1rem',
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.background.paper, 0.9)
                },
                boxShadow: theme.shadows[4],
                fontWeight: 600
              }}
            >
              Chat with AI
            </MotionButton>

            <MotionButton 
              component={Link} 
              to="/exam-selection" 
              variant="outlined" 
              size="large"
              startIcon={<SchoolIcon />}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              sx={{ 
                px: 3, 
                py: 1.5, 
                borderRadius: 3, 
                fontSize: '1.1rem',
                borderColor: 'white',
                borderWidth: 2,
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  borderWidth: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.15)
                },
                fontWeight: 600
              }}
            >
              Select Exam
            </MotionButton>
          </MotionBox>
        </Box>
      </MotionPaper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6} lg={3}>
          <MotionPaper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3, 
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: theme.shadows[10],
                transform: 'translateY(-5px)',
                borderColor: theme.palette.primary.light
              }
            }}
            variants={itemVariants}
          >
            <SchoolIcon 
              sx={{ 
                fontSize: 40, 
                mb: 2, 
                color: theme.palette.primary.main,
                visibility: 'visible',
                opacity: 1
              }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Exam Selection
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              Choose from a variety of competitive exams tailored to your career goals with personalized recommendations.
            </Typography>
            <Button 
              component={Link} 
              to="/exam-selection" 
              color="primary"
              endIcon={<Box sx={{ ml: 0.5 }}>→</Box>}
              sx={{ 
                alignSelf: 'flex-start', 
                fontWeight: 600,
                mt: 'auto'
              }}
            >
              Explore
            </Button>
          </MotionPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MotionPaper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: theme.shadows[10],
                transform: 'translateY(-5px)',
                borderColor: theme.palette.primary.light
              }
            }}
            variants={itemVariants}
          >
            <ChatIcon 
              sx={{ 
                fontSize: 40, 
                mb: 2, 
                color: theme.palette.secondary.main,
                visibility: 'visible',
                opacity: 1
              }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              AI Assistant
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              Get instant answers, explanations for complex topics, and personalized guidance for your preparation.
            </Typography>
            <Button 
              component={Link} 
              to="/chat" 
              color="secondary"
              endIcon={<Box sx={{ ml: 0.5 }}>→</Box>}
              sx={{ 
                alignSelf: 'flex-start', 
                fontWeight: 600,
                mt: 'auto'
              }}
            >
              Try Now
            </Button>
          </MotionPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MotionPaper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: theme.shadows[10],
                transform: 'translateY(-5px)',
                borderColor: theme.palette.primary.light
              }
            }}
            variants={itemVariants}
          >
            <AnalyticsIcon 
              sx={{ 
                fontSize: 40, 
                mb: 2, 
                color: theme.palette.success.main,
                visibility: 'visible',
                opacity: 1
              }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Pattern Analysis
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              Analyze exam patterns and trends to optimize your preparation strategy with data-driven insights.
            </Typography>
            <Button 
              component={Link} 
              to="/pattern-analysis" 
              color="success"
              endIcon={<Box sx={{ ml: 0.5 }}>→</Box>}
              sx={{ 
                alignSelf: 'flex-start', 
                fontWeight: 600,
                mt: 'auto'
              }}
            >
              Analyze
            </Button>
          </MotionPaper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MotionPaper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: theme.shadows[10],
                transform: 'translateY(-5px)',
                borderColor: theme.palette.primary.light
              }
            }}
            variants={itemVariants}
          >
            <EditNoteIcon 
              sx={{ 
                fontSize: 40, 
                mb: 2, 
                color: theme.palette.warning.main,
                visibility: 'visible',
                opacity: 1
              }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Essay Evaluation
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              Submit your essays for AI-powered evaluation with detailed feedback to improve your writing skills.
            </Typography>
            <Button 
              component={Link} 
              to="/essay-evaluation" 
              color="warning"
              endIcon={<Box sx={{ ml: 0.5 }}>→</Box>}
              sx={{ 
                alignSelf: 'flex-start', 
                fontWeight: 600,
                mt: 'auto'
              }}
            >
              Evaluate
            </Button>
          </MotionPaper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <MotionPaper 
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: theme.shadows[10],
                transform: 'translateY(-5px)',
                borderColor: theme.palette.primary.light
              }
            }}
            variants={itemVariants}
          >
            <QuizIcon 
              sx={{ 
                fontSize: 40, 
                mb: 2, 
                color: theme.palette.info.main,
                visibility: 'visible',
                opacity: 1
              }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Quiz Generator
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              Upload your study materials and generate custom quizzes to test your knowledge and reinforce learning.
            </Typography>
            <Button 
              component={Link} 
              to="/quiz-generator" 
              color="info"
              endIcon={<Box sx={{ ml: 0.5 }}>→</Box>}
              sx={{ 
                alignSelf: 'flex-start', 
                fontWeight: 600,
                mt: 'auto'
              }}
            >
              Create Quiz
            </Button>
          </MotionPaper>
        </Grid>
      </Grid>

      <MotionPaper
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 3,
          background: `linear-gradient(to right, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.secondary.light, 0.1)})`,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 3
        }}
        variants={itemVariants}
      >
        <BookIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, visibility: 'visible', opacity: 1 }} />
        <Box>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Ready to start your exam preparation journey?</Typography>
          <Typography variant="body1">
            Begin with our AI assistant to get personalized guidance tailored to your chosen exam, learning style, and goals.
          </Typography>
        </Box>
        <MotionButton
          component={Link}
          to="/chat"
          variant="contained"
          color="primary"
          size="large"
          sx={{ ml: { xs: 0, md: 'auto' }, mt: { xs: 2, md: 0 } }}
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          Get Started
        </MotionButton>
      </MotionPaper>
    </MotionContainer>
  );
};

export default Home; 