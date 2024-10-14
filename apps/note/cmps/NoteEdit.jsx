const { useState } = React

import { utilService } from '../../../services/util.service.js'

export function NoteEdit({ onSaveNote, note = null, onClose }) {
    const [noteType, setNoteType] = useState(note ? note.type : 'NoteTxt')
    const [noteText, setNoteText] = useState(note ? note.info.txt : '')
    const [noteHeader, setNoteHeader] = useState(note ? note.info.title : '')

    function handleSave() {
        const newNote = {
            type: noteType,
            info: {},
            style: {
                backgroundColor: utilService.getRandomColor(),
            },
        }

        if (noteType === 'NoteTxt') {
            newNote.info.txt = noteText
        } else if (noteType === 'NoteImg' || noteType === 'NoteVideo') {
            newNote.info.url = noteText
            newNote.info.title = noteHeader
        } else if (noteType === 'NoteTodos') {
            newNote.info.title = noteHeader
            newNote.info.todos = noteText.split(',').map(todo => ({ txt: todo.trim(), doneAt: null }))
        }

        onSaveNote(newNote)
    }

    return (
        <div className="note-edit">
            <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
            <input
                type="text"
                placeholder="Note Header"
                value={noteHeader}
                onChange={(e) => setNoteHeader(e.target.value)}
            />
            <textarea
                placeholder={noteType === 'NoteTodos' ? 'Todos (comma separated)' : 'Note Content'}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />
            <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                <option value="NoteTxt">Text Note</option>
                <option value="NoteImg">Image Note</option>
                <option value="NoteVideo">Video Note</option>
                <option value="NoteTodos">Todo List</option>
            </select>
            <button onClick={handleSave}>Save Note</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}

