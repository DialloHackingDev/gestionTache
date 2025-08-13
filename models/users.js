const mongoose = require("../db/connect.db");

// le shema pour les utilisateurs
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestemps:true})


module.exports = mongoose.model("User",userSchema);