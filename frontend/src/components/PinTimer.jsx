import React, {useState, useEffect} from 'react'

function PinTimer({contact, selectedComponent, lastMessages, socket}) {
    const [timer, setTimer] = useState("")

    useEffect(() => {
        if (socket != undefined) {
            socket.on("receive_message", (msg) => {
                if (contact._id === msg.author_id) {
                    const date = msg.date.split("|")[0]
                    const time = msg.date.split("|")[1]
                    const isSameDate = new Date().toLocaleDateString("FR-fr") === date
                    setTimer(isSameDate ? time : date)
                }
            });
            socket.on("message_to_user_self_room", (message) => {
                if (contact._id === message.author_id) {
                    const date = message.date.split("|")[0]
                    const time = message.date.split("|")[1]
                    const isSameDate = new Date().toLocaleDateString("FR-fr") === date
                    setTimer(isSameDate ? time : date)
                }
            })
        }
        if (selectedComponent == "contact") {
            setTimer("contact")
        }
        if(selectedComponent == "chat"){
            lastMessages.forEach(message => {
                if (message.length > 0 && message[0].author_id == contact._id) {
                    const date = message[0].date.split("|")[0]
                    const time = message[0].date.split("|")[1]
                    const isSameDate = new Date().toLocaleDateString("FR-fr") === date
                    setTimer(isSameDate ? time : date)
                }
            });
        }
    }, [])

  return (
    timer ? 
    <div className="timer">
        {timer}
    </div> 
    : null
  )
}

export default PinTimer
