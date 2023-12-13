import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import GetContact from './GetContact';
import Message from './Message';

function Chats({socket, user, room, setRoom, selectedComponent}) {
    const [contactList, setContactList] = useState([])
    const [selectContact, setSelectContact] = useState("")
    const [listMessage, setListMessage] = useState([])

    // const deleteMessage = (element) => {
    //     const key = element.currentTarget.dataset.key
    //     axios.delete(`http://localhost:3001/chat/${key}`)
    //     // axios.delete(`https://server-chat-socket-p1w9.onrender.com/chat/${key}`)
    //         .then(async (res) => {
    //             const messageDeleted = res.data.message_delete
    //             setListMessage(listMessage.filter(
    //                 item => !(item.author == messageDeleted.message.author && item.message == messageDeleted.message.content && item.room == messageDeleted.room && item.time == messageDeleted.message.time)
    //             ))
    //             await socket.emit("delete_message",messageDeleted)
    //         }).catch((err) => {
    //             console.error(err)
    //         });
    // }

    useEffect(()=>{
      if (room !== "") {
        socket.emit("join_room", room);
        setListMessage([])
      }
    }, [room])
    
//   return (
//     <div>
//         <div className="header-chat">Chat Room {room}</div>
//         <hr />
//         <div className="body-chat">
//             {listMessage.map((message)=>{
//                 return(
//                     <div key={message.author + message.message + message.time + message.room} data-key={message.author + message.time + message.room + message.message} className="message" id={message.author === user ? "you" : "notyou"} style={{position: 'relative'}}>
//                         <p className="top-message">{message.author} {message.time}</p>
//                         <p className="bottom-message">{message.message} 
//                         { message.author === user ?
//                             (<button data-key={message.author + "|" + message.time + "|" + message.room} onClick={deleteMessage} style={{position: 'absolute', right: "20px", top: "30%"}}>Delete</button>)
//                             :
//                             (<></>)
//                         }
//                         </p>
//                     </div>
//                 )
//             })}
//         </div>
//         <hr />
//         <div className="footer-chat">
//             <input 
//                 onChange={(e)=>setCurrentMessage(e.target.value)} 
//                 type="text" 
//                 placeholder='blabla...'
//             />
//             <button onClick={sendMessage}>Envoyer le message</button>
//         </div>
//     </div>
//   )

    return(
        <>
            <section className="discussions">
              <div className="discussion search">
                <div className="searchbar">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  <input type="text" placeholder="Search..."></input>
                </div>
              </div>
              <GetContact user={user} contactList={contactList} setContactList={setContactList} selectedComponent={selectedComponent} setSelectContact={setSelectContact} setRoom={setRoom}/>
            </section>
            {selectContact ? <Message user={user} selectContact={selectContact} socket={socket} room={room} listMessage={listMessage} setListMessage={setListMessage} /> : ""}
          </>
    )
}

Chats.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.string,
    room: PropTypes.string
}

export default Chats
