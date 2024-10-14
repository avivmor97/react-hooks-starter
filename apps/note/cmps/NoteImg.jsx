export function NoteImg({ note }) {
    return (
        <div>
            <img src={note.info.url} alt={note.info.title} />
            <h4>{note.info.title}</h4>
        </div>
    )
}
