/**
 * Page Builder Pro - Application Entry Point
 * Traditional React application entry point
 * 
 * This file serves as the main entry point when using this application
 * as a standalone React app rather than Next.js
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './src/app/globals.css';

// Import database initialization (if needed)
import { db } from './src/lib/db';

/**
 * Application Bootstrap
 * Initializes the React application and sets up global configurations
 */
function bootstrapApp() {
  // Check if we're running in a browser environment
  if (typeof window !== 'undefined') {
    // Initialize any global configurations
    window.APP_CONFIG = {
      version: '1.0.0',
      name: 'Page Builder Pro',
      environment: process.env.NODE_ENV || 'development',
      apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
    };

    // Initialize database if available
    if (db) {
      console.log('Database initialized');
    }

    // Set up global error handling
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // You could send errors to a tracking service here
    });

    // Set up unhandled promise rejection handling
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // You could send errors to a tracking service here
    });
  }
}

/**
 * Service Worker Registration (for PWA support)
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

/**
 * Main Application Render
 */
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  // Create React 18 root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the application
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

/**
 * Initialize and start the application
 */
function initApp() {
  // Bootstrap the application
  bootstrapApp();
  
  // Register service worker for PWA features
  registerServiceWorker();
  
  // Render the application
  renderApp();
  
  console.log('🚀 Page Builder Pro initialized successfully');
  console.log('📱 Environment:', process.env.NODE_ENV || 'development');
  console.log('🔧 Version:', window.APP_CONFIG?.version || '1.0.0');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Export for testing and module usage
export { App, bootstrapApp, renderApp, initApp };

// Hot Module Replacement (HMR) support for development
if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('🔄 HMR: App component updated');
    renderApp();
  });
}