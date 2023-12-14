import React, {useState, useEffect} from 'react'

function PinMessage({contact, index, selectedComponent, lastMessages, socket}) {
    const [message, setMessage] = useState("")

    useEffect(() => {
        socket.on("receive_message", (msg) => {
            if (contact._id === msg.author_id) {
                setMessage(msg.content)
            }
        });

        if (selectedComponent == "contact") {
            setMessage(contact.description)
        }
        if(selectedComponent == "chat" && lastMessages[index] != undefined){
            if (lastMessages[index].length > 0) {
                setMessage(lastMessages[index][0].content)
            }
        }
    }, [])

  return (
    <p className="message">
        {message}
    </p>
  )
}

export default PinMessage