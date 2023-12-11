const mongoose = require("mongoose");
const Connection = require("./Connection");

const Users = mongoose.model('Users', {
    pseudo: {type: String,  required: true},
    password: {type: String,  required: true},
    image: {type: String, required: false},
    description: {type: String, required: false}
})

async function registerUser(pseudo, password) {
    try {
        await Connection()
        const registeredUser = new Users({
            pseudo: pseudo,
            password: password,
        })
        await registeredUser.save();
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function occurrenceUser(pseudo){
    try {
        await Connection()
        const occurence = await Users.findOne({pseudo: pseudo})
        return occurence
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function updateUser(id, image, description){
    try {
        await Connection()
        const update = await Users.findByIdAndUpdate(id, {
            image: image, description: description
        })
        return update
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {registerUser, occurrenceUser, updateUser};