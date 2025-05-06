import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  useTheme 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import CodeIcon from '@mui/icons-material/Code';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import CasesIcon from '@mui/icons-material/Cases';
import EngineeringIcon from '@mui/icons-material/Engineering';
import UpdateIcon from '@mui/icons-material/Update';
import HomeIcon from '@mui/icons-material/Home';

const DRAWER_WIDTH = 240;

const navItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Architecture', path: '/architecture', icon: <ArchitectureIcon /> },
  { text: 'Features', path: '/features', icon: <FeaturedPlayListIcon /> },
  { text: 'Tech Stack', path: '/tech-stack', icon: <CodeIcon /> },
  { text: 'Installation', path: '/installation', icon: <InstallDesktopIcon /> },
  { text: 'Use Cases', path: '/use-cases', icon: <CasesIcon /> },
  { text: 'Challenges', path: '/challenges', icon: <EngineeringIcon /> },
  { text: 'Future Improvements', path: '/future-improvements', icon: <UpdateIcon /> },
];

const Sidebar = ({ open, onClose, variant = 'persistent' }) => {
  const theme = useTheme();
  const location = useLocation();

  const drawer = (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <Box sx={{ height: 64 }} /> {/* Space for AppBar */}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={onClose}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 209, 255, 0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 209, 255, 0.20)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 209, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  color: location.pathname === item.path ? 'primary.main' : 'inherit'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar; 