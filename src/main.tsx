import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { PropertyProvider } from './context/PropertyContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PropertyProvider>
        <App />
      </PropertyProvider>
    </BrowserRouter>
  </StrictMode>
);