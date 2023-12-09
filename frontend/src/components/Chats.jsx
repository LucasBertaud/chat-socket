import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

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

    const deleteMessage = (element) => {
        const key = element.currentTarget.dataset.key
        // axios.delete(`https://server-chat-socket-p1w9.onrender.com/chat/${key}`)
            axios.delete(`http://localhost:3001`)
            .then(async (res) => {
                const messageDeleted = res.data.message_delete
                setListMessage(listMessage.filter(
                    item => !(item.author == messageDeleted.message.author && item.message == messageDeleted.message.content && item.room == messageDeleted.room && item.time == messageDeleted.message.time)
                ))
                await socket.emit("delete_message",messageDeleted)
            }).catch((err) => {
                console.error(err)
            });
    }
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setListMessage((list)=>[...list, data]);
        });
        socket.on("connect_room", (data) => {
            data.map((message)=>{
                setListMessage((list)=>[...list, {room: message.room, author: message.message.author, message: message.message.content, time: message.message.time}]);
            });
        });
        socket.on("deleted_message", (messageDeleted) => {
            setListMessage((list) => {
                return list.filter(
                    item => !(item.author == messageDeleted.message.author && item.message == messageDeleted.message.content && item.room == messageDeleted.room && item.time == messageDeleted.message.time)
                )
            })
        })

        return () => socket.off(("receive_message"))
    }, []);
    
  return (
    <div>
        <div className="header-chat">Chat Room {room}</div>
        <hr />
        <div className="body-chat">
            {listMessage.map((message)=>{
                return(
                    <div key={message.author + message.message + message.time + message.room} data-key={message.author + message.time + message.room + message.message} className="message" id={message.author === user ? "you" : "notyou"} style={{position: 'relative'}}>
                        <p className="top-message">{message.author} {message.time}</p>
                        <p className="bottom-message">{message.message} 
                        { message.author === user ?
                            (<button data-key={message.author + "|" + message.time + "|" + message.room} onClick={deleteMessage} style={{position: 'absolute', right: "20px", top: "30%"}}>Delete</button>)
                            :
                            (<></>)
                        }
                        </p>
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
