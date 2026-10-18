import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToolProvider } from './context/ToolContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToolProvider>
      <App />
    </ToolProvider>
  </React.StrictMode>
);
