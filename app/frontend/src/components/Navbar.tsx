import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Container, 
  Button, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  useTheme,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MapIcon from '@mui/icons-material/Map';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { motion } from 'framer-motion';

// Navigation items with icons
const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'Select Exam', path: '/exam-selection', icon: <DescriptionIcon /> },
  { name: 'Pattern Analysis', path: '/pattern-analysis', icon: <AnalyticsIcon /> },
  { name: 'Revision Map', path: '/revision-map', icon: <MapIcon /> },
  { name: 'Question Assistant', path: '/essay-evaluation', icon: <QuestionAnswerIcon /> },
  { name: 'Quiz Generator', path: '/quiz-generator', icon: <QuizIcon /> },
  { name: 'AI Assistant', path: '/chat', icon: <SmartToyIcon /> },
];

// Styled logo text with enhanced gradient
const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? '#34d399' : '#0ea5e9'} 0%, ${theme.palette.mode === 'dark' ? '#2dd4bf' : '#14b8a6'} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

// Create motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();
  const theme = useTheme();

  // Check if current path matches a navigation item
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Drawer content with improved styling
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 280, pt: 2, color: '#ffffff' }}>
      <Box sx={{ mb: 4, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        <LogoText variant="h6">
          EduMind AI
        </LogoText>
      </Box>
      <List sx={{ px: 1 }}>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              component={Link} 
              to={page.path}
              selected={isActive(page.path)}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s ease',
                background: isActive(page.path) 
                  ? alpha(theme.palette.primary.main, 0.2)
                  : 'transparent',
                color: isActive(page.path) ? '#ffffff' : '#cccccc',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  transform: 'translateX(4px)',
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: isActive(page.path) ? theme.palette.primary.main : '#cccccc',
                  transition: 'color 0.2s ease',
                  minWidth: 40
                }}
              >
                {page.icon}
              </ListItemIcon>
              <ListItemText 
                primary={page.name} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(page.path) ? 600 : 400,
                  transition: 'all 0.2s ease',
                  color: 'inherit',
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton 
            component={Link} 
            to="/login"
            selected={isActive('/login')}
            sx={{
              borderRadius: 2,
              transition: 'all 0.2s ease',
              background: isActive('/login') 
                ? alpha(theme.palette.secondary.main, 0.2)
                : 'transparent',
              color: isActive('/login') ? '#ffffff' : '#cccccc',
              '&:hover': {
                background: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                transform: 'translateX(4px)',
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: isActive('/login') ? theme.palette.secondary.main : '#cccccc',
                transition: 'color 0.2s ease',
                minWidth: 40
              }}
            >
              <LoginIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Login" 
              primaryTypographyProps={{ 
                fontWeight: isActive('/login') ? 600 : 500,
                transition: 'all 0.2s ease',
                color: 'inherit',
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: theme.palette.mode === 'light' 
            ? 'rgba(26, 26, 26, 0.95)' 
            : 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 2,
                  color: '#ffffff',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo - Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DescriptionIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1, color: theme.palette.primary.main }} />
                <LogoText
                  variant="h6"
                  noWrap
                  component={Link}
                  to="/"
                  sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  EduMind AI
                </LogoText>
              </Box>
            </Box>

            {/* Logo - Desktop */}
            <MotionBox 
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 4 }}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <LogoText
                variant="h5"
                noWrap
                component={Link}
                to="/"
              >
                <DescriptionIcon sx={{ mr: 1 }} />
                EduMind AI
              </LogoText>
            </MotionBox>

            {/* Desktop Navigation Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {pages.map((page, index) => (
                <MotionButton
                  key={page.name}
                  component={Link}
                  to={page.path}
                  sx={{
                    my: 2, 
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2,
                    color: isActive(page.path) ? '#ffffff' : '#cccccc',
                    backgroundColor: isActive(page.path) 
                      ? alpha(theme.palette.primary.main, 0.2)
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    },
                    px: 2,
                    py: 0.8,
                  }}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.5, 
                        delay: 0.1 * index
                      } 
                    }
                  }}
                >
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    {React.cloneElement(page.icon as React.ReactElement, {
                      fontSize: 'small',
                      sx: { 
                        opacity: isActive(page.path) ? 1 : 0.7,
                        color: isActive(page.path) ? theme.palette.primary.main : 'inherit'
                      }
                    })}
                  </Box>
                  {page.name}
                </MotionButton>
              ))}
            </Box>

            {/* Login Button */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MotionButton
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<LoginIcon />}
                sx={{
                  color: theme.palette.secondary.main,
                  borderColor: theme.palette.secondary.main,
                  borderRadius: 8,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    borderColor: theme.palette.secondary.main,
                  }
                }}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                Login
              </MotionButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 