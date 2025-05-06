import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './components/ErrorPage';

// Import pages with lazy loading to improve initial load time
const Home = lazy(() => import('./pages/Home'));
const Architecture = lazy(() => import('./pages/Architecture'));
const Features = lazy(() => import('./pages/Features'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Installation = lazy(() => import('./pages/Installation'));
const UseCases = lazy(() => import('./pages/UseCases'));
const Challenges = lazy(() => import('./pages/Challenges'));
const FutureImprovements = lazy(() => import('./pages/FutureImprovements'));

// Fallback loading component for lazy-loaded routes
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%', 
    padding: '2rem' 
  }}>
    <div className="loading-spinner" style={{ marginRight: '1rem' }} />
    <h3>Loading page...</h3>
  </div>
);

function App() {
  // Adding a basic error handler for debugging
  React.useEffect(() => {
    const handleError = (event) => {
      console.error('Global error caught:', event.error || event.message);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="features" element={<Features />} />
          <Route path="tech-stack" element={<TechStack />} />
          <Route path="installation" element={<Installation />} />
          <Route path="use-cases" element={<UseCases />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="future-improvements" element={<FutureImprovements />} />
          {/* Fallback route for any undefined routes */}
          <Route path="*" element={<ErrorPage error="Page not found" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App; 