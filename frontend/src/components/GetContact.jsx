import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PinMessage from './PinMessage'
import PinTimer from './PinTimer'

function GetContact({user, contactList, setContactList, selectedComponent, setSelectContact, setRoom, socket}) {
    const [lastMessages, setLastMessages] = useState([])

    useEffect(()=>{
        if (user.contact != undefined) {
            axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/user/getcontact`, {user: user})
            .then((re)=>{
                axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/chat`, {id: user.id})
                .then((res) => {
                    setContactList(re.data.listContact)
                    setLastMessages(res.data.lastMessages)
                })
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
            const contactImage = e.image ? e.image : "default-user-icon.jpg"
            return(
            <div className="discussion" 
            key={e._id} 
            onClick={()=>{
                handleClick(e)
            }}>
                <div className="photo" style={{backgroundImage: `url(${process.env.REACT_APP_SERVER_BASE_URL}/images/users/${contactImage})`}}>
                    {/* <div className="online"></div> */}
                </div>
                <div className="desc-contact">
                    <p className="name">{e.pseudo}</p>
                    <PinMessage key={e._id + index} contact={e} selectedComponent={selectedComponent} lastMessages={lastMessages} socket={socket}/>
                </div>
                <PinTimer key={index + e._id} contact={e} selectedComponent={selectedComponent} lastMessages={lastMessages} socket={socket}/>
            </div>
            )
        })
    )
}

export default GetContact