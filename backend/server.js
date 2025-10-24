import express from "express";
import connectDB from "./src/config/db.js";
import notesRoute from "./src/routes/notesRoute.js";
import rateLimit from "express-rate-limit";
import cors from "cors";
import asyncHandler from 'express-async-handler';
import path from "path";
import { fileURLToPath } from "url";

// Connect to Database
connectDB();

const app = express();

// --- Middleware ---
app.use(cors());

// CREATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);
app.use(express.json());

// --- Routes ---
app.use("/api/notes", notesRoute);

// ----------------------------------------------------------------
// --- DEPLOYMENT LOGIC (Serving the React Frontend) ---
// ----------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This ensures our API is served by the Node server in production
if (process.env.NODE_ENV === "production") {
  // 1. Tell express where the static build files are
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // 2. For any other route (like /create or /note/:id), serve the React index.html
  app.get("*", asyncHandler((req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  }));
} else {
  // For local development, display a simple API message
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});