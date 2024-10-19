const { useState, useEffect } = React
import { emailsService } from "../services/mail.service.js"
import { noteService } from "../../note/services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function MailDetails({ emailId, onBack, loadEmails }) {
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
    function saveEmailAsNote() {
        if (!mail) return;

        const note = {
            id: utilService.makeId(), // Generate a new ID
            createdAt: Date.now(),
            type: 'NoteTxt', // Adjust based on your note type
            isPinned: false,
            isArchived: false,
            isTrash: false,
            style: {
                backgroundColor: '#ffffff', // Default style
            },
            info: {
                title: mail.subject, // Use email subject as the note title
                txt: mail.body, // Use email body as the note text
                from: mail.from, // Optionally store the sender's email
                to: mail.to, // Optionally store the recipient's email
            }
        }
        noteService.createNote(note);
        console.log('Email saved as note:', note);
    }
    if (!mail) return <div>Loading...</div>


    return (
        <section>
            <ul className="nav-toolbar">
                <li onClick={() => { onBack(); loadEmails(); }} className="toolbar-item back">←</li>
                <li onClick={unreadMail} className="toolbar-item">📬</li>
                <li onClick={saveEmailAsNote}  className="toolbar-item">🖆</li>
                <li onClick={() => { onBack(); trashMail(); loadEmails(); }} className="toolbar-item">🗑</li>
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