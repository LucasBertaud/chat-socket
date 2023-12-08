const mongoose = require("mongoose");
const Connection = require("./Connection");

const Messages = mongoose.model('Message', {
    room: String,
    message: Object,
})

async function deleteMessage(name, date, room) {
    try {
        await Connection()
        const deletedMessage = await Messages.findOneAndDelete({
            room: room,
            'message.author': name,
            'message.time': date,
            'message.content': { $exists: true }
        })
        return deletedMessage;
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getAllMessage(data) {
    try {
        await Connection()
        const messages = await Messages.find({room: data});
        return messages;
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function dbNewMessage(data) {
    try {
        await Connection()
        const newMessage = new Messages({
            room: data.room,
            message: {
                author: data.author,
                time: data.time,
                content: data.message
            }
        })
        await newMessage.save();
        console.log("objet sauvegardé");   
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {getAllMessage, dbNewMessage, deleteMessage};