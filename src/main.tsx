import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

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

// Ensure React is properly initialized before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}