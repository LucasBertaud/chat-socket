// require components
require('dotenv').config()
const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const socketServer = require("./src/socket/socketServer")
const bodyParser = require("body-parser")
const chatRouter = require("./src/router/ChatRouter")

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use("/chat", chatRouter)

const server = http.createServer(app)

socketServer(server)

// start server
server.listen(3001, ()=>console.log("serveur a démarré"))