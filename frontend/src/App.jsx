import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import your page components
import Homepage from "./pages/homepage.jsx";
import Create from "./pages/create.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

const App = () => {
  return (
    // This is a "wrapper" div to apply global styles
    <div className="page-wrapper">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;