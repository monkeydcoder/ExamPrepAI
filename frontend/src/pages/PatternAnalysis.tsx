import React, { useState } from 'react';
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
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SubjectIcon from '@mui/icons-material/Subject';
import TocIcon from '@mui/icons-material/Toc';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsightsIcon from '@mui/icons-material/Insights';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

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

// Sample data for pattern analysis
const topicDistribution = [
  { topic: 'Indian History', percentage: 20, fill: '#8884d8' },
  { topic: 'Geography', percentage: 15, fill: '#83a6ed' },
  { topic: 'Indian Polity', percentage: 18, fill: '#8dd1e1' },
  { topic: 'Economy', percentage: 12, fill: '#82ca9d' },
  { topic: 'Science & Technology', percentage: 10, fill: '#a4de6c' },
  { topic: 'Environment', percentage: 8, fill: '#d0ed57' },
  { topic: 'Current Affairs', percentage: 17, fill: '#ffc658' }
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const yearlyTrends = [
  { year: 2018, history: 24, polity: 20, geography: 16, economy: 14, science: 10, environment: 6, current: 10 },
  { year: 2019, history: 22, polity: 18, geography: 17, economy: 15, science: 11, environment: 7, current: 10 },
  { year: 2020, history: 20, polity: 19, geography: 15, economy: 14, science: 12, environment: 8, current: 12 },
  { year: 2021, history: 18, polity: 20, geography: 16, economy: 13, science: 12, environment: 9, current: 12 },
  { year: 2022, history: 17, polity: 19, geography: 15, economy: 14, science: 13, environment: 8, current: 14 },
  { year: 2023, history: 15, polity: 18, geography: 14, economy: 13, science: 13, environment: 10, current: 17 }
];

const frequentQuestions = [
  { 
    id: 1, 
    question: 'Constitutional Development in India during British Rule',
    frequency: 'Very High',
    lastAsked: '2023',
    priority: 'High',
    category: 'Indian Polity'
  },
  { 
    id: 2, 
    question: 'Environmental Conservation and Sustainable Development',
    frequency: 'High',
    lastAsked: '2023',
    priority: 'High',
    category: 'Environment'
  },
  { 
    id: 3, 
    question: 'Indian Freedom Movement and Its Leaders',
    frequency: 'Very High',
    lastAsked: '2022',
    priority: 'High',
    category: 'Indian History'
  },
  { 
    id: 4, 
    question: 'Economic Reforms in India since 1991',
    frequency: 'Medium',
    lastAsked: '2022',
    priority: 'Medium',
    category: 'Economy'
  },
  { 
    id: 5, 
    question: 'Science & Technology Developments in India',
    frequency: 'Medium',
    lastAsked: '2023',
    priority: 'Medium',
    category: 'Science & Technology'
  }
];

const recommendedTopics = [
  {
    id: 1,
    title: 'Indian Polity: Constitutional Amendments',
    description: 'Focus on major amendments and their impact on governance structure',
    importance: 'Critical',
    recommendedTime: '15 hours'
  },
  {
    id: 2,
    title: 'Modern Indian History: National Movement',
    description: 'Emphasize on different phases of freedom struggle and key personalities',
    importance: 'High',
    recommendedTime: '20 hours'
  },
  {
    id: 3,
    title: 'Economy: Recent Policies and Programs',
    description: 'Study recent government initiatives, budget highlights and economic surveys',
    importance: 'High',
    recommendedTime: '12 hours'
  },
  {
    id: 4,
    title: 'Geography: Climate and Natural Resources',
    description: 'Focus on Indian climate patterns, river systems and resource distribution',
    importance: 'Medium',
    recommendedTime: '10 hours'
  }
];

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

const PatternAnalysis = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, boxShadow: 3, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="body2" fontWeight="bold">{label}</Typography>
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
                {entry.name}: {entry.value}
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          backgroundImage: 'url(/images/upsc/pattern-analysis.jpg)',
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
              Pattern Analysis
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
              Understand question patterns from previous years to focus your preparation effectively. Our AI has analyzed past exam data to identify trends, topics, and question frequencies.
            </MotionTypography>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="lg">
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
            variant="fullWidth"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              '& .MuiTab-root': {
                minHeight: 64,
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                }
              },
              '& .Mui-selected': {
                fontWeight: 600,
                color: theme.palette.primary.main,
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: 3,
              },
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
              icon={<TimelineIcon />} 
              iconPosition="start" 
              label="Yearly Trends" 
              id="pattern-tab-1" 
              aria-controls="pattern-tabpanel-1" 
            />
            <Tab 
              icon={<SubjectIcon />} 
              iconPosition="start" 
              label="Frequent Questions" 
              id="pattern-tab-2" 
              aria-controls="pattern-tabpanel-2" 
            />
            <Tab 
              icon={<AssessmentIcon />} 
              iconPosition="start" 
              label="Recommendations" 
              id="pattern-tab-3" 
              aria-controls="pattern-tabpanel-3" 
            />
          </Tabs>
        </MotionPaper>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <MotionCard
                component={motion.div}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                sx={{ height: '100%', borderRadius: 3, boxShadow: 2 }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BarChartIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="h5" fontWeight="600">Subject Distribution</Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    The chart shows the distribution of questions across different subjects in UPSC Civil Services Examination based on analysis of the last 5 years.
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom fontWeight="600">
                      Key Insights:
                    </Typography>
                    <List dense disablePadding>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <InsightsIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Indian History and Polity dominate with over 35% questions" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <InsightsIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Current Affairs importance has increased by 7% in the last 3 years" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <InsightsIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Science & Technology questions are increasingly integrated with current affairs" />
                      </ListItem>
                    </List>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <MotionPaper
                component={motion.div}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                sx={{ p: 3, borderRadius: 3, height: '100%' }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Topic Distribution in UPSC CSE Prelims
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={topicDistribution}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 25]} />
                    <YAxis dataKey="topic" type="category" width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="percentage" 
                      name="Percentage" 
                      animationDuration={1500}
                    >
                      {topicDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </MotionPaper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <MotionPaper
            component={motion.div}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            sx={{ p: 3, borderRadius: 3 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="h5" fontWeight="600">Yearly Topic Trends (2018-2023)</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body1" paragraph>
              This chart illustrates how the distribution of topics has evolved over the past 6 years in UPSC examinations. Notice the gradual shift from traditional subjects toward current affairs and contemporary topics.
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={yearlyTrends}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="colorHistory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorPolity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#83a6ed" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#83a6ed" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorGeography" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8dd1e1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8dd1e1" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorEconomy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorScience" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a4de6c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a4de6c" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorEnvironment" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d0ed57" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#d0ed57" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="history" name="History" stroke="#8884d8" fillOpacity={1} fill="url(#colorHistory)" />
                <Area type="monotone" dataKey="polity" name="Polity" stroke="#83a6ed" fillOpacity={1} fill="url(#colorPolity)" />
                <Area type="monotone" dataKey="geography" name="Geography" stroke="#8dd1e1" fillOpacity={1} fill="url(#colorGeography)" />
                <Area type="monotone" dataKey="economy" name="Economy" stroke="#82ca9d" fillOpacity={1} fill="url(#colorEconomy)" />
                <Area type="monotone" dataKey="science" name="Science" stroke="#a4de6c" fillOpacity={1} fill="url(#colorScience)" />
                <Area type="monotone" dataKey="environment" name="Environment" stroke="#d0ed57" fillOpacity={1} fill="url(#colorEnvironment)" />
                <Area type="monotone" dataKey="current" name="Current Affairs" stroke="#ffc658" fillOpacity={1} fill="url(#colorCurrent)" />
              </AreaChart>
            </ResponsiveContainer>
          </MotionPaper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <MotionBox
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h5" fontWeight="600" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SubjectIcon color="primary" sx={{ mr: 1.5 }} />
              Frequently Asked Questions & Topics
            </Typography>
            <Grid container spacing={3}>
              {frequentQuestions.map((item) => (
                <Grid item xs={12} md={6} key={item.id}>
                  <MotionCard
                    component={motion.div}
                    variants={itemVariants}
                    sx={{ 
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                          {item.question}
                        </Typography>
                        <Chip 
                          label={item.category} 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                          }} 
                        />
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Frequency
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {item.frequency}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Last Asked
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {item.lastAsked}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Priority
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {item.priority}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </MotionBox>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <MotionBox
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h5" fontWeight="600" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssessmentIcon color="primary" sx={{ mr: 1.5 }} />
              Recommended Focus Areas
            </Typography>
            <Grid container spacing={3}>
              {recommendedTopics.map((topic) => (
                <Grid item xs={12} md={6} key={topic.id}>
                  <MotionCard
                    component={motion.div}
                    variants={itemVariants}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <BookmarkIcon color="primary" sx={{ mr: 1.5 }} />
                        <Typography variant="h6" fontWeight="600">
                          {topic.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
                        {topic.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Chip 
                          label={`Importance: ${topic.importance}`} 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                          }} 
                        />
                        <Chip 
                          label={`Study Time: ${topic.recommendedTime}`} 
                          size="small"
                          sx={{ 
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main,
                            fontWeight: 500,
                          }} 
                        />
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </MotionBox>
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
              boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 25px rgba(139, 92, 246, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Continue to Revision Map
          </MotionButton>
        </Box>
      </Container>
    </Box>
  );
};

export default PatternAnalysis;