const mongoose = require("mongoose");
const Connection = require("./Connection");

const Message = mongoose.model('Message', {
    room: String,
    message: Object,
})

function getAllMessage(data) {
    Connection()
        .then(async () => {
            const messages = await Message.find({room: data});
            return messages;
        })
        .catch((error)=>{
            console.log(error)
        })   
}

function dbNewMessage(data) {
    Connection()
        .then(async ()=>{
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
        })
        .catch((error)=>{
            console.log(error)
        })
}

module.exports = {getAllMessage, dbNewMessage};