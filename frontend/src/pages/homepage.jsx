import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllNotes } from "../api";
import { useUserContext } from "../context/UserContext.jsx";

// --- NoteCard Component ---
const NoteCard = ({ note }) => {
  return (
    <Link to={`/note/${note._id}`} className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
    </Link>
  );
};

// --- Homepage Component ---
const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { token, logout } = useUserContext(); // Get logout function and token

  // Use useEffect to fetch data when the page loads
  useEffect(() => {
    const getNotes = async () => {
      try {
        setLoading(true);
        // The token is automatically sent by the API client interceptor
        const res = await fetchAllNotes(); 
        setNotes(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching notes:", err);
        // On a 401 Unauthorized error (token expired), force logout
        if (err.response && err.response.status === 401) {
            logout();
        }
        setError("Failed to load notes. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
        getNotes();
    }
  }, [token, logout]); // Rerun when token changes

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>{error}</div>;
  }

  // --- JSX to render ---
  return (
    <div>
      <header className="home-header">
        <h1>ThinkBoard</h1>
        
        {/* BUTTONS CONTAINER: Both buttons together for desktop, separated for mobile */}
        <div className="header-buttons-container">
          <div className="new-note-container">
            <Link to="/create" className="btn btn-green">
              + New Note
            </Link>
          </div>
          <button onClick={logout} className="btn btn-back header-logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="notes-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))
        ) : (
          <p>No notes found. Create your first one!</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;