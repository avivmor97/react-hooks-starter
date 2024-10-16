const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [currentView, setCurrentView] = useState('notes');

    useEffect(() => {
        loadNotes();
    }, [currentView]);

    function loadNotes() {
        let filteredNotes;
        switch (currentView) {
            case 'pinned':
                filteredNotes = noteService.getPinnedNotes();
                break;
            case 'archive':
                filteredNotes = noteService.getArchivedNotes();
                break;
            case 'trash':
                filteredNotes = noteService.getTrashNotes();
                break;
            default:
                filteredNotes = noteService.getNotes();
        }
        setNotes(filteredNotes);
    }

    function onDeleteNote(noteId) {
        noteService.deleteNote(noteId)
            .then(() => {
                loadNotes();
            })
            .catch(err => {
                console.error('Error removing note:', err);
            });
    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId)
            .then(() => {
                loadNotes();
            })
            .catch(err => {
                console.error('Error duplicating note:', err);
            });
    }

    function onPinNote(noteId) {
        noteService.togglePin(noteId)
            .then(() => {
                loadNotes();
            })
            .catch(err => {
                console.error('Error toggling pin status:', err);
            });
    }

    function onArchiveNote(noteId) {
        noteService.archiveNote(noteId)
            .then(() => {
                loadNotes();
            })
            .catch(err => {
                console.error('Error archiving note:', err);
            });
    }

    function handleAddNote() {
        setSelectedNote(null);
        setIsEditing(true);
    }

    function handleSaveNote(updatedNote) {
        if (selectedNote) {
            // Ensure the updated note keeps the same ID as the selected note
            updatedNote.id = selectedNote.id;
            noteService.updateNote(updatedNote)
                .then(() => loadNotes())
                .catch(err => console.error('Error updating note:', err));
        } else {
            noteService.createNote(updatedNote);
            loadNotes();
        }
        setIsEditing(false);
    }

    function handleCloseEdit() {
        setIsEditing(false);
    }

    function handleSidenavClick(view) {
        setCurrentView(view);
    }

    function onSelectNote(note) {
        setSelectedNote(note);
        setIsEditing(true);
    }

    return (
        <div className="app-container">
            <div className="sidenav">
                <a href="#/note" onClick={() => handleSidenavClick('notes')}>
                    <img className="nav-icons" src="assets/css/apps/note/icons/Notes.png" alt="Notes" />
                    <span className="nav-text">Notes</span>
                </a>
                <a href="#/note/pinned" onClick={() => handleSidenavClick('pinned')}>
                    <img className="nav-icons" src="assets/css/apps/note/icons/Pin.png" alt="Pinned" />
                    <span className="nav-text">Pinned</span>
                </a>
                <a href="#/note/archive" onClick={() => handleSidenavClick('archive')}>
                    <img className="nav-icons" src="assets/css/apps/note/icons/Archive.png" alt="Archive" />
                    <span className="nav-text">Archive</span>
                </a>
                <a href="#/note/trash" onClick={() => handleSidenavClick('trash')}>
                    <img className="nav-icons" src="assets/css/apps/note/icons/Delete.png" alt="Trash" />
                    <span className="nav-text">Trash</span>
                </a>
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
                            onSelectNote={onSelectNote}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}