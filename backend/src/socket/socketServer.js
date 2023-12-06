const Message = require("../database/Message");

function socketServer(server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        }
    })

    io.on("connection", (socket)=>{
        console.log(`User Connected: ${socket.id}`);
        
        socket.on("join_room", async (room) => {
            socket.join(room);
            const messages = await Message.getAllMessage(room);
            socket.emit("connect_room", messages);
            console.log(`User with id : ${socket.id} join room ${room}`)
        });

        socket.on("send_message", (data) => {
            socket.to(data.room).emit("receive_message", data);
            console.log(`New message emited from room ${data.room} by author ${data.author} at ${data.time}. The content of message is "${data.message}" `);

            Message.dbNewMessage(data).catch(err => console.log(err));
        });

        socket.on("disconnect", ()=>{
            console.log("User Disconnect: ", socket.id)
        });
    });
}

module.exports = socketServer;