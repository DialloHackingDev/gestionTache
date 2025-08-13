const express = require("express");
const route = express.Router();
const membreControllers = require("../controllers/membre.controller")
const auth = require("../middlewares/auth.midd")

//la fonction pour enregistre un memebre
route.post("/",membreControllers.createMembres)


//la fonction pour afficher tous les membres
route.get("/",auth,membreControllers.readMembres)




//la fonction pour afficher un memebre
route.get("/:id",membreControllers.readMembre)




//la fonctions pour modifier un membre
route.put("/:id",membreControllers.updateMembre)



// la fonction pour supprimer un membres$
route.delete("/:id",membreControllers.deleteMembre)



//la route pour se connecter
route.post("/login",membreControllers.loginUsers)



module.exports = route;