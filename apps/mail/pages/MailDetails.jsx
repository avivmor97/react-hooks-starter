const { useState, useEffect } = React

import { emailsService } from "../services/mail.service.js"

export function MailDetails({ emailId, onBack }) {


    const [mail, setMail] = useState(null)

    useEffect(() => {
        emailsService.get(emailId)
            .then(setMail)
            .catch(err => {
                console.log('Problem getting Email:', err)
            })
    }, [])

    if (!mail) return <div>Loading...</div>
    mail.isRead=true
    emailsService.save(mail)

    function unreadMail(){
        mail.isRead=false
        emailsService.save(mail)
    }
    return (
            <section>
                <ul className="nav-toolbar">
                    <li onClick={onBack} className="toolbar-item back">Back</li>
                    <li onClick={unreadMail}  className="toolbar-item">Unread</li>
                    <li className="toolbar-item">Notes</li>
                    <li className="toolbar-item">Delete</li>
                </ul>
                <div className="email-body">
                    <p className="subject-header">{mail.subject}</p>
                    <p className="email-from">{mail.from}</p>
                    <p className="email-to">{mail.to}</p>
                    <p className="email-body"> {mail.body}</p>
                    <ul className="nav-rep-for">
                        <li className="nav-rep-item reply">Reply</li>
                        <li className="nav-rep-item forward">Forward</li>
                        <li className="nav-rep-item add-reaction">Add reaction</li>
                    </ul>
                </div>
            </section>
    )
}