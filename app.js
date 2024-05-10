const express=require('express')
const fs=require('fs')
const path=require('path')
const app=express()
const port=5000
const {create_student,get_student,create_course,get_course,update_course,update_student}=require('./middleware/middleware.js')
app.use(express.static("./documents"))
app.use(express.json())


//EXAMS


app.get('/api/exam/',(req,res)=>{
    selected_course="Math"
    fs.readFile(`documents/Courses/${selected_course}.json`,'utf8',(err,result)=>{
        if(err){console.log(err);res.send("an error occured")}
        course_json=JSON.parse(result)
        return res.status(200).json(course_json)
    })
})
app.post('/api/exam/',create_course,(req,res)=>{

})
app.get('/api/exam/:course',get_course,(req,res)=>{

})
app.put('/api/exam/',update_course,(req,res)=>{
    
})



//Students
app.post('/api/students/',create_student,(req,res)=>{
})

app.get('/api/students/:id',get_student,(req,res)=>{
})

app.get('/api/students',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,'./documents/students.json'))
})

app.put('/api/students/',update_student,(req,res)=>{
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})






