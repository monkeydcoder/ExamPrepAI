import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Chip, 
  Divider,
  useTheme,
  Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import CodeIcon from '@mui/icons-material/Code';
import CasesIcon from '@mui/icons-material/Cases';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const FeatureCard = ({ icon, title, description, link, linkText }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            mr: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: 48, 
            height: 48, 
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            color: 'white'
          }}>
            {icon}
          </Box>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
          {description}
        </Typography>
        {link && (
          <Button 
            component={RouterLink} 
            to={link} 
            variant="outlined" 
            color="primary"
            sx={{ alignSelf: 'flex-start', mt: 'auto' }}
          >
            {linkText || 'Learn More'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const theme = useTheme();
  
  return (
    <PageContainer
      title="ExamPrepHub Documentation"
      subtitle="Comprehensive documentation for the ExamPrepHub platform - An AI-powered assistant for government exam preparation"
    >
      <Box 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2, 
          background: 'linear-gradient(135deg, rgba(0,209,255,0.08) 0%, rgba(155,89,182,0.08) 100%)',
          border: '1px solid rgba(0,209,255,0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          What is ExamPrepHub?
        </Typography>
        <Typography variant="body1" paragraph>
          ExamPrepHub is a specialized AI-powered platform designed to help students prepare for various government examinations in India, including UPSC, SSC, CGL, and more. The application provides intelligent assistance for exam preparation and essay evaluation using Ollama's LLM models.
        </Typography>
        <Typography variant="body1">
          This documentation provides comprehensive information about the ExamPrepHub platform, including its architecture, features, installation process, and more.
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 3 }}>
        Key Features
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <FeatureCard 
            icon={<ArchitectureIcon />}
            title="AI Assistant"
            description="Interact with intelligent AI models to get help with study strategies, pattern analysis, and more for government exam preparation."
            link="/features"
            linkText="View Features"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FeatureCard 
            icon={<FeaturedPlayListIcon />}
            title="Essay Evaluation"
            description="Get detailed feedback and analysis on your essays with text-based evaluation or by uploading handwritten essays as images."
            link="/features"
            linkText="View Features"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FeatureCard 
            icon={<CodeIcon />}
            title="Modern Tech Stack"
            description="Built with React.js, TypeScript, Material-UI, Node.js, Express, and Ollama AI for a powerful and responsive user experience."
            link="/tech-stack"
            linkText="Explore Tech Stack"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FeatureCard 
            icon={<CasesIcon />}
            title="Multiple Use Cases"
            description="From answering specific exam-related questions to evaluating essays and generating practice quizzes, ExamPrepHub covers diverse student needs."
            link="/use-cases"
            linkText="See Use Cases"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Tech Stack Highlights
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
          <Chip label="React.js" color="primary" />
          <Chip label="TypeScript" color="primary" />
          <Chip label="Material-UI" color="primary" />
          <Chip label="Node.js" color="primary" />
          <Chip label="Express" color="primary" />
          <Chip label="Ollama AI" color="primary" />
          <Chip label="RESTful API" color="primary" />
          <Chip label="Vite" color="primary" />
        </Stack>
        <Button
          component={RouterLink}
          to="/tech-stack"
          variant="contained"
          color="primary"
          endIcon={<RocketLaunchIcon />}
        >
          Explore Full Tech Stack
        </Button>
      </Box>

      <Box 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          background: 'linear-gradient(135deg, #06043E 0%, #322c8f 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px', mx: 'auto', mb: 3 }}>
          Follow our comprehensive installation guide to set up ExamPrepHub on your system and start leveraging AI for your government exam preparation.
        </Typography>
        <Button
          component={RouterLink}
          to="/installation"
          variant="contained"
          color="primary"
          size="large"
          sx={{ 
            bgcolor: 'white', 
            color: '#322c8f',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
        >
          Installation Guide
        </Button>
      </Box>
    </PageContainer>
  );
};

export default Home; 