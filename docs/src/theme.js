import { createTheme } from '@mui/material/styles';

// Export these color constants so they can be used in global styles
export const colors = {
  // Dark theme colors
  background: '#121212',
  backgroundPaper: '#1e1e1e',
  backgroundLight: '#2d2d2d',
  backgroundLighter: '#333333',
  primary: '#00d1ff', // Keep the cyan accent color
  primaryDark: '#00a8cc',
  secondary: '#9b59b6', // Keep the purple accent color
  secondaryDark: '#7c4594',
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  borderColor: '#444444',
  cardBackground: '#1e1e1e',
  codeBackground: '#2d2d2d',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: '#33d9ff',
      dark: colors.primaryDark,
      contrastText: '#000000',
    },
    secondary: {
      main: colors.secondary,
      light: '#b07cc6',
      dark: colors.secondaryDark,
      contrastText: '#ffffff',
    },
    background: {
      default: colors.background,
      paper: colors.backgroundPaper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", "Inter", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: colors.textPrimary,
    },
    h2: {
      fontFamily: '"Poppins", "Inter", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: colors.textPrimary,
    },
    h3: {
      fontFamily: '"Poppins", "Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: colors.textPrimary,
    },
    h4: {
      fontFamily: '"Poppins", "Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: colors.textPrimary,
    },
    h5: {
      fontFamily: '"Poppins", "Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.5,
      color: colors.textPrimary,
    },
    h6: {
      fontFamily: '"Poppins", "Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: colors.textPrimary,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.textSecondary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: colors.textSecondary,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          backgroundColor: colors.background,
        },
        body: {
          height: '100%',
          backgroundColor: colors.background,
          margin: 0,
          padding: 0,
          color: colors.textPrimary,
        },
        '#root': {
          height: '100%',
          backgroundColor: colors.background,
        },
        a: {
          color: colors.primary,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        code: {
          backgroundColor: colors.codeBackground,
          borderRadius: '4px',
          padding: '2px 4px',
          fontSize: '0.875rem',
        },
        pre: {
          backgroundColor: colors.codeBackground,
          borderRadius: '8px',
          padding: '16px',
          overflowX: 'auto',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        outlined: {
          borderColor: colors.primary,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          border: `1px solid ${colors.borderColor}`,
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundPaper,
          backgroundImage: 'none',
        },
        outlined: {
          borderColor: colors.borderColor,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          backgroundColor: colors.backgroundPaper,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.backgroundPaper,
          borderRight: `1px solid ${colors.borderColor}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: colors.borderColor,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 209, 255, 0.12)',
            '&:hover': {
              backgroundColor: 'rgba(0, 209, 255, 0.20)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 209, 255, 0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        outlined: {
          borderColor: colors.borderColor,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundPaper,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundLight,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.borderColor}`,
        },
        head: {
          fontWeight: 600,
          color: colors.textPrimary,
        },
      },
    },
  },
});

export default theme; 