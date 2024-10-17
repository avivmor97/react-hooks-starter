import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

const NOTE_KEY = 'notesDB';
let notes = _loadNotes();

export const noteService = {
  getNotes,
  createNote,
  deleteNote,
  duplicateNote,
  togglePin,
  archiveNote,
  trashNote,
  getPinnedNotes,
  getArchivedNotes,
  getTrashNotes,
  saveNoteColor,
  updateNote,
  toggleTodoStatus // Add this function to toggle todo status
};

function getNotes() {
  return notes.filter(note => !note.isArchived && !note.isTrash);
}

function getPinnedNotes() {
  return notes.filter(note => note.isPinned && !note.isArchived && !note.isTrash);
}

function getArchivedNotes() {
  return notes.filter(note => note.isArchived);
}

function getTrashNotes() {
  return notes.filter(note => note.isTrash);
}

function createNote(note) {
  note.id = utilService.makeId();
  note.createdAt = Date.now();
  note.isArchived = false;
  note.isTrash = false;
  notes.push(note);
  _saveNotes();
}

function archiveNote(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId);
    if (note) {
      note.isArchived = !note.isArchived;
      _saveNotes();
      resolve(note);
    } else {
      reject(new Error('Note not found'));
    }
  });
}

function trashNote(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId);
    if (note) {
      note.isTrash = !note.isTrash;
      _saveNotes();
      resolve(note);
    } else {
      reject(new Error('Note not found'));
    }
  });
}

function deleteNote(noteId) {
  return new Promise((resolve, reject) => {
    const idx = notes.findIndex(note => note.id === noteId);
    if (idx !== -1) {
      notes.splice(idx, 1);
      _saveNotes();
      resolve();
    } else {
      reject(new Error('Note not found'));
    }
  });
}

function duplicateNote(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId);
    if (note) {
      const newNote = { ...note, id: utilService.makeId() };
      notes.push(newNote);
      _saveNotes();
      resolve(newNote);
    } else {
      reject(new Error('Note not found'));
    }
  });
}

function updateNote(updatedNote) {
  return new Promise((resolve, reject) => {
    const idx = notes.findIndex(note => note.id === updatedNote.id);
    if (idx !== -1) {
      notes[idx] = updatedNote;
      _saveNotes();
      resolve(updatedNote);
    } else {
      reject(new Error('Note not found'));
    }
  });
}

function togglePin(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId);
    if (note) {
      note.isPinned = !note.isPinned;
      _saveNotes();
      resolve(note);
    } else {
      reject(new Error('Note not found'));
    }
  });
}

// New function to toggle the status of a todo
function toggleTodoStatus(noteId, todoIdx) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId);
    if (note && note.type === 'NoteTodos') {
      note.info.todos[todoIdx].doneAt = note.info.todos[todoIdx].doneAt ? null : Date.now();
      _saveNotes();
      resolve(note);
    } else {
      reject(new Error('Note not found or not a todo note'));
    }
  });
}

function _saveNotes() {
  storageService.saveToStorage(NOTE_KEY, notes);
}

function _loadNotes() {
  return storageService.loadFromStorage(NOTE_KEY) || [];
}

function saveNoteColor(noteId, color) {
  const note = notes.find(note => note.id === noteId);
  if (note) {
    note.style.backgroundColor = color;
    _saveNotes();
  }
}
