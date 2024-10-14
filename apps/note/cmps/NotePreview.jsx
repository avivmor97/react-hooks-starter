export function NotePreview({ note, onDelete, onDuplicate, onPin }) {
    return (
      <div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
        <DynamicNote note={note} />
        <div className="note-controls">
          <button onClick={() => onPin(note.id)}>{note.isPinned ? 'Unpin' : 'Pin'}</button>
          <button onClick={() => onDuplicate(note.id)}>Duplicate</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      </div>
    )
  }
  
  function DynamicNote({ note }) {
    switch (note.type) {
      case 'NoteTxt':
        return <NoteTxt note={note} />
      case 'NoteImg':
        return <NoteImg note={note} />
      case 'NoteTodos':
        return <NoteTodos note={note} />
      case 'NoteAudio':
        return <NoteAudio note={note} />
      case 'NoteMap':
        return <NoteMap note={note} />
      // Add other note types
      default:
        return null
    }
  }
  
  // Individual note type components
  function NoteTxt({ note }) {
    return <p>{note.info.txt}</p>
  }
  
  function NoteImg({ note }) {
    return <img src={note.info.url} alt="Note" />
  }
  
  // Add more components for other note types...
  