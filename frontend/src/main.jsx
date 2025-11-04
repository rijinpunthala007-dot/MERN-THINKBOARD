import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx'; // <-- added

const rootElement = document.getElementById("root");

// The final render structure: UserProvider wraps BrowserRouter
createRoot(rootElement).render(
  <StrictMode>
    <UserProvider> 
      <BrowserRouter> 
        <ErrorBoundary> {/* Wrap App so runtime errors show */}
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);