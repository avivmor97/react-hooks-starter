import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

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
  eventBusService.emit('notes-updated', notes) // Emit an event after creating a note
}

function deleteNote(noteId) {
  const idx = notes.findIndex(note => note.id === noteId)
  if (idx !== -1) {
    notes.splice(idx, 1)
    _saveNotes()
    eventBusService.emit('notes-updated', notes) // Emit an event after deleting a note
  }
}

function duplicateNote(noteId) {
  const note = notes.find(note => note.id === noteId)
  if (note) {
    const newNote = { ...note, id: utilService.makeId() }
    notes.push(newNote)
    _saveNotes()
    eventBusService.emit('notes-updated', notes) // Emit an event after duplicating a note
  }
}

function togglePin(noteId) {
  const note = notes.find(note => note.id === noteId)
  if (note) {
    note.isPinned = !note.isPinned
    _saveNotes()
    eventBusService.emit('notes-updated', notes) // Emit an event after toggling a note's pin
  }
}

// Private functions
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
