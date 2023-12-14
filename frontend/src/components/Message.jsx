import React, { useEffect, useState } from 'react'

function Message({user, selectContact, socket, room, listMessage, setListMessage}) {
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                content: currentMessage,
                date: new Date().toLocaleDateString("FR-fr") + '|' + new Date().toLocaleTimeString("FR-fr"),
                author: user.pseudo,
                author_id: user.id,
                image: user.image,
            }
            await socket.emit("send_message", messageData, room, selectContact._id);
            setListMessage((list)=>[...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (message) => {
            setListMessage((list)=>[...list, message]);
        });
        socket.on("deleted_message", (messageDeleted) => {
            setListMessage((list) => {
                return list.filter(
                    item => !(item.author == messageDeleted.message.author && item.message == messageDeleted.message.content && item.room == messageDeleted.room && item.time == messageDeleted.message.time)
                )
            })
        })
        socket.on("connect_room", (data) => {
            let arrayMessages = []
            data.messages.map((message, index)=>{
                arrayMessages.push({content: message.content, date: message.date, author: message.author, author_id: message.author_id, image: message.image})
            });
            setListMessage(arrayMessages);
          });

        return () => {
            socket.off("receive_message")
            socket.off("connect_room")
            socket.off("deleted_message")
        }
    }, [])

  return (
    <section className="chat">
        <div className="header-chat">
        <i className="icon fa fa-user-o" aria-hidden="true"></i>
        <p className="name">{selectContact.pseudo}</p>
        <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
        </div>
        
        <div className="messages-chat">
            {listMessage.map((message, index) => {
                const contactImage = selectContact.image ? selectContact.image : "default-user-icon.jpg"
                const isSameAuthor = message.author === user.pseudo
                const date = message.date.split('|')[0]
                const time = message.date.split('|')[1]
                const isSameDate = new Date().toLocaleDateString("FR-fr") === date
                const previousMessage = listMessage[index - 1]
                const nextMessage = listMessage[index + 1]

                let isPreviousMessageSameAuthor
                if (previousMessage) {
                    isPreviousMessageSameAuthor = message.author === previousMessage.author
                }
                let isNextMessageSameAuthor
                if (nextMessage) {
                    isNextMessageSameAuthor = message.author === nextMessage.author
                }

                return(
                    <div key={message.author + message.date + index}>
                        {/* Vérifier dans la className si le message provient de l'auteur connecté <div className="response"> */}
                        {/* date ici : vérifier dans listMessage si aucun msg ne correspond à la même date et au même auteur "<p className="time"> 14h58</p>" et "text-only" et "response-time" */}
                        <div className={isSameAuthor || isPreviousMessageSameAuthor ? "message text-only" : "message"}>
                            {!isSameAuthor && !isPreviousMessageSameAuthor ? (
                                <div className="photo" style={{backgroundImage: `url(http://localhost:3001/images/users/${contactImage})`}}>
                                </div>
                            ) : null}
                            {isSameAuthor ? (
                                <div className="response">
                                    <p className="text"> {message.content} </p>
                                </div>
                            ) : (
                                <p className="text"> {message.content} </p>
                            )}
                        </div>
                        {!isNextMessageSameAuthor ? 
                            <p id={`timer-${index}`} className={isSameAuthor ? "time response-time" : "time"}>
                                {isSameDate ? time : date + " à " + time} 
                            </p>
                            : null
                        }
                    </div>
                )
            })}
        </div>

        <div className="footer-chat">
            <i className="icon fa fa-smile-o clickable" style={{fontSize: "25pt"}} aria-hidden="true"></i>
            <input type="text" className="write-message" placeholder="Type your message here" onChange={(e) => setCurrentMessage(e.target.value)}></input>
            <i className="icon send fa fa-paper-plane-o clickable" aria-hidden="true" onClick={sendMessage}></i>
        </div>
  </section>
  )
}

export default Message