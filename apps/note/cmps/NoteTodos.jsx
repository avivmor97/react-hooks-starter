export function NoteTodos({ note }) {
    return (
        <div>
            <h4>{note.info.title}</h4>
            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx}>
                        <span>{todo.txt}</span>
                        {todo.doneAt ? <span> (Done)</span> : <span> (Pending)</span>}
                    </li>
                ))}
            </ul>
        </div>
    )
}
