import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  Divider,
  useTheme,
  alpha,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Tooltip,
  IconButton,
  TextField,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { motion } from 'framer-motion';

// Icons
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SubjectIcon from '@mui/icons-material/Subject';
import TocIcon from '@mui/icons-material/Toc';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsightsIcon from '@mui/icons-material/Insights';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import TimerIcon from '@mui/icons-material/Timer';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import HelpIcon from '@mui/icons-material/Help';
import DownloadIcon from '@mui/icons-material/Download';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookIcon from '@mui/icons-material/Book';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import WarningIcon from '@mui/icons-material/Warning';

import { useNavigate, useParams } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Scatter
} from 'recharts';
import { 
  ExamPatternData, 
  getExamDataById, 
  allExamsData, 
  getExamsList, 
  COLORS 
} from '../data/examsData';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);
const MotionContainer = motion(Container);
const MotionDivider = motion(Divider);
const MotionAccordion = motion(Accordion);

// Types for performance data (new addition)
interface TopicPerformance {
  topic: string;
  correctPercentage: number;
  wrongPercentage: number;
  fill: string;
}

// Types for weakness data (new addition)
interface TopicWeakness {
  topic: string;
  score: number;
  priority: string;
  fill: string;
  description: string;
}

// Types for study time data (new addition)
interface StudyTimeRecommendation {
  topic: string;
  hours: number;
  importance: string;
  fill: string;
  reason: string;
}

// Types for practice questions (new addition)
interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  topic: string;
}

// Types for syllabus topics (new addition)
interface SyllabusTopic {
  topic: string;
  subtopics: string[];
  importance: 'High' | 'Medium' | 'Low';
  prevalence: number;
  fill: string;
}

// Types for historical analysis (new addition)
interface HistoricalPattern {
  year: number;
  pattern: string;
  significance: string;
}

// Interface for TabPanel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`pattern-tabpanel-${index}`}
      aria-labelledby={`pattern-tab-${index}`}
      {...other}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

