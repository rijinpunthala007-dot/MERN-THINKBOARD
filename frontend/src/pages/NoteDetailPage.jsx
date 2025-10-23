import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchNoteById, updateNote, deleteNote } from "../api"; // <-- 1. Import all functions
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  // 2. Get the 'id' from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // 3. Set up state for the form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(true);

  // 4. Fetch the note's data when the page loads
  useEffect(() => {
    const getNote = async () => {
      setLoading(true);
      try {
        const res = await fetchNoteById(id);
        // 5. Populate the form state with data from the API
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching note:", err);
        toast.error("Failed to load note.");
        navigate("/"); // Go back home if note doesn't exist
      } finally {
        setLoading(false);
      }
    };
    getNote();
  }, [id, navigate]); // Re-run if the 'id' changes

  // 6. Handle the 'Save Changes' (Update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      return toast.error("Please fill in all fields.");
    }

    try {
      await updateNote(id, { title, content });
      toast.success("Note updated successfully!");
      navigate("/"); // Go back home
    } catch (err) {
      console.error("Error updating note:", err);
      toast.error("Failed to update note.");
    }
  };

  // 7. Handle the 'Delete'
  const handleDelete = async () => {
    // Show a confirmation popup
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id);
        toast.success("Note deleted successfully!");
        navigate("/"); // Go back home
      } catch (err) {
        console.error("Error deleting note:", err);
        toast.error("Failed to delete note.");
      }
    }
  };

  // 8. Show loading state
  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading Note...</div>;
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <Link to="/" className="btn btn-back">
          &larr; Back to Notes
        </Link>
        {/* 9. Hook up the delete button */}
        <button className="btn btn-red" onClick={handleDelete}>
          Delete Note
        </button>
      </div>

      {/* 10. Hook up the form and inputs */}
      <form className="note-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title} // Use state
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content} // Use state
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-green">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteDetailPage;