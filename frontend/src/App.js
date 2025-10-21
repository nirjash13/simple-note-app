import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote, searchNotes } from "./api";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data.notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async () => {
    if (!newNote.trim()) return;
    await addNote(newNote);
    setNewNote("");
    fetchNotes();
  };

  const handleDelete = async (index) => {
    await deleteNote(index);
    fetchNotes();
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchNotes();
      return;
    }
    const res = await searchNotes(search);
    setNotes(res.data.results);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center", fontFamily: "Arial" }}>
      <h1>📝 Simple Notes</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={{ padding: "8px", width: "70%" }}
        />
        <button onClick={handleAdd} style={{ marginLeft: "10px", padding: "8px 16px" }}>
          Add
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search notes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "70%" }}
        />
        <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "8px 16px" }}>
          Search
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note, index) => (
          <li
            key={index}
            style={{
              margin: "10px 0",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {note}
            <button onClick={() => handleDelete(index)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
