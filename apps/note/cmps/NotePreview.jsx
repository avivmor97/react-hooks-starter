const { useState } = React;
import { noteService } from '../services/note.service.js';

export function NotePreview({ note, onTrash, onDuplicate, onPin, onArchiveNote, onSelectNote }) {
    const [bgColor, setBgColor] = useState(note.style.backgroundColor);

    function onMoveToArchive() {
        onArchiveNote(note.id);
    }

    function handleColorChange(event) {
        const newColor = event.target.value;
        setBgColor(newColor);
        note.style.backgroundColor = newColor;
        noteService.saveNoteColor(note.id, newColor);
    }

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
            case 'NoteTodos':
                return (
                    <div>
                        <h1 className="note-title">{note.info.title}</h1>
                        <ul>
                            {note.info.todos.map((todo, idx) => (
                                <li key={idx}>
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
            <div className="note-preview-btn color-picker-container">
                <img src="assets/css/apps/note/icons/ColorPalette.png" alt="Change Background Color" />
                <input type="color" value={bgColor} onChange={handleColorChange} className="color-input" />
            </div>
        </div>
    );
}
