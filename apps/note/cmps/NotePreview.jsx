const { useState } = React;
import { noteService } from '../services/note.service.js';

export function NotePreview({ note, onTrash, onDuplicate, onPin, onArchiveNote, onSelectNote, refreshNotes }) {
    const [bgColor, setBgColor] = useState(note.style.backgroundColor);

    function onMoveToArchive() {
        onArchiveNote(note.id);
    }

    function handleColorChange(event) {
        const newColor = event.target.value;
        setBgColor(newColor);
        note.style.backgroundColor = newColor;
        noteService.saveNoteColor(note.id, newColor)
            .then(() => refreshNotes()); // Ensure the UI reflects the change immediately
    }

    // Toggle done/undone status of a todo when clicked
    function toggleTodoStatus(todoIdx) {
        const updatedTodos = note.info.todos.map((todo, idx) => {
            if (idx === todoIdx) {
                return {
                    ...todo,
                    doneAt: todo.doneAt ? null : Date.now(), // Toggle the done status
                };
            }
            return todo;
        });

        // Update the note's todos
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } };
        noteService.updateNote(updatedNote)
            .then(() => refreshNotes()); // Update and refresh notes
    }

    // Helper function to extract YouTube video ID from URL
    function getYouTubeId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|e)\/|.*[?&]v=)|\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // Renders the note content based on its type
    function getNoteComponent(note) {
        switch (note.type) {
            case 'NoteTxt':
                return (
                    <div>
                        <h1 className="note-title">{note.info.title}</h1>
                        <div className="note-content">{note.info.txt}</div>
                    </div>
                );
            case 'NoteImg':
                return (
                    <div>
                        <h1 className="note-title">{note.info.title}</h1>
                        <img className="note-btn-img" src={note.info.url} alt={note.info.title} />
                    </div>
                );
            case 'NoteVideo':
                const videoId = getYouTubeId(note.info.url);
                return videoId ? (
                    <div>
                        <h1 className="note-title">{note.info.title}</h1>
                        <iframe
                            className="note-video-iframe"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={note.info.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div>
                        <h1 className="note-title">{note.info.title}</h1>
                        <p>Invalid YouTube URL</p>
                    </div>
                );
            case 'NoteTodos':
                return (
                    <div>
                        <h1 className="note-title">{note.info.title}</h1>
                        <ul>
                            {note.info.todos.map((todo, idx) => (
                                <li
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent selecting the note
                                        toggleTodoStatus(idx); // Toggle done/undone status
                                    }}
                                    style={{ cursor: 'pointer', textDecoration: todo.doneAt ? 'line-through' : 'none' }}
                                >
                                    {todo.txt} {todo.doneAt ? '✔' : ''}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return <div>Unknown note type</div>;
        }
    }

    return (
        <div className="note-preview" onClick={() => onSelectNote(note)} style={{ backgroundColor: bgColor }}>
            {getNoteComponent(note)}
            <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); onTrash(note.id); }}>
                <img src="assets/css/apps/note/icons/Delete.png" alt="Move to Trash" />
            </button>
            <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); onDuplicate(note.id); }}>
                <img src="assets/css/apps/note/icons/Duplicate.png" alt="Duplicate" />
            </button>
            <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); onPin(note.id); }}>
                <img src={note.isPinned ? 'assets/css/apps/note/icons/UnPin.png' : 'assets/css/apps/note/icons/Pin.png'} alt="Pin/Unpin" />
            </button>
            <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); onMoveToArchive(); }}>
                <img src="assets/css/apps/note/icons/Archive.png" alt="Archive" />
            </button>

            {/* Prevent the color change action from triggering the onSelectNote event */}
            <div className="note-preview-btn color-picker-container">
                <img src="assets/css/apps/note/icons/ColorPalette.png" alt="Change Background Color" />
                <input
                    type="color"
                    value={bgColor}
                    onChange={handleColorChange}
                    onClick={(e) => e.stopPropagation()} /* Stop propagation for color input */
                    className="color-input"
                />
            </div>
        </div>
    );
}
