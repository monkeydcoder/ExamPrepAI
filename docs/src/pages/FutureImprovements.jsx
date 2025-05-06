import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Divider,
  LinearProgress,
  Chip,
  useTheme
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import UpdateIcon from '@mui/icons-material/Update';
import LanguageIcon from '@mui/icons-material/Language';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StorageIcon from '@mui/icons-material/Storage';
import GroupIcon from '@mui/icons-material/Group';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const RoadmapItem = ({ title, description, status, priority, timeline, icon }) => {
  const theme = useTheme();
  let statusColor = 'default';
  let priorityColor = 'default';
  let progress = 0;
  
  // Set status color and progress
  switch (status) {
    case 'Planned':
      statusColor = 'info';
      progress = 5;
      break;
    case 'In Research':
      statusColor = 'info';
      progress = 15;
      break;
    case 'In Development':
      statusColor = 'warning';
      progress = 45;
      break;
    case 'Testing':
      statusColor = 'secondary';
      progress = 75;
      break;
    case 'Almost Ready':
      statusColor = 'success';
      progress = 90;
      break;
    default:
      statusColor = 'default';
  }
  
  // Set priority color
  switch (priority) {
    case 'High':
      priorityColor = 'error';
      break;
    case 'Medium':
      priorityColor = 'warning';
      break;
    case 'Low':
      priorityColor = 'success';
      break;
    default:
      priorityColor = 'default';
  }
  
  return (
    <Card sx={{ 
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      },
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mr: 1.5,
            width: 40, 
            height: 40, 
            borderRadius: '50%',
            color: 'white',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          }}>
            {icon}
          </Box>
          <Typography variant="h6">
            {title}
          </Typography>
        </Box>
        
        <Typography variant="body2" paragraph>
          {description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 6, borderRadius: 3 }} 
          />
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label={`Status: ${status}`} 
            size="small" 
            color={statusColor} 
            variant="outlined" 
          />
          <Chip 
            label={`Priority: ${priority}`} 
            size="small" 
            color={priorityColor} 
            variant="outlined" 
          />
          <Chip 
            label={`Timeline: ${timeline}`} 
            size="small" 
            variant="outlined" 
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const FutureImprovements = () => {
  return (
    <PageContainer
      title="Future Improvements"
      subtitle="Planned enhancements and roadmap for the ExamPrepHub platform"
      breadcrumbs={[{ label: 'Future Improvements', link: '/future-improvements' }]}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          ExamPrepHub is continuously evolving to better serve students preparing for government exams. This page outlines our future development plans and upcoming features.
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom>
        Development Roadmap
      </Typography>
      <Typography variant="body1" paragraph>
        Here are the key improvements planned for upcoming releases:
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<UpdateIcon />}
            title="AI Model Upgrades"
            description="Integration of newer Ollama models with enhanced reasoning capabilities and improved accuracy for complex government exam topics."
            status="In Research"
            priority="High"
            timeline="Q1 2024"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<AssessmentIcon />}
            title="Progress Analytics"
            description="Advanced analytics dashboard for tracking study progress, identifying knowledge gaps, and providing personalized study recommendations."
            status="In Development"
            priority="Medium"
            timeline="Q2 2024"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<LanguageIcon />}
            title="Multilingual Support"
            description="Support for multiple Indian languages to make the platform more accessible to students from diverse linguistic backgrounds."
            status="Planned"
            priority="Medium"
            timeline="Q3 2024"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Technical Improvements
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<StorageIcon />}
            title="Enhanced Caching System"
            description="Implementation of an advanced caching system to improve response times and reduce server load for commonly requested information."
            status="In Development"
            priority="High"
            timeline="Q1 2024"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<MobileFriendlyIcon />}
            title="Progressive Web App"
            description="Converting the platform to a Progressive Web App (PWA) for improved mobile experience and offline capabilities."
            status="Planned"
            priority="Medium"
            timeline="Q2 2024"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<PersonalVideoIcon />}
            title="API for Integrations"
            description="Public API for integrating ExamPrepHub with other educational platforms and tools used by exam aspirants."
            status="In Research"
            priority="Low"
            timeline="Q3 2024"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Feature Enhancements
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<GroupIcon />}
            title="Study Groups"
            description="Collaborative study features allowing students to form study groups, share resources, and engage in peer learning."
            status="Planned"
            priority="Medium"
            timeline="Q2 2024"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<TipsAndUpdatesIcon />}
            title="Personalized Study Plans"
            description="AI-generated personalized study plans based on user's exam goals, strengths, weaknesses, and available study time."
            status="In Research"
            priority="High"
            timeline="Q1 2024"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RoadmapItem
            icon={<UpdateIcon />}
            title="Mock Interview Module"
            description="Interactive mock interview module with AI-powered feedback for personality test preparation in various government exams."
            status="Planned"
            priority="Medium"
            timeline="Q3 2024"
          />
        </Grid>
      </Grid>

      <Box 
        sx={{ 
          mt: 6, 
          p: 3, 
          borderRadius: 2, 
          backgroundColor: 'primary.light', 
          color: 'white'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Community Feedback
        </Typography>
        <Typography variant="body1" paragraph>
          We value your input! Many of our planned improvements come from user suggestions and feedback. If you have ideas for features or improvements that would enhance your exam preparation experience, please let us know.
        </Typography>
        <Typography variant="body1">
          You can submit your suggestions through the feedback form in the ExamPrepHub application or by contacting our support team directly.
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default FutureImprovements; 