// New component for interactive study planner
const StudyPlannerWidget = ({ topics }: { topics: { topic: string; importance: string; recommendedTime: string }[] }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [studyPlan, setStudyPlan] = useState<{[key: string]: number}>({});
  const [totalHours, setTotalHours] = useState<number>(0);
  
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const handleHoursChange = (topic: string, hours: number) => {
    setStudyPlan(prev => {
      const newPlan = { ...prev, [topic]: hours };
      const newTotal = Object.values(newPlan).reduce((sum, current) => sum + current, 0);
      setTotalHours(newTotal);
      return newPlan;
    });
  };
  
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="600">Your Study Plan</Typography>
        <Chip 
          label={`Total: ${totalHours} hours`} 
          color="primary" 
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
      
      {topics.map((topic, index) => (
        <MotionAccordion 
          key={index}
          expanded={expanded === `panel${index}`} 
          onChange={handleChange(`panel${index}`)}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          sx={{ 
            mb: 1,
            borderRadius: 2,
            '&:before': { display: 'none' },
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              borderRadius: 2,
              '&.Mui-expanded': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
              <Typography fontWeight={500}>{topic.topic}</Typography>
              <Box display="flex" alignItems="center">
                <Chip 
                  size="small" 
                  label={topic.importance} 
                  color={topic.importance === 'High' ? 'error' : topic.importance === 'Medium' ? 'warning' : 'success'}
                  sx={{ mr: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Recommended: {topic.recommendedTime}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                Allocate study time for this topic:
              </Typography>
              <TextField
                type="number"
                label="Hours"
                variant="outlined"
                size="small"
                value={studyPlan[topic.topic] || 0}
                onChange={(e) => handleHoursChange(topic.topic, Number(e.target.value))}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                sx={{ width: 100 }}
              />
            </Box>
          </AccordionDetails>
        </MotionAccordion>
      ))}
      
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 2 }}
        endIcon={<DownloadIcon />}
      >
        Download Study Plan
      </Button>
    </Box>
  );
};

// Topic strength/weakness analysis component
const TopicAnalysisWidget = ({ topics }: { topics: TopicWeakness[] }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography fontWeight="bold">Topic</Typography></TableCell>
            <TableCell align="center"><Typography fontWeight="bold">Score</Typography></TableCell>
            <TableCell align="center"><Typography fontWeight="bold">Priority</Typography></TableCell>
            <TableCell align="center"><Typography fontWeight="bold">Details</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topics.map((topic, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      backgroundColor: topic.fill,
                      borderRadius: '50%',
                      mr: 1.5
                    }} 
                  />
                  {topic.topic}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Chip 
                  label={`${topic.score}/10`} 
                  size="small"
                  color={topic.score < 4 ? 'error' : topic.score < 7 ? 'warning' : 'success'}
                />
              </TableCell>
              <TableCell align="center">
                <Chip 
                  label={topic.priority} 
                  size="small"
                  color={topic.priority === 'High' ? 'error' : topic.priority === 'Medium' ? 'warning' : 'success'}
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title={topic.description}>
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Mock data for the new components
const mockPerformanceData: TopicPerformance[] = [
  { topic: 'Indian History', correctPercentage: 65, wrongPercentage: 35, fill: '#8884d8' },
  { topic: 'Geography', correctPercentage: 72, wrongPercentage: 28, fill: '#83a6ed' },
  { topic: 'Indian Polity', correctPercentage: 58, wrongPercentage: 42, fill: '#8dd1e1' },
  { topic: 'Economy', correctPercentage: 45, wrongPercentage: 55, fill: '#82ca9d' },
  { topic: 'Science & Technology', correctPercentage: 80, wrongPercentage: 20, fill: '#a4de6c' }
];

const mockWeaknessData: TopicWeakness[] = [
  { topic: 'Economy', score: 4.5, priority: 'High', fill: '#82ca9d', description: 'Focus on recent economic reforms and policies' },
  { topic: 'Indian Polity', score: 5.8, priority: 'Medium', fill: '#8dd1e1', description: 'Review constitutional amendments and governance structure' },
  { topic: 'Indian History', score: 6.5, priority: 'Medium', fill: '#8884d8', description: 'Modern history needs attention, especially freedom movement' },
  { topic: 'Geography', score: 7.2, priority: 'Low', fill: '#83a6ed', description: 'Strong understanding but review climate patterns' },
  { topic: 'Science & Technology', score: 8.0, priority: 'Low', fill: '#a4de6c', description: 'Good performance, focus on recent developments' }
];

const mockStudyTimeData: StudyTimeRecommendation[] = [
  { topic: 'Economy', hours: 20, importance: 'High', fill: '#82ca9d', reason: 'Based on your performance and recent trend analysis' },
  { topic: 'Indian Polity', hours: 15, importance: 'Medium', fill: '#8dd1e1', reason: 'Based on frequency in recent exams and your performance' },
  { topic: 'Indian History', hours: 12, importance: 'Medium', fill: '#8884d8', reason: 'Focus on specific weak areas in Modern Indian History' },
  { topic: 'Geography', hours: 8, importance: 'Low', fill: '#83a6ed', reason: 'Maintenance study to keep strong performance' },
  { topic: 'Science & Technology', hours: 5, importance: 'Low', fill: '#a4de6c', reason: 'Brief review of recent developments only' }
];

const mockSyllabusData: SyllabusTopic[] = [
  { 
    topic: 'Indian History', 
    subtopics: ['Ancient India', 'Medieval India', 'Modern India', 'Post-Independence India'], 
    importance: 'High', 
    prevalence: 20, 
    fill: '#8884d8' 
  },
  { 
    topic: 'Geography', 
    subtopics: ['Physical Geography', 'Indian Geography', 'World Geography', 'Economic Geography'], 
    importance: 'Medium', 
    prevalence: 15, 
    fill: '#83a6ed' 
  },
  { 
    topic: 'Indian Polity', 
    subtopics: ['Constitution', 'Governance', 'Political Dynamics', 'International Relations'], 
    importance: 'High', 
    prevalence: 18, 
    fill: '#8dd1e1' 
  },
  { 
    topic: 'Economy', 
    subtopics: ['Economic Theory', 'Indian Economy', 'Economic Policies', 'International Economics'], 
    importance: 'Medium', 
    prevalence: 12, 
    fill: '#82ca9d' 
  },
  { 
    topic: 'Science & Technology', 
    subtopics: ['Basic Sciences', 'Applied Technologies', 'Recent Developments', 'Environmental Science'], 
    importance: 'Low', 
    prevalence: 10, 
    fill: '#a4de6c' 
  }
];

const mockHistoricalData: HistoricalPattern[] = [
  { year: 2023, pattern: 'Increased focus on current affairs and economy', significance: 'High' },
  { year: 2022, pattern: 'More questions on international relations and geopolitics', significance: 'Medium' },
  { year: 2021, pattern: 'Science and technology questions increased by 15%', significance: 'High' },
  { year: 2020, pattern: 'Traditional history and geography remained stable', significance: 'Low' },
  { year: 2019, pattern: 'Environmental issues gained prominence', significance: 'Medium' }
];

const mockQuestions: PracticeQuestion[] = [
  {
    id: 1,
    question: 'Which of the following is a correct statement about the Indian Constitution?',
    options: [
      'It is completely rigid and cannot be amended',
      'It is partly rigid and partly flexible',
      'It is completely flexible',
      'It can only be amended by a new Constituent Assembly'
    ],
    correctAnswer: 'It is partly rigid and partly flexible',
    explanation: 'The Indian Constitution is partly rigid as some provisions require special majority, while others can be amended by simple majority.',
    difficulty: 'Medium',
    topic: 'Indian Polity'
  },
  {
    id: 2,
    question: 'Which of the following rivers flows through a rift valley?',
    options: [
      'Godavari',
      'Krishna',
      'Narmada',
      'Kaveri'
    ],
    correctAnswer: 'Narmada',
    explanation: 'Narmada flows through a rift valley formed due to faulting.',
    difficulty: 'Easy',
    topic: 'Geography'
  },
  {
    id: 3,
    question: 'The "Green Revolution" in India was initially associated with which crop?',
    options: [
      'Rice',
      'Wheat',
      'Pulses',
      'Oilseeds'
    ],
    correctAnswer: 'Wheat',
    explanation: 'Green Revolution initially focused on wheat production, particularly in Punjab and Haryana.',
    difficulty: 'Medium',
    topic: 'Economy'
  }
];

// Custom tooltip for charts
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const theme = useTheme();
  
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 2, boxShadow: 3, border: `1px solid ${theme.palette.divider}`, maxWidth: 300 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>{label}</Typography>
        {payload.map((entry: any, index: number) => (
          <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: entry.color,
                display: 'inline-block',
                mr: 1
              }}
            />
            <Typography variant="caption">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

const PatternAnalysis = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [selectedExam, setSelectedExam] = useState<ExamPatternData | undefined>(undefined);
  const [availableExams, setAvailableExams] = useState(getExamsList());
  const [error, setError] = useState<string | null>(null);
  const [openPracticeDialog, setOpenPracticeDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<PracticeQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState(false);
  
  // Add state for the new tabs
  const [selectedYear, setSelectedYear] = useState<number>(2023);

  // Effect to set the exam data based on URL parameter or default to first exam
  useEffect(() => {
    try {
    if (examId) {
      const exam = getExamDataById(examId);
      if (exam) {
          console.log("Found exam data:", exam.id, exam.name);
        setSelectedExam(exam);
          setError(null); // Clear any previous error
      } else {
          console.error("Invalid exam ID:", examId);
        // If invalid exam ID, redirect to first available exam
          if (allExamsData.length > 0) {
        navigate(`/pattern-analysis/${allExamsData[0].id}`, { replace: true });
          } else {
            setError("No exam data available");
          }
      }
    } else if (allExamsData.length > 0) {
      // If no exam ID in URL, use first exam and update URL
        console.log("No exam ID, using default:", allExamsData[0].id);
      setSelectedExam(allExamsData[0]);
      navigate(`/pattern-analysis/${allExamsData[0].id}`, { replace: true });
        setError(null); // Clear any previous error
      } else {
        setError("No exam data available");
      }
    } catch (err) {
      console.error("Error loading exam data:", err);
      setError("Failed to load exam data. Please try again.");
    }
  }, [examId, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleExamChange = (event: SelectChangeEvent) => {
    const newExamId = event.target.value;
    navigate(`/pattern-analysis/${newExamId}`);
  };

  // Dialog functions for practice questions
  const handleOpenPracticeDialog = (question: PracticeQuestion) => {
    setSelectedQuestion(question);
    setSelectedAnswer('');
    setHasAnswered(false);
    setOpenPracticeDialog(true);
  };

  const handleClosePracticeDialog = () => {
    setOpenPracticeDialog(false);
    setSelectedQuestion(null);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    setHasAnswered(true);
  };
  
  // Handler for year selection in historical data
  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(Number(event.target.value));
  };

  // Derived data for performance chart - mock data
  const performanceData = useMemo(() => mockPerformanceData, []);
  
  // Prepare data for radar chart
  const radarData = useMemo(() => {
    return mockWeaknessData.map(item => ({
      topic: item.topic,
      score: item.score,
      fullMark: 10
    }));
  }, []);
  
  // Combined performance data for the stacked bar chart
  const combinedPerformanceData = useMemo(() => {
    return performanceData.map(item => ({
      name: item.topic,
      Correct: item.correctPercentage,
      Wrong: item.wrongPercentage
    }));
  }, [performanceData]);
  
  // Prepare data for the syllabus importance radial bar chart
  const syllabusData = useMemo(() => mockSyllabusData, []);
  
  // Filter historical data based on selected year
  const filteredHistoricalData = useMemo(() => {
    return mockHistoricalData.filter(item => item.year <= selectedYear);
  }, [selectedYear]);

  // Render the trend chart more safely
  const renderTrendChart = () => {
    // Safety check for yearlyTrends
    if (!selectedExam?.yearlyTrends || selectedExam.yearlyTrends.length === 0) {
      console.error("Missing or empty yearlyTrends data");
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="error">
            No trend data available for this exam
          </Typography>
        </Box>
      );
    }

    console.log("Rendering trend chart with data:", selectedExam.yearlyTrends);
    
    // Extract subject keys from the first trend data point (excluding 'year')
    const subjects = Object.keys(selectedExam.yearlyTrends[0]).filter(key => key !== 'year');
    console.log("Subjects found in trend data:", subjects);
    
      return (
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={selectedExam.yearlyTrends}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            {/* Create gradients for each subject */}
            {subjects.map((subject, index) => (
              <linearGradient key={subject} id={`color${subject.charAt(0).toUpperCase() + subject.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.2}/>
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend />
          {/* Dynamic creation of Area components for each subject */}
          {subjects.map((subject, index) => (
            <Area
              key={subject}
              type="monotone"
              dataKey={subject}
              name={subject.charAt(0).toUpperCase() + subject.slice(1)}
              stroke={COLORS[index % COLORS.length]}
              fillOpacity={1}
              fill={`url(#color${subject.charAt(0).toUpperCase() + subject.slice(1)})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  // Render the topic distribution chart more safely
  const renderTopicDistribution = () => {
    // Safety check for topicDistribution
    if (!selectedExam?.topicDistribution || selectedExam.topicDistribution.length === 0) {
      console.error("Missing or empty topicDistribution data");
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="error">
            No topic distribution data available for this exam
              </Typography>
            </Box>
      );
    }

    console.log("Rendering topic distribution with data:", selectedExam.topicDistribution);
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={selectedExam.topicDistribution}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150}
            fill="#8884d8"
            dataKey="percentage"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {selectedExam.topicDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <RechartsTooltip formatter={(value: number) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  // Render performance analysis chart
  const renderPerformanceChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={combinedPerformanceData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Correct" stackId="a" fill="#4caf50" name="Correct Answers" />
          <Bar dataKey="Wrong" stackId="a" fill="#f44336" name="Wrong Answers" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  // Render topic strength/weakness radar chart
  const renderRadarChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="topic" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar
            name="Performance Score"
            dataKey="score"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.5}
          />
          <RechartsTooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    );
  };
  
  // Render syllabus breakdown chart
  const renderSyllabusChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          layout="vertical"
          data={syllabusData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 100,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" domain={[0, 25]} />
          <YAxis dataKey="topic" type="category" scale="band" />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="prevalence" 
            barSize={30} 
            name="Prevalence in Exam (%)"
          >
            {syllabusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
          <Scatter 
            dataKey="subtopics.length" 
            fill="#ff7300" 
            name="Number of Subtopics" 
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };
  
  // Historical trend timeline chart
  const renderHistoricalTrends = () => {
    return (
      <Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="600">Historical Exam Pattern Changes</Typography>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear.toString()}
              label="Year"
              onChange={handleYearChange}
            >
              {mockHistoricalData.map((item) => (
                <MenuItem key={item.year} value={item.year}>{item.year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ 
          position: 'relative', 
          py: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 24, // Aligned with the circles
            width: 4,
            height: '100%',
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: 4
          }
        }}>
          {filteredHistoricalData.map((item, index) => (
            <Box 
              key={item.year}
              sx={{ 
                display: 'flex',
                mb: 3,
                opacity: selectedYear === item.year ? 1 : 0.7,
                transform: selectedYear === item.year ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                backgroundColor: selectedYear === item.year 
                  ? alpha(theme.palette.primary.main, 0.9) 
                  : alpha(theme.palette.primary.main, 0.5),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: selectedYear === item.year ? 2 : 0,
                zIndex: 2
              }}>
                {item.year}
              </Box>
              <Paper sx={{ 
                ml: 2, 
                p: 2, 
                flex: 1, 
                borderRadius: 2,
                borderLeft: '4px solid',
                borderLeftColor: item.significance === 'High' 
                  ? theme.palette.error.main 
                  : item.significance === 'Medium' 
                    ? theme.palette.warning.main 
                    : theme.palette.success.main
              }}>
                <Typography variant="body1" gutterBottom fontWeight={500}>
                  {item.pattern}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    size="small" 
                    label={`Significance: ${item.significance}`}
                    color={item.significance === 'High' 
                      ? 'error' 
                      : item.significance === 'Medium' 
                        ? 'warning' 
                        : 'success'
                    }
                  />
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  // If there is an error, show error message
  if (error) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>{error}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/exam-selection')}
        >
          Go to Exam Selection
        </Button>
      </Container>
    );
  }

  // If no exam data is loaded yet, show loading
  if (!selectedExam) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Loading exam data...</Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* Practice Question Dialog */}
      <Dialog
        open={openPracticeDialog}
        onClose={handleClosePracticeDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedQuestion && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Practice Question</Typography>
                <Chip 
                  label={selectedQuestion.topic}
                  color="primary"
                  size="small"
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>{selectedQuestion.question}</Typography>
              
              <Box sx={{ mt: 3 }}>
                {selectedQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? "contained" : "outlined"}
                    color={
                      hasAnswered
                        ? option === selectedQuestion.correctAnswer
                          ? "success"
                          : selectedAnswer === option
                            ? "error"
                            : "primary"
                        : "primary"
                    }
                    fullWidth
                    sx={{ mb: 1, justifyContent: 'flex-start', py: 1.5 }}
                    onClick={() => !hasAnswered && handleAnswerSelect(option)}
                    startIcon={
                      hasAnswered && option === selectedQuestion.correctAnswer
                        ? <CheckCircleIcon />
                        : null
                    }
                    disabled={hasAnswered}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
              
              {hasAnswered && (
                <Paper
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    borderLeft: `4px solid ${theme.palette.info.main}`,
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Explanation:
                  </Typography>
                  <Typography variant="body2">
                    {selectedQuestion.explanation}
                  </Typography>
                </Paper>
              )}
            </DialogContent>
            <DialogActions>
              {!hasAnswered ? (
                <Button 
                  onClick={handleSubmitAnswer} 
                  variant="contained" 
                  color="primary"
                  disabled={!selectedAnswer}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleClosePracticeDialog} 
                  variant="contained" 
                  color="primary"
                >
                  Close
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          backgroundImage: `url(${selectedExam.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(139, 92, 246, 0.6) 100%)`,
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 6 }}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MotionTypography
              variant="h2"
              component="h1"
              fontWeight="700"
              sx={{ 
                color: 'white',
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              {selectedExam.name} Pattern Analysis
            </MotionTypography>
            <MotionTypography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)', 
                maxWidth: '800px',
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {selectedExam.description}
            </MotionTypography>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="lg"  sx={{ mb: 8 }}>
        {/* Exam Selection */}
        <MotionPaper
          elevation={0}
          sx={{ 
            mb: 4, 
            p: 2,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              borderColor: alpha(theme.palette.primary.main, 0.2)
            }
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon color="primary" sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ mr: 2 }}>Select Exam:</Typography>
            <FormControl sx={{ minWidth: 250 }}>
              <Select
                value={selectedExam.id}
                onChange={handleExamChange}
                size="small"
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                  },
                  '& .MuiSelect-select': {
                    paddingY: 1.5
                  }
                }}
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'rgba(26, 26, 26, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                      maxHeight: 300,
                      '& .MuiMenuItem-root': {
                        padding: 1.5,
                        transition: 'all 0.2s ease',
                        borderRadius: 1,
                        margin: '2px 8px',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          transform: 'translateX(4px)'
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
                {availableExams.map((exam) => (
                  <MenuItem key={exam.id} value={exam.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: exam.color || COLORS[0],
                          mr: 2,
                          transition: 'transform 0.2s ease',
                          boxShadow: exam.id === selectedExam.id ? 
                            `0 0 0 3px ${typeof exam.color === 'string' ? alpha(exam.color, 0.3) : 'rgba(136, 132, 216, 0.3)'}` : 
                            'none',
                          transform: exam.id === selectedExam.id ? 'scale(1.2)' : 'scale(1)'
                        }}
                      />
                      {exam.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </MotionPaper>

        {/* Tabs for Different Analysis Views */}
        <MotionPaper
          elevation={0}
          sx={{ 
            mb: 4, 
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              '& .MuiTab-root': {
                minHeight: 64,
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                position: 'relative',
                overflow: 'hidden',
                color: alpha(theme.palette.text.primary, 0.7),
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  opacity: 0,
                  transform: 'scaleX(0)',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease',
                  borderRadius: '3px 3px 0 0'
                },
                '&::after': {
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
                  color: theme.palette.primary.main,
                  '&::after': {
                    transform: 'translateX(100%)',
                    transition: 'transform 0.6s ease',
                  }
                },
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  '&::before': {
                    opacity: 1,
                    transform: 'scaleX(1)'
                  }
                }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
              }
            }}
          >
            <Tab 
              icon={<BarChartIcon />} 
              iconPosition="start" 
              label="Topic Distribution" 
              id="pattern-tab-0" 
              aria-controls="pattern-tabpanel-0" 
            />
            <Tab 
              icon={<AssessmentIcon />} 
              iconPosition="start" 
              label="Performance Analysis" 
              id="pattern-tab-1" 
              aria-controls="pattern-tabpanel-1" 
            />
            <Tab 
              icon={<TimelineIcon />} 
              iconPosition="start" 
              label="Yearly Trends" 
              id="pattern-tab-2" 
              aria-controls="pattern-tabpanel-2" 
            />
            <Tab 
              icon={<LocalLibraryIcon />} 
              iconPosition="start" 
              label="Syllabus Breakdown" 
              id="pattern-tab-3" 
              aria-controls="pattern-tabpanel-3" 
            />
            <Tab 
              icon={<HistoryIcon />} 
              iconPosition="start" 
              label="Historical Patterns" 
              id="pattern-tab-4" 
              aria-controls="pattern-tabpanel-4" 
            />
            <Tab 
              icon={<BookIcon />} 
              iconPosition="start" 
              label="Practice Questions" 
              id="pattern-tab-5" 
              aria-controls="pattern-tabpanel-5" 
            />
            <Tab 
              icon={<TipsAndUpdatesIcon />} 
              iconPosition="start" 
              label="Study Planner" 
              id="pattern-tab-6" 
              aria-controls="pattern-tabpanel-6" 
            />
          </Tabs>
        </MotionPaper>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <MotionCard
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BarChartIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Subject Distribution</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    The chart shows the distribution of questions across different subjects in {selectedExam.name} Examination based on analysis of the last 5 years.
                  </Typography>
                  <List>
                    {selectedExam.topicDistribution.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Box 
                            sx={{ 
                              width: 16, 
                              height: 16, 
                              backgroundColor: item.fill,
                              borderRadius: '50%'
                            }} 
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`${item.topic}: ${item.percentage}%`} 
                        />
                      </ListItem>
                    ))}
                    </List>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <MotionPaper
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                sx={{ p: 3, height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Topic-wise Question Distribution
                </Typography>
                {renderTopicDistribution()}
              </MotionPaper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionCard
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AssessmentIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Your Performance Analysis</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph>
                    This chart shows your performance across different subjects based on your practice test results and mock exams.
                  </Typography>
                  {renderPerformanceChart()}
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionCard
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InsightsIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Strengths & Weaknesses</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph>
                    This radar chart visualizes your performance across key topic areas, helping identify your strengths and areas for improvement.
                  </Typography>
                  {renderRadarChart()}
                </CardContent>
              </MotionCard>
            </Grid>
            
            <Grid item xs={12}>
              <MotionCard
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                sx={{ borderRadius: 3, boxShadow: 2, mt: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TipsAndUpdatesIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Topic-wise Analysis & Recommendations</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph>
                    Based on your performance and the {selectedExam.name} exam pattern, here are your strengths and areas that need improvement.
                  </Typography>
                  <TopicAnalysisWidget topics={mockWeaknessData} />
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <MotionPaper
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              mb: 4,
              boxShadow: 2
            }}
          >
            <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
              Yearly Trends in Topic Distribution
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              This chart shows how the importance of different topics has changed over the years in the {selectedExam.name} exam. Understanding these trends can help you anticipate future questions and focus your preparation on emerging areas.
            </Typography>
            {renderTrendChart()}
          </MotionPaper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <MotionCard
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalLibraryIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Complete Syllabus Breakdown</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph>
                    This visualization shows the prevalence of each major topic in the {selectedExam.name} exam syllabus, along with the number of subtopics in each area.
                  </Typography>
                  {renderSyllabusChart()}
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionCard
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TocIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Key Subtopics</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    Each major subject area in the {selectedExam.name} exam includes these important subtopics that you should focus on.
                  </Typography>
                  
                  {syllabusData.map((topic, topicIndex) => (
                    <Box key={topicIndex} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            backgroundColor: topic.fill,
                            borderRadius: '50%',
                            mr: 1.5
                          }} 
                        />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {topic.topic}
                        </Typography>
                        <Chip 
                          size="small" 
                          label={topic.importance} 
                          color={topic.importance === 'High' ? 'error' : topic.importance === 'Medium' ? 'warning' : 'success'}
                          sx={{ ml: 1, height: 20, '& .MuiChip-label': { px: 1, py: 0 } }}
                        />
                      </Box>
                      <Box sx={{ pl: 4 }}>
                        {topic.subtopics.map((subtopic, subtopicIndex) => (
                          <Typography key={subtopicIndex} variant="body2" sx={{ mb: 0.5 }}>
                            • {subtopic}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <MotionCard
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            sx={{ borderRadius: 3, boxShadow: 2 }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HistoryIcon color="primary" sx={{ mr: 1.5 }} />
                <Typography variant="h5" fontWeight="600">Historical Pattern Analysis</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="body1" paragraph>
                Understanding how the {selectedExam.name} exam has evolved over time can help you anticipate future changes and trends. Select a year to see patterns up to that point.
              </Typography>
              {renderHistoricalTrends()}
            </CardContent>
          </MotionCard>
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
              Practice Questions Based on Exam Pattern
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              These sample questions reflect the typical style and difficulty level of questions in the {selectedExam.name} exam, focusing on commonly tested topics.
            </Typography>
            
            <Grid container spacing={3}>
              {mockQuestions.map((question) => (
                <Grid item xs={12} md={4} key={question.id}>
                  <MotionCard
                    variants={itemVariants}
                    sx={{ 
                      height: '100%',
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        zIndex: 1,
                        opacity: 0.8,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                      },
                      '&:hover': {
                        boxShadow: 'none',
                        transform: 'translateY(-5px)',
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        '&::before': {
                          opacity: 1,
                          boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 209, 255, 0.05), 0 0 15px rgba(0, 209, 255, 0.1)'
                        }
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Chip 
                          label={question.topic} 
                          size="small" 
                          color="primary"
                          sx={{ mb: 2 }}
                        />
                        <Chip 
                          label={question.difficulty} 
                          size="small" 
                          color={
                            question.difficulty === 'Hard' 
                              ? 'error' 
                              : question.difficulty === 'Medium' 
                                ? 'warning' 
                                : 'success'
                          }
                        />
                      </Box>
                      
                      <Typography variant="body1" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
                        {question.question}
                          </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                        {question.options.length} options available
                          </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={() => handleOpenPracticeDialog(question)}
                      >
                        Practice Now
                      </Button>
                    </CardActions>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </MotionBox>
        </TabPanel>

        <TabPanel value={tabValue} index={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MotionCard
            initial="hidden"
            animate="visible"
                variants={itemVariants}
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TipsAndUpdatesIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Personalized Study Plan</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph>
                    Based on the exam pattern analysis and your performance, we've created a personalized study plan for you. Adjust the hours to create your own custom plan.
            </Typography>
                  
                  <StudyPlannerWidget topics={selectedExam.recommendedTopics} />
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={6}>
                  <MotionCard
                initial="hidden"
                animate="visible"
                    variants={itemVariants}
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
                  >
                    <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimerIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Recommended Study Time Distribution</Typography>
                      </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph>
                    This chart shows our recommended study time allocation based on topic importance, your current performance, and exam patterns.
                      </Typography>
                  
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockStudyTimeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="hours"
                        nameKey="topic"
                        label={({ name, value }) => `${name}: ${value} hours`}
                      >
                        {mockStudyTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value: any, name: any, props: any) => {
                          const data = props.payload;
                          return [
                            `${value} hours (${(value / mockStudyTimeData.reduce((a, b) => a + b.hours, 0) * 100).toFixed(1)}%)`,
                            name
                          ];
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Study Tips:
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Focus more time on high-importance topics" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Allocate study time based on your performance gaps" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Regularly take practice tests to measure progress" />
                      </ListItem>
                    </List>
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>
            </Grid>
        </TabPanel>

        {/* Continue Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/revision-map')}
            sx={{ 
              px: 5, 
              py: 1.5, 
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#FFFFFF',
              boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)',
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
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                borderRadius: 3,
                boxShadow: '0 0 30px 5px rgba(139, 92, 246, 0.5)',
                transition: 'opacity 0.4s ease',
              },
              '&:hover': {
                '&::before': {
                  transform: 'translateX(100%)',
                },
                '&::after': {
                  opacity: 1,
                }
              }
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 25px rgba(139, 92, 246, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="revision-map-button"
          >
            Continue to Revision Map
          </MotionButton>
        </Box>
      </Container>
    </Box>
  );
};

export default PatternAnalysis;