import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const getNotes = () => axios.get(`${API_URL}/notes`);
export const addNote = (note) => axios.post(`${API_URL}/notes`, null, { params: { note } });
export const deleteNote = (index) => axios.delete(`${API_URL}/notes/${index}`);
export const searchNotes = (keyword) => axios.get(`${API_URL}/notes/search`, { params: { keyword } });
