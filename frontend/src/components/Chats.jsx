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
      }
    }, [room])

    useEffect(() => {
      if (user !== "") {
        socket.emit("user_self_room", user.id);
      }
  
      return () => {
        setRoom("")
        setSelectContact("")
      };
    },[]);

    return(
        <>
            <section className="discussions">
              <div className="discussion search">
                <div className="searchbar">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  <input type="text" placeholder="Search..."></input>
                </div>
              </div>
              <GetContact user={user} contactList={contactList} setContactList={setContactList} selectedComponent={selectedComponent} setSelectContact={setSelectContact} setRoom={setRoom} socket={socket} />
            </section>
            {selectContact ? <Message user={user} selectContact={selectContact} socket={socket} room={room} listMessage={listMessage} setListMessage={setListMessage} /> : null}
          </>
    )
}

export default Chats
