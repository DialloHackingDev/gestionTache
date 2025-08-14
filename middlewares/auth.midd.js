require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret


async function authentification(req,res,next) {
    const authoHeader = req.header("Authorization")
    if(!authoHeader) return res.status(401).json({message:"token manquant!"})
    
    const token = authoHeader.split(" ")[1];
    if(!token) return res.status(401).json({message:"token manquant!"})

    try{
        const verified = await jwt.verify(token,jwt_secret)
       req.user = verified;
       next();
        
    }catch(e){
        res.status(500).json(e)
    }
    


}




module.exports = authentification;