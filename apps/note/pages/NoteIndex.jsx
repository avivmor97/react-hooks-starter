const { useState, useEffect } = React;

import { noteService } from '../services/note.service.js';
import { NotePreview } from '../cmps/NotePreview.jsx';
import { NoteEdit } from '../cmps/NoteEdit.jsx';

export function NoteIndex() {
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [unPinnedNotes, setUnPinnedNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State to handle search input
    const [currentView, setCurrentView] = useState('notes');

    useEffect(() => {
        loadNotes();
    }, [currentView]);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, pinnedNotes, unPinnedNotes]); // Re-filter when searchTerm or notes change

    function loadNotes() {
        let allNotes;
        switch (currentView) {
            case 'pinned':
                allNotes = noteService.getPinnedNotes();
                break;
            case 'archive':
                allNotes = noteService.getArchivedNotes();
                break;
            case 'trash':
                allNotes = noteService.getTrashNotes();
                break;
            default:
                allNotes = noteService.getNotes();
        }

        // Separate pinned and unpinned notes
        const pinned = allNotes.filter(note => note.isPinned);
        const unPinned = allNotes.filter(note => !note.isPinned);

        setPinnedNotes(pinned);
        setUnPinnedNotes(unPinned);
        setFilteredNotes([...pinned, ...unPinned]); // Show all notes initially
    }

    // Function to handle filtering notes based on search input
    function handleSearch() {
        if (!searchTerm) {
            setFilteredNotes([...pinnedNotes, ...unPinnedNotes]);
        } else {
            const filtered = [...pinnedNotes, ...unPinnedNotes].filter(note =>
                note.info.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (note.info.txt && note.info.txt.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredNotes(filtered);
        }
    }

    function refreshNotes() {
        loadNotes(); // Re-fetch the notes after an update (e.g., toggle todo status)
    }

    function onTrashNote(noteId) {
        noteService.trashNote(noteId)
            .then(() => {
                refreshNotes();
            })
            .catch(err => {
                console.error('Error moving note to trash:', err);
            });
    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId)
            .then(() => {
                refreshNotes();
            })
            .catch(err => {
                console.error('Error duplicating note:', err);
            });
    }

    function onPinNote(noteId) {
        noteService.togglePin(noteId)
            .then(() => {
                refreshNotes();
            })
            .catch(err => {
                console.error('Error toggling pin status:', err);
            });
    }

    function onArchiveNote(noteId) {
        noteService.archiveNote(noteId)
            .then(() => {
                refreshNotes();
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
            updatedNote.id = selectedNote.id;
            noteService.updateNote(updatedNote)
                .then(() => refreshNotes())
                .catch(err => console.error('Error updating note:', err));
        } else {
            noteService.createNote(updatedNote);
            refreshNotes();
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

            {/* Add Search Input Bar */}
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className={`main-content ${isEditing ? 'blur-backdrop' : ''}`}>
                {!isEditing && (
                    <input
                        type="text"
                        placeholder="New note..."
                        onClick={handleAddNote}
                        readOnly
                        className="new-note-input"
                    />
                )}

                <div className="notes-container">
                    {/* Filtered Notes Section */}
                    {filteredNotes.length > 0 ? (
                        <div className="filtered-notes-section">
                            {filteredNotes.map(note => (
                                <NotePreview
                                    key={note.id}
                                    note={note}
                                    onTrash={onTrashNote}
                                    onDuplicate={onDuplicateNote}
                                    onPin={onPinNote}
                                    onArchiveNote={onArchiveNote}
                                    onSelectNote={onSelectNote}
                                    refreshNotes={refreshNotes}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No matching notes found.</p>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="edit-modal">
                    <NoteEdit
                        onSaveNote={handleSaveNote}
                        note={selectedNote}
                        onClose={handleCloseEdit}
                    />
                </div>
            )}
        </div>
    );
}
