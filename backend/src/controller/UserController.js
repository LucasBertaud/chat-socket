const User = require("../database/User")
const bcrypt = require("bcrypt")
const cryptoJS = require("crypto-js")

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
     const id = req.params.id

     // gérer les images
     let image = req.body.image
     console.log(image, id)
     if(image){
          image = cryptoJS.SHA256(image).toString;
     }

     const description = req.body.description
     const updateUser = await User.updateUser(id, image, description)
     res.send({update: updateUser})
}

module.exports = {registerUser, logginUser, updateUser}