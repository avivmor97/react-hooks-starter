


export function MailList({ mails }) {
    return (
        <section className="mail-list">
            <button className="new-email">Compose</button>
            <ul className="side-nav">
                <li className="menu-item">Inbox</li>
                <li className="menu-item">Starred</li>
                <li className="menu-item">Important</li>
                <li className="menu-item">Sent</li>
                <li className="menu-item">Draft</li>
                <li className="menu-item">Categories</li>
            </ul>
            <table className="mail-table">
                {mails.map(mail => (
                    <tbody key={mail.id}>
                        <tr key={mail.id}>
                            <td >{mail.subject}</td>
                            <td >{mail.body}</td>
                        </tr></tbody>))}
            </table>
        </section>
    )
}
