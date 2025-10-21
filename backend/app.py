# -------------------------------
# Simple Notes API using FastAPI
# -------------------------------

# Modules & Packages
from fastapi import FastAPI, HTTPException
from typing import List
import os

# Initialize the app
app = FastAPI(title="Simple Notes API")

# Variable & Data Types
notes: List[str] = []

# File Handling — Load existing notes if file exists
if os.path.exists("notes.txt"):
    with open("notes.txt", "r") as f:
        notes = [line.strip() for line in f.readlines()]

# Function — Save notes to file
def save_notes():
    with open("notes.txt", "w") as f:
        for note in notes:
            f.write(note + "\n")

# Basic Command
print("✅ Notes API started...")

# Control Structures
@app.get("/notes")
def get_notes():
    """List all notes"""
    return {"notes": notes}

@app.post("/notes")
def add_note(note: str):
    """Add a new note"""
    # Exception Handling
    try:
        if not note.strip():
            raise ValueError("Note cannot be empty")

        notes.append(note)
        save_notes()
        return {"message": "Note added successfully!"}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/notes/{index}")
def delete_note(index: int):
    """Delete a note by index"""
    try:
        if index < 0 or index >= len(notes):
            raise IndexError("Invalid note index")

        deleted = notes.pop(index)
        save_notes()
        return {"deleted_note": deleted}

    except IndexError as e:
        raise HTTPException(status_code=404, detail=str(e))

# List Comprehension Example — search notes
@app.get("/notes/search")
def search_notes(keyword: str):
    results = [note for note in notes if keyword.lower() in note.lower()]
    return {"results": results}

# Decorators Example — custom decorator
def log_endpoint(func):
    def wrapper(*args, **kwargs):
        print(f"📥 Endpoint called: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@app.get("/health")
@log_endpoint
def health_check():
    return {"status": "OK"}
