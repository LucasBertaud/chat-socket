import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PinMessage from './PinMessage'

function GetContact({user, contactList, setContactList, selectedComponent, setSelectContact, setRoom, socket}) {
    const [lastMessages, setLastMessages] = useState([])

    useEffect(()=>{
        if (user.contact != undefined) {
            axios.post("http://localhost:3001/user/getcontact", {user: user})
            .then((re)=>{
                axios.post("http://localhost:3001/chat", {id: user.id})
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

    function showTimer(index){
        if (selectedComponent == "contact") {
            return("contact")
        }
        if(selectedComponent == "chat" && lastMessages[index] != undefined){
            if (lastMessages[index].length > 0) {
                const time = lastMessages[index][0].date.split("|")[1]
                const date = lastMessages[index][0].date.split("|")[0]
                const isSameDate = new Date().toLocaleDateString("FR-fr") === date
                return(<div className="timer">{isSameDate ? time : date}</div>)
            }
        }
    }

    return(
        contactList.map((e, index) => {
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
                    <PinMessage key={e._id + index} contact={e} index={index} selectedComponent={selectedComponent} lastMessages={lastMessages} socket={socket}/>
                </div>
                {showTimer(index)}
            </div>
            )
        })
    )
}

export default GetContact