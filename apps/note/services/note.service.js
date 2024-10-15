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
  archiveNote,
  trashNote,
  getPinnedNotes,
  getArchivedNotes,
  getTrashNotes,
  saveNoteColor
}

function getNotes() {
  return notes.filter(note => !note.isArchived && !note.isTrash)
}

function getPinnedNotes() {
  return notes.filter(note => note.isPinned && !note.isArchived && !note.isTrash)
}

function getArchivedNotes() {
  return notes.filter(note => note.isArchived)
}

function getTrashNotes() {
  return notes.filter(note => note.isTrash)
}

function createNote(note) {
  note.id = utilService.makeId()
  note.createdAt = Date.now()
  note.isArchived = false
  note.isTrash = false
  notes.push(note)
  _saveNotes()
}

function archiveNote(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId)
    if (note) {
      note.isArchived = !note.isArchived
      _saveNotes()
      resolve(note) 
    } else {
      reject(new Error('Note not found'))
    }
  })
}

function trashNote(noteId) {
  return new Promise((resolve, reject) => {
    const note = notes.find(note => note.id === noteId)
    if (note) {
      note.isTrash = !note.isTrash
      _saveNotes()
      resolve(note) 
    } else {
      reject(new Error('Note not found'))
    }
  })
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
      type: 'NoteImg',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Beautiful Landscape'
      }
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        title: 'Love Letter',
        txt: 'This is my Love Letter to you, my love. I wanted to reach out and say hello. Life has been busy on my end, but I always think about the good times we shared. Lets catch up soon over coffee or a video call. I\'d love to hear how you\'ve been.'
      }
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        title: 'Grocery List',
        todos: [
          { txt: 'Buy milk', doneAt: null },
          { txt: 'Buy bread', doneAt: Date.now() },
          { txt: 'Buy eggs', doneAt: null }
        ]
      }
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        url: 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8anBnfGVufDB8fDB8fHww',
        title: 'Tiger'
      }
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteTodos',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        title: 'Workout Plan',
        todos: [
          { txt: 'Morning run', doneAt: null },
          { txt: 'Evening yoga', doneAt: null },
          { txt: 'Strength training', doneAt: Date.now() }
        ]
      }
    }
  ];
}

function saveNoteColor(noteId, color) {
  const note = notes.find(note => note.id === noteId);
  if (note) {
    note.style.backgroundColor = color;
    _saveNotes();
  }
}
