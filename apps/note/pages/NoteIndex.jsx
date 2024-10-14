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
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                console.log('Note removed successfully')  
            })
            .catch(err => {
                console.error('Error removing note:', err)
                
            })
    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId)
            .then(newNote => {
                setNotes(prevNotes => [...prevNotes, newNote])
                console.log('Note duplicated successfully')  
            })
            .catch(err => {
                console.error('Error duplicating note:', err)
                
            })
    }
    function onPinNote(noteId) {
        noteService.togglePin(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.map(note => 
                    note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
                ))
                console.log('Note pin status toggled successfully')  
            })
            .catch(err => {
                console.error('Error toggling pin status:', err)
                
            })
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
