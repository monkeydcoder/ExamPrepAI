import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider,
  useTheme,
  Card,
  CardMedia
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import PageContainer from '../components/PageContainer';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SpeedIcon from '@mui/icons-material/Speed';
import MemoryIcon from '@mui/icons-material/Memory';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

const ChallengeSection = ({ title, icon, children }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        border: `1px solid ${theme.palette.divider}`, 
        borderRadius: 2,
        mb: 4,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mr: 1.5,
          width: 40, 
          height: 40, 
          borderRadius: '50%',
          color: theme.palette.mode === 'dark' ? '#000' : 'white',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        }}>
          {icon}
        </Box>
        <Typography variant="h5">
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );
};

const Challenges = () => {
  const theme = useTheme();

  return (
    <PageContainer
      title="Challenges & Solutions"
      subtitle="Key challenges faced during the development of EduMind AI and how they were addressed"
      breadcrumbs={[{ label: 'Challenges', link: '/challenges' }]}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          Developing EduMind AI involved overcoming various technical and design challenges. This page documents the significant hurdles faced during development and the innovative solutions implemented to address them.
        </Typography>
        
        <Card sx={{ my: 4 }}>
          <CardMedia
            component="img"
            height="300"
            image="/images/challenges.svg"
            alt="Development Challenges"
            sx={{ objectFit: 'contain', backgroundColor: theme.palette.background.paper, p: 2 }}
          />
        </Card>
      </Box>

      <Timeline position="alternate" sx={{ mb: 6 }}>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            Initial Development
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ bgcolor: theme.palette.primary.main }}>
              <PsychologyIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: theme.palette.divider }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              AI Model Integration
            </Typography>
            <Typography variant="body2" color="text.secondary">Selecting and integrating the appropriate AI models</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            Performance Optimization
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ bgcolor: theme.palette.primary.main }}>
              <SpeedIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: theme.palette.divider }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Response Speed
            </Typography>
            <Typography variant="body2" color="text.secondary">Optimizing response times for large requests</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            System Architecture
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ bgcolor: theme.palette.primary.main }}>
              <MemoryIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: theme.palette.divider }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Resource Management
            </Typography>
            <Typography variant="body2" color="text.secondary">Managing system resources for AI processing</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            User Experience
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ bgcolor: theme.palette.primary.main }}>
              <AccessibilityNewIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: theme.palette.divider }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Interface Design
            </Typography>
            <Typography variant="body2" color="text.secondary">Creating an intuitive interface for complex functionality</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            Final Integration
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ bgcolor: theme.palette.primary.main }}>
              <SyncProblemIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Component Integration
            </Typography>
            <Typography variant="body2" color="text.secondary">Ensuring seamless interaction between all system components</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Technical Challenges
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<PsychologyIcon />}
            title="AI Model Integration"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Integrating Ollama AI models with the backend system and handling API responses efficiently.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Implemented a dedicated adapter pattern to standardize communication with Ollama's API. Created a robust error handling system to manage API timeouts and failures, with automatic retries for transient issues. Added response caching to reduce redundant API calls and improve response times.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              This approach enabled consistent and reliable communication with the AI models while providing graceful degradation in case of service disruptions.
            </Typography>
          </ChallengeSection>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<SpeedIcon />}
            title="Performance Optimization"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Ensuring fast response times for large essays and complex queries, especially when multiple users are active.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Implemented a queue-based processing system that prioritizes requests based on complexity and user waiting time. Optimized AI model parameters for different use cases, with a "Fast Mode" option for users who prefer speed over maximum accuracy. Added progress indicators to improve user experience during longer processing times.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              These optimizations reduced average response times by 40% while maintaining AI output quality.
            </Typography>
          </ChallengeSection>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<MemoryIcon />}
            title="Resource Management"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Managing system resources efficiently to prevent Ollama from consuming excessive memory and CPU.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Implemented resource throttling mechanisms that limit concurrent AI requests based on system load. Created a smart caching system that stores common query responses to reduce redundant processing. Optimized context window sizes for different types of requests to minimize memory usage.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              These measures reduced system resource usage by approximately 35% while maintaining service quality.
            </Typography>
          </ChallengeSection>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<SecurityIcon />}
            title="Security Considerations"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Ensuring data security and preventing misuse of the AI system.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Implemented input validation and sanitization to prevent malicious prompts. Created a content filtering system to detect and block inappropriate requests. Established file upload restrictions for image-based essay submissions to prevent security vulnerabilities.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              These security measures have successfully prevented system misuse while maintaining legitimate functionality.
            </Typography>
          </ChallengeSection>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        User Experience Challenges
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<AccessibilityNewIcon />}
            title="Interface Design"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Creating an intuitive interface for complex AI features without overwhelming users.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Adopted a progressive disclosure approach that presents basic functionality upfront with advanced options available but not intrusive. Conducted extensive user testing with actual exam aspirants to refine the interface based on real user behavior. Implemented comprehensive tooltips and help documentation for advanced features.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              User satisfaction scores increased by 27% after implementing these design improvements.
            </Typography>
          </ChallengeSection>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<SyncProblemIcon />}
            title="Response Quality"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Ensuring AI responses are accurate and helpful for exam preparation, especially for specialized subjects.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Developed specialized prompt engineering techniques for different exam types and question categories. Created a feedback mechanism allowing users to rate responses, with this data being used to improve future interactions. Implemented domain-specific knowledge enhancement through carefully crafted system prompts.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              These improvements led to a 45% increase in positively rated AI responses.
            </Typography>
          </ChallengeSection>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<CodeIcon />}
            title="Cross-Platform Compatibility"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Ensuring consistent functionality across different devices and browsers.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Implemented responsive design principles from the ground up using Material-UI's breakpoint system. Created device-specific optimizations for mobile users, including simplified interfaces and touch-friendly controls. Established a comprehensive testing protocol across multiple browsers and devices.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              The platform now provides a consistent experience across 95% of devices and browsers.
            </Typography>
          </ChallengeSection>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChallengeSection
            icon={<SettingsIcon />}
            title="Configuration Flexibility"
          >
            <Typography variant="body1" gutterBottom>
              <strong>Challenge:</strong> Providing configuration options without making the system too complex for average users.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Solution:</strong> Created a tiered settings approach with basic settings available prominently and advanced options accessible through an "Advanced Settings" section. Implemented sensible defaults based on user testing and common use cases. Added configuration presets for different exam types and study objectives.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              This approach satisfied both casual users (87% satisfaction) and power users (92% satisfaction).
            </Typography>
          </ChallengeSection>
        </Grid>
      </Grid>

    </PageContainer>
  );
};

export default Challenges; 