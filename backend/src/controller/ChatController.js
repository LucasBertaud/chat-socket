const Room = require("../database/Room")

const getRoom = async (room) => {
    const findRoom = await Room.findRoom(room)
    if (findRoom) {
        return findRoom
    }else{
        const saveRoom = await Room.saveRoom(room)
        if (saveRoom) {
            return saveRoom
        } else {
            return "Error: cannot initialize chat"
        }
    }
}

const updateRoom = async (room, message) => {
    const updateRoom = await Room.updateRoom(room, message)
    if (updateRoom) {
        return updateRoom
    } else {
        return "error: chat not updated"
    }
}

//  post('/', getLastMessages)
const getLastMessages = async (req, res) => {
    const id = req.body.id
    const chats = await Room.findLastMessages(id)

    if (chats) {
        let lastMessages = []
        chats.forEach(el => lastMessages.push(el.messages.slice(-1)))
        res.send({lastMessages: lastMessages})
    }else{
        res.send({error: "error finding chats"})
    }
}

module.exports = {getRoom, updateRoom, getLastMessages}