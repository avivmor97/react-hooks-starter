const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [currentView, setCurrentView] = useState('notes') // 'notes', 'reminders', 'archive', 'trash'

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        const allNotes = noteService.getNotes()
        // Filter notes based on the current view (e.g., notes, archive, trash)
        let filteredNotes
        switch (currentView) {
            case 'reminders':
                filteredNotes = allNotes.filter(note => note.isReminder) // Add isReminder logic in note service
                break
            case 'archive':
                filteredNotes = allNotes.filter(note => note.isArchived)
                break
            case 'trash':
                filteredNotes = allNotes.filter(note => note.isTrash)
                break
            default:
                filteredNotes = allNotes.filter(note => !note.isArchived && !note.isTrash)
        }
        setNotes(filteredNotes)
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

    // Handle switching views in sidenav
    function handleSidenavClick(view) {
        setCurrentView(view)
    }

    return (
        <div className="app-container">
            <div className="sidenav">
                <a href="#notes" onClick={() => handleSidenavClick('notes')}>Notes</a>
                <a href="#reminders" onClick={() => handleSidenavClick('reminders')}>Reminders</a>
                <a href="#archive" onClick={() => handleSidenavClick('archive')}>Archive</a>
                <a href="#trash" onClick={() => handleSidenavClick('trash')}>Trash</a>
            </div>

            <div className="main-content">
                {isEditing && (
                    <NoteEdit
                        onSaveNote={handleSaveNote}
                        note={selectedNote}
                        onClose={handleCloseEdit}
                    />
                )}

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
            </div>
        </div>
    )
}
