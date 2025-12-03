import axios from "axios";

// 1. Create the Axios instance
const API = axios.create({
  // Use environment variable or fallback to local
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// 2. Add an Interceptor to attach the JWT token to every request
API.interceptors.request.use((req) => {
  try {
    // Get user info (which includes the token) from local storage
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      const user = JSON.parse(userInfo);
      // Attach the token to the Authorization header
      if (user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (error) {
    console.error('Error accessing localStorage in API interceptor:', error);
  }

  return req;
});

// --- Authentication Routes ---
export const register = (userData) => API.post("/users/signup", userData);
export const loginUser = (userData) => API.post("/users/login", userData);


// --- Secured Note Routes ---
// The token is automatically added to these calls by the interceptor above
export const fetchAllNotes = () => API.get("/notes");
export const createANote = (newNote) => API.post("/notes", newNote);
export const fetchNoteById = (id) => API.get(`/notes/${id}`);
export const updateNote = (id, updatedNote) => API.put(`/notes/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`/notes/${id}`);


export default API;