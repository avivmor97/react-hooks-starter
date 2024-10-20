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
      .then(() => refreshNotes());
  }

  function toggleTodoStatus(todoIdx) {
    const updatedTodos = note.info.todos.map((todo, idx) => {
      if (idx === todoIdx) {
        return {
          ...todo,
          doneAt: todo.doneAt ? null : Date.now(),
        };
      }
      return todo;
    });

    const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } };
    noteService.updateNote(updatedNote)
      .then(() => refreshNotes());
  }

  function getYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|e)\/|.*[?&]v=)|\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function formatNoteForEmail(note) {
    if (!note || !note.info) return 'Unknown note content';
    switch (note.type) {
      case 'NoteTxt':
        return `Title: ${note.info.title || 'No Title'}\n\n${note.info.txt || ''}`;
      case 'NoteImg':
        return `Title: ${note.info.title || 'No Title'}\n\nImage URL: ${note.info.url || ''}`;
      case 'NoteVideo':
        return `Title: ${note.info.title || 'No Title'}\n\nVideo URL: ${note.info.url || ''}`;
      case 'NoteTodos':
        return `Title: ${note.info.title || 'No Title'}\n\nTodos:\n` + 
               note.info.todos.map(todo => `- ${todo.txt} ${todo.doneAt ? '(✔)' : ''}`).join('\n');
      default:
        return 'Unknown note type';
    }
  }

  // Function to send the note content to the email compose page
  function sendToEmail() {
    const emailSubject = encodeURIComponent(note.info.title || 'No Title');
    const emailBody = encodeURIComponent(formatNoteForEmail(note));

    // Redirect to the email compose page with encoded subject and body in the URL
    const mailUrl = `#/mail/new?subject=${emailSubject}&body=${emailBody}`;
    console.log('Redirecting to:', mailUrl); // Debug log to check if the URL is correctly formatted
    window.location.href = mailUrl;
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
                    e.stopPropagation();
                    toggleTodoStatus(idx);
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
      <button
        className="note-preview-pin-btn"
        onClick={(e) => { e.stopPropagation(); onPin(note.id); }}
      >
        <img
          src={note.isPinned ? 'assets/css/apps/note/icons/UnPin.png' : 'assets/css/apps/note/icons/Pin.png'}
          alt="Pin/Unpin"
        />
      </button>

      {getNoteComponent(note)}

      <div className="btn-container">
        <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); onTrash(note.id); }}>
          <img src="assets/css/apps/note/icons/Delete.png" alt="Move to Trash" />
        </button>
        <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); onDuplicate(note.id); }}>
          <img src="assets/css/apps/note/icons/Duplicate.png" alt="Duplicate" />
        </button>
        <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); onMoveToArchive(); }}>
          <img src="assets/css/apps/note/icons/Archive.png" alt="Archive" />
        </button>
        <button className="note-preview-btn" onClick={(e) => { e.stopPropagation(); sendToEmail(); }}>
          <img src="assets/img/Mail.png" alt="Send to Email" />
        </button>

        <div className="note-preview-btn color-picker-container">
          <img src="assets/css/apps/note/icons/ColorPalette.png" alt="Change Background Color" />
          <input
            type="color"
            value={bgColor}
            onChange={handleColorChange}
            onClick={(e) => e.stopPropagation()}
            className="color-input"
          />
        </div>
      </div>
    </div>
  );
}
