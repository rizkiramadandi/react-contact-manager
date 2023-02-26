import "./Contact.css"
import ProfileIcon from "./profile-icon.svg"

export default function Contact({ contact, setActiveId }) {
    
    return (
        <div className="c-container" onClick={() => setActiveId(contact.getId())} role="button">
            <div className="c-photo">
                <img src={ProfileIcon} alt="Profile Icon" />
            </div>
            <div className="c-name">{ contact.getName() }</div>
        </div>
    )
}