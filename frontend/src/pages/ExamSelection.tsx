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
  CircularProgress
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

  // Comprehensive list of top government exams with details
  const exams = [
    {
      id: 'upsc-cse',
      name: 'UPSC Civil Services Examination (IAS)',
      description: 'The Civil Services Examination is conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India, including the Indian Administrative Service (IAS), Indian Foreign Service (IFS), Indian Police Service (IPS), and more.',
      icon: <SchoolIcon fontSize="large" />,
      color: '#3b82f6',
      eligibility: 'Indian citizens between 21-32 years with a bachelor\'s degree from a recognized university.',
      examPattern: [
        'Preliminary Examination (Objective): Two papers - General Studies & CSAT',
        'Main Examination (Written): Nine papers including Essay, GS Papers I-IV, and Optional Papers',
        'Personality Test: Interview by a board of competent observers'
      ],
      importantDates: {
        notification: 'February',
        prelimsExam: 'May-June',
        mainsExam: 'September',
        interview: 'January-April'
      },
      syllabus: [
        'General Studies (History, Geography, Polity, Economics, Science & Technology)',
        'Current Affairs and General Knowledge',
        'Aptitude and Reasoning',
        'Optional Subject (One of 48 subjects offered)'
      ]
    },
    {
      id: 'ssc-cgl',
      name: 'SSC Combined Graduate Level (CGL)',
      description: 'The Staff Selection Commission Combined Graduate Level Examination is conducted for recruitment to various Group B and Group C posts in government departments and ministries.',
      icon: <WorkIcon fontSize="large" />,
      color: '#e53935',
      eligibility: 'Indian citizens with a bachelor\'s degree from a recognized university.',
      examPattern: [
        'Tier-I: Computer Based Examination (Multiple Choice)',
        'Tier-II: Computer Based Examination (Multiple Choice/Descriptive)',
        'Tier-III: Descriptive Paper in English/Hindi',
        'Tier-IV: Computer Proficiency Test or Skill Test'
      ],
      importantDates: {
        notification: 'December',
        tierIExam: 'March-April',
        tierIIExam: 'June-July',
        tierIIIExam: 'August-September'
      },
      syllabus: [
        'English Comprehension',
        'Reasoning and General Intelligence',
        'Quantitative Aptitude',
        'General Awareness'
      ]
    },
    {
      id: 'ibps-po',
      name: 'IBPS PO (Probationary Officer)',
      description: 'The Institute of Banking Personnel Selection conducts the PO exam for recruitment of Probationary Officers in participating public sector banks across India.',
      icon: <BusinessIcon fontSize="large" />,
      color: '#3b82f6',
      eligibility: 'Indian citizens between 20-30 years with a graduate degree from a recognized university.',
      examPattern: [
        'Preliminary Examination: Multiple Choice Questions on English, Quantitative Aptitude, and Reasoning',
        'Main Examination: Multiple Choice Questions on Reasoning, Data Analysis, General/Economy Awareness, English Language, Computer Knowledge',
        'Personal Interview'
      ],
      importantDates: {
        notification: 'August',
        prelimsExam: 'October',
        mainsExam: 'November',
        interview: 'January-February'
      },
      syllabus: [
        'Banking Knowledge and Current Affairs',
        'Reasoning and Computer Aptitude',
        'English Language',
        'Quantitative Aptitude',
        'General/Economy/Banking Awareness'
      ]
    },
    {
      id: 'gate',
      name: 'GATE (Graduate Aptitude Test in Engineering)',
      description: 'The Graduate Aptitude Test in Engineering is an examination conducted for admission to postgraduate programs in engineering and technology at Indian Institutes of Technology (IITs), National Institutes of Technology (NITs), and other prestigious institutions.',
      icon: <EngineeringIcon fontSize="large" />,
      color: '#00897b',
      eligibility: 'Bachelor\'s degree holders in Engineering/Technology/Architecture/Science/Commerce/Arts.',
      examPattern: [
        'Computer Based Test with Multiple Choice Questions and Numerical Answer Type Questions',
        'Total of 65 questions for 100 marks with 3-hour duration',
        'Subject-specific paper based on chosen engineering discipline'
      ],
      importantDates: {
        notification: 'September',
        application: 'October',
        examDate: 'February',
        results: 'March'
      },
      syllabus: [
        'General Aptitude (15% of total marks)',
        'Engineering Mathematics (10-15% of total marks)',
        'Subject-specific topics (70-75% of total marks)'
      ]
    },
    {
      id: 'neet',
      name: 'NEET (National Eligibility cum Entrance Test)',
      description: 'NEET is the unified entrance examination for admission to undergraduate medical education programs like MBBS, BDS, AYUSH, and more across all medical colleges in India.',
      icon: <LocalPoliceIcon fontSize="large" />,
      color: '#2dd4bf',
      eligibility: '12th passed students with Physics, Chemistry, and Biology subjects from a recognized board.',
      examPattern: [
        'Pen and paper-based test with Multiple Choice Questions',
        'Total of 180 questions (Physics: 45, Chemistry: 45, Biology: 90)',
        '3 hours 20 minutes duration'
      ],
      importantDates: {
        notification: 'December',
        application: 'January-February',
        examDate: 'May',
        results: 'June'
      },
      syllabus: [
        'Physics (Class 11 & 12 NCERT)',
        'Chemistry (Class 11 & 12 NCERT)',
        'Biology (Botany & Zoology - Class 11 & 12 NCERT)'
      ]
    },
    {
      id: 'rbi-grade-b',
      name: 'RBI Grade B Officer',
      description: 'The Reserve Bank of India conducts this examination for the recruitment of Officers in Grade B (General, DEPR, DSIM) in the Reserve Bank of India.',
      icon: <AccountBalanceIcon fontSize="large" />,
      color: '#43a047',
      eligibility: 'Indian citizens between 21-30 years with a bachelor\'s degree from a recognized university.',
      examPattern: [
        'Phase I: General Awareness, English Language, Quantitative Aptitude, Reasoning',
        'Phase II: (For General posts): Economic & Social Issues, English (Writing Skills), Finance & Management',
        'Phase II: (For DEPR/DSIM): Specialized papers based on stream',
        'Phase III: Interview'
      ],
      importantDates: {
        notification: 'January-February',
        phaseIExam: 'March-April',
        phaseIIExam: 'April-May',
        interview: 'June-July'
      },
      syllabus: [
        'Economics and Social Issues',
        'Finance and Management',
        'General Awareness on Banking and Financial Institutions',
        'English Language and Comprehension',
        'Quantitative Aptitude and Reasoning'
      ]
    },
    {
      id: 'upsc-cds',
      name: 'UPSC CDS (Combined Defence Services)',
      description: 'The Combined Defence Services Examination is conducted by the UPSC for recruitment to the Indian Military Academy, Indian Naval Academy, Air Force Academy and Officers Training Academy.',
      icon: <SecurityIcon fontSize="large" />,
      color: '#2e7d32',
      eligibility: 'Unmarried Indian citizens with a bachelor\'s degree from a recognized university (age limits vary by service).',
      examPattern: [
        'Written Examination: English, General Knowledge, Elementary Mathematics',
        'SSB Interview: Intelligence and Personality Test',
        'Medical Examination'
      ],
      importantDates: {
        notification: 'June & November (twice a year)',
        writtenExam: 'February & November',
        interview: 'Post written qualification',
        courseCommences: 'January & July'
      },
      syllabus: [
        'English Language and Comprehension',
        'General Knowledge (Current Affairs, History, Geography, Indian Polity, etc.)',
        'Elementary Mathematics (Algebra, Trigonometry, Geometry, Statistics)'
      ]
    },
    {
      id: 'cat',
      name: 'CAT (Common Admission Test)',
      description: 'The Common Admission Test is conducted for admission to postgraduate management programs (MBA) at Indian Institutes of Management (IIMs) and many other prestigious business schools across India.',
      icon: <SchoolIcon fontSize="large" />,
      color: '#1565c0',
      eligibility: 'Bachelor\'s degree holders with at least 50% marks (45% for reserved categories) from a recognized university.',
      examPattern: [
        'Computer-Based Test with Multiple Choice Questions and Type-In-The-Answer (TITA) Questions',
        'Three sections: Verbal Ability & Reading Comprehension, Data Interpretation & Logical Reasoning, Quantitative Ability',
        '2 hours duration with sectional time limits'
      ],
      importantDates: {
        notification: 'July-August',
        registration: 'August-September',
        examDate: 'November-December',
        results: 'January'
      },
      syllabus: [
        'Verbal Ability & Reading Comprehension',
        'Data Interpretation & Logical Reasoning',
        'Quantitative Ability'
      ]
    }
  ];

  const getExamById = (id: string) => {
    return exams.find(exam => exam.id === id);
  };

  const selectedExamData = selectedExam ? getExamById(selectedExam) : null;

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
          Choose from India's top government examinations to get comprehensive study materials, 
          exam patterns, and preparation strategies tailored for your success.
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
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.2)
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.5)
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
                    alignItems: 'center' 
                  }}>
                    {exam.icon}
                  </Box>
                  {exam.name}
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
              borderRadius: 4
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
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Exam Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedExamData.description}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Eligibility Criteria
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedExamData.eligibility}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Exam Pattern
              </Typography>
              <List>
                {selectedExamData.examPattern.map((pattern, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <GradingIcon sx={{ color: selectedExamData.color }} />
                    </ListItemIcon>
                    <ListItemText primary={pattern} />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 3 }} />
              
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
                      primary={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 3 }} />
              
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
                    '&:hover': {
                      backgroundColor: alpha(selectedExamData.color, 0.9)
                    },
                    fontSize: '1.1rem',
                    fontWeight: 600
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
    </MotionContainer>
  );
};

export default ExamSelection; 