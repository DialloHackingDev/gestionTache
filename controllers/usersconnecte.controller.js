
const User = require("../models/users");
const Membres = require("../models/membres.models");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const jwt_secret = process.env.jwt_secret

// la fonction pour se connecter

exports.loginUsers = async (req,res)=>{
    try{
        const {email, password } = req.body
        const user = await Membres.findOne({email})
     if(!user) return res.status(401).json({message:"l'utilisateur n'existe pas !"})

        const verfied = await bcrypt.compare(password,user.password)
        if(!verfied) return res.status(401).json({message:"password invalid!"})

        const token = jwt.sign(
            {userId:user._id,role:user.role},
            jwt_secret,
            {expiresIn:"12h"}
        )
        res.status(201).json({
            message:"connexion reuissi!",
            token
        });

    }catch(e){
        return res.status(500).json(e)
    }

}