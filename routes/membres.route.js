const express = require("express");
const router = express.Router();
const membreControllers = require("../controllers/membre.controller")
const auth = require("../middlewares/auth.midd")

//la fonction pour enregistre un memebre
router.post("/",membreControllers.createMembres)


//la fonction pour afficher tous les membres
router.get("/",membreControllers.readMembres)




//la fonction pour afficher un memebre
router.get("/:id",membreControllers.readMembre)




//la fonctions pour modifier un membre
router.put("/:id",membreControllers.updateMembre)



// la fonction pour supprimer un membres$
router.delete("/:id",membreControllers.deleteMembre)



//la route pour se connecter
router.post("/login",membreControllers.loginUsers)



module.exports = router;