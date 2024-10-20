const { useState, useEffect } = React;
import { emailsService } from "../services/mail.service.js";

export function MailNew({ onClose , onSendMail}) {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    messageBody: ''
  });

  // UseEffect to decode URL parameters from the hash
  useEffect(() => {
    // Get the hash part after `#`
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]); // Extract part after `?` in the hash

    const subject = params.get('subject') || ''
    const body = params.get('body') || ''

    // Log decoded values for debugging
    console.log('Decoded Subject:', decodeURIComponent(subject))
    console.log('Decoded Body:', decodeURIComponent(body))

    // Update state with decoded values
    setEmailData({
      to: '',
      subject: decodeURIComponent(subject),
      messageBody: decodeURIComponent(body)
    });
  }, [])

  function handleChange({ target }) {
    const { name, value } = target;
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

    onSendMail(newEmail)
      .then(() => {
        console.log('Email sent successfully')
        onClose() // Close the dialog after sending
      })
      .catch(err => {
        console.log('Error sending email', err)
      })

  }


  return (
    <dialog className="new-mail new-mail-dialog" open>
      <h1>
        New Message
        <button onClick={onClose}>x</button>
      </h1>

      <label htmlFor="to">To</label>
      <input onChange={handleChange} type="email" name="to" id="to" value={emailData.to} />

      <label htmlFor="subject">Subject</label>
      <input onChange={handleChange} type="text" name="subject" id="subject" value={emailData.subject} />

      <label htmlFor="messageBody">Body</label>
      <textarea
        onChange={handleChange}
        name="messageBody"
        id="messageBody"
        value={emailData.messageBody}
      ></textarea>

      <ul className="send-toolbar">
        <li className="toolbar-item send" onClick={handleSend}>Send</li>
        <li className="toolbar-item" onClick={onClose}>Close</li>
      </ul>
    </dialog>
  );
}
