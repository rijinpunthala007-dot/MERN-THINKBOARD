import express from "express";
import {
  createANote,
  DeleteNote, // ✅ CORRECT: Capital 'D' to match the controller export
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect middleware to ALL note routes
router.route("/")
    .get(protect, getAllNotes)
    .post(protect, createANote);

router.route("/:id")
    .get(protect, getNoteById)
    .put(protect, updateNote)
    .delete(protect, DeleteNote); // ✅ Use the correct name here too

export default router;