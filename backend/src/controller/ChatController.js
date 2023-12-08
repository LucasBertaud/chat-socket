const Message = require("../database/Message")

const deleteMessage = async (req, res) => {
    const id = req.params.id.split("|")
    try {
        const deleteMessage = await Message.deleteMessage(id[0], id[1], id[2])
        res.send({message_delete: deleteMessage})
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {deleteMessage}