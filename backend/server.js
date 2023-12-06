// require components
require('dotenv').config()
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const Socket = require("./src/socket/Socket");

// create server
app.use(cors());
const server = http.createServer(app);

Socket.Socket(server);

// start server
server.listen(3001, ()=>console.log("serveur a démarré"));