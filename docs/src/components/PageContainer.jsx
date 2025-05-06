import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PageContainer = ({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  children 
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={crumb.label} color="text.primary">
                {crumb.label}
              </Typography>
            ) : (
              <Link
                key={crumb.label}
                component={RouterLink}
                to={crumb.link}
                color="inherit"
              >
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      <Box sx={{ mb: 4 }}>
        {title && (
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            className="text-highlight"
            sx={{ 
              position: 'relative',
              display: 'inline-block',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '8px',
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(0, 209, 255, 0.2)',
                zIndex: -1
              }
            }}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography 
            variant="h5" 
            component="p" 
            color="text.secondary"
            sx={{ 
              maxWidth: '800px',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box className="fade-in">
        {children}
      </Box>
    </Container>
  );
};

export default PageContainer; 