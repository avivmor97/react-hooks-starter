const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)

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
            })
            .catch(err => {
                console.error('Error removing note:', err)
            })
    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId)
            .then(newNote => {
                setNotes(prevNotes => [...prevNotes, newNote])
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
            })
            .catch(err => {
                console.error('Error toggling pin status:', err)
            })
    }

    function handleAddNote() {
        setSelectedNote(null)
        setIsEditing(true)
    }

    function handleSaveNote(newNote) {
        noteService.createNote(newNote)
        setNotes(prevNotes => [...prevNotes, newNote])
        setIsEditing(false)
    }

    function handleCloseEdit() {
        setIsEditing(false)
    }

    return (
        <div className="notes-container">
        <h1 className="main-notes-header">My Notes</h1>
        {!isEditing && (
            <input 
                type="text" 
                placeholder="New note..." 
                onClick={handleAddNote}
                readOnly
                className="new-note-input"
            />
        )}
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

        {isEditing && (
          <NoteEdit 
            onSaveNote={handleSaveNote} 
            note={selectedNote} 
            onClose={handleCloseEdit} 
          />
        )}
      </div>
    )
}