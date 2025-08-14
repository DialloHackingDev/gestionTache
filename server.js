require("dotenv").config();
const express = require("express");
const PORT  = process.env.PORT || 3000;
const membreRoutes = require("./routes/membres.route")
const tachesRoutes = require("./routes/taches.route")
const {logger} = require("./middlewares/logger");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

app.use(logger)

//api pour les membres
app.use("/api/membre",membreRoutes)

//api pour les taches
app.use("/api/taches",tachesRoutes)


app.get("/",(req,res)=>{
    res.send("la gestion des taches!")
});




app.listen(PORT,()=>{
    console.log(`le server ecoute sur le port ${PORT}`)
})