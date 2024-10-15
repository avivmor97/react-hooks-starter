
export function MailSideNav({ mails }) {
    return (
        <ul className="side-nav">
            <li className="menu-item">Inbox <span>{mails.length}</span></li>
            <li className="menu-item">Starred</li>
            <li className="menu-item">Important</li>
            <li className="menu-item">Sent</li>
            <li className="menu-item">Draft</li>
            <li className="menu-item">Categories</li>
        </ul>
    )
}
