// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// --- REDUX IMPORTS ---
import { Provider } from 'react-redux'; 
import { store } from './redux/store'; 
// ---------------------

const container = document.getElementById('app');

if (container) {
  const root = ReactDOM.createRoot(container);
  
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Make sure there is a div with id="app" in index.html');
}