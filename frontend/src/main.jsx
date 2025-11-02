import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx'; // <-- IMPORT PROVIDER

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the entire app with the UserProvider */}
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);