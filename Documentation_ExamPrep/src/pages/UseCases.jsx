import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DescriptionIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/Quiz';
import TimelineIcon from '@mui/icons-material/Timeline';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const UseCaseCard = ({ title, icon, description, bulletPoints }) => {
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
        <Typography variant="body2" paragraph>
          {description}
        </Typography>
        <List dense sx={{ mt: 'auto' }}>
          {bulletPoints.map((point, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={point}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const UseCases = () => {
  return (
    <PageContainer
      title="Use Cases"
      subtitle="Explore the various ways EduMind AI can assist in government exam preparation"
      breadcrumbs={[{ label: 'Use Cases', link: '/use-cases' }]}
    >
      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          EduMind AI is designed to support students in various aspects of their preparation for government exams. Here are the key use cases where the platform provides significant value.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <UseCaseCard
            icon={<QuestionAnswerIcon />}
            title="Exam Query Assistance"
            description="Get detailed answers to exam-related questions and clarify concepts with the AI assistant."
            bulletPoints={[
              "Ask questions about exam patterns and syllabus",
              "Get explanations for complex concepts",
              "Receive guidance on study strategies",
              "Clarify doubts on specific topics"
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <UseCaseCard
            icon={<DescriptionIcon />}
            title="Essay Evaluation"
            description="Submit essays for AI-powered evaluation to improve your writing skills for descriptive papers."
            bulletPoints={[
              "Get detailed feedback on essay content and structure",
              "Receive suggestions for language improvement",
              "Submit text essays or upload handwritten ones",
              "Track improvement over time"
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <UseCaseCard
            icon={<QuizIcon />}
            title="Practice Question Generation"
            description="Generate custom practice questions and tests to reinforce learning and test knowledge."
            bulletPoints={[
              "Create topic-specific practice questions",
              "Generate mock tests with varying difficulty",
              "Get instant explanations for answers",
              "Identify knowledge gaps"
            ]}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Subject-Specific Use Cases
      </Typography>
      <Typography variant="body1" paragraph>
        EduMind AI provides specialized assistance for different subjects commonly tested in government exams:
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <UseCaseCard
            icon={<SchoolIcon />}
            title="History & Politics Preparation"
            description="Get assistance with historical facts, political theories, and current affairs analysis."
            bulletPoints={[
              "Learn about historical events and their significance",
              "Understand constitutional frameworks and amendments",
              "Analyze political theories and governance structures",
              "Connect historical events with current political scenarios"
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <UseCaseCard
            icon={<TimelineIcon />}
            title="Economics & Development"
            description="Master economic concepts, financial policies, and development indicators."
            bulletPoints={[
              "Understand economic theories and their applications",
              "Analyze government policies and their impacts",
              "Learn about development indicators and measures",
              "Study economic reforms and their consequences"
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <UseCaseCard
            icon={<MenuBookIcon />}
            title="General Knowledge & Current Affairs"
            description="Stay updated on general knowledge and current affairs for competitive exams."
            bulletPoints={[
              "Get summaries of important current events",
              "Learn about significant appointments and awards",
              "Study important government schemes and initiatives",
              "Review science and technology developments"
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <UseCaseCard
            icon={<TranslateIcon />}
            title="Language & Comprehension"
            description="Improve language skills, comprehension, and grammar for language papers."
            bulletPoints={[
              "Enhance vocabulary with context-based explanations",
              "Improve grammar and sentence construction",
              "Practice reading comprehension techniques",
              "Learn effective communication strategies"
            ]}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" gutterBottom>
        Exam-Specific Use Cases
      </Typography>
      <Typography variant="body1" paragraph>
        EduMind AI provides tailored support for different government examinations:
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                UPSC Civil Services
              </Typography>
              <Typography variant="body2" paragraph>
                Comprehensive support for all stages of UPSC preparation.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Prelims MCQ practice and subject knowledge"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Mains answer writing improvement"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Optional subject preparation assistance"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Interview preparation guidance"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SSC & Banking Exams
              </Typography>
              <Typography variant="body2" paragraph>
                Focused assistance for SSC, IBPS, and other banking exams.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Quantitative aptitude practice"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Reasoning ability enhancement"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="English language proficiency"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="General awareness for banking and economy"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Railway & Defense Exams
              </Typography>
              <Typography variant="body2" paragraph>
                Specialized help for Railway and Defense service exams.
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Technical knowledge assistance"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="General science concepts"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Mathematics and reasoning practice"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Preparation strategies for physical tests"
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UseCases; 