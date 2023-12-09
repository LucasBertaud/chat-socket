const mongoose = require("mongoose");
const Connection = require("./Connection");

const Users = mongoose.model('Users', {
    pseudo: String,
    password: String,
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
        if (occurence) {
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {registerUser, occurrenceUser};