
const { useState } = React
import { emailsService } from "../services/mail.service.js"

export function MailNew({ onClose }) {

    const [emailData, setEmailData] = useState(emailsService.getEmail('', '', '', false,
                                                                      Date.now(), null, 'user@appsus.com',
                                                                      '', false))

    function handleChange({ target }) {
        const { name, value } = target
        setEmailData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSend() {
        const { to, subject, messageBody } = emailData; 
        if (!to || !subject || !messageBody) {
            alert('Please fill in all fields')
            return
        }

        const newEmail = emailsService.getEmail(
            Date.now(), 
            subject, 
            messageBody, 
            false, 
            Date.now(), 
            null, 
            'user@appsus.com', 
            to,
            false 
        )

        emailsService.save(newEmail)
            .then(() => {
                console.log('Email sent successfully')
                onClose();
            })
            .catch(err => {
                console.log('Error sending email',err)
            })
    }


    return (
        <dialog className="new-mail new-mail-dialog" open>
            <h1>
                New Message
                <button onClick={onClose}>x</button>
            </h1>
            <label htmlFor="to">To</label>
            <input onChange={handleChange} type="email" name="to" id="to" />

            <label htmlFor="subject">Subject</label>
            <input onChange={handleChange} type="text" name="subject" id="subject" />


            <label htmlFor="messageBody">Body</label>
            <textarea onChange={handleChange} name="messageBody" id="messageBody"></textarea>

            <ul className="send-toolbar">
                <li className="toolbar-item send" onClick={handleSend}>
                    Send
                </li>
                <li className="toolbar-item" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ marginRight: '5px' }} 
                    >
                        <path d="M3 6h18v2H3V6zm2 4h14v12H5V10zm2 2v8h2v-8H7zm4 0v8h2v-8h-2zm4 0v8h2v-8h-2z" />
                    </svg>
                </li>
            </ul>
        </dialog>
    )
}