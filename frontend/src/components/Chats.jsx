import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import GetContact from './GetContact';
import Message from './Message';

function Chats({socket, user, room, setRoom, selectedComponent}) {
    const [contactList, setContactList] = useState([])
    const [selectContact, setSelectContact] = useState("")
    const [listMessage, setListMessage] = useState([])

    useEffect(()=>{
      if (room !== "") {
        socket.emit("join_room", room);
        setListMessage([])
      }
    }, [room])

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

export default Chats
