const { useState } = React
import { noteService } from '../services/note.service.js'

export function NotePreview({ note, onDelete, onDuplicate, onPin, onArchiveNote }) {
  const [bgColor, setBgColor] = useState(note.style.backgroundColor)

  function onMoveToArchive() {
    noteService.archiveNote(note.id)

  }

  function onChangeBgColor() {
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    setBgColor(newColor)
    note.style.backgroundColor = newColor
    noteService.saveNoteColor(note.id, newColor)
  }

  function getNoteComponent(note) {
    switch (note.type) {
      case 'NoteTxt':
        return (
          <div>
            <h1 className="note-title">{note.info.title}</h1>
            <div className="note-content">{note.info.txt}</div>
          </div>
        )
      case 'NoteImg':
        return (
          <div>
            <h1 className="note-title">{note.info.title}</h1>
            <img className="note-btn-img" src={note.info.url} alt={note.info.title} />
            <div className="note-content">{note.info.txt}</div>

          </div>
        )
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
        )
      default:
        return <div>Unknown note type</div>
    }
  }

  return (
    <div className="note-preview" style={{ backgroundColor: bgColor }}>
      {getNoteComponent(note)}
      <button className="note-preview-btn" onClick={() => onDelete(note.id)}>Delete</button>
      <button className="note-preview-btn" onClick={() => onDuplicate(note.id)}>Duplicate</button>
      <button className="note-preview-btn" onClick={() => onPin(note.id)}>
        {note.isPinned ? 'Unpin' : 'Pin'}
      </button>
      <button className="note-preview-btn" onClick={onMoveToArchive}>Move to Archive</button>
      <button className="note-preview-btn" onClick={onChangeBgColor}>Change Background Color</button>
    </div>
  )
}
