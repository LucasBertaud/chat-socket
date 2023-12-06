const mongoose = require("mongoose");
const connectDB = require("./Connection");

const Message = mongoose.model('Message', {
    room: String,
    message: Object,
})

async function getAllMessage(data) {
    connectDB();

    const messages = await Message.find({room: data});

    return messages;
}

async function dbNewMessage(data) {
    connectDB();

    const newMessage = new Message({
        room: data.room,
        message: {
            author: data.author,
            time: data.time,
            content: data.message
        }
    })
    await newMessage.save();
    console.log("objet sauvegardé");
}

module.exports = {getAllMessage, dbNewMessage};