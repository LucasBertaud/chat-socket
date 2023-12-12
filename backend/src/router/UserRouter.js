const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js")
const path = require('path')
const {registerUser, logginUser, updateUser, infoUser, searchUsers, addContact, getContact} = require("../controller/UserController")
const multer = require("multer");

// multer mechanics
const storage = multer.diskStorage({
    destination: './public/images/users/',
    filename: (req, file, cb) => {
        if (path.extname(file.originalname).toLowerCase() == ".jpg" || path.extname(file.originalname).toLowerCase() == ".png") {
            const fileName = Date.now().toString() + cryptoJS.SHA256(file.originalname).toString() + path.extname(file.originalname).toLowerCase();
            cb(null, fileName)    
        }
    },
})
const uploads = multer({storage: storage})

// routes
router.put('/', registerUser)

router.post('/', logginUser)

router.patch('/', uploads.single('image'), updateUser)

router.post('/info', infoUser)

router.post('/searchusers', searchUsers)

router.put('/addcontact', addContact)

router.post('/getcontact', getContact)

module.exports = router