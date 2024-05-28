const express=require('express')
const { route } = require('./auth')

const  router=express.Router()

//Afficher tous les hotel
router.get('/',async(req,res,next)=>{
res.send('all hotel')
    try {
        
    } catch (error) {
        next(error)
    }
}
)

//Afficher une hotel
router.get('/:id',async(req,res)=>{
    
    try {
        
    } catch (error) {
        next(error)
    }
}
)

//mise a jour d'une hotel

router.put('/',async(req,res)=>{
    
    try {
        
    } catch (error) {
        next(error)
    }
}
)

//Supprimer une hotel
router.delete('/',async(req,res)=>{
    
    try {
        
    } catch (error) {
        next(error)
    }
}
)

module.exports=router