import "./EditContact.css"
import ProfileIcon from "./profile-icon.svg"

import { ACTION_TYPE } from "./ContactManager"

import { useRef } from "react"

export default function EditContact({ contact, setEditActiveId, dispatch }) {
    const name = useRef("")
    const number = useRef("")

    function saveEdit() {
        if(name.current.value && number.current.value) {
            dispatch({ type: ACTION_TYPE.EDIT_CONTACT, payload: { id: contact.getId(), name: name.current.value, number: number.current.value } })
            name.current.value = number.current.value = ""
            setEditActiveId(null)
        }
    }

    return (
        <div className="ec-container">
            <div className="ec-header-container">
                <div className="ec-close" role="button" onClick={() => setEditActiveId(null)}>Batal</div>
                <div className="ec-header">Edit Kontak</div>
                <div className="ec-delete" role="button" onClick={saveEdit}>Simpan</div>
            </div>

            <div className="ec-photo-container">
                <div className="ec-photo">
                    <img src={ProfileIcon} alt="Profile Icon" />
                </div>
            </div>

            <div className="ec-form">
                <div className="ec-input-group">
                    <label htmlFor="edit-name-input">Nama:</label>
                    <input type="text" defaultValue={ contact.getName() } ref={name} />
                </div>

                <div className="ec-input-group">
                <label htmlFor="edit-name-input">Nomor:</label>
                    <input type="text" defaultValue={ contact.getNumber() } ref={number} />
                </div>
            </div>
        </div>
    )
}