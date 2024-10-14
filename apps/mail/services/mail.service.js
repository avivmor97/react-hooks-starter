// mail service
import { storageService } from "../../../services/async-storage.service"
import { utilService } from "../../../services/util.service.js"

const EMAIL_KEY = 'email-key'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createEmailsDemo()

export const emailsService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmail
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(email => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.subject, 'i')
                book = book.filter(book => regex.test(email.subject))
            }
            if (filterBy.description) {
                const regex = new RegExp(filterBy.body, 'i')
                book = book.filter(book => regex.test(email.body))
            }
            if (filterBy.createdAt) {
                email = email.filter(email => email.createdAt >= filterBy.createdAt)
            }
            return email
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(book) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getDefaultFilter() {
    return { subject: '', body: '', createdAt: '' }
}

function _createEmailsDemo() {
    let emailS = utilService.loadFromStorage(EMAIL_KEY)
    if (!emailS || !emailS.length) {
        emailS = []
        emailS.push(_createEmail(utilService.getTimeStamp('05-06-2024'),
            'Accelerate development with AI',
            'Were excited to share three ways you can use AI to accelerate your development on Pipedream! AI is no longer a secret weapon in software development and we are embedding AI functionality in all parts of the the product, including building, testing, and maintaining workflows.',
            false,
            utilService.getTimeStamp('05-06-2024'),
            null,
            'sacerdoti@pipedream.com',
            'user@appsus.com'
        ))
        emailS.push(_createEmail(utilService.getTimeStamp('05-10-2024'),
            'Why is ReactJS so bad?',
            'Abdallah Yashir, Expert Software Developer • Answered April 19, 2018 : Why is ReactJS so bad? ReactJS is not a bad Javascript library by no means. It is actually in high demand in the marketplace around the world.',
            false,
            utilService.getTimeStamp('05-10-2024'),
            null,
            'english-personalized-digest@quora.com',
            'user@appsus.com'
        ))
        emailS.push(_createEmail(utilService.getTimeStamp('08-05-2024'),
        'What are some interesting SQL queries?',
        'Here’s some of my personal favorites, from the “queries that don"t do much, but are still useful” department',
        false,
        utilService.getTimeStamp('08-05-2024'),
        null,
        'english-personalized-digest@quora.com',
        'user@appsus.com'
        ))
        storageService.saveToStorage(EMAIL_KEY, emailS)
    }
}

function getEmail(createdAt = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = null, from = '', to = '') {
    return {
        createdAt: createdAt,
        subject: subject,
        body: body,
        isRead: isRead,
        sentAt: sentAt,
        removedAt: removedAt,
        from: from,
        to: to
    }
}

function _createEmail(createdAt = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = null, from = '', to = '') {
    const book = getBook(createdAt, subject, body, isRead, sentAt, removedAt, from, to)
    book.id = utilService.makeId(10)
    return book
}