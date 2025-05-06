import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Grid,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GradingIcon from '@mui/icons-material/Grading';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LaunchIcon from '@mui/icons-material/Launch';
import { allExamsData } from '../data/examsData';

// Simple animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Create motion components
const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);
const MotionBox = motion(Box);

const ExamSelection = () => {
  const theme = useTheme();
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Define icon mapping for exams
  const examIconMap: {[key: string]: React.ReactNode} = {
    'upsc-cse': <SchoolIcon fontSize="large" />,
    'ssc-cgl': <WorkIcon fontSize="large" />,
    'ibps-po': <BusinessIcon fontSize="large" />,
    'rbi-grade-b': <AccountBalanceIcon fontSize="large" />,
    'gate': <EngineeringIcon fontSize="large" />,
    'neet': <LocalPoliceIcon fontSize="large" />,
    'upsc-cds': <SecurityIcon fontSize="large" />,
    'nda': <SecurityIcon fontSize="large" />
  };
  
  // Define color mapping for exams
  const examColorMap: {[key: string]: string} = {
    'upsc-cse': '#3b82f6',
    'ssc-cgl': '#e53935',
    'ibps-po': '#3b82f6',
    'rbi-grade-b': '#43a047',
    'gate': '#00897b',
    'neet': '#2dd4bf',
    'upsc-cds': '#2e7d32',
    'nda': '#9c27b0'
  };

  // Create a merged data structure with our exam content
  const exams = allExamsData.map(exam => {
    return {
      id: exam.id,
      name: exam.name, 
      description: exam.description,
      icon: examIconMap[exam.id] || <SchoolIcon fontSize="large" />,
      color: examColorMap[exam.id] || '#3b82f6',
      eligibility: exam.eligibilityCriteria,
      examPattern: exam.examPattern,
      importantDates: exam.importantDates,
      officialWebsite: exam.officialWebsite,
      syllabus: [
        'Visit the pattern analysis page for a detailed syllabus breakdown',
        'See recommendations for suggested study approach'
      ]
    };
  });

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleExamChange = (event: SelectChangeEvent) => {
    setSelectedExam(event.target.value);
  };

  const getExamById = (id: string) => {
    return exams.find(exam => exam.id === id);
  };

  const selectedExamData = selectedExam ? getExamById(selectedExam) : null;

  // Function to render the quick actions for each exam
  const renderExamQuickActions = (examId: string) => {
    return (
      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
        <Button 
          component={Link} 
          to={`/pattern-analysis/${examId}`}
          variant="contained" 
          size="small" 
          startIcon={<BarChartIcon />}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            boxShadow: 'none',
            color: '#FFFFFF',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '120%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, ${alpha('#FFFFFF', 0.2)}, transparent)`,
              transform: 'translateX(-100%)',
            },
            '&:hover': { 
              boxShadow: theme => `0 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`
            },
            '&:hover::before': {
              transform: 'translateX(100%)',
              transition: 'transform 0.6s ease',
            }
          }}
        >
          Pattern Analysis
        </Button>
        <Button 
          component={Link} 
          to="/revision-map"
          variant="outlined" 
          size="small" 
          startIcon={<TrendingUpIcon />}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            boxShadow: 'none',
            borderWidth: '1.5px',
            fontWeight: 500,
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '0%',
              height: '2px',
              backgroundColor: theme.palette.primary.main,
              transition: 'width 0.3s ease-in-out',
            },
            '&:hover': { 
              boxShadow: 2,
              borderWidth: '1.5px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            },
            '&:hover::after': {
              width: '100%',
            }
          }}
        >
          Study Planner
        </Button>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 80px)',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <CircularProgress size={60} thickness={4} color="primary" />
        <Typography variant="h5" color="textSecondary">Loading exam information...</Typography>
      </Box>
    );
  }

  return (
    <MotionContainer
      maxWidth="lg"
      sx={{ py: 5 }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <MotionPaper
        elevation={1}
        sx={{
          p: { xs: 3, md: 5 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
          color: 'white',
          borderRadius: 4,
          mb: 5,
          textAlign: 'center'
        }}
        variants={itemVariants}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
            textShadow: '0px 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Select Your Exam
        </Typography>
        <Typography
          variant="h5"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Choose from a wide range of competitive examinations to get comprehensive study materials, 
          exam patterns, and personalized preparation strategies tailored for your success.
        </Typography>
      </MotionPaper>

      {/* Dropdown Selection */}
      <MotionBox 
        sx={{ 
          maxWidth: 700, 
          mx: 'auto', 
          mb: 5,
          p: 4,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
        variants={itemVariants}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom align="center">
          Which exam are you preparing for?
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Select an exam from the dropdown below to get detailed information about eligibility, exam pattern, syllabus, and important dates.
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="exam-select-label">Select Exam</InputLabel>
          <Select
            labelId="exam-select-label"
            id="exam-select"
            value={selectedExam}
            onChange={handleExamChange}
            label="Select Exam"
            sx={{ 
              height: 56,
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.2),
                borderWidth: '1.5px',
                transition: 'all 0.3s ease'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.5),
                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
              }
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: 'rgba(26, 26, 26, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  maxHeight: 400,
                  '& .MuiMenuItem-root': {
                    padding: 1.5,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    borderRadius: 1,
                    margin: '4px 8px',
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
                      zIndex: 0
                    },
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      transform: 'translateX(4px)',
                      '&::before': {
                        transform: 'translateX(100%)',
                        transition: 'transform 0.6s ease'
                      }
                    },
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2)
                      }
                    }
                  }
                }
              }
            }}
          >
            <MenuItem value="" disabled>
              <em>Choose an examination</em>
            </MenuItem>
            {exams.map((exam) => (
              <MenuItem key={exam.id} value={exam.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    mr: 2, 
                    color: exam.color, 
                    display: 'flex', 
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    transform: selectedExam === exam.id ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {exam.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight={selectedExam === exam.id ? 600 : 400}
                    sx={{
                      transition: 'all 0.3s ease',
                      color: selectedExam === exam.id ? theme.palette.primary.main : 'inherit'
                    }}
                  >
                    {exam.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MotionBox>

      {/* Selected Exam Details */}
      {selectedExamData && (
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MotionCard 
            sx={{ 
              mb: 5,
              overflow: 'hidden',
              borderRadius: 4,
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(26, 26, 26, 0.7)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${alpha(selectedExamData.color, 0.3)}, transparent)`,
                opacity: 0,
                transition: 'opacity 0.4s ease',
              },
              '&:hover': {
                boxShadow: `0 15px 35px rgba(0, 0, 0, 0.2), 0 0 15px ${alpha(selectedExamData.color, 0.1)}`,
                '&::before': {
                  opacity: 1,
                }
              }
            }}
          >
            <CardMedia
              component="div"
              sx={{
                height: 240,
                background: `linear-gradient(45deg, ${alpha(selectedExamData.color, 0.9)} 0%, ${alpha(selectedExamData.color, 0.7)} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                p: 3
              }}
            >
              <Box textAlign="center">
                <Box sx={{ 
                  fontSize: 60, 
                  mb: 2,
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  p: 2,
                  borderRadius: '50%'
                }}>
                  {selectedExamData.icon}
                </Box>
                <Typography variant="h3" fontWeight={700} component="h2">
                  {selectedExamData.name}
                </Typography>
              </Box>
            </CardMedia>
            
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Exam Overview
                  </Typography>
                  <Typography variant="body1">
                    {selectedExamData.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      component="a" 
                      href={selectedExamData.officialWebsite} 
                      target="_blank"
                      startIcon={<LaunchIcon />}
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(5px)',
                        borderWidth: '1.5px',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0)',
                          transition: 'all 0.3s ease',
                          zIndex: -1,
                        },
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          color: '#FFFFFF',
                          boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                          '&::before': {
                            background: theme.palette.primary.main,
                          }
                        }
                      }}
                    >
                      Visit Official Website
                    </Button>
                  </Box>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Eligibility Criteria
                  </Typography>
                  <List>
                    {selectedExamData.eligibility.map((criteria, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: selectedExamData.color }} />
                        </ListItemIcon>
                        <ListItemText primary={criteria} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Exam Pattern
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                      Stages:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {selectedExamData.examPattern.stages.map((stage, index) => (
                        <Chip 
                          key={index} 
                          label={stage} 
                          sx={{ 
                            bgcolor: alpha(selectedExamData.color, 0.1),
                            color: selectedExamData.color,
                            fontWeight: 500,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: alpha(selectedExamData.color, 0.2),
                              transform: 'translateY(-2px)',
                              boxShadow: `0 4px 8px ${alpha(selectedExamData.color, 0.2)}`
                            }
                          }} 
                        />
                      ))}
                    </Box>
                  </Box>
                  <List>
                    {selectedExamData.examPattern.pattern.map((pattern, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <GradingIcon sx={{ color: selectedExamData.color }} />
                        </ListItemIcon>
                        <ListItemText primary={pattern} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Important Dates
                  </Typography>
                  <List>
                    {Object.entries(selectedExamData.importantDates).map(([key, value], index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CalendarMonthIcon sx={{ color: selectedExamData.color }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}`} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Syllabus Highlights
                  </Typography>
                  <List>
                    {selectedExamData.syllabus.map((topic, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <BookmarkIcon sx={{ color: selectedExamData.color }} />
                        </ListItemIcon>
                        <ListItemText primary={topic} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to={`/exam-selection/${selectedExamData.id}`}
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 50,
                    backgroundColor: selectedExamData.color,
                    color: '#FFFFFF',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '120%',
                      height: '100%',
                      background: `linear-gradient(90deg, transparent, ${alpha('#FFFFFF', 0.2)}, transparent)`,
                      transform: 'translateX(-100%)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      borderRadius: 50,
                      boxShadow: `0 0 30px 5px ${alpha(selectedExamData.color, 0.5)}`,
                      transition: 'opacity 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.02)',
                      backgroundColor: selectedExamData.color,
                      boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 6px 10px rgba(0,0,0,0.15), 0 0 0 1px ${alpha(selectedExamData.color, 0.1)}`,
                    },
                    '&:hover::before': {
                      transform: 'translateX(100%)',
                      transition: 'transform 0.6s ease',
                    },
                    '&:hover::after': {
                      opacity: 1,
                    },
                    '&:active': {
                      transform: 'translateY(-1px) scale(0.98)',
                    }
                  }}
                >
                  Start Preparing
                </Button>
              </Box>
            </CardContent>
          </MotionCard>
        </MotionBox>
      )}
      
      {/* Information message when no exam is selected */}
      {!selectedExam && (
        <MotionBox
          sx={{ 
            textAlign: 'center', 
            maxWidth: 700, 
            mx: 'auto',
            p: 4,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.default, 0.5)
          }}
          variants={itemVariants}
        >
          <Typography variant="h5" color="textSecondary" paragraph>
            Please select an exam from the dropdown above to view detailed information.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We provide comprehensive information about exam patterns, eligibility criteria, important dates, and syllabus for India's top government examinations.
          </Typography>
        </MotionBox>
      )}

      {/* Exams Grid */}
      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h4" 
          fontWeight="700" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            mb: 4,
          }}
        >
          Choose Your Exam
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Box component={motion.div} variants={itemVariants}>
              <Grid container spacing={3}>
                {exams.map((exam) => (
                  <Grid item xs={12} md={6} lg={4} key={exam.id}>
                    <MotionCard 
                      variants={itemVariants}
                      sx={{ 
                        height: '100%',
                        borderRadius: 3,
                        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        border: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                        overflow: 'visible',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: 3,
                          backgroundColor: 'transparent',
                          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
                          opacity: 0,
                          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          zIndex: -1,
                        },
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          borderColor: alpha(exam.color, 0.5),
                          '&::before': {
                            opacity: 1,
                            boxShadow: `0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22), 0 0 0 1px ${alpha(exam.color, 0.1)}, 0 0 15px ${alpha(exam.color, 0.15)}`,
                          }
                        }
                      }}
                    >
                      <CardContent sx={{ 
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.3s ease',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundImage: `linear-gradient(to bottom right, ${alpha(exam.color, 0)}, ${alpha(exam.color, 0)})`,
                          opacity: 0,
                          transition: 'all 0.5s ease',
                          zIndex: -1,
                        },
                        '&:hover::after': {
                          opacity: 0.03,
                          backgroundImage: `linear-gradient(to bottom right, ${alpha(exam.color, 0.02)}, ${alpha(exam.color, 0.08)})`,
                        }
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 2,
                          color: exam.color
                        }}>
                          {exam.icon}
                          <Typography 
                            variant="h5" 
                            component="h2"
                            fontWeight="600"
                            sx={{ ml: 1.5 }}
                          >
                            {exam.name}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ minHeight: 80, mb: 1 }}
                        >
                          {exam.description.length > 160 
                            ? `${exam.description.substring(0, 160)}...` 
                            : exam.description}
                        </Typography>
                        
                        {/* Quick action buttons */}
                        <Box sx={{ mt: 'auto' }}>
                          {renderExamQuickActions(exam.id)}
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <List dense disablePadding>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CalendarMonthIcon fontSize="small" color="primary" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={`Exam date: ${exam.importantDates.examDate || exam.importantDates.prelimsExam || 'Check official website'}`}
                                primaryTypographyProps={{ variant: 'body2' }} 
                              />
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <GradingIcon fontSize="small" color="primary" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={`Stages: ${exam.examPattern.stages.length}`}
                                primaryTypographyProps={{ variant: 'body2' }} 
                              />
                            </ListItem>
                          </List>
                          
                          <Button
                            fullWidth
                            variant="contained"
                            component={Link}
                            to={`/pattern-analysis/${exam.id}`}
                            endIcon={<ArrowForwardIcon />}
                            sx={{ 
                              mt: 2,
                              borderRadius: 2,
                              backgroundColor: exam.color,
                              color: '#FFFFFF',
                              fontWeight: 600,
                              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                              position: 'relative',
                              overflow: 'hidden',
                              transition: 'all 0.3s ease',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '120%',
                                height: '100%',
                                background: `linear-gradient(90deg, transparent, ${alpha('#FFFFFF', 0.2)}, transparent)`,
                                transform: 'translateX(-100%)',
                              },
                              '&:hover': {
                                backgroundColor: alpha(exam.color, 0.9),
                                boxShadow: `0 4px 12px ${alpha(exam.color, 0.4)}`,
                                transform: 'translateY(-2px)'
                              },
                              '&:hover::before': {
                                transform: 'translateX(100%)',
                                transition: 'transform 0.6s ease',
                              }
                            }}
                          >
                            Prepare for {exam.name.split(' ')[0]}
                          </Button>
                        </Box>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
    </MotionContainer>
  );
};

export default ExamSelection; 