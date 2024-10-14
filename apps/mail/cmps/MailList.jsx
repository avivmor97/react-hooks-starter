


export function MailList( {mails} ) {
    return <section>
            <h2>Inbox</h2>
            <table >
            {mails.map(mail=>(
                <tbody>
                <tr key={mail.id}>
                    <td >{mail.subject}</td>
                    <td >{mail.body}</td>
                </tr></tbody>))}
            </table>
    </section>
}
