// src/main.jsx
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import the global styles (where Tailwind is initialized)

// Create the root container for the application
const container = document.getElementById('app');

// Use the modern React 18 createRoot API
const root = ReactDOM.createRoot(container);

// Render the application
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);