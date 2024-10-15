const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [currentView, setCurrentView] = useState('notes')

    useEffect(() => {
        loadNotes()
    }, [currentView])


    function loadNotes() {
        let filteredNotes
        switch (currentView) {
            case 'pinned':
                filteredNotes = noteService.getPinnedNotes()
                break
            case 'archive':
                filteredNotes = noteService.getArchivedNotes()
                break
            case 'trash':
                filteredNotes = noteService.getTrashNotes()
                break
            default:
                filteredNotes = noteService.getNotes()
        }
        setNotes(filteredNotes)
    }

    function onDeleteNote(noteId) {
        noteService.deleteNote(noteId)
            .then(() => {
                loadNotes()
            })
            .catch(err => {
                console.error('Error removing note:', err)
            })
    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId)
            .then(() => {
                loadNotes()
            })
            .catch(err => {
                console.error('Error duplicating note:', err)
            })
    }

    function onPinNote(noteId) {
        noteService.togglePin(noteId)
            .then(() => {
                loadNotes()
            })
            .catch(err => {
                console.error('Error toggling pin status:', err)
            })
    }

    function onArchiveNote(noteId) {
        noteService.archiveNote(noteId)
            .then(() => {
                loadNotes()
            })
            .catch(err => {
                console.error('Error archiving note:', err)
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
