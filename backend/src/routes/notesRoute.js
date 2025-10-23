import express from "express";
import {
  createANote,
  DeleteNote,
  getAllNotes,
  getNoteById, // <-- 1. Import new function
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createANote);

// 👇 2. ADD THIS NEW ROUTE
router.get("/:id", getNoteById);

router.put("/:id", updateNote);
router.delete("/:id", DeleteNote);

export default router;