const express=require('express')

const app=express()

app.get('/',(req,res)=>{
    res.send('you are welcome')
})
app.listen(3000,()=>console.log('ok'));