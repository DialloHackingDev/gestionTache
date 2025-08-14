const mongoose = require("../db/connectdb");

//creation du schema des membres
const membreSchema = mongoose.Schema({
    titre:{
        type:String,
        required:[true,"le titre est obligatoire"],
    },
    description: {
      type: String,
      trim: true,
    },
    statut: {
      type: String,
      enum: ["en attente", "en cours", "terminée"],
      default: "en attente"
    },
    dateEcheance: {
      type: Date,
    }
},{timestemps:true});

module.exports = mongoose.model("Tache",membreSchema);
