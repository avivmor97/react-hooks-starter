const { useState, useEffect } = React
import { emailsService } from "../services/mail.service.js"

export function MailDetails({ emailId, onBack,loadEmails  }) {
    const [mail, setMail] = useState(null)

    useEffect(() => {
        emailsService.get(emailId)
            .then(email => {
                setMail({ ...email, isRead: true })
                return emailsService.save({ ...email, isRead: true })
            })
            .catch(err => {
                console.log('Problem getting Email:', err)
            });
    }, [emailId])


    function trashMail() {
        if (!mail) return
        
        if (!mail.removedAt) {
            const updatedMail = { ...mail, removedAt: Date.now() }
            emailsService.save(updatedMail)
                .then(() => {
                    console.log('Email moved to trash');
                    loadEmails()
                    onBack()
                })
                .catch(err => console.log('Error moving email to trash:', err))
        } else {
            emailsService.remove(mail.id)
                .then(() => {
                    console.log('Email deleted permanently');
                    loadEmails()
                    onBack()
                })
                .catch(err => {
                    console.log('Error deleting email:', err);
                })
        }
    }

    function unreadMail() {
        if (!mail) return

        const updatedMail = { ...mail, isRead: false }
        emailsService.save(updatedMail)
            .then(() => setMail(updatedMail)) 
            .catch(err => {
                console.error('Failed to mark as unread:', err)
            })
    }

    if (!mail) return <div>Loading...</div>


    return (
            <section>
                <ul className="nav-toolbar">
                    <li onClick={() => { onBack(); loadEmails(); }} className="toolbar-item back">←</li>
                    <li onClick={unreadMail}  className="toolbar-item">📬</li>
                    <li className="toolbar-item">🖆</li>
                    <li onClick={() => { onBack(); trashMail(); loadEmails();} }  className="toolbar-item">🗑</li>
                    {/* <li onClick={trashMail}  className="toolbar-item">🗑</li> */}
                </ul>
                <div className="email-body">
                    <p className="subject-header">{mail.subject}</p>
                    <p className="email-from">{mail.from}</p>
                    <p className="email-to">{mail.to}</p>
                    <p className="email-body"> {mail.body}</p>
                </div>
            </section>
    )
}