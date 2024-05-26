const express=require('express')
const authRouter=require('./routes/auth')
const roomRouter=require('./routes/room')
const hotelRouter=require('./routes/hotel')

const app=express()

//Midlleware
app.use(express.json())
app.use('/auth',authRouter)
app.use('/room',roomRouter)
app.use('/hotel',hotelRouter)


app.get('/',(req,res)=>{
    res.send('you are welcome')
})
app.listen(3000,()=>console.log('ok'));