import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import PeopleIcon from '@mui/icons-material/People';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const Architecture = () => {
  const theme = useTheme();

  return (
    <PageContainer
      title="System Architecture"
      subtitle="A detailed overview of the ExamPrepHub platform architecture, components, and interactions"
      breadcrumbs={[{ label: 'Architecture', link: '/architecture' }]}
    >
      {/* Architecture Overview Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Architecture Overview
        </Typography>
        <Typography variant="body1" paragraph>
          ExamPrepHub is built using a modern, modular architecture that separates concerns between the client-side UI, server-side logic, and AI processing. The application is designed to be scalable, maintainable, and provide an excellent user experience while handling complex AI tasks.
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            border: `1px solid ${theme.palette.divider}`, 
            borderRadius: 2, 
            mt: 3,
            backgroundColor: theme.palette.background.paper
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Three-Tier Architecture
              </Typography>
              <Box sx={{ 
                width: '100%', 
                height: 'auto', 
                p: 3, 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: `1px solid ${theme.palette.divider}`
              }}>
                {/* Frontend Layer */}
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#000' : 'white' }}>
                    Frontend Layer (Presentation)
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#000' : 'white' }}>
                    React.js, TypeScript, Material-UI, Vite
                  </Typography>
                </Box>
                
                {/* Arrow */}
                <Box sx={{ textAlign: 'center' }}>↓↑</Box>
                
                {/* Backend Layer */}
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  backgroundColor: theme.palette.secondary.main,
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Backend Layer (Application)
                  </Typography>
                  <Typography variant="body2">
                    Node.js, Express, RESTful API
                  </Typography>
                </Box>
                
                {/* Arrow */}
                <Box sx={{ textAlign: 'center' }}>↓↑</Box>
                
                {/* AI Layer */}
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  backgroundColor: '#333D7A',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    AI Layer (Processing)
                  </Typography>
                  <Typography variant="body2">
                    Ollama AI, LLM Models (llama3.1, llama3.2)
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Frontend Architecture */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Frontend Architecture
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Component Structure
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  The frontend is built using a component-based architecture with React. Key aspects include:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Modular Components" 
                      secondary="Reusable UI components organized by feature and functionality"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Context-based State Management" 
                      secondary="Using React Context API for global state management"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Responsive Design" 
                      secondary="Material-UI with custom theming for consistent, responsive UI"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PeopleIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    User Interface
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  The UI is designed with a focus on usability and accessibility:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Intuitive Navigation" 
                      secondary="Clear navigation structure with sidebar and breadcrumbs"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Theme Support" 
                      secondary="Dark and light mode with customizable color schemes"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Progressive Loading" 
                      secondary="Loading indicators and optimistic updates for better UX"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Backend Architecture */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Backend Architecture
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StorageIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    API Structure
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  The backend provides RESTful APIs for frontend communication:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="RESTful Endpoints" 
                      secondary="Structured API endpoints for different features"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Middleware Architecture" 
                      secondary="Request processing, validation, and error handling"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Asynchronous Processing" 
                      secondary="Non-blocking I/O for handling concurrent requests"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CloudIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Server Configuration
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Backend server is configured for optimal performance:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Environment-based Config" 
                      secondary="Different configurations for development, testing, and production"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Error Handling" 
                      secondary="Comprehensive error handling and logging"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Security Measures" 
                      secondary="Input validation, sanitization, and secure headers"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* AI Integration */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          AI Integration
        </Typography>
        <Typography variant="body1" paragraph>
          The AI layer is integrated with the backend to provide advanced natural language processing capabilities:
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    AI Communication
                  </Typography>
                  <Typography variant="body2">
                    Backend server communicates with Ollama API to send requests and receive responses from the AI models.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Prompt Engineering
                  </Typography>
                  <Typography variant="body2">
                    Carefully crafted prompts to guide the AI models in generating appropriate responses for different types of queries.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Model Selection
                  </Typography>
                  <Typography variant="body2">
                    Support for multiple AI models (llama3.1, llama3.2) to provide flexibility in terms of response quality and processing speed.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Image Processing
                  </Typography>
                  <Typography variant="body2">
                    OCR and image analysis for handwritten essay evaluation, enabling digital assessment of handwritten content.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Data Flow */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Data Flow
        </Typography>
        <Typography variant="body1" paragraph>
          The ExamPrepHub application follows a clean data flow architecture:
        </Typography>
        <Box sx={{ 
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* User Interaction */}
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#1A365D' : '#e3f2fd',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#2A4365' : '#bbdefb'}`,
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                1. User Interaction
              </Typography>
              <Typography variant="body2">
                User interacts with the UI (submits question, uploads essay, etc.)
              </Typography>
            </Box>
            
            {/* Frontend Processing */}
            <Box sx={{ textAlign: 'center' }}>↓</Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#1C4532' : '#e8f5e9',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#276749' : '#c8e6c9'}`,
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                2. Frontend Processing
              </Typography>
              <Typography variant="body2">
                React components validate input, update UI state, and prepare API requests
              </Typography>
            </Box>
            
            {/* API Request */}
            <Box sx={{ textAlign: 'center' }}>↓</Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#322659' : '#ede7f6',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#553C9A' : '#d1c4e9'}`,
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                3. API Request
              </Typography>
              <Typography variant="body2">
                HTTP request sent to Node.js backend with query/essay data
              </Typography>
            </Box>
            
            {/* Backend Processing */}
            <Box sx={{ textAlign: 'center' }}>↓</Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#5F370E' : '#fff3e0',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#975A16' : '#ffe0b2'}`,
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                4. Backend Processing
              </Typography>
              <Typography variant="body2">
                Express server processes request, validates, and prepares data for AI processing
              </Typography>
            </Box>
            
            {/* AI Processing */}
            <Box sx={{ textAlign: 'center' }}>↓</Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#63171B' : '#ffebee',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#9B2C2C' : '#ffcdd2'}`,
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                5. AI Processing
              </Typography>
              <Typography variant="body2">
                Ollama AI models process the request (analyze essay, generate response, etc.)
              </Typography>
            </Box>
            
            {/* Response Path */}
            <Box sx={{ textAlign: 'center' }}>↓</Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#086F83' : '#e1f5fe',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#0987A0' : '#b3e5fc'}`,
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                6. Response Handling
              </Typography>
              <Typography variant="body2">
                AI response is processed by backend, formatted, and sent back to frontend
              </Typography>
            </Box>
            
            {/* UI Update */}
            <Box sx={{ textAlign: 'center' }}>↓</Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              backgroundColor: theme.palette.mode === 'dark' ? '#1D4044' : '#e0f2f1',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#285E61' : '#b2dfdb'}`,
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                7. UI Update
              </Typography>
              <Typography variant="body2">
                Frontend receives response, updates UI, and presents results to user
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Architecture; 