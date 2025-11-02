import Note from "../models/noteModel.js";
import mongoose from "mongoose";
import asyncHandler from 'express-async-handler';

// @desc    Get all notes for the logged-in user
// @route   GET /api/notes
// @access  Private
export const getAllNotes = asyncHandler(async (req, res) => {
  // Only fetch notes linked to the logged-in user (req.user._id is set by protect middleware)
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 }); 
  res.status(200).json(notes);
});

// @desc    Get a single note by ID for the logged-in user
// @route   GET /api/notes/:id
// @access  Private
export const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  // Find note AND ensure it belongs to the logged-in user
  const note = await Note.findOne({ _id: id, user: req.user._id }); 
  
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json(note);
});

// @desc    Create a new note and link it to the user
// @route   POST /api/notes
// @access  Private
export const createANote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const newNote = new Note({
    user: req.user._id, // LINK THE NOTE TO THE LOGGED-IN USER
    title,
    content,
  });
  
  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
});

// @desc    Update a note for the logged-in user
// @route   PUT /api/notes/:id
// @access  Private
export const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  
  // Find note AND ensure it belongs to the logged-in user
  const note = await Note.findOne({ _id: id, user: req.user._id }); 

  if (!note) {
    res.status(404);
    throw new Error("Note not found or you don't own it");
  }

  // Perform the update
  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedNote);
});

// @desc    Delete a note for the logged-in user
// @route   DELETE /api/notes/:id
// @access  Private
export const DeleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  // Find note AND ensure it belongs to the logged-in user
  const note = await Note.findOne({ _id: id, user: req.user._id }); 

  if (!note) {
    res.status(404);
    throw new Error("Note not found or you don't own it");
  }
  
  await Note.findByIdAndDelete(id);

  res.status(200).json({ message: "Note deleted successfully" });
});