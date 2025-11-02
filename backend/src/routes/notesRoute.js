import express from "express";
import {
  createANote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";
import protect from '../middleware/authMiddleware.js'; // <-- 1. IMPORT PROTECT

const router = express.Router();

// Apply protect middleware to ALL note routes
router.route("/")
    .get(protect, getAllNotes) // 2. PROTECTED
    .post(protect, createANote); // 2. PROTECTED

router.route("/:id")
    .get(protect, getNoteById) // 2. PROTECTED
    .put(protect, updateNote) // 2. PROTECTED
    .delete(protect, deleteNote); // 2. PROTECTED

export default router;