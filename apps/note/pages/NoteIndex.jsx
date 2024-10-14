const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
      loadNotes()
    }, [])

    function loadNotes() {
      const notes = noteService.getNotes()
      setNotes(notes)
    }

    function onDeleteNote(noteId) {
      noteService.deleteNote(noteId)
      loadNotes()
    }

    function onDuplicateNote(noteId) {
      noteService.duplicateNote(noteId)
      loadNotes()
    }

    function onPinNote(noteId) {
      noteService.togglePin(noteId)
      loadNotes()
    }

    return (
      <div>
        <h1>My Notes</h1>
        <div className="notes-list">
          {notes.map(note => (
            <NotePreview 
              key={note.id} 
              note={note} 
              onDelete={onDeleteNote} 
              onDuplicate={onDuplicateNote} 
              onPin={onPinNote} 
            />
          ))}
        </div>
      </div>
    )
}


