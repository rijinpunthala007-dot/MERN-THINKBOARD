import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createANote } from "../api"; // <-- 1. Import API function
import toast from "react-hot-toast"; // <-- 2. Import toast

const Create = () => {
  // 3. Set up state for form data, loading, and navigation
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirecting after success

  // 4. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the form from refreshing the page

    // Basic validation
    if (!title || !content) {
      return toast.error("Please fill in both the title and content.");
    }

    setLoading(true);
    const noteData = { title, content };

    try {
      await createANote(noteData);
      toast.success("Note created successfully!");
      navigate("/"); // <-- 5. Redirect to homepage on success
    } catch (err) {
      console.error("Error creating note:", err);
      const errMsg = err.response?.data?.message || "Failed to create note.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <Link to="/" className="btn btn-back">
          &larr; Back to Notes
        </Link>
      </div>

      {/* 6. Hook up the form's onSubmit */}
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>Create New Note</h2>
        
        {/* 7. Hook up the input fields to state */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* 8. Hook up the button */}
        <div className="form-actions">
          <button type="submit" className="btn btn-green" disabled={loading}>
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;