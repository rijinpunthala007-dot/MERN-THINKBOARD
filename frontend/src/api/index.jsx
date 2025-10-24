import axios from "axios";

const API = axios.create({
  // Use your live Render URL for the API
  baseURL: "https://thinkboard-mern-z5d1.onrender.com/api", 
});

export const fetchAllNotes = () => API.get("/notes");
export const createANote = (newNote) => API.post("/notes", newNote);
export const fetchNoteById = (id) => API.get(`/notes/${id}`);
export const updateNote = (id, updatedNote) => API.put(`/notes/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

export default API;