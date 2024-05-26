const express=require('express')
const fs=require('fs')
const path=require('path')
const app=express()
const port=5000
const {
        create_student,
        get_student,
        create_course,
        get_course,
        update_course,
        update_student,
        set_course,
        login}=require('./middleware/middleware.js')
app.use(express.static("./documents"))
app.use(express.json())
     
app.get('/admin/set-password/',(req,res)=>{
    password=fs.readFileSync('./documents/Courses/password.txt','utf8')  
    if(password==="nill"){
        return res.sendFile(path.resolve(__dirname,"./documents/admin-password.html"))
    }
    else{
        return res.sendFile(path.resolve(__dirname,"./documents/admin-password-change.html"))
    }
})

app.get('/admin/:doc_path/:password',(req,res)=>{
    const {doc_path,password}=req.params
    console.log(doc_path)
    const real_password=fs.readFileSync('./documents/Courses/password.txt','utf8')
    if(password===real_password){
        return res.sendFile(path.resolve(__dirname,`./documents/${doc_path}.html`))
    }else{
        return res.send("Unauthorized Access Incorrect Password")
    }
})

app.post('/api/admin/password',(req,res)=>{
    const {password}=req.body
    fs.writeFile('./documents/Courses/password.txt',password,(err,result)=>{
        if(err){
            console.log(err)
            return res.send("An Error Occurred")
        }
        return res.send("Successfully Changed Password")
    })
    

})

app.put('/api/admin/password',(req,res)=>{
    const {old_password,new_password}=req.body
    const real_password=fs.readFileSync('./documents/Courses/password.txt','utf8')
    console.log(old_password,real_password)
    if(old_password===real_password){
        fs.writeFile('./documents/Courses/password.txt',new_password,(err,result)=>{
            if(err){
                console.log(err)
                return res.send("An Error Occurred")
            }
            return res.send("Successfully Changed Password")
        })
    }else{
        return res.send("Incorrect Password, Try again")
    }
})

//EXAMS
app.post('/api/exam/select',set_course,(req,res)=>{
    
})

app.get('/api/exam/',(req,res)=>{
    
    selected_course=fs.readFileSync('./documents/Courses/current-exam.txt','utf8')
    
    fs.readFile(`./documents/Courses/${selected_course}.json`,'utf8',(err,result)=>{
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

app.get('/api/students/:password',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,'./documents/students.json'))
})

app.put('/api/students/',update_student,(req,res)=>{
})

app.get('/students/:id/:first_name/:password',login,(req,res)=>{
})

app.listen(port,"localhost",()=>{
    console.log(`Listening on port ${port}`)
})






