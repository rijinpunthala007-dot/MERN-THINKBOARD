import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import your pages and the new PrivateRoute component
import Homepage from "./pages/Homepage.jsx";
import Create from "./pages/Create.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx"; // <-- NEW IMPORT

const App = () => {
  return (
    <div className="page-wrapper">
      <Toaster position="top-right" />
      <Routes>
        
        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={ <RegisterPage />} />
        
        {/* 1. Protected Routes (Nested under PrivateRoute) */}
        <Route path='/' element={<PrivateRoute />}>
          {/* 2. Routes that require login */}
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Route>
        
        {/* 3. Catch-all for non-existent routes (optional) */}
        <Route path="*" element={<h2>404 Not Found</h2>} />

      </Routes>
    </div>
  );
};

export default App;