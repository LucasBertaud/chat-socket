import React, {useEffect} from 'react'
import axios from 'axios'

function GetContact({user, contactList, setContactList, selectedComponent, setSelectContact, setRoom}) {
    useEffect(()=>{
        if (user.contact != undefined) {
            axios.post("http://localhost:3001/user/getcontact", {user: user})
            .then((res)=>{
            setContactList(res.data.listContact)
            })
            .catch((err)=>console.error(err))
        }
    }, [])

    function handleClick(e) {
        setSelectContact(e)
        if (selectedComponent == "chat") {
            setRoom([user.id, e._id].sort().toString())
        }
    }

    return(
        contactList.map(e => {
            return(
            <div className="discussion" 
            key={e._id} 
            onClick={()=>{
                handleClick(e)
            }
            }>
                <div className="photo" style={{backgroundImage: `url(http://localhost:3001/images/users/${e.image})`}}>
                    {/* <div className="online"></div> */}
                </div>
                <div className="desc-contact">
                    <p className="name">{e.pseudo}</p>
                    <p className="message">{selectedComponent == "contact" ? e.description : selectedComponent == "chat" ? "last message" : ""}</p>
                </div>
                <div className="timer">{selectedComponent == "contact" ? "Contact" : selectedComponent == "chat" ? "timer msg" : ""}</div>
            </div>
            )
        })
    )
}

export default GetContact