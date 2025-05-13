
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Preload critical assets
const preloadAssets = () => {
  const criticalImages = [
    '/lovable-uploads/b5b79438-1e8e-447e-9c8f-c886b1ed204a.png'
  ];
  
  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image;
    document.head.appendChild(link);
  });
};

// Register service worker for offline capabilities with improved registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use a timeout to not block main thread during page load
    setTimeout(() => {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    }, 1000);
  });
}

// Performance monitoring for initialization
const startTime = performance.now();

// Immediately start preloading critical assets
preloadAssets();

// Bootstrap the application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Log initialization time
  const endTime = performance.now();
  console.log(`Application initialized in ${(endTime - startTime).toFixed(2)}ms`);
} else {
  console.error("Root element not found");
}
