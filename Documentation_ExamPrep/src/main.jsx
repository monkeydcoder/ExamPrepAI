import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// A simple loader to show during initial render
const Loader = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <h2>Loading EduMind AI Documentation...</h2>
    <p>Please wait while we prepare the content for you.</p>
  </div>
);

// Add error handler to catch and display React rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Global error handler for non-React errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error || event.message);
});

// Verify the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found! Make sure the index.html has a div with id='root'");
  document.body.innerHTML = '<div style="padding: 20px; color: red;"><h1>Configuration Error</h1><p>Root element not found.</p></div>';
} else {
  // First render a simple loading indicator
  ReactDOM.createRoot(rootElement).render(<Loader />);
  
  // Then render the full app
  setTimeout(() => {
    ReactDOM.createRoot(rootElement).render(
      <ErrorBoundary>
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </React.StrictMode>
      </ErrorBoundary>
    );
  }, 100); // Small delay to ensure loader is displayed
} 