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

module.exports = {getRoom, updateRoom}