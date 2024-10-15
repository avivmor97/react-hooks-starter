const { Link } = ReactRouterDOM
const { useState, useEffect } = React


import { MailContainer } from "../pages/MailContainer.jsx"
import { emailsService} from "../services/mail.service.js"


export function MailIndex() {
    //return <div>mail app</div>
    const [emails,setEmails]=useState(null)

    useEffect(()=>{
        loadEmails()
    },[])

    function loadEmails(){
        emailsService.query().then(setEmails).catch(err=>{
            console.log('err', err)
        })
    }

    if (!emails) return
    return (
        <section className="emails-index">
            <MailContainer mails={emails}/>
        </section>
    )
}

