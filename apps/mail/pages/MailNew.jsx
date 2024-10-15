
const { useState, useEffect } = React

export function MailNew() {

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
        <section>
            <h1>New Massage
                <button>x</button>
            </h1>
            <label htmlFor="to">To</label>
            <input onChange={handleChange} type="text" name="to" id="to" />

            <label htmlFor="subject">Subject</label>
            <input onChange={handleChange} type="text" name="subject" id="subject" />

            <input onChange={handleChange} type="text" name="body" id="body" />

            <ul className="send-toolbar">
                <li className="toolbar-item">send</li>
                <li className="toolbar-item">Delete</li>
            </ul>

        </section>

    )
}