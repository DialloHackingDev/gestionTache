const mongoose = require("../db/connectdb");

//creation du schema des membres
const membreSchema = mongoose.Schema({
    prenom:{
        type:String,
        required:true,
    },
    nom:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        emun:["admin","user"],
        default:"user"
    },
    date:{
        type:Date,
        default:Date.now
    },
});


module.exports = mongoose.model("Membres",membreSchema);
