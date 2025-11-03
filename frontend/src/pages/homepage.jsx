import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllNotes } from "../api";
import { useUserContext } from "../context/UserContext.jsx";
import { getUsernameFromEmail } from "../utils/helpers";

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
  const [showWelcome, setShowWelcome] = useState(true); // Control welcome message visibility
  const [isFadingOut, setIsFadingOut] = useState(false); // Track fade-out animation
  
  const { user, token, logout } = useUserContext(); // Get user info, logout function and token

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

  // Get username from email for welcome message
  const username = user?.email ? getUsernameFromEmail(user.email) : '';

  // Auto-hide welcome message after 6 seconds
  useEffect(() => {
    if (username && showWelcome && !isFadingOut) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        // Remove from DOM after fade animation completes (0.5s)
        setTimeout(() => {
          setShowWelcome(false);
          setIsFadingOut(false);
        }, 500);
      }, 6000); // 6 seconds

      return () => clearTimeout(timer);
    }
  }, [username, showWelcome, isFadingOut]);

  // Reset welcome message when user changes (new login)
  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      setIsFadingOut(false);
    }
  }, [user?._id]); // Reset when user ID changes

  // Handle manual dismiss
  const handleDismissWelcome = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowWelcome(false);
      setIsFadingOut(false);
    }, 500);
  };

  // --- JSX to render ---
  return (
    <div>
      <header className="home-header">
        <div className="header-title-section">
          <h1>ThinkBoard</h1>
          {username && showWelcome && (
            <div className="welcome-message-container">
              <p className={`welcome-message ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                Welcome to ThinkBoard, {username}!
              </p>
              <button 
                className="welcome-close-btn"
                onClick={handleDismissWelcome}
                aria-label="Dismiss welcome message"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
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