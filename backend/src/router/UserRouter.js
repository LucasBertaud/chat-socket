const express = require("express");
const router = express.Router();
const {registerUser, logginUser} = require("../controller/UserController")

// routes
router.put('/', registerUser)

router.post('/', logginUser)

module.exports = router