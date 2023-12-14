import React, {useState, useEffect} from 'react'

function PinMessage({contact, selectedComponent, lastMessages, socket}) {
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (socket != undefined) {
            socket.on("receive_message", (msg) => {
                if (contact._id === msg.author_id) {
                    setMessage(msg.content)
                }
            });
            socket.on("message_to_user_self_room", (message) => {
                if (contact._id === message.author_id) {
                    setMessage(message.content)
                }
            })
        }
        
        if (selectedComponent == "contact") {
            setMessage(contact.description)
        }
        if(selectedComponent == "chat"){
            lastMessages.forEach(message => {
                if (message.length > 0 && message[0].author_id == contact._id) {
                    setMessage(message[0].content)
                }
            });
        }
    }, [])

  return (
    <p className="message">
        {message}
    </p>
  )
}

export default PinMessage