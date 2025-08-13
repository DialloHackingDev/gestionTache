require("dotenv").config();
const Membres = require("../models/membres.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret;



//creation des membres
exports.createMembres = async(req,res)=>{
    try{
        const {prenom,nom,age,email,password} = req.body
        if(!prenom || !nom || !age || !email || !password) return res.status(401).json({message:"les champs sont requis!"})
        
        
        //hash du mot de pass
        const hash = await bcrypt.hash(password,10);

        const newdata = await Membres.create({
            prenom,
            nom,
            age,
            email,
            password:hash
        })
        newdata.save()
        return res.status(201).json(newdata)
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",err:e})
    }
}



//fonction pour afficher tous les membres
exports.readMembres = async(req,res)=>{
    try{
        
        const user = await Membres.find()
        console.log(user.length)
        if(!user.length === 0) return res.status(401).json({message:"l'utilisateur n'est pas trouve!"})

        return res.status(201).json(user)
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}

// la fonction pour afficher un membres
exports.readMembre = async(req,res)=>{
    try{
        const id = req.params.id
        
        const existe = await Membres.findById(id)
        
        if(!existe) return res.status(401).json({message:"l'utilisateur n'est pas trouve!"})

        return res.status(201).json(existe)
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}

// la fonction pour modifier un membre
exports.updateMembre = async(req,res)=>{
    try{
        const {id} = req.params
        
        const existe = await Membres.findById(id)
        
        if(!existe) return res.status(401).json({message:"l'utilisateur n'est pas trouve!"})

        const update = await Membres.findByIdAndUpdate(
            id,{
            prenom:req.body.prenom,
            nom:req.body.nom,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password
            },
            {new:true,runValidators:true}
        );
        
        return res.status(201).json({message:"l'element est a jours ",contenu:update})
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}

// la fonction pour modifier un membre
exports.deleteMembre = async(req,res)=>{
    try{
        const {id} = req.params
        
        const existe = await Membres.findById(id)
        
        if(!existe) return res.status(401).json({message:"l'utilisateur n'est pas trouve!"})

        await Membres.findByIdAndDelete(id)
        
        return res.status(201).json({message:" l'element est bien supprimer!"})
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}



//connection de l'utilisateurs
exports.loginUsers = async (req,res)=>{
    try{
        const {email, password } = req.body
        const user = await Membres.findOne({email})
        console.log(user)
     if(!user) return res.status(401).json({message:"l'utilisateur n'existe pas !"})

        const verfied = await bcrypt.compare(password,user.password)
        console.log(verfied)
        console.log(!verfied)
        if(!verfied) return res.status(401).json({message:"password invalid!"})

        const token = jwt.sign(
            {userId:user._id,role:user.role},
            jwt_secret,
            {expiresIn:"12h"}
        )
        console.log(token)
        return res.status(201).json({
            message:"connexion reuissi!",
            token
        });

    }catch(e){
        console.log(e)
        return res.status(500).json({erro:e})
    }

}