const { useState } = React;

import { utilService } from '../../../services/util.service.js';

export function NoteEdit({ onSaveNote, note = null, onClose }) {
    const [noteType, setNoteType] = useState(note ? note.type : 'NoteTxt');
    const [noteText, setNoteText] = useState(note ? note.info.txt : '');
    const [noteHeader, setNoteHeader] = useState(note ? note.info.title : '');

    function handleSave() {
        const newNote = {
            type: noteType,
            info: {},
            style: {
                backgroundColor: '#ffffff',
            },
        };

        if (noteType === 'NoteTxt') {
            newNote.info.txt = noteText;
            newNote.info.title = noteHeader;  // Ensure the header is included for text notes
        } else if (noteType === 'NoteImg' || noteType === 'NoteVideo') {
            newNote.info.url = noteText;
            newNote.info.title = noteHeader;
        } else if (noteType === 'NoteTodos') {
            newNote.info.title = noteHeader;
            newNote.info.todos = noteText.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }));
        }

        onSaveNote(newNote);
    }

    return (
        <div className="note-edit">
            <input className="note-edit-cmp"
                type="text"
                placeholder="Note Header"
                value={noteHeader}
                onChange={(e) => setNoteHeader(e.target.value)}
            />
            <textarea className="note-edit-cmp"
                placeholder={noteType === 'NoteTodos' ? 'Todos (comma separated)' : 'Note Content'}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />
            <select className="note-type-selector" value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                <option value="NoteTxt">Text Note</option>
                <option value="NoteImg">Image Note</option>
                <option value="NoteVideo">Video Note</option>
                <option value="NoteTodos">Todo List</option>
            </select>
            <button className="note-edit-btn" onClick={handleSave}>Save Note</button>
            <button className="note-edit-btn" onClick={onClose}>Cancel</button>
        </div>
    );
}
