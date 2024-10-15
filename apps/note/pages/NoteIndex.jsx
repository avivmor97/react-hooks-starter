const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([]) // State to store notes
    const [isEditing, setIsEditing] = useState(false) // State for note editing
    const [selectedNote, setSelectedNote] = useState(null) // State for currently selected note for editing
    const [currentView, setCurrentView] = useState('notes') // State for current view (notes, pinned, archive, trash)

    useEffect(() => {
        loadNotes() // Load notes whenever the view changes
    }, [currentView])

    // Function to load notes based on the current view
    function loadNotes() {
        let filteredNotes
        switch (currentView) {
            case 'pinned':
                filteredNotes = noteService.getPinnedNotes() // Get only pinned notes
                break
            case 'archive':
                filteredNotes = noteService.getArchivedNotes() // Get only archived notes
                break
            case 'trash':
                filteredNotes = noteService.getTrashNotes() // Get only trashed notes
                break
            default:
                filteredNotes = noteService.getNotes() // Get regular notes (non-archived, non-trashed)
        }
        setNotes(filteredNotes)
    }


    function onDeleteNote(noteId) {
        noteService.deleteNote(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId)) // Remove note from the state
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

   
    function onArchiveNote(noteId) {
        noteService.archiveNote(noteId)
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId)) 
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

    
    function handleSidenavClick(view) {
        setCurrentView(view)
    }

    return (
        <div className="app-container">
            <div className="sidenav">
                <a href="#/note" onClick={() => handleSidenavClick('notes')}>Notes</a>
                <a href="#/note/pinned" onClick={() => handleSidenavClick('pinned')}>Pinned</a>
                <a href="#/note/archive" onClick={() => handleSidenavClick('archive')}>Archive</a>
                <a href="#/note/trash" onClick={() => handleSidenavClick('trash')}>Trash</a>
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
                            onArchiveNote={onArchiveNote}  
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
