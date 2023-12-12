const mongoose = require("mongoose");
const Connection = require("./Connection");

const Users = mongoose.model('Users', {
    pseudo: {type: String,  required: true},
    password: {type: String,  required: true},
    image: {type: String, required: false},
    description: {type: String, required: false},
    contact: {type: Array, required: false}
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

async function findById(id){
    try {
        await Connection()
        const user = await Users.findById(id)
        return user
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function searchUsers(value, user){
    try {
        await Connection()
        let arrayId = [user.id]
        if (user.contact) {
            user.contact.forEach(e => arrayId.push(e))
        }
        const users = await Users.find({pseudo: new RegExp(value), _id: {$nin : arrayId}}).limit(8)
        users.forEach(objet => {
            if (objet.password) {
                objet.password = undefined
            }
        })
        return users
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function addContact(userId, contactId){
    try {
        await Connection()
        const user = await Users.findByIdAndUpdate(userId, {$addToSet : {contact: contactId}})
        return user
    } catch (error) {
        console.error(error)
    }
}

async function searchContact(contact){
    try{
        await Connection()
        const listContact = await Users.find({_id: {$in: contact}})
        return listContact
    }catch(error){
        console.error(error)
    }
}

module.exports = {registerUser, occurrenceUser, updateUser, findById, searchUsers, addContact, searchContact};