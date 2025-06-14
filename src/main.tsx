
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error handling for the main entry point
const handleError = (error: any) => {
  console.error('Application startup error:', error);
};

// Only register service worker in production and supported environments
if (import.meta.env.PROD && 'serviceWorker' in navigator && !window.location.host.includes('stackblitz')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}

// Global error handlers
window.addEventListener('error', handleError);
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  handleError(event.reason);
});

// Ensure React is properly initialized before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    handleError(error);
    // Fallback rendering without StrictMode
    const root = createRoot(rootElement);
    root.render(<App />);
  }
} else {
  console.error("Root element not found");
}
