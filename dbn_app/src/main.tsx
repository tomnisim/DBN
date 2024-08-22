import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './Components/AdminContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  // </React.StrictMode>
);
