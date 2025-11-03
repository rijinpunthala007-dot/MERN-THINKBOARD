import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx'; // 1. User Context Provider
// import ErrorBoundary from './components/ErrorBoundary.jsx'; // Removed ErrorBoundary for simplicity

const rootElement = document.getElementById("root");

// Safety check for root element (as per your previous code)
if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a div with id='root' in your HTML.");
}

createRoot(rootElement).render(
  <StrictMode>
    {/* 2. UserProvider MUST wrap the entire application so all pages can access user state and token */}
    <UserProvider>
      <BrowserRouter> {/* 3. BrowserRouter handles the client-side routing */}
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);