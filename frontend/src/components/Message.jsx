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
            await socket.emit("send_message", messageData, room);
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
            console.log(data)
            data.messages.map((message)=>{
                setListMessage((prev)=>[...prev, {content: message.content, date: message.date, author: message.author, author_id: message.author_id, image: message.image}]);
            });
          });

        return () => socket.off(("receive_message"))
    }, [])

    // Supprime le timer précédent un message du même auteur
    function eraseTime(index, isSameAuthorPreviousMessage) {
        if (isSameAuthorPreviousMessage) {
            setTimeout(() => {
                const selectTimer = document.querySelector(`#timer-${index}`)
                console.log(selectTimer, index)
                if (selectTimer) {
                    selectTimer.remove()
                }
            }, 10);
        }
    }

  return (
    <section className="chat">
        <div className="header-chat">
        <i className="icon fa fa-user-o" aria-hidden="true"></i>
        <p className="name">{selectContact.pseudo}</p>
        <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
        </div>
        
        <div className="messages-chat">
            {listMessage.map((message, index) => {
                const isSameAuthor = message.author === user.pseudo
                const date = message.date.split('|')[0]
                const time = message.date.split('|')[1]
                const isSameDate = new Date().toLocaleDateString("FR-fr") === date
                const previousMessage = listMessage[index - 1]

                let isSameAuthorPreviousMessage
                if (previousMessage) {
                    isSameAuthorPreviousMessage = message.author === previousMessage.author
                    eraseTime(index-1, isSameAuthorPreviousMessage)
                }

                return(
                    <div key={message.author + message.date + index}>
                        {/* Vérifier dans la className si le message provient de l'auteur connecté <div className="response"> */}
                        {/* date ici : vérifier dans listMessage si aucun msg ne correspond à la même date et au même auteur "<p className="time"> 14h58</p>" et "text-only" et "response-time" */}
                        <div className={isSameAuthor || isSameAuthorPreviousMessage ? "message text-only" : "message"}>
                            {!isSameAuthor && !isSameAuthorPreviousMessage ? (
                                <div className="photo" style={{backgroundImage: `url(http://localhost:3001/images/users/${selectContact.image})`}}>
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
                        <p id={`timer-${index}`} className={isSameAuthor ? "time response-time" : "time"}>
                            {isSameDate ? time : date + " à " + time} 
                        </p>
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