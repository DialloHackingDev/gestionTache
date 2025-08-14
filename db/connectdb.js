require("dotenv").config();
const mongoose = require("mongoose");
MBEDB_URI = process.env.MBEDB_URI;

//connection a la base de donne 
mongoose.connect(MBEDB_URI)
.then(res =>{
    console.log("connection db reussi!")
}).catch(e => console.log("connection db echoué!",e))




module.exports = mongoose;