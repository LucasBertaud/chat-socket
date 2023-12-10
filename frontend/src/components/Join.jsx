import React from 'react'
import { useState } from 'react';

const Join = ({socket, setShowChat, room, setRoom}) => {

    const joinRoom = () => {
        if (room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
        }
    }

    return(
      <>
        <input 
          type="text" 
          placeholder='room' 
          onChange={(e)=>setRoom(e.target.value)} 
        />
        <button onClick={joinRoom}>Join room</button>
      </>
    )
}

export default Join