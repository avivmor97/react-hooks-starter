import { utilService } from '../services/util.service.js'


export const noteService = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    duplicateNote



}

const notes = [
    {
      id: 'n101',
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: true,
      style: {
        backgroundColor: '#00d'
      },
      info: {
        txt: 'Fullstack Me Baby!'
      }
    },

    {
        id: 'n102',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: '#00d'
        },
        info: {
          txt: 'Fullstack Me Baby!'
        }
      },

      {
        id: 'n103',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: '#00d'
        },
        info: {
          txt: 'Fullstack Me Baby!'
        }
      }

  ]


  function getNotes() {
    return notes
  }
  
  function createNote(note) {
    note.id = utilService.makeId()
    note.createdAt = Date.now()
    note.style.backgroundColor = utilService.getRandomColor()
    notes.push(note)
  }
  
  
  function updateNote(noteId, updatedNote) {
    const idx = notes.findIndex(note => note.id === noteId)
    if (idx !== -1) notes[idx] = updatedNote
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


