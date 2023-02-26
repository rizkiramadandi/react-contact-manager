import "./ContactDetail.css"
import ProfileIcon from "./profile-icon.svg"

import { ACTION_TYPE } from "./ContactManager"

export default function ContactDetail({ contact, setActiveId, dispatch, setEditActiveId }) {
    function deleteContact() {
        setActiveId(null)
        dispatch({ type: ACTION_TYPE.DELETE_CONTACT, payload: { id: contact.getId() } })
    }

    return (
        <div className="cd-container">
            <div className="cd-header-container">
                <div className="cd-close" role="button" onClick={() => setActiveId(null)}>Tutup</div>
                <div className="cd-header">{ contact.getName() }</div>
                <div className="cd-delete" role="button" onClick={deleteContact}>Hapus</div>
            </div>

            <div className="cd-photo-container">
                <div className="cd-photo">
                    <img src={ProfileIcon} alt="Profile Icon" />
                </div>
            </div>

            <div className="cd-info-list-container">
                <div className="cd-info-container">
                    <div className="cd-type">
                        Nama
                    </div>
                    <div className="cd-value">
                        { contact.getName() }
                    </div>
                </div>

                <div className="cd-info-container">
                    <div className="cd-type">
                        Nomor
                    </div>
                    <div className="cd-value">
                        { contact.getNumber() }
                    </div>
                </div>
            </div>

            <div className="cd-button-container">
                <div role="button" className="cd-button" onClick={() => setEditActiveId(contact.getId())}>Edit</div>
            </div>
        </div>
    )
}