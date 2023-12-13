import React, {useEffect, useState} from 'react'
import axios from 'axios'

function GetContact({user, contactList, setContactList, selectedComponent, setSelectContact, setRoom}) {
    const [lastMessages, setLastMessages] = useState([])

    useEffect(()=>{
        if (user.contact != undefined) {
            axios.post("http://localhost:3001/user/getcontact", {user: user})
            .then((res)=>{
                setContactList(res.data.listContact)
                axios.post("http://localhost:3001/chat", {id: user.id})
                .then((res) => setLastMessages(res.data.lastMessages))
                .catch((err)=>console.error(err))
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
        contactList.map((e, index) => {
            console.log(lastMessages[index].length)
            return(
            <div className="discussion" 
            key={e._id} 
            onClick={()=>{
                handleClick(e)
            }}>
                <div className="photo" style={{backgroundImage: `url(http://localhost:3001/images/users/${e.image})`}}>
                    {/* <div className="online"></div> */}
                </div>
                <div className="desc-contact">
                    <p className="name">{e.pseudo}</p>
                    <p className="message">
                        {selectedComponent == "contact" ? e.description : selectedComponent == "chat" && lastMessages[index] ? 
                            lastMessages[index][0].length > 0 ? (lastMessages[index][0].content) : (null) : (null)
                        }
                    </p>
                </div>
                <div className="timer">{selectedComponent == "contact" ? "Contact" : selectedComponent == "chat" ? "test" : null}</div>
            </div>
            )
        })
    )
}

export default GetContact