import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'


const NOTE_KEY = 'notesDB'
let notes = _loadNotes()

export const noteService = {
  getNotes,
  createNote,
  deleteNote,
  duplicateNote,
  togglePin,
}

function getNotes() {
  return notes
}

function createNote(note) {
  note.id = utilService.makeId()
  note.createdAt = Date.now()
  notes.push(note)
  _saveNotes()
}

function deleteNote(noteId) {
  return new Promise((resolve, reject) => {
    const idx = notes.findIndex(note => note.id === noteId)
    if (idx !== -1) {
      notes.splice(idx, 1)
      _saveNotes()
      resolve()  
    } else {
      reject(new Error('Note not found'))  
    }
  })
}

function duplicateNote(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId)
    if (note) {
      const newNote = { ...note, id: utilService.makeId() }
      notes.push(newNote)
      _saveNotes()
      resolve(newNote)  
    } else {
      reject(new Error('Note not found'))  
    }
  })
}

function togglePin(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId)
    if (note) {
      note.isPinned = !note.isPinned
      _saveNotes()
      resolve(note)  
    } else {
      reject(new Error('Note not found'))  
    }
  })
}

function _saveNotes() {
  storageService.saveToStorage(NOTE_KEY, notes)
}

function _loadNotes() {
  return storageService.loadFromStorage(NOTE_KEY) || [
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: {
        backgroundColor: utilService.getRandomColor(),
      },
      info: {
        txt: 'Sample note 1',
      },
    },
  ]
}