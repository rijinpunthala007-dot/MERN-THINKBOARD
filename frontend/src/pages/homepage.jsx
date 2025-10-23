import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllNotes } from "../api"; // <-- 1. Import our API function

// --- NoteCard Component ---
// We moved this from the main component so it's cleaner
// It now takes a 'note' object as a prop
const NoteCard = ({ note }) => {
  return (
    // 2. Link to the correct, dynamic URL
    <Link to={`/note/${note._id}`} className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
    </Link>
  );
};

// --- Homepage Component ---
const Homepage = () => {
  // 3. Set up state to hold your data, loading status, and errors
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 4. Use useEffect to fetch data when the page loads
  useEffect(() => {
    const getNotes = async () => {
      try {
        setLoading(true);
        const res = await fetchAllNotes();
        setNotes(res.data); // 5. Put the notes from the API into our state
        setError(null);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getNotes(); // Call the function
  }, []); // The empty array [] means this runs only once on mount

  // 6. Handle loading and error states
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
        <Link to="/create" className="btn btn-green">
          + New Note
        </Link>
      </header>

      {/* 7. Map over the real notes and render a NoteCard for each one */}
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