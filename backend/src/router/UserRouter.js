const express = require("express");
const router = express.Router();
const {registerUser, searchUser} = require("../controller/UserController")

// routes
router.put('/', registerUser)

router.post('/', searchUser)

module.exports = router