

export function MailSideNav({ readCount , starredCount,onFilter }) {
    return (
        <ul className="side-nav">
            <li className="menu-item" onClick={() => onFilter('inbox')}>Inbox <span>{readCount>0 ? readCount : ''}</span></li>
            <li className="menu-item" onClick={() => onFilter('starred')}>Starred <span>{starredCount>0 ? starredCount : ''}</span></li>
            <li className="menu-item">Important</li>
            <li className="menu-item" onClick={() => onFilter('sent')}>Sent</li>
            <li className="menu-item">Draft</li>
            <li className="menu-item">Trash</li>
        </ul>
    )
}
