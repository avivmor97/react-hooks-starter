
import { utilService } from "../../../services/util.service.js"

export function MailList({ mails, onSelectMailId, onStarrRow }) {

    const StarIcon = ({ filled, onClick }) => (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={`star-icon ${filled ? 'filled' : ''}`}
        >
            <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={filled ? "gold" : "none"}
                stroke="black"
                strokeWidth="2"
            />
        </svg>
    )


    return (
        <table className="mail-table">
            {mails.map(mail => (
                <tbody key={mail.id}>
                    <tr className={!mail.isRead ? '' : `readed`} key={mail.id}>
                        <td>
                            <StarIcon
                                filled={mail.starred}
                                onClick={() => onStarrRow(mail)}
                            />
                        </td>

                        {/* <td onClick={() => onStarrRow(mail)} className='starred'>{!mail.starred ? '☆' : '⭐'}</td> */}
                        {/* <td onClick={() => onStarrRow(mail)} className='starred'>{!mail.starred ? '☆' : '⭐'}</td> */}
                        {/* <td >{FromDisplay(mail.from)}</td> */}
                        <td onClick={() => onSelectMailId(mail.id)}>{FromDisplay(mail.from)}</td>
                        <td onClick={() => onSelectMailId(mail.id)} >{mail.subject}</td>
                        <td >{mail.body}</td>
                        <td className="extra" >🗑</td>
                        <td className="extra" >🖆</td>
                        <td className="td-hidden" >{utilService.getEmailDate(mail.createdAt)}</td>
                    </tr></tbody>))}
        </table>

    )
}

function FromDisplay(email) {
    const indx = email.indexOf('@')
    return email.substring(0, indx)

}