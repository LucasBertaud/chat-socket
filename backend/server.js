// require components
require('dotenv').config()
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const socketServer = require("./src/socket/socketServer");

// middleware
app.use(cors());

const server = http.createServer(app);

socketServer(server);

// start server
server.listen(3001, ()=>console.log("serveur a démarré"));