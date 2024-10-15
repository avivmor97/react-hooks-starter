const { Fragment } = React
const { useState, useEffect } = React

import { MailSideNav } from "../cmps/SideNav.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"

export function MailContainer({ mails }) {

    const [selectedMailId, setSelectedMailId] = useState(null)

    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
    }

    return (
        <Fragment>
            <button className="new-email">Compose</button>
            <section className="mail-list">
                <MailSideNav mails={mails} />
                {!selectedMailId
                    ? <MailList onSelectMailId={onSelectMailId} mails={mails} />
                    : <MailDetails onBack={() => setSelectedMailId(null)} emailId={selectedMailId} />
                }
            </section>
        </Fragment>
    )
}
