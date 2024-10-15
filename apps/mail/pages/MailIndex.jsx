const { Link } = ReactRouterDOM
const { useState, useEffect } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { MailContainer } from "../pages/MailContainer.jsx"
import { emailsService } from "../services/mail.service.js"


export function MailIndex() {
    //return <div>mail app</div>
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
    console.log('emails', emails);
    return (
        // <Router>
            <section className="emails-index">
                {/* <Routes>
                <Route path="/mail" element={<MailContainer />} />
                <Route path="/car/:carId" element={<CarDetails />} />

                </Routes> */}
                <MailContainer mails={emails} />
            </section>
        // </Router>
    )
}

