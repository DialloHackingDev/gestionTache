const Taches = require("../models/taches");
const bcrypt = require("bcrypt");



//creation des membres
exports.createTaches = async(req,res)=>{
    try{
        const tache = req.body
        if(!tache ) return res.status(401).json({message:"les champs sont requis!"})
        
        
        const newdata = await Taches.create(tache)
        newdata.save()
        return res.status(201).json(newdata)
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}
//la fonction qui permet d'afficher les taches avec recherche et pagination

exports.readTaches = async(req,res)=>{
    try{
        // console.log( " pour la query",req.query)
        // console.log( "==========================================")

        const page = Math.max(parseInt(req.query.page)||1,1);
        const limit = Math.min(Math.max(parseFloat(req.query.limit)||10,1),100)
        const skip = (page -1)*limit
        // console.log("page ",page)
        // console.log("limit ",limit)
        // console.log("skip ",skip)
        
        //la recherche
        const filters = {};
        if(req.query.q){
            filters.statut ={$regex:req.query.q,$options:"i"}
        }
        // console.log("filters ",filters)
        
        // const all = await taches.length
        // console.log(all)
        // la pagination
        const [taches,total] = await Promise.all([
            Taches.find(filters)
            .skip(skip)
            .limit(limit)
            .sort({statut:1}),
            Taches.countDocuments(filters)
        ])
        // console.log("parle moi ==========================================")
        // console.log(taches)
        // const datatache = await taches.find()
        // console.log("le nombres est :",datatache.length)

        console.log({
            page,
            limit,
            total,
            totalPages:Math.ceil(total/limit),
            taches
        })
         res.status(201).json({
            page,
            limit,
            total,
            totalPages:Math.ceil(total/limit),
            data:taches
        })
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}

//afficher une tache
exports.readTache = async(req,res)=>{
    try{
        const id = req.params.id
        
        const existe = await Taches.findById(id)
        
        if(!existe) return res.status(401).json({message:"aucune tache trouver!!"})


        return res.status(201).json(existe)
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}


// la fonction pour modifier un membre
exports.updateTaches = async(req,res)=>{
    try{
        const {id} = req.params
        
        const existe = await Taches.findById(id)
        
        if(!existe) return res.status(401).json({message:"la taches n'existe pas!"})

        const update = await Taches.findByIdAndUpdate(
            id,{
            titre:req.body.prenom,
            contenu:req.body.nom,
            },
            {new:true,runValidators:true}
        );
        
        return res.status(201).json({message:"tache a jours! ",contenu:update})
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}

// la fonction pour modifier un membre
exports.deleteTaches = async(req,res)=>{
    try{
        const {id} = req.params
        
        const existe = await Taches.findById(id)
        
        if(!existe) return res.status(401).json({message:"la tache n'est pas trouvé!"})

        await Taches.findByIdAndDelete(id)
        
        return res.status(201).json({message:"tache  supprimer avec sucess!"})
        
    }catch(e){
        res.status(500).json({message:"l'erreur est :",e})
    }
}