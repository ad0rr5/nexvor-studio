/**
 * Application entry point
 * 
 * This file initializes the React application and renders it to the DOM.
 * It imports the main App component and necessary dependencies.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/App';

// Find the root container and render the application
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Root container not found. Make sure there is an element with id="root" in your HTML.');
}
