const { Fragment } = React
const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

import { emailsService } from "../services/mail.service.js"
import { MailSideNav } from "../cmps/SideNav.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"

export function MailContainer() {

    const [selectedMailId, setSelectedMailId] = useState(null)
    const [mails, setEmails] = useState(null)

    useEffect(() => {
        loadEmails()
    }, [])

    function loadEmails() {
        emailsService.query().then(setEmails).catch(err => {
            console.log('err', err)
        })
    }

    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
        loadEmails()
        // console.log('onBack mails', mails);
    }
    function onStarredRow(mail){
        mail.starred=true
        emailsService.save(mail)
    }
    if (!mails) return
    
    return (
        <Fragment>
            {/* <button className="new-email">Compose</button> */}
            <button className="new-email"><Link to={`/mail/new`}>Compose</Link></button>
            
            <section className="mail-list">
                <MailSideNav mails={mails} />
                {!selectedMailId
                    ? <MailList onSelectMailId={onSelectMailId} onStarrRow={onStarredRow} mails={mails} />
                    : <MailDetails onBack={() => setSelectedMailId(null)} emailId={selectedMailId} />
                }
            </section>
            <Outlet />
        </Fragment>
    )
}
