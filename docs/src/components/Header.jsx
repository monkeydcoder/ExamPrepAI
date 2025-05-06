import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Header = ({ onSidebarToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <MenuBookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Poppins',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          ExamPrepHub Docs
        </Typography>

        <MenuBookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'Poppins',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          ExamPrepHub
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
            component={RouterLink}
            to="/architecture"
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Architecture
          </Button>
          <Button
            component={RouterLink}
            to="/features"
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Features
          </Button>
          <Button
            component={RouterLink}
            to="/tech-stack"
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Tech Stack
          </Button>
          <Button
            component={RouterLink}
            to="/installation"
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Installation
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="github repository"
            component="a"
            href="https://github.com/monkeydcoder/ExamPrepAI"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: 1 }}
          >
            <GitHubIcon />
          </IconButton>

          {isMobile && (
            <>
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={RouterLink} to="/architecture">
                  Architecture
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/features">
                  Features
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/tech-stack">
                  Tech Stack
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/installation">
                  Installation
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/use-cases">
                  Use Cases
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/challenges">
                  Challenges
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 