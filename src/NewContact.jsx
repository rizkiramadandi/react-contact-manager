import "./NewContact.css"
import { ACTION_TYPE } from "./ContactManager"

import { Contact } from "./ContactManager"
import { useState, useRef } from "react"
import ProfileIcon from "./profile-icon.svg"

export default function NewContact({ dispatch, setNewContactPage }) {
    const newContact = new Contact()
    const name = useRef("")
    const number = useRef("")

    function formHandler() {
        if(name.current.value && number.current.value) {
            // console.log(name, number)
            newContact.setName(name.current.value)
            newContact.setNumber(number.current.value)
            dispatch({ type: ACTION_TYPE.ADD_CONTACT, payload: { contact: newContact } })

            setNewContactPage(false)
            name.current.value = number.current.value = ""
        }
    }

    return (
        <div className="nc-container">
            <div className="nc-header-container">
                <div className="nc-close" role="button" onClick={() => setNewContactPage(false)}>Tutup</div>
                <div className="nc-header">Kontak Baru</div>
                <div className="nc-save" role="button" onClick={formHandler}>Simpan</div>
            </div>
            <div className="nc-photo-container">
                <div className="nc-photo">
                    <img src={ProfileIcon} alt="Profile Icon" />
                </div>
            </div>
            <div className="nc-form">
                <div className="nc-input-group">
                    <label htmlFor="new-name-input">Nama:</label>
                    <input type="text" ref={name} id="new-name-input" placeholder="Nama" />
                </div>
                <div className="nc-input-group">
                    <label htmlFor="new-number-input">Nomor:</label>
                    <input type="text" ref={number} id="new-number-input" placeholder="Nomor" />
                </div>
            </div>
        </div>
    )
}