import express from 'express';
import { authUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

// Route for registering a new user (Signup)
router.post('/signup', registerUser);

// Route for authenticating an existing user (Login)
router.post('/login', authUser);

export default router;