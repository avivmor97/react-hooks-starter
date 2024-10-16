
import { utilService } from "../../../services/util.service.js"

export function MailList({ mails, onSelectMailId , onStarrRow}) {
    // const a='⭐'✰
    return (
        <table className="mail-table">
            {mails.map(mail => (
                <tbody key={mail.id}>
                    <tr className={!mail.isRead ? '' : `readed`}  key={mail.id}>
                        <td onClick={() => onStarrRow(mail)} className='starred'>{!mail.starred ? '☆' : '⭐'}</td>
                        <td >{FromDisplay(mail.from)}</td>
                        <td onClick={() => onSelectMailId(mail.id)} >{mail.subject}</td>
                        <td >{mail.body}</td>
                        {/* <td className="td-hidden">{utilService.getDayName(mail.createdAt)}</td> */}
                        {/* <td className="td-hidden" >{utilService.getMonthName(mail.createdAt)}</td> */}
                    </tr></tbody>))}
        </table>

    )
}

function FromDisplay(email) {
    const indx = email.indexOf('@')
    return email.substring(0,indx)

}