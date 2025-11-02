import express from "express";
import connectDB from "./src/config/db.js";
import notesRoute from "./src/routes/notesRoute.js";
import userRoutes from "./src/routes/userRoutes.js"; // <-- User Auth Routes
import rateLimit from "express-rate-limit";
import cors from "cors";

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

// --- API Routes ---
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoute);

// --- Simple Root Route for API Check ---
// When someone visits the Render URL directly, they should just see this.
app.get("/", (req, res) => {
  res.send("ThinkBoard API is running successfully.");
});

// ----------------------------------------------------------------
// --- FINAL ERROR HANDLING MIDDLEWARE ---
// ----------------------------------------------------------------
// This catches all errors from asyncHandler blocks and sends a clean response.
app.use((err, req, res, next) => {
  // If response was already sent, don't try to send it again
  if (res.headersSent) {
    return next(err);
  }
  
  // Use the status code from response if set, otherwise default to 500
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    // stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Optional: Hide stack trace in production
  });
});


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});