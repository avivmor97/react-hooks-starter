const { Fragment } = React
const { useState, useEffect } = React

import { emailsService } from "../services/mail.service.js"
import { MailSideNav } from "../cmps/SideNav.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailNew } from './MailNew.jsx'

export function MailContainer() {

    const [selectedMailId, setSelectedMailId] = useState(null)
    const [mails, setEmails] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [readCount, setReadCount] = useState(0)
    const [starredCount, setStarredCount] = useState(0)
    const [filterBy, setFilterBy] = useState({ txt: '' })
    const [filteredMails, setFilteredMails] = useState([])
    const [sortBy, setSortBy] = useState('date')

    useEffect(() => {
        loadEmails()
    }, [filterBy, sortBy])

    useEffect(() => {
        if (mails) {
            const readEmailsCount = mails.filter(mail => !mail.isRead).length
            setReadCount(readEmailsCount)
            const starredEmailsCount = mails.filter(mail => mail.isStarred).length
            setStarredCount(starredEmailsCount)
        }
    }, [mails])

    useEffect(() => {
        filterMails('inbox');
    }, [mails])

    function loadEmails() {
        emailsService.query(filterBy, sortBy).then(setEmails).catch(err => {
            console.log('err', err)
        })
    }

    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
    }


    function onDeleteMail(mailId) {
        const mail = mails.find(m => m.id === mailId)
        if (!mail) return

        if (!mail.removedAt) {
            // Move to trash
            const updatedMail = { ...mail, removedAt: Date.now() }
            const updatedMails = mails.map(email => (email.id === mail.id ? updatedMail : email))

            setEmails(updatedMails);
            emailsService.save(updatedMail) 
                .then(() => console.log('Email moved to trash'))
                .catch(err => console.log('Error moving email to trash:', err))
        } else {
            // total delete
            emailsService.remove(mailId)
                .then(() => {
                    setEmails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                    console.log('Email deleted permanently')
                })
                .catch(err => {
                    console.log('Error deleting email:', err)
                })
        }
    }

    function onStarredRow(mail) {
        const updatedMail = { ...mail, isStarred: !mail.isStarred }
        const updatedMails = mails.map(email => (email.id === mail.id ? updatedMail : email))
        setEmails(updatedMails)
        emailsService.save(updatedMail)
    }

    function onUnReadRow(mailId) {
        const mail = mails.find(m => m.id === mailId)
        if (!mail) return;
        const updatedMail = { ...mail, isRead: !mail.isRead }
        const updatedMails = mails.map(email => (email.id === mail.id ? updatedMail : email))
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
        setFilterBy({ txt: target.value })
    }

    const filterMails = (category) => {
        let filtered = mails

        switch (category) {
            case 'inbox':
                filtered = mails.filter(mail => mail.from !== 'user@appsus.com' && mail.removedAt === null)
                break
            case 'starred':
                filtered = mails.filter(mail => mail.isStarred && mail.from !== 'user@appsus.com' && mail.removedAt === null)
                break
            case 'sent':
                filtered = mails.filter(mail => mail.from === 'user@appsus.com' && mail.removedAt === null)
                break
            case 'trash':
                filtered = mails.filter(mail => mail.removedAt !== null)
                break
            default:
                break
        }

        setFilteredMails(filtered);
    }

    function sendMail(newMail) {
        return emailsService.save(newMail)
            .then(savedMail => {
                setEmails(prevMails => [...prevMails, savedMail])
                return savedMail
            })
    }


    if (!mails) return



    return (
        <Fragment>
            <div className="new-filter">
                <button className="new-email" onClick={() => setIsDialogOpen(true)}>
                    Compose
                </button>
                <input onChange={handleChange}
                    className="filter-emails"
                    type="text"
                    placeholder="Filter by Subject, To, or Body"
                />
                <div className="filter-options">
                    <label className="filter-option-1">
                        <input className="input-list"
                            type="checkbox"
                            onChange={(e) => setFilterBy(prev => ({ ...prev, isRead: e.target.checked }))}
                        />
                        Read
                    </label>

                    <label className="filter-option-2">
                        Sort by:
                        <select onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                            <option value="date">Date</option>
                            <option value="title">Title</option>
                        </select>
                    </label>
                </div>
            </div>
            {isDialogOpen && (
                <MailNew onClose={() => setIsDialogOpen(false)} onSendMail={sendMail} />
            )}

            <section className="mail-list">
                <MailSideNav readCount={readCount} starredCount={starredCount} onFilter={filterMails} />
                {!selectedMailId
                    ? <MailList onDeleteMail={onDeleteMail} onSelectMailId={onSelectMailId} onStarrRow={onStarredRow} onUnReadRow={onUnReadRow} mails={filteredMails} />
                    : <MailDetails onUnReadRow={onUnReadRow} onBack={() => setSelectedMailId(null)} emailId={selectedMailId} loadEmails={loadEmails} />
                }
            </section>
        </Fragment>
    )
}
