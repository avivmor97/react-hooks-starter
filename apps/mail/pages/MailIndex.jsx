const { Link } = ReactRouterDOM
const { useState, useEffect } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { MailContainer } from "../pages/MailContainer.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { emailsService } from "../services/mail.service.js"


export function MailIndex() {
    const [emails, setEmails] = useState(null)

    useEffect(() => {
        loadEmails()
    }, [])

    function loadEmails() {
        emailsService.query().then(setEmails).catch(err => {
            console.log('err', err)
        })
    }

    if (!emails) return
    // console.log('emails', emails);
    return (
        <section className="emails-index">
            <MailContainer mails={emails} />
        </section>

    )
}

