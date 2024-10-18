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
          { txt: 'Buy eggs', doneAt: null },
          { txt: 'Buy soda', doneAt: Date.now() },
          { txt: 'Buy tomato', doneAt: Date.now() }
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
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#f4f4f4',
      },
      info: {
        title: 'Meeting Notes',
        txt: 'Discussed the project timeline and agreed on the next sprint. Tasks include frontend integration and backend API testing. Next meeting scheduled for next Wednesday.'
      }
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteImg',
      isPinned: true,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#fff5e6',
      },
      info: {
        url: 'https://img.pixers.pics/pho_wat(s3:700/FO/19/43/70/78/700_FO19437078_61e08d9f9a31cc9bd66dcea11d38fda9.jpg,700,467,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,417,jpg)/stickers-maine-coon-cat-stretching.jpg.jpg',
        title: 'Cat Stretching'
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
        backgroundColor: '#e0f7fa',
      },
      info: {
        title: 'Holiday Prep List',
        todos: [
          { txt: 'Book flight tickets', doneAt: null },
          { txt: 'Pack luggage', doneAt: null },
          { txt: 'Buy sunscreen', doneAt: Date.now() },
          { txt: 'Check hotel reservations', doneAt: null }
        ]
      }
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: true,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#ffebee',
      },
      info: {
        title: 'Favorite Quote',
        txt: '“The only limit to our realization of tomorrow is our doubts of today.” – Franklin D. Roosevelt'
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
        backgroundColor: '#f0f4c3',
      },
      info: {
        url: 'https://cdn.cheapism.com/images/Focus-on-a-Slice-of-Avocado-Toast.2e16d0ba.fill-1440x605.png',
        title: 'Delicious Breakfast'
      }
    },
    {
      id: utilService.makeId(),
      createdAt: Date.now(),
      type: 'NoteVideo',
      isPinned: false,
      isArchived: false,
      isTrash: false,
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        url: 'https://www.youtube.com/watch?v=XWCpKH7hgTk&ab_channel=%D7%99%D7%95%D7%91%D7%9C%D7%94%D7%9E%D7%91%D7%95%D7%9C%D7%91%D7%9C',
        title: 'My Favorite Video'
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
        backgroundColor: '#e8f5e9',
      },
      info: {
        title: 'Weekend Chores',
        todos: [
          { txt: 'Clean the kitchen', doneAt: null },
          { txt: 'Wash the car', doneAt: Date.now() },
          { txt: 'Mow the lawn', doneAt: null },
          { txt: 'Laundry', doneAt: null }
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
