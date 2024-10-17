const { Fragment } = React
const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

import { emailsService } from "../services/mail.service.js"
import { MailSideNav } from "../cmps/SideNav.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailNew } from './MailNew.jsx'

export function MailContainer() {

    const [selectedMailId, setSelectedMailId] = useState(null)
    const [mails, setEmails] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    }

    function onDeleteMail(mailId) {
        emailsService.remove(mailId)
            .then(() => {
                setEmails(prevMails => prevMails.filter(mail => mail.id !== mailId));
                if (selectedMailId === mailId) {
                    setSelectedMailId(null);
                }
            })
            .catch(err => {
                console.log('Error deleting email:', err);
            });
    }

    function onStarredRow(mail) {
        console.log('Starmail', mail);
        const updatedMail = { ...mail, starred: !mail.starred }
        const updatedMails = mails.map(m => (m.id === mail.id ? updatedMail : m))
        console.log('Starred updatedMails', updatedMails);
        setEmails(updatedMails)
        emailsService.save(updatedMail)
    }

    function onUnReadRow(mailId) {
        const mail = mails.find(m => m.id === mailId)
        if (!mail) return;
        const updatedMail = { ...mail, isRead: !mail.isRead }
        const updatedMails = mails.map(m => (m.id === mail.id ? updatedMail : m))
        setEmails(updatedMails)
        emailsService.save(updatedMail)
            .then(() => {
                console.log('Email status updated successfully')
            })
            .catch(err => {
                console.error('Failed to update email status:', err)
            })
    }

    if (!mails) return

    return (
        <Fragment>
            <button className="new-email" onClick={() => setIsDialogOpen(true)}>
                Compose
            </button>
            {isDialogOpen && (
                <MailNew onClose={() => setIsDialogOpen(false)} />
            )}

            <section className="mail-list">
                <MailSideNav mails={mails} />
                {!selectedMailId
                    ? <MailList onDeleteMail={onDeleteMail} onSelectMailId={onSelectMailId} onStarrRow={onStarredRow} onUnReadRow={onUnReadRow} mails={mails} />
                    : <MailDetails onUnReadRow={onUnReadRow} onBack={() => setSelectedMailId(null)} emailId={selectedMailId} loadEmails={loadEmails} />
                }
            </section>
            <Outlet />
        </Fragment>
    )
}
