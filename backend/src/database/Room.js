const mongoose = require("mongoose");
const Connection = require("./Connection");

const Room = mongoose.model("Room", {
    users: {type: String, required: true},
    messages: {type: Array, required: false}
})

const saveRoom = async (room) => {
    try {
        await Connection()
        const newRoom = await new Room({
            users: room,
            messages: []
        })
        newRoom.save()
        return newRoom
    } catch (error) {
        console.error(error)
        throw error
    }
}

const findRoom = async (room) => {
    try {
        await Connection()
        const findRoom = await Room.findOne({users: room})
        return findRoom
    } catch (error) {
        console.error(error)
        throw error
    }
}

const updateRoom = async (room, message) => {
    try {
        await Connection()
        const updateRoom = await Room.findOneAndUpdate({users: room}, {$addToSet: {messages: message} })
        return updateRoom
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {saveRoom, findRoom, updateRoom}