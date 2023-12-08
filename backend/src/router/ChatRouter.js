const express = require("express");
const router = express.Router();
const {deleteMessage} = require("../controller/ChatController")

// routes
router.delete('/:id', deleteMessage)

module.exports = router