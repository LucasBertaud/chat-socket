import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Chats({socket, user, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [listMessage, setListMessage] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: user,
                message: currentMessage,
                time: new Date(Date.now()).getHours() 
                + ":" + 
                new Date(Date.now()).getMinutes()
                + ":" + 
                new Date(Date.now()).getSeconds()
            }
            await socket.emit("send_message", messageData);
            setListMessage((list)=>[...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setListMessage((list)=>[...list, data]);
            console.log(`Client a bien reçu le message ${data.message}`)
        });
        socket.on("connect_room", (data) => {
            data.map((message)=>{
                setListMessage((list)=>[...list, {room: message.room, author: message.message.author, message: message.message.content, time: message.message.time}]);
            });
        });
    }, []);
    
  return (
    <div>
        <div className="header-chat">Chat Room {room}</div>
        <hr />
        <div className="body-chat">
            {listMessage.map((message)=>{
                return(
                    <div key={message.author + "/" + message.message + "/" + message.time + "/" + message.room} className="message" id={message.author === user ? "you" : "notyou"}>
                        <p className="top-message">{message.author} {message.time}</p>
                        <p className="bottom-message">{message.message}</p>
                    </div>
                )
            })}
        </div>
        <hr />
        <div className="footer-chat">
            <input 
                onChange={(e)=>setCurrentMessage(e.target.value)} 
                type="text" 
                placeholder='blabla...'
            />
            <button onClick={sendMessage}>Envoyer le message</button>
        </div>
    </div>
  )
}

Chats.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.string,
    room: PropTypes.string
}

export default Chats
