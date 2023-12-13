const express = require("express");
const router = express.Router();
const {getLastMessages} = require("../controller/ChatController")

// routes
 router.post('/', getLastMessages)

module.exports = router