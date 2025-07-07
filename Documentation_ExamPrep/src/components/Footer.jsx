import React from 'react';
import { Box, Container, Typography, Link, Stack, IconButton, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' ? '#f8fafc' : '#0a1929',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} EduMind AI Documentation. All rights reserved.
          </Typography>

          <Box>
            <Stack direction="row" spacing={1}>
              <IconButton 
                aria-label="GitHub" 
                size="small"
                component="a"
                href="https://github.com/monkeydcoder/ExamPrepAI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton 
                aria-label="LinkedIn" 
                size="small"
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                size="small"
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 1, md: 3 },
            mt: 2,
          }}
        >
          <Link href="/" color="text.secondary" underline="hover">
            Home
          </Link>
          <Link href="/architecture" color="text.secondary" underline="hover">
            Architecture
          </Link>
          <Link href="/features" color="text.secondary" underline="hover">
            Features
          </Link>
          <Link href="/tech-stack" color="text.secondary" underline="hover">
            Tech Stack
          </Link>
          <Link href="/installation" color="text.secondary" underline="hover">
            Installation
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 