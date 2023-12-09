const Register = require("../database/User")
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {
   const pseudo = req.body.pseudo
   const occurence = await Register.occurrenceUser(pseudo);
   if (occurence) {
        res.send({error: "Le pseudo est déjà pris"})
   }else{
        const password = req.body.password
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (!err) {
               Register.registerUser(pseudo, hash)
               res.send({sauvegarde: "Votre compte utilisateur a été sauvegardée"})
          }else{
               console.error(err)
          }
      });
   }
}

const searchUser = async (req, res) => {
     const pseudo = req.body.user
     const password = req.body.password
     console.log(req.body)
}

module.exports = {registerUser, searchUser}