
const { useState, useEffect } = React

export function MailNew({ onClose }) {

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        // setCarToEdit(prevCar => ({ ...prevCar, [field]: value }))
    }
    return (
        <dialog className="new-mail new-mail-dialog" open>
            <h1>
                New Message
                <button onClick={onClose}>x</button>
            </h1>
            <label htmlFor="to">To</label>
            <input onChange={handleChange} type="text" name="to" id="to" />

            <label htmlFor="subject">Subject</label>
            <input onChange={handleChange} type="text" name="subject" id="subject" />


            <label htmlFor="messageBody">Body</label>
            <textarea onChange={handleChange} name="messageBody" id="messageBody"></textarea>

            <ul className="send-toolbar">
                <li className="toolbar-item send" onClick={onClose}>
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