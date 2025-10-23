import Note from "../models/noteModel.js";
import mongoose from "mongoose";

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching notes" });
  }
};

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
// @access  Public
// 👇 THIS IS THE NEW FUNCTION
export const getNoteById = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching note" });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Public
export const createANote = async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error creating note" });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Public
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error updating note" });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public
export const DeleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting note" });
  }
};