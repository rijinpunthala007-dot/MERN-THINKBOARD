import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx'; // <-- IMPORT PROVIDER
import ErrorBoundary from './components/ErrorBoundary.jsx';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a div with id='root' in your HTML.");
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      {/* Wrap the entire app with the UserProvider */}
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ErrorBoundary>
  </StrictMode>
);