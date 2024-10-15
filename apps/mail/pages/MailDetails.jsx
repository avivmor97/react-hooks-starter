
import { emailsService} from "../services/mail.service.js"

export function MailDetails({ emailId,onBack }) {


    const [mail, setMail] = useState(null)

    useEffect(() => {
        emailsService.get(emailId)
            .then(setMail)
            .catch(err=>{
                console.log('Problem getting Email:', err)
            })
    }, [])

    return (
        <Fragment>
            <nav>
                <ul className="nav-toolbar">
                    <li className="toolbar-item">Back</li>
                    <li className="toolbar-item">Mark as  unread</li>
                    <li className="toolbar-item">Add to notes</li>
                    <li className="toolbar-item">Move to</li>
                    <li className="toolbar-item">Labels</li>
                </ul>
            </nav>
            <h1 className="subject-header">{mail.subject}</h1>
                <h2 className="email-from">{mail.from}</h2>
                <h3 className="email-to">{mail.to}</h3>
                <p className="email-body"> {mail.body}</p>
                <ul className="nav-rep-for">
                    <li className="nav-rep-item reply">Reply</li>
                    <li className="nav-rep-item forward">Forward</li>
                    <li className="nav-rep-item add-reaction">Add reaction</li>
                </ul>
        </Fragment>
    )
}