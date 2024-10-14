import { NoteTxt } from '../cmps/NoteTxt .jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'

export function NotePreview({ note, onDelete, onDuplicate, onPin }) {
    function getNoteComponent(note) {
      switch (note.type) {
        case 'NoteTxt':
          return <div>
            <h1 className="note-title">{note.info.title}</h1> 
            <div className="note-content">{note.info.txt}</div>
          </div>
        case 'NoteImg':
          return <div><img src={note.info.url} alt={note.info.title} /><h4>{note.info.title}</h4></div>
        case 'NoteTodos':
          return (
            <div>
              <h4>{note.info.title}</h4>
              <ul>
                {note.info.todos.map((todo, idx) => (
                  <li key={idx}>{todo.txt} {todo.doneAt ? '✔' : ''}</li>
                ))}
              </ul>
            </div>
          )
        default:
          return <div>Unknown note type</div>
      }
    }
  
    return (
      <div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
        {getNoteComponent(note)}
        <button className="note-preview-btn" onClick={() => onDelete(note.id)}>Delete</button>
        <button className="note-preview-btn"onClick={() => onDuplicate(note.id)}>Duplicate</button>
        <button className="note-preview-btn" onClick={() => onPin(note.id)}>{note.isPinned ? 'Unpin' : 'Pin'}</button>
      </div>
    );
}
  





  