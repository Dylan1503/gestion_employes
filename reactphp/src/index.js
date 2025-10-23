import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';



const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    {/* Seul BrowserRouter de l'application */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);