const express=require('express')
const bcrypt=require('bcrypt')

const router=express.Router()


//Register
router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const hashPass=await bcrypt.hash(password,10)
    
        const newUser=await User.create({
            
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login
router.post('/login',async(req,res)=>{

    try {
        
    } catch (error) {
        res.status(500).json(error)

    }
})

//Logout
router.post('/logout',async(req,res)=>{

    try {
        
    } catch (error) {
        
    }
})

module.exports=router