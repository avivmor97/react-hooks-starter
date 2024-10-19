// mail service
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

// import { storageService } from '../../../services/storage.service.js'

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

function query(filterBy = {}, sortBy = 'date') {
    return storageService.query(EMAIL_KEY)
        .then(email => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i');
                email = email.filter(email =>
                    regex.test(email.body) ||
                    regex.test(email.subject) ||
                    regex.test(email.to)
                )
            }
            if (filterBy.body) {
                const regex = new RegExp(filterBy.body, 'i')
                email = email.filter(book => regex.test(email.body))
            }
            if (filterBy.subject) {
                const regex = new RegExp(filterBy.subject, 'i')
                email = email.filter(book => regex.test(email.subject))
            }
            if (filterBy.createdAt) {
                email = email.filter(email => email.createdAt >= filterBy.createdAt)
            }
            if (filterBy.isRead) {
                email = email.filter(email => email.isRead)
            }
            if (filterBy.isStarred) {
                email = email.filter(email => email.isStarred)
            }
            if (sortBy) {
                if (sortBy === 'date') {
                    email.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (sortBy === 'title') {
                    email.sort((a, b) => a.subject.localeCompare(b.subject));
                }
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

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getDefaultFilter() {
    return { to: '', subject: '', body: '', createdAt: '' }
}

function _createEmailsDemo() {

    let emails = utilService.loadFromStorage(EMAIL_KEY)

    if (!emails || !emails.length) {
        let emails = []
        emails.push(_createEmail(utilService.getTimeStamp('05-06-2024'),
            'Accelerate development with AI',
            'Were excited to share three ways you can use AI to accelerate your development on Pipedream! AI is no longer a secret weapon in software development and we are embedding AI functionality in all parts of the the product, including building, testing, and maintaining workflows.',
            false,
            utilService.getTimeStamp('05-06-2024'),
            null,
            'sacerdoti@pipedream.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('05-10-2024'),
            'Why is ReactJS so bad?',
            'Abdallah Yashir, Expert Software Developer • Answered April 19, 2018 : Why is ReactJS so bad? ReactJS is not a bad Javascript library by no means. It is actually in high demand in the marketplace around the world.',
            false,
            utilService.getTimeStamp('05-10-2024'),
            null,
            'english-personalized-digest@quora.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-05-2024'),
            'What are some interesting SQL queries?',
            'Here’s some of my personal favorites, from the “queries that don"t do much, but are still useful” department',
            false,
            utilService.getTimeStamp('08-05-2024'),
            null,
            'english-personalized-digest@quora.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-05-2024'),
            'Welcome to flaticon',
            'From now on, you can enjoy millions of icons and thousands of stickers to use in your projects and make your work easier. Whether its a mobile app interface, a website or anything else, we have what you are looking for.',
            false,
            utilService.getTimeStamp('13-10-2024'),
            null,
            'freepik@freepik.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-05-2024'),
            'Gmail is now fully supported on Pipedream',
            'Previously, our Gmail integration had limited access, only allowing email to be sent, and developers had to "bring their own" client ID/secret to access search, manage labels, and more. Gmail is now fully integrated, along with 2200+ other app integrations.',
            false,
            utilService.getTimeStamp('20-09-2024'),
            null,
            'Tod at Pipedream@pipedream.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-05-2024'),
            'The latest Google Developers Newsletter is here',
            'Explore what’s new with Android 15 Now released to Android Open Source Project (AOSP), Android 15 will be available later this year on supported Pixel devices. The new version builds on the private and secure platform, improving your productivity while giving you new capabilities to produce beautiful apps, superior media and camera experiences, and a refined user experience, particularly on tablets and foldables.',
            false,
            utilService.getTimeStamp('08-05-2024'),
            null,
            'googledev-noreply@google.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-01-2024'),
            'AnyDesk Incident - Major outage - AnyDesk Network - 23 September 2024',
            'Major outage - AnyDesk Network Incident status: Monitoring A fix has been implemented and we are monitoring the results.',
            false,
            utilService.getTimeStamp('08-01-2024'),
            null,
            'statuspage@statuspage.io',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-28-2024'),
            'Invoices API"S in 2025',
            'Dear Developers We hope this message finds you well.Regarding updating of our invoices APIS in 2025 , we are glad to inform you that invoice-Approval and invoice-MultiApproval APIS are available at  production env for your use according to the documentation',
            false,
            utilService.getTimeStamp('08-28-2024'),
            null,
            'openapi@taxes.gov.il',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('07-01-2024'),
            'Ready to take advantage of network capabilities?',
            'Expert Marisa Strzelecki, Head of Strategy & Partner Program at Telefonica Open Gateway, will present the anti-fraud Open Gateway APIs, which enable the creation of more secure experiences without affecting the user experience.',
            false,
            utilService.getTimeStamp('07-01-2024'),
            null,
            'vonage@vonage.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('06-25-2024'),
            'Corridor Contemporary @ Fresh Paint',
            'Corridor Contemporary is happy to participate in Freshpaint and present a group exhibition of Israeli and international artists. The gallery connects contemporary artists from around the world with the local art scene and will exhibit works by Alon Kedem, Avinadav Begin, Nir Giorgio Levin, Ilan Baruch, Liron Kroll, Alec DeMarco, Alex Katz, Kenny Scharf & Guy Levy.',
            false,
            utilService.getTimeStamp('06-25-2024'),
            null,
            'corridorcontemporary@corridorcontemporary.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('06-01-2024'),
            'Check out this week’s top 10 movies: Israel',
            'A brilliant counterterrorism analyst with a deep distrust of AI discovers it might be her only hope when a mission to capture a renegade robot goes awry',
            false,
            utilService.getTimeStamp('06-01-2024'),
            null,
            'netflix@members.netflix.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('05-28-2024'),
            'We"re making some changes to our PayPal legal agreements',
            'There is no action needed from you today, but if you would like to learn more, you can find details about these changes, when they apply and what you can do if you want to decline the changes on our policy update page. You can also view these changes by visiting PayPal.com, clicking "Legal" at the bottom of the page and then selecting "Policy Updates".',
            false,
            utilService.getTimeStamp('05-28-2024'),
            null,
            'paypal@communications.paypal.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('05-09-2024'),
            'ToolkitPro and SuitePro v24 Beta 1 Available',
            'We are thrilled to announce the release of ToolkitPro and SuitePro v24 Beta 1! This latest version comes packed with exciting features, including full SVG support, a new Gauge control, and a sleek Windows 11 theme. Elevate your software development experience with our cutting-edge tools and components. Try it out today!',
            false,
            utilService.getTimeStamp('05-09-2024'),
            null,
            'newsletter@codejock.ccsend.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('05-02-2024'),
            'Important Update: API Endpoint Changes for Invoice Approval Product',
            'Dear Developers,We hope this message finds you well. We are writing to inform you of some important changes to the API endpoints you are currently using as part of the Invoice Approval Product provided by the Israel Tax Authority.Changes to API Endpoints:·        The current URLs for the Multi-Invoices and Invoices APIs, which are openapi.taxes.gov.il, will be changing to ita-api.taxes.gov.il.·        Please note that both the old and new URLs will continue to function in parallel until May 30, 2024. After this date, the openapi.taxes.gov.il endpoint will be decommissioned and no longer operational.Token URL Change:·   Along with the API endpoints, the token URL for these APIs will also change from openapi.taxes.gov.il to ita-api.taxes.gov.il/shaam/tsandbox/longtimetoken/oauth2/token.',
            false,
            utilService.getTimeStamp('05-02-2024'),
            null,
            'openapi@taxes.gov.il',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('04-12-2024'),
            'View your Exchange Online (Plan 1) invoice',
            'Your Exchange Online (Plan 1) invoice is now available in the Microsoft 365 admin center. Sign in to view it.',
            false,
            utilService.getTimeStamp('04-12-2024'),
            null,
            'microsoft-noreply@microsoft.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('11-14-2024'),
            'ComponentSource Customer Newsletter - October 14, 2024 edition.',
            'SpreadJS by MESCIUS enables you to directly import Excel files from specified URLs into your JavaScript web applications.',
            false,
            utilService.getTimeStamp('11-14-2024'),
            null,
            'componentsource@componentsource.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('10-24-2024'),
            'Check Out 10+ Biggest Level Zero: Extraction Improvements So Far',
            'Level Zero: Extraction entered Steam Early Access on August 13th. Below is a summary of the most impactful changes and improvements we’ve made so far during the Early Access development. Make sure to jump into the game and check them out.',
            false,
            utilService.getTimeStamp('10-24-2024'),
            null,
            'tinybuild@tinybuild.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('10-19-2024'),
            'September 2024 - V7 RELEASED | Legacy | Special Offer | Community | Findable...',
            'SAVE TODAY On Subscription Licenses TAKE ADVANTAGE',
            false,
            utilService.getTimeStamp('10-19-2024'),
            null,
            'dbi-tech@dbi-tech.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('10-09-2024'),
            'Meet our new Lisa Page Literary Education Fellow',
            'Dear Friend,New school year, new PEN/Faulkner season! We are excited to welcome our Lisa Page Literary Education Fellow for the 2024-25 academic year. In addition, our fall calendar is chock-a-block with exciting events starting with Deep Dives, followed by our Literary Garden Party. Join us! All our best to you and yours,The PEN/Faulkner Team',
            false,
            utilService.getTimeStamp('10-09-2024'),
            null,
            'penfaulkner@penfaulkner.org',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-27-2024'),
            'New Worlds, New Challenges – Are You Ready?',
            'Embark on a legendary journey westward. Confront your fate, shape-shift into mythical beasts, and battle epic foes in this action-packed RPG.',
            false,
            utilService.getTimeStamp('08-27-2024'),
            null,
            'cdkeys@p.cdkeys.com',
            'user@appsus.com',
            false
        ))
        emails.push(_createEmail(utilService.getTimeStamp('08-27-2024'),
            'Receipt for Your Payment to Google Payment Limited',
            'You paid ‪₪8.00 ILS‬ to Google Payment Limited',
            false,
            utilService.getTimeStamp('08-27-2024'),
            null,
            'paypal@paypal.co.il',
            'user@appsus.com',
            false
        ))
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function getEmail(createdAt = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = null, from = '', to = '', isStarred = false) {
    return {
        createdAt: createdAt,
        subject: subject,
        body: body,
        isRead: isRead,
        sentAt: sentAt,
        removedAt: removedAt,
        from: from,
        to: to,
        isStarred: isStarred
    }
}

function _createEmail(createdAt = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = null, from = '', to = '') {
    const email = getEmail(createdAt, subject, body, isRead, sentAt, removedAt, from, to)
    email.id = utilService.makeId(10)
    return email
}