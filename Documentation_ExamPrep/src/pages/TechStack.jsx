import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  useTheme,
  Chip
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import TerminalIcon from '@mui/icons-material/Terminal';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TechCard = ({ title, icon, description, technologies }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Key Technologies:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
            {technologies.map((tech, index) => (
              <Chip 
                key={index}
                label={tech}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mb: 0.7 }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const TechStack = () => {
  return (
    <PageContainer
      title="Technology Stack"
      subtitle="A comprehensive look at the technologies powering the EduMind AI platform"
      breadcrumbs={[{ label: 'Tech Stack', link: '/tech-stack' }]}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          EduMind AI is built using a carefully selected set of modern technologies that enable powerful AI capabilities, responsive user interfaces, and reliable performance. This page provides an overview of the technology stack used in the platform.
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 2, 
            backgroundColor: 'rgba(0, 209, 255, 0.08)',
            border: '1px solid rgba(0, 209, 255, 0.2)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Technology Stack Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Frontend: React.js, TypeScript, Material-UI" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Backend: Node.js, Express.js" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="AI: Ollama, llama3.1/llama3.2 models" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Build Tools: Vite, npm" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="APIs: RESTful endpoints" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Development: ESLint, Prettier" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Typography variant="h4" gutterBottom>
        Detailed Tech Stack
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <TechCard
            icon={<CodeIcon />}
            title="Frontend Technologies"
            description="Modern web technologies for building responsive and interactive user interfaces."
            technologies={[
              'React.js', 
              'TypeScript', 
              'Material-UI', 
              'React Router',
              'Axios',
              'React Markdown',
              'Context API',
              'Vite'
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TechCard
            icon={<StorageIcon />}
            title="Backend Technologies"
            description="Server-side technologies for handling requests, business logic, and AI integration."
            technologies={[
              'Node.js', 
              'Express.js', 
              'RESTful API', 
              'Middleware',
              'Error Handling',
              'Async/Await',
              'File Uploads',
              'Rate Limiting'
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TechCard
            icon={<CloudIcon />}
            title="AI Technologies"
            description="The AI capabilities that power the intelligent features of the platform."
            technologies={[
              'Ollama AI', 
              'llama3.1 Model', 
              'llama3.2 Model', 
              'Natural Language Processing',
              'Image Recognition',
              'Stream Processing',
              'Context Management',
              'Prompt Engineering'
            ]}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Frontend Architecture
      </Typography>
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          The frontend of EduMind AI is built using React.js with TypeScript, providing a type-safe, component-based architecture. The UI is responsive, accessible, and provides a seamless user experience across devices.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DesignServicesIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">UI Framework</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Material-UI provides a comprehensive set of pre-built components that follow Google's Material Design guidelines. These components are customized with a unique theme to match the EduMind AI branding.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Customized Material-UI Theme" 
                    secondary="Unique color palette, typography, and component styling" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Responsive Design" 
                    secondary="Adaptive layouts for mobile, tablet, and desktop devices" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Theming Support" 
                    secondary="Light and dark mode with consistent styling" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IntegrationInstructionsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">State Management</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                The application uses React's Context API for global state management, providing a clean and efficient way to share state across components without prop drilling.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Context API" 
                    secondary="Custom contexts for different aspects of the application state" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="State Hooks" 
                    secondary="React hooks for local component state management" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Memoization" 
                    secondary="Performance optimization with useMemo and useCallback" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Backend Architecture
      </Typography>
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          The backend of EduMind AI is built with Node.js and Express.js, providing a fast and scalable server-side architecture. It handles requests from the frontend, processes data, and communicates with the AI layer.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TerminalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">API Architecture</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                The backend exposes RESTful APIs for the frontend to consume, with well-defined endpoints for different features.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="RESTful API Design" 
                    secondary="Clean, predictable API endpoints following REST principles" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Middleware Architecture" 
                    secondary="Modular middleware for request processing, validation, and error handling" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Error Handling" 
                    secondary="Comprehensive error handling with custom error classes" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BuildIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Performance Optimization</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Various techniques are used to optimize backend performance and ensure responsive API endpoints.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Caching" 
                    secondary="Response caching to improve performance and reduce AI API calls" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Asynchronous Processing" 
                    secondary="Non-blocking I/O operations with async/await" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Request Queueing" 
                    secondary="Managing concurrent requests to the AI service" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        AI Integration
      </Typography>
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          The AI capabilities of EduMind AI are powered by Ollama AI, which provides access to advanced language models like llama3.1 and llama3.2. These models enable the platform to understand and generate human-like text for various features.
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            border: '1px solid rgba(0,0,0,0.1)', 
            borderRadius: 2, 
            background: 'linear-gradient(135deg, rgba(0,209,255,0.05) 0%, rgba(155,89,182,0.05) 100%)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            AI Models and Capabilities
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Ollama AI Framework" 
                    secondary="Open-source framework for running LLMs locally" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="llama3.1 Model" 
                    secondary="Balanced performance and accuracy for most tasks" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="llama3.2 Model" 
                    secondary="Higher accuracy for complex reasoning tasks" 
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Natural Language Processing" 
                    secondary="Understanding and generating human-like text" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Context Management" 
                    secondary="Maintaining conversation context for coherent responses" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Fast Mode" 
                    secondary="Optimized parameters for quicker responses" 
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Development Tools & Practices
      </Typography>
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          EduMind AI is developed using modern development tools and practices to ensure code quality, maintainability, and efficient collaboration.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Code Quality Tools</Typography>
              </Box>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="TypeScript" 
                    secondary="Static type checking for improved code quality" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="ESLint" 
                    secondary="Code linting for consistent style and catching errors" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Prettier" 
                    secondary="Automatic code formatting for consistent style" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, height: '100%', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TerminalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Build & Deployment</Typography>
              </Box>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Vite" 
                    secondary="Fast build tool with HMR for development" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="npm" 
                    secondary="Package management and scripts" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Git" 
                    secondary="Version control and collaboration" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TechStack; 