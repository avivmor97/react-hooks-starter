


export function MailList({ mails }) {
    return (
        <section className="mail-list">
            <button className="new-email">Compose</button>
            <ul className="side-nav">
                <li>Inbox</li>
                <li>Starred</li>
                <li>Important</li>
                <li>Sent</li>
                <li>Draft</li>
                <li>Categories</li>
            </ul>
            <table className="mail-table">
                {mails.map(mail => (
                    <tbody>
                        <tr key={mail.id}>
                            <td >{mail.subject}</td>
                            <td >{mail.body}</td>
                        </tr></tbody>))}
            </table>
        </section>
    )
}
