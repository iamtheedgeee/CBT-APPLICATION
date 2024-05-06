const express=require('express')
const fs=require('fs')
const path=require('path')
const app=express()
const port=5000

app.use(express.static("./documents"))
app.use(express.json())

app.post('/api/students/',(req,res)=>{
    console.log(req.body)
    res.status(201).json({success:"True"})
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})








