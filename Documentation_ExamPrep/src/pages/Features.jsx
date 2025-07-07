import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DescriptionIcon from '@mui/icons-material/Description';
import DevicesIcon from '@mui/icons-material/Devices';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const FeatureSection = ({ title, icon, children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ 
          mr: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: 48, 
          height: 48, 
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          color: theme.palette.mode === 'dark' ? '#000' : 'white'
        }}>
          {icon}
        </Box>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

const Features = () => {
  const theme = useTheme();
  
  return (
    <PageContainer
      title="Features"
      subtitle="Explore the powerful features of EduMind AI that help students prepare for government exams"
      breadcrumbs={[{ label: 'Features', link: '/features' }]}
    >
      {/* AI Assistant Section */}
      <FeatureSection 
        title="AI Assistant" 
        icon={<SmartToyIcon />}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              The AI Assistant is a powerful conversation interface that provides intelligent assistance for government exam preparation. It leverages advanced language models to help users with study strategies, answer questions, explain concepts, and provide guidance.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Smart Chat Interface" 
                  secondary="Interactive conversation with AI models that understand context and provide relevant responses" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Multiple AI Models" 
                  secondary="Support for different Ollama models (llama3.1, llama3.2) with varying capabilities" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Real-time Responses" 
                  secondary="Get instant help with study strategies and pattern analysis" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Markdown Support" 
                  secondary="Properly formatted responses with bold, lists, and code blocks for better readability" 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="280"
                image="/images/ai-assistant.svg"
                alt="AI Assistant Interface"
                sx={{ objectFit: 'contain', backgroundColor: theme.palette.background.paper, p: 2 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI Assistant Interface
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The AI Assistant provides a chat interface where users can ask questions about government exams, get study advice, and receive detailed explanations on complex topics. The assistant understands the context of conversations and provides relevant, accurate responses.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </FeatureSection>

      <Divider sx={{ my: 6 }} />

      {/* Essay Evaluation Section */}
      <FeatureSection 
        title="Essay Evaluation" 
        icon={<DescriptionIcon />}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="280"
                image="/images/essay-evaluation.svg"
                alt="Essay Evaluation"
                sx={{ objectFit: 'contain', backgroundColor: theme.palette.background.paper, p: 2 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Essay Evaluation System
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The Essay Evaluation system analyzes essays for content quality, structure, language usage, and relevance to the topic. It provides detailed feedback with suggestions for improvement, helping students enhance their writing skills for competitive exams.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              The Essay Evaluation feature helps students improve their answer writing skills by providing AI-powered analysis and feedback on their essays. This feature is critical for government exams that include descriptive papers.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Text-based Evaluation" 
                  secondary="Direct essay input for instant feedback" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Image Upload" 
                  secondary="Support for handwritten essay evaluation through image processing" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Detailed Feedback" 
                  secondary="Comprehensive analysis covering content, structure, language, and formatting" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Progress Tracking" 
                  secondary="Real-time progress indicators during evaluation" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </FeatureSection>

      <Divider sx={{ my: 6 }} />

      {/* User Experience Features */}
      <FeatureSection 
        title="User Experience" 
        icon={<DevicesIcon />}
      >
        <Typography variant="body1" paragraph>
          EduMind AI is designed with a focus on user experience, ensuring that students can easily navigate and use the platform across different devices and contexts.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 10px 20px rgba(0,0,0,0.3)' 
                    : '0 10px 20px rgba(0,0,0,0.1)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DevicesIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Responsive Design
                </Typography>
              </Box>
              <Typography variant="body2">
                The platform is fully responsive, providing a seamless experience across desktop, tablet, and mobile devices. The layout adjusts dynamically to different screen sizes, ensuring all features are accessible regardless of the device.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 10px 20px rgba(0,0,0,0.3)' 
                    : '0 10px 20px rgba(0,0,0,0.1)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FormatListBulletedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Intuitive Interface
                </Typography>
              </Box>
              <Typography variant="body2">
                The user interface is designed to be intuitive and easy to navigate. Clear navigation menus, well-organized content, and consistent design patterns make it easy for users to find what they need and use the platform effectively.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 10px 20px rgba(0,0,0,0.3)' 
                    : '0 10px 20px rgba(0,0,0,0.1)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SpeedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Performance Optimization
                </Typography>
              </Box>
              <Typography variant="body2">
                The application is optimized for performance, with fast loading times and responsive interactions. Efficient code and optimized assets ensure a smooth experience even on lower-end devices or slower network connections.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </FeatureSection>

      <Divider sx={{ my: 6 }} />

      {/* Technical Features */}
      <FeatureSection 
        title="Technical Features" 
        icon={<SecurityIcon />}
      >
        <Typography variant="body1" paragraph>
          Behind the scenes, EduMind AI incorporates several technical features that enhance security, reliability, and performance.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/tech-stack.svg"
                  alt="Technical Stack"
                  sx={{ objectFit: 'contain', backgroundColor: theme.palette.background.paper, p: 2 }}
                />
              </Card>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Error Handling" 
                    secondary="Comprehensive error handling with user-friendly error messages" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Caching System" 
                    secondary="Response caching to improve performance and reduce API calls" 
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Real-time Validation" 
                  secondary="Input validation to ensure data quality and prevent errors" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Efficient API Integration" 
                  secondary="Optimized API calls with rate limiting and request batching" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Browser Compatibility" 
                  secondary="Support for modern browsers with graceful degradation" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Progressive Enhancement" 
                  secondary="Core functionality works even with limited browser capabilities" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </FeatureSection>

      <Divider sx={{ my: 6 }} />

      {/* Accessibility Features */}
      <FeatureSection 
        title="Accessibility" 
        icon={<AccessibilityNewIcon />}
      >
        <Typography variant="body1" paragraph>
          EduMind AI is designed with accessibility in mind, ensuring that all students can use the platform regardless of disabilities or limitations.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Key Accessibility Features
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Keyboard Navigation" 
                    secondary="Full keyboard accessibility for navigation and interaction" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Screen Reader Support" 
                    secondary="ARIA attributes and semantic HTML for screen reader compatibility" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Color Contrast" 
                    secondary="High contrast colors for readability and WCAG compliance" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Text Scaling" 
                    secondary="Support for browser text scaling and zoom functionality" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 2,
                bgcolor: 'primary.dark',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Inclusive Design Philosophy
              </Typography>
              <Typography variant="body1" paragraph>
                EduMind AI follows an inclusive design approach that considers the needs of all users regardless of their abilities or circumstances. This includes:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Designing for diverse users" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Providing multiple ways to interact" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Reducing cognitive load" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Regular accessibility testing" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </FeatureSection>
    </PageContainer>
  );
};

export default Features; 