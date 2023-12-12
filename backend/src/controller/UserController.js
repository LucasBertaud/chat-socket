const User = require("../database/User")
const bcrypt = require("bcrypt")
const fs = require("fs");

// put('/', registerUser)
const registerUser = async (req, res) => {
   const pseudo = req.body.pseudo
   const occurence = await User.occurrenceUser(pseudo);
   if (occurence) {
        res.send({error: "Le pseudo est déjà pris"})
   }else{
        const password = req.body.password
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (!err) {
               User.registerUser(pseudo, hash)
               res.send({sauvegarde: "Votre compte utilisateur a été sauvegardée"})
          }else{
               console.error(err)
          }
      });
   }
}

// post('/', logginUser)
const logginUser = async (req, res) => {
     const pseudo = req.body.user
     const password = req.body.password
     const occurence = await User.occurrenceUser(pseudo);
     if (occurence) {
          const comparePass = await bcrypt.compare(password, occurence.password)
          if (comparePass) {
               res.send({pseudo: pseudo, user_id: occurence.id})
          }else{
               res.send({error: "Le mot de passe n'est pas correct"})
          }
     }else{
          res.send({error: "Le pseudo n'existe pas"})
     }
}

// patch('/', updateUser)
const updateUser = async (req, res) => {
     const id = req.body.id
     let image
     if (req.file != undefined) {
          image = req.file.filename
     }
     const description = req.body.description
     
     const user = await User.findById(id)
     if (image && user.image) {
          if (fs.existsSync(`./public/images/users/${user.image}`)) {
               fs.unlink(`./public/images/users/${user.image}`, (err)=>{
                    if (err) {
                         console.error(err)
                         throw err
                    }
               })
          }
     }

     await User.updateUser(id, image, description)
     res.send({update: image})
}

// post('/info', infoUser)
const infoUser = async(req, res) => {
     const id = req.body.id
     const user = await User.findById(id)

     if (user) {
          res.send({img: user.image, description: user.description});
     }else{
          res.send({error: "utilisateur non trouvé"})
     }
}

// post('/searchusers', searchUsers)
const searchUsers = async(req, res) => {
     const search = req.body.search
     const id = req.body.user.id
     const contact = req.body.user.contact
     const users = await User.searchUsers(search, id, contact)
     res.send({users: users})
}

// put('/addcontact', addContact)
const addContact = async (req, res) => {
     const userId = req.body.user.id
     const contactId = req.body.contact._id
     User.addContact(userId, contactId)
     console.log(contactId, userId)
}

module.exports = {registerUser, logginUser, updateUser,  infoUser, searchUsers, addContact}