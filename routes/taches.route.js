const express = require("express");
const route = express.Router();
const tacheControllers = require("../controllers/taches.controller")
const auth = require("../middlewares/auth.midd")


//la fonction pour enregistre une tache
route.post("/",tacheControllers.createTaches)

// la route pour filter
route.get("/",tacheControllers.readTaches)

//la route pour afficher une tache
route.get("/:id",tacheControllers.readTache)

//la fonctions pour modifier une tache
route.put("/:id",tacheControllers.updateTaches)



// la fonction pour supprimer une tache
route.delete("/:id",tacheControllers.deleteTaches)



module.exports = route;