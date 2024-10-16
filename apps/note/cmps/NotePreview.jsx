const { useState } = React;
import { noteService } from '../services/note.service.js';

export function NotePreview({ note, onDelete, onDuplicate, onPin, onArchiveNote }) {
  const [bgColor, setBgColor] = useState(note.style.backgroundColor);

  // Call the parent's onArchiveNote to trigger the state update in NoteIndex
  function onMoveToArchive() {
    onArchiveNote(note.id);
  }

  // Handle background color change from color picker
  function handleColorChange(event) {
    const newColor = event.target.value;
    setBgColor(newColor);
    note.style.backgroundColor = newColor;
    noteService.saveNoteColor(note.id, newColor);
  }

  // Function to render the appropriate note component based on note type
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
            <div className="note-content">{note.info.txt}</div>
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
    <div className="note-preview" style={{ backgroundColor: bgColor }}>
      {getNoteComponent(note)}
      <button className="note-preview-btn" onClick={() => onDelete(note.id)}>
        <img src="assets/css/apps/note/icons/Delete.png" alt="Delete" />
      </button>
      <button className="note-preview-btn" onClick={() => onDuplicate(note.id)}>
        <img src="assets/css/apps/note/icons/Duplicate.png" alt="Duplicate" />
      </button>
      <button className="note-preview-btn" onClick={() => onPin(note.id)}>
        <img
          src={note.isPinned ? 'assets/css/apps/note/icons/UnPin.png' : 'assets/css/apps/note/icons/Pin.png'}
          alt={note.isPinned ? 'Unpin' : 'Pin'}
        />
      </button>
      <button className="note-preview-btn" onClick={onMoveToArchive}>
        <img src="assets/css/apps/note/icons/Archive.png" alt="Move to Archive" />
      </button>

      <div className="note-preview-btn color-picker-container">
        <img src="assets/css/apps/note/icons/ColorPalette.png" alt="Change Background Color" />
        <input
          type="color"
          value={bgColor}
          onChange={handleColorChange}
          className="color-input"
        />
      </div>
    </div>
  );
}
