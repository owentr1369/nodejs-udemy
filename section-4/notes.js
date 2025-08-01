const fs = require("fs");

const getNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(note.title);
    console.log(note.body);
  } else {
    console.log("Note not found");
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatedNote = notes.find((note) => note.title === title);
  if (duplicatedNote.length == 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log("New note added!");
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("Your notes:");
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  saveNotes(notesToKeep);
};

module.exports = {
  getNotes,
  addNote,
  loadNotes,
  removeNote,
  listNotes,
};
