import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchAllNotes = () => API.get("/notes");
export const createANote = (newNote) => API.post("/notes", newNote);

// 👇 ADD THESE THREE NEW FUNCTIONS
export const fetchNoteById = (id) => API.get(`/notes/${id}`);
export const updateNote = (id, updatedNote) => API.put(`/notes/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`/notes/${id}`);


export default API;