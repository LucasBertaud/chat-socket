require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const Message = mongoose.model('Message', {
    room: String,
    message: Object,
})

async function connectDB() {
    await mongoose.connect(process.env.MONGO_LOCAL_URL);
    console.log("base de donnée connectée");
}

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

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`);
    
    socket.on("join_room", async (room) => {
        socket.join(room);
        const messages = await getAllMessage(room);
        socket.emit("connect_room", messages);
        console.log(`User with id : ${socket.id} join room ${room}`)
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(`New message emited from room ${data.room} by author ${data.author} at ${data.time}. The content of message is "${data.message}" `);

        dbNewMessage(data).catch(err => console.log(err));
    });

    socket.on("disconnect", ()=>{
        console.log("User Disconnect: ", socket.id)
    });
});

// lancer le serveur
server.listen(3001, ()=>console.log("serveur a démarré"));