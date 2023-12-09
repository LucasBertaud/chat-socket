// require components
require('dotenv').config()
const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const socketServer = require("./src/socket/socketServer")
const bodyParser = require("body-parser")
const chatRouter = require("./src/router/ChatRouter")
const registerRouter = require("./src/router/UserRouter")

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
app.use("/chat", chatRouter)
app.use("/user", registerRouter)

const server = http.createServer(app)

socketServer(server)

// start server
server.listen(3001, ()=>console.log("serveur a démarré"))