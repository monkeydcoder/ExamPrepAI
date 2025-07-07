import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  styled,
  useTheme
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PageContainer from '../components/PageContainer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage';
import TerminalIcon from '@mui/icons-material/Terminal';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WifiIcon from '@mui/icons-material/Wifi';

const CodeBlock = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1E1E2F' : '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  overflow: 'auto',
  fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
  fontSize: '0.9rem',
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.mode === 'dark' ? '#444444' : '#e0e0e0'}`,
  color: theme.palette.mode === 'dark' ? '#E4E4E4' : 'inherit',
  '& .command': {
    color: theme.palette.mode === 'dark' ? '#00d1ff' : '#0078d4'
  },
  '& .comment': {
    color: theme.palette.mode === 'dark' ? '#6A9955' : '#008000'
  }
}));

const Installation = () => {
  const theme = useTheme();
  
  return (
    <PageContainer
      title="Installation Guide"
      subtitle="Step-by-step instructions to set up and run the EduMind AI platform on your system"
      breadcrumbs={[{ label: 'Installation', link: '/installation' }]}
    >
      <Alert severity="info" sx={{ mb: 4 }}>
        This guide provides instructions for setting up EduMind AI on your local machine for development or personal use.
      </Alert>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Prerequisites
        </Typography>
        <Typography variant="body1" paragraph>
          Before you begin, ensure you have the following installed:
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
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Node.js</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Node.js v16 or higher is required to run both the frontend and backend of EduMind AI.
              </Typography>
              <CodeBlock>
                <span className="comment"># Check your Node.js version</span><br />
                <span className="command">node --version</span>
              </CodeBlock>
              <Typography variant="body2">
                <a href="https://nodejs.org/en/download/" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                  Download Node.js
                </a>
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
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StorageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Ollama</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Ollama is required to run the AI models locally on your machine.
              </Typography>
              <CodeBlock>
                <span className="comment"># Check if Ollama is installed</span><br />
                <span className="command">ollama --version</span>
              </CodeBlock>
              <Typography variant="body2">
                <a href="https://ollama.ai/download" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                  Download Ollama
                </a>
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
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TerminalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Git</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Git is needed to clone the repository and manage version control.
              </Typography>
              <CodeBlock>
                <span className="comment"># Check your Git version</span><br />
                <span className="command">git --version</span>
              </CodeBlock>
              <Typography variant="body2">
                <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                  Download Git
                </a>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Installation Steps
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            1. Clone the Repository
          </Typography>
          <Typography variant="body1" paragraph>
            First, clone the EduMind AI repository from GitHub:
          </Typography>
          <CodeBlock>
            <span className="command">git clone https://github.com/monkeydcoder/ExamPrepAI.git</span><br />
            <span className="command">cd ExamPrepAI</span>
          </CodeBlock>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            2. Set up the Backend
          </Typography>
          <Typography variant="body1" paragraph>
            Navigate to the backend directory and install dependencies:
          </Typography>
          <CodeBlock>
            <span className="command">cd backend</span><br />
            <span className="command">npm install</span>
          </CodeBlock>
          <Typography variant="body1" paragraph>
            Start the backend server:
          </Typography>
          <CodeBlock>
            <span className="command">PORT=3001 node server.js</span>
          </CodeBlock>
          <Typography variant="body2" paragraph>
            The backend will run on http://localhost:3001
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            3. Set up the Frontend
          </Typography>
          <Typography variant="body1" paragraph>
            Open a new terminal, navigate to the frontend directory, and install dependencies:
          </Typography>
          <CodeBlock>
            <span className="command">cd frontend</span><br />
            <span className="command">npm install</span>
          </CodeBlock>
          <Typography variant="body1" paragraph>
            Start the frontend development server:
          </Typography>
          <CodeBlock>
            <span className="command">npm run dev</span>
          </CodeBlock>
          <Typography variant="body2" paragraph>
            The frontend will run on http://localhost:5173 (or the next available port)
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            4. Set up Ollama Models
          </Typography>
          <Typography variant="body1" paragraph>
            Make sure Ollama is running, then pull the required models:
          </Typography>
          <CodeBlock>
            <span className="command">ollama pull llama3.1</span><br />
            <span className="command">ollama pull llama3.2</span>
          </CodeBlock>
          <Typography variant="body1" paragraph>
            Verify that the models are installed:
          </Typography>
          <CodeBlock>
            <span className="command">ollama list</span>
          </CodeBlock>
          <Typography variant="body2" paragraph>
            You should see llama3.1 and llama3.2 in the list.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Verification
        </Typography>
        <Typography variant="body1" paragraph>
          To verify that everything is working correctly:
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Check Backend Connection" 
              secondary="Navigate to http://localhost:3001/api/status in your browser. You should see a JSON response indicating the server is running."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Access the Frontend UI" 
              secondary="Open http://localhost:5173 in your browser. You should see the EduMind AI interface."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Test AI Integration" 
              secondary="Try using the AI Assistant to ask a question. If you receive a response, the integration with Ollama is working correctly."
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Troubleshooting
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ErrorIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">Backend Connection Issues</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                If you cannot connect to the backend:
              </Typography>
              <List>
                <ListItem sx={{ p: 0, pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Check if the backend server is running" 
                  />
                </ListItem>
                <ListItem sx={{ p: 0, pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Verify the port is not already in use" 
                  />
                </ListItem>
                <ListItem sx={{ p: 0, pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Check for any error messages in the terminal" 
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
                border: `1px solid ${theme.palette.divider}`, 
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WifiIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6">Ollama Connection Issues</Typography>
              </Box>
              <Typography variant="body2" paragraph>
                If the AI features are not working:
              </Typography>
              <List>
                <ListItem sx={{ p: 0, pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Ensure Ollama is running in the background" 
                  />
                </ListItem>
                <ListItem sx={{ p: 0, pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Verify the models are downloaded properly" 
                  />
                </ListItem>
                <ListItem sx={{ p: 0, pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Check the backend logs for API connection errors" 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Alert severity="warning">
          <Typography variant="body2">
            <strong>Note:</strong> EduMind AI requires significant system resources for running the AI models. Ensure your system meets the minimum requirements for running Ollama with the specified models.
          </Typography>
        </Alert>
      </Box>
    </PageContainer>
  );
};

export default Installation; 