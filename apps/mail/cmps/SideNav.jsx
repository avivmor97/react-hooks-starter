
export function MailSideNav({ readCount , starredCount}) {
    return (
        <ul className="side-nav">
            <li className="menu-item">Inbox <span>{readCount>0 ? readCount : ''}</span></li>
            <li className="menu-item">Starred <span>{starredCount>0 ? starredCount : ''}</span></li>
            <li className="menu-item">Important</li>
            <li className="menu-item">Sent</li>
            <li className="menu-item">Draft</li>
            <li className="menu-item">Trash</li>
        </ul>
    )
}
