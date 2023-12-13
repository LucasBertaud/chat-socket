const Room = require("../controller/ChatController");

function socketServer(server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.on("connection", (socket)=>{
        console.log(`User Connected: ${socket.id}`);
        
        socket.on("join_room", async (room) => {
            socket.join(room);
            const getRoom = await Room.getRoom(room)
            socket.emit("connect_room", getRoom);
            console.log(`User with id : ${socket.id} join room ${room}`)
        });

        socket.on("send_message", async (message, room) => {
            socket.to(room).emit("receive_message", message);
            const updateRoom = await Room.updateRoom(room, message)
            console.log(`New message emited from room ${room} by author ${message.author} at ${message.date}. The content of message is "${message.content}" `);
        });

        socket.on("delete_message", (data) => {
            socket.to(data.room).emit("deleted_message", data)
            console.log(`Message has been deleted by ${data.message.author}`)
        })

        socket.on("disconnect", ()=>{
            console.log("User Disconnect: ", socket.id)
        });
    });
}

module.exports = socketServer;