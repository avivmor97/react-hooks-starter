const { Fragment } = React
const { useState, useEffect } = React

import { emailsService } from "../services/mail.service.js"
import { MailSideNav } from "../cmps/SideNav.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailNew } from './MailNew.jsx'

export function MailContainer() {

    const [selectedMailId, setSelectedMailId] = useState(null)
    const [mails, setEmails] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [readCount, setReadCount] = useState(0)
    const [starredCount, setStarredCount] = useState(0)
    const [filterBy, setFilterBy] = useState({ txt: '' })
    
    useEffect(() => {
        loadEmails()

    }, [filterBy])

    useEffect(() => {
        if (mails) {
            const readEmailsCount = mails.filter(mail => !mail.isRead).length
            setReadCount(readEmailsCount)
            const starredEmailsCount = mails.filter(mail => mail.isStarred).length
            setStarredCount(starredEmailsCount)
        }
    }, [mails])


    function loadEmails() {
        emailsService.query(filterBy).then(setEmails).catch(err => {
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
        const updatedMail = { ...mail, isStarred: !mail.isStarred }
        const updatedMails = mails.map(m => (m.id === mail.id ? updatedMail : m))
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

    function handleChange({ target }) {
        // const field = target.name
        // let value = target.value
        // switch (target.type) {
        //     case 'number':
        //     case 'range':
        //         value = +value
        //         break;

        //     case 'checkbox':
        //         value = target.checked
        //         break
        // }

        // setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
        setFilterBy({ txt: target.value })
    } 

    if (!mails) return

    return (
        <Fragment>
            <div className="new-filter">
                <button className="new-email" onClick={() => setIsDialogOpen(true)}>
                    Compose
                </button>
                <input onChange={handleChange}  className="filter-emails" type="text" placeholder="Filter by Subject, To, or Body"/>
            </div>
            {isDialogOpen && (
                <MailNew onClose={() => setIsDialogOpen(false)} />
            )}

            <section className="mail-list">
                <MailSideNav readCount={readCount} starredCount={starredCount} />
                {!selectedMailId
                    ? <MailList onDeleteMail={onDeleteMail} onSelectMailId={onSelectMailId} onStarrRow={onStarredRow} onUnReadRow={onUnReadRow} mails={mails} />
                    : <MailDetails onUnReadRow={onUnReadRow} onBack={() => setSelectedMailId(null)} emailId={selectedMailId} loadEmails={loadEmails} />
                }
            </section>
        </Fragment>
    )
}
