const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { eventBusService } from '../../../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
      loadNotes()

      // Subscribe to the 'notes-updated' event to update notes whenever changes occur
      const unsubscribe = eventBusService.on('notes-updated', (updatedNotes) => {
          setNotes(updatedNotes)
      })

      // Cleanup on component unmount
      return () => {
        unsubscribe()
      }
    }, [])

    function loadNotes() {
      const notes = noteService.getNotes()
      setNotes(notes)
    }

    function onDeleteNote(noteId) {
      noteService.deleteNote(noteId)
      // Emit the 'notes-updated' event after deletion
      eventBusService.emit('notes-updated', noteService.getNotes())
    }

    function onDuplicateNote(noteId) {
      noteService.duplicateNote(noteId)
      // Emit the 'notes-updated' event after duplication
      eventBusService.emit('notes-updated', noteService.getNotes())
    }

    function onPinNote(noteId) {
      noteService.togglePin(noteId)
      // Emit the 'notes-updated' event after pin toggle
      eventBusService.emit('notes-updated', noteService.getNotes())
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
