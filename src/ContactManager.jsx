import ContactList from "./ContactList"
import NewContact from "./NewContact"
import ContactDetail from "./ContactDetail"
import EditContact from "./EditContact"

import { useReducer, useState, useEffect, useMemo } from "react"

import "./ContactManager.css"

const LOCAL_STORAGE_KEY = `rizkiramadandi.reactcontactmanager`

export class Contact {
    constructor(name, number, id) {
        this.id = id || new Date().getTime() + Math.floor(Math.random() * 9999999),
        this.name = name || "Anonymous",
        this.number = number || null
    }
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getNumber() {
        return this.number
    }
    setName(name) {
        this.name = name
    }
    setNumber(number) {
        this.number = number
    } 
}

export const ACTION_TYPE = {
    ADD_CONTACT: "add_contact",
    OVERWRITE_CONTACT_LIST: "overwrite_contact_list",
    DELETE_CONTACT: "delete_contact",
    EDIT_CONTACT: "edit_contact"
}

function reducer(contactList, action) {
    switch(action.type) {
        case ACTION_TYPE.ADD_CONTACT:
            return [...contactList, action.payload.contact]
        case ACTION_TYPE.OVERWRITE_CONTACT_LIST:
            return action.payload.contactList.map(cl => new Contact(cl.name, cl.number, cl.id))
        case ACTION_TYPE.DELETE_CONTACT:
            if(confirm("Are you sure want to delete this data?")) {
                return contactList.filter(cl => cl.id !== action.payload.id)
            }
            return contactList
        case ACTION_TYPE.EDIT_CONTACT:
            let a =  contactList.map(cl => {
                if(cl.id === action.payload.id) {
                    cl.setName(action.payload.name)
                    cl.setNumber(action.payload.number)
                }
                return cl
            })
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contactList))
            return contactList
        default:
            return contactList
    }
}

const DEFAULT_NAMES = [
"Gertie",
"Clauddetta",
"Caesar",
"Bow",
"Tova",
"Shilpa",
"Robena",
"Parth",
"Tyeshia",
"Cera",
"Marsiella",
"Kaneshia",
"Amen",
"Renae",
"Dwyer",
"Zoldi",
"Wanonah",
"Lacombe",
"Melynda",
"Jovonna",
"Reube",
"Dasha",
"Pierette",
"Cochrane",
"Margues",
"Rhandi",
"Ferdie",
"Garibull",
"Shamra",
"Christorpher",
"Cully",
"Healey",
"Tristan",
"Frederiksen",
"Morley",
"Helban",
"Azusena",
"Crespi",
"Pasco",
"Annika",
"Kenon",
"Lavonte",
"Marshawn",
"Lorenna",
"Coates",
"Senecal",
"Galen",
"Ed",
"Boeke",
"Atlante",
"Eduino",
"Karlis",
"Maximiliano",
"Mellanie",
"Devorah",
"Veronica",
"Ciaira",
"Queston",
"Packston",
"Latoya",
"Olathe",
"Derayne",
"Deragon",
"Joannie",
"Mutz",
"Alfreda",
"Audrina",
"Acey",
"Shiketa",
"Josue",
"Whitby",
"Ly",
"Chandelle",
"Jaquis",
"Breann",
"Quana",
"Amrit",
"Cleofas",
"Gretta",
"Lundquist",
"Roxanna",
"Jammin",
"Rod",
"Manny",
"Reed",
"Shamica",
"Isaac",
"Bullen",
"Mary",
"Syreeta",
"Okun",
"Filippo",
"Joshaua",
"Whitman",
"Somnang",
"Ruthi",
"Gianfranco",
"Domel",
"Dombrowski",
"Grantham"
]

function generateDefault(n) {
    let res = []
    for(let i = 0 ; i < n ; i++) {
        res.push(new Contact(`${DEFAULT_NAMES[Math.floor(Math.random() * (DEFAULT_NAMES.length - 1))]} ${DEFAULT_NAMES[Math.floor(Math.random() * (DEFAULT_NAMES.length - 1))]}`, `+${Math.random().toString().slice(2, 12)}`))
    }
    return res
}

export default function ContactManager() {
    const [contactList, dispatch] = useReducer(reducer, generateDefault(100))

    const [newContactPage, setNewContactPage] = useState(false)
    const [activeId, setActiveId] = useState(null)
    const [editActiveId, setEditActiveId] = useState(null)
    const [search, setSearch] = useState("")

    const filteredContactList = useMemo(() => {
        return (
            contactList.filter(cl => cl.name.toLowerCase().includes(search) )
        )
    }, [search, contactList])
    
    // load local storage data if exist. run only at initialization
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if(storedData) dispatch({ type: ACTION_TYPE.OVERWRITE_CONTACT_LIST, payload: { contactList: storedData } })
      }, [])

      // save data to local storage every time second parameter (contactList) change.
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contactList))
      }, [contactList])

    return (
        <>
            <div className="cm-container">
                <div className="cm-header-container">
                    <div className="cm-header">
                        Contact Manager
                    </div>
                    <div className="cm-search-container">
                        <input placeholder="Cari kontak" className="cm-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <ContactList contactList={ filteredContactList } dispatch={ dispatch } setActiveId={ setActiveId } />
                <div className="cm-new-contact-button-container">
                    <button className="cm-new-contact-button" onClick={() => setNewContactPage(true)}>+</button>
                </div>
            </div>

            { (newContactPage) ? (
                <NewContact dispatch={ dispatch } setNewContactPage = { setNewContactPage } />
            ) : (<></>)}

            { (activeId ) ? (
                <ContactDetail contact={ contactList.find(cl => cl.id === activeId) } setActiveId = { setActiveId } dispatch = { dispatch } setEditActiveId = { setEditActiveId } />
            ) : (<></>)}

            { (editActiveId ) ? (
                <EditContact contact={ contactList.find(cl => cl.id === editActiveId) } setEditActiveId = { setEditActiveId } dispatch = { dispatch } />
            ) : (<></>)}
        </>
    )
}