const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploads = multer({ dest: 'images/users/'})
const {registerUser, logginUser, updateUser} = require("../controller/UserController")

// routes
router.put('/', registerUser)

router.post('/', logginUser)

router.patch('/', uploads.single('image'), updateUser)

module.exports = router