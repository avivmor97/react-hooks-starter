import { utilService } from '../../../services/util.service.js'

const notes = [
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
}

function deleteNote(noteId) {
  const idx = notes.findIndex(note => note.id === noteId)
  if (idx !== -1) notes.splice(idx, 1)
}

function duplicateNote(noteId) {
  const note = notes.find(note => note.id === noteId)
  if (note) {
    const newNote = { ...note, id: utilService.makeId() }
    notes.push(newNote)
  }
}

function togglePin(noteId) {
  const note = notes.find(note => note.id === noteId)
  if (note) {
    note.isPinned = !note.isPinned
  }
}
