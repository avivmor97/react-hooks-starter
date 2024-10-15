
export function MailList({ mails ,onSelectMailId}) {

    return (
        <table className="mail-table">
            {mails.map(mail => (
                <tbody key={mail.id}>
                    <tr onClick={()=>onSelectMailId(mail.id)} key={mail.id}>
                        <td >{mail.subject}</td>
                        <td >{mail.body}</td>
                    </tr></tbody>))}
        </table>

    )
}
