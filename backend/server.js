import express from "express";
import connectDB from "./src/config/db.js";
import notesRoute from "./src/routes/notesRoute.js";
import rateLimit from "express-rate-limit";
import cors from "cors"; // <-- 1. ADD THIS IMPORT

// Connect to Database
connectDB();

const app = express();

// --- Middleware ---

app.use(cors()); // <-- 2. ADD THIS LINE (Best to put it first)

// CREATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// APPLY LIMITER TO ALL REQUESTS
app.use(limiter);

app.use(express.json()); // Middleware to parse JSON

// --- Routes ---
app.use("/api/notes", notesRoute);

// --- Start Server ---
app.listen(5000, () => {
  console.log("Server started on port 5000");
});