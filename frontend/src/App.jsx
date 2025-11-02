import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Corrected imports (Case sensitivity fixed to match your file structure)
import Homepage from "./pages/homepage.jsx";          // Matches lowercase homepage.jsx
import Create from "./pages/create.jsx";              // Matches lowercase create.jsx
import NoteDetailPage from "./pages/NoteDetailPage.jsx"; // Matches NoteDetailPage.jsx
import LoginPage from "./pages/LoginPage.jsx";        // Matches LoginPage.jsx
import RegisterPage from "./pages/RegisterPage.jsx";  // Matches RegisterPage.jsx
import PrivateRoute from "./pages/PrivateRoute.jsx";  // Matches PrivateRoute.jsx

const App = () => {
  return (
    <div className="page-wrapper">
      <Toaster position="top-right" />
      <Routes>
        
        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={ <RegisterPage />} />
        
        {/* Protected Routes (Nested under PrivateRoute) */}
        <Route path='/' element={<PrivateRoute />}>
          {/* Routes that require login */}
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Route>
        
        {/* Catch-all for non-existent routes (optional) */}
        <Route path="*" element={<h2>404 Not Found</h2>} />

      </Routes>
    </div>
  );
};

export default App;