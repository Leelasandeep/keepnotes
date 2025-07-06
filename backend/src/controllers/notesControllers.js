import Note from '../models/Note.js';

export async function getNotes(req, res){
  try {
    const notes = await Note.find().sort({createdAt: -1}); // Sort by creation date, newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching all notes:", error);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
};

export async function getNoteById(req, res){
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({message: "Note not found"});
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching single note:", error);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
  }
export async function createNote(req, res){
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({message: "Title and content are required"});
    }
    const note = new Note({title,content});
    const savednote = await note.save();
    res.status(201).json(savednote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
};

export async function updateNote(req, res){
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, {title, content}, {new: true});
    if (!updatedNote) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note updated successfully!", updatedNote});
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
};

export async function deleteNote(req, res){
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return res.status(404).json({message: "Note not found"});
    }
    res.status(200).json({message: "Note deleted successfully!"});
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
};