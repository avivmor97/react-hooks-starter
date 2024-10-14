


export function MailList(mails) {
    return <selection>
            <h2>Inbox</h2>
            <table >
            {mails.map(mail=>(
                <tbody>
                <tr key={mail.id}>
                    <td >{mail.subject}</td>
                    <td >{mails.count}</td>
                </tr></tbody>))}
            </table>
    </selection>
}
