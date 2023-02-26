import Contact from "./Contact"
import "./ContactList.css"

export default function ContactList({ contactList, dispatch, setActiveId }) {
    let currentLetter = null
    return (
        <div className="cl-container">
            {contactList.sort((a,b) => a.name.localeCompare(b.name)).map(cl => {
                if(!currentLetter || currentLetter.toUpperCase() < cl.getName()[0].toUpperCase()) {
                    currentLetter = cl.getName()[0].toUpperCase()
                    return (
                        <>
                            <div className="cl-section-header-container">
                                <div className="cl-section-header">
                                    { currentLetter }
                                </div>
                            </div>
                            <Contact key={ cl.getId() } contact={ cl } setActiveId = { setActiveId }/>
                        </>
                    )
                }
                else {
                    return (
                        <Contact key={ cl.getId() } contact={ cl } setActiveId = { setActiveId }/>
                    )
                }
            })}
        </div>
    )
}