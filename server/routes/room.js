const express=require('express')
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();


//Afficher tous les room
router.get('/',async(req,res,next)=>{
 
    try {
       const rooms= await prisma.room.findMany()
       res.status(200).json(rooms)

    } catch (error) {
        next(error)
    }
}
)

//Afficher une room
router.get('/:id',async(req,res,next)=>{
    const roomId=req.params.id
    try {
        const existingRoom=await prisma.room.findUnique({where:{id:roomId}})
        if(!existingRoom){
            res.status(404).json("room introuvable !!!")
        }
        res.status(200).json(existingRoom)

    } catch (error) {
        next(error)
    }
}
)

//mise a jour d'une room
router.put('/:id',async(req,res)=>{
    const roomId=req.params.id
    try {
        
    } catch (error) {
        
    }
}
)

//Supprimer une room
router.delete('/:id',async(req,res)=>{
    const roomId=req.params.id
    try {
        
    } catch (error) {
        
    }
}
)

module.exports=router