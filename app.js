const express=require('express')
const fs=require('fs')
const path=require('path')
const app=express()
const port=5000

app.use(express.static("./documents"))
app.use(express.json())


//EXAMS
//Create Exams
app.post('/api/exam/',(req,res)=>{
    const{course_name}=req.body
    fs.writeFile(`./documents/Courses/${course_name}.json`,'[]',(err,result)=>{
        if(err){
            return res.status(404).send("Failure")
        }
    })
    res.status(201).send("Success")
})
app.get('/api/exam/:course',(req,res)=>{
    console.log("A hit")
    let {course}=req.params
    
    //Checks if course exists
    fs.readdir('./documents/Courses',(err,result)=>{
        if(err){return res.status(200).send("AN ERROR OCCURED")}
        if(result.includes(`${course}.json`)){
            fs.readFile(`documents/Courses/${course}.json`,'utf8',(err,result)=>{
                const course_json=JSON.parse(result)
                return res.status(200).json(course_json)
            })
        }
        else{return res.status(200).json({succes:"false"})}
    })
   
})
app.put('/api/exam/',(req,res)=>{
    const {course,questions}=req.body
    //!!!!!!Check if course exists if not then throw an error
    fs.writeFile(`./documents/Courses/${course}.json`,JSON.stringify(questions),(err,result)=>{
        if(err){
            console.log(err)
            return res.send("an error occured")}
        return res.send(`Successfully updated ${course}` )
    })
    

})



//Student Dashboard
app.get('/dashboard/:id/:first_name/:password',(req,res)=>{
    const {id,first_name,password}=req.params
    console.log(req.params)
    console.log(id)
    fs.readFile('./documents/students.json','utf8',(err,result)=>{
        if(err){console.log(err)}
        var file=JSON.parse(result)
        const student=file.find((student)=>{
            if(student.id==id){
                return student
            }
        })
        console.log(student)
        console.log(first_name)
        console.log(password)
        if(student.first_name===first_name && student.password==password){
           return res.status(200).send(`
            <html>
            <!DOCTYPE html>
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />    
                <title>Welcome to CBT App</title>
            </head>
                <body>
                <h1 id="well">Welcome ${first_name}</h1><br>
                <button onclick="show()">Show registration NUmber</button>
                <script>
                    console.log("welcome ${first_name}")
                    function show(){
                        document.write("Your registration Number is ${id}")
                    }
                </script>
                </body>
            </html>`)
        }
        else{
            return res.status(400).send("Page not Found")
        }
       
    })
   
})


//Stuedents
app.post('/api/students/',(req,res)=>{
    const student=req.body
    fs.readFile('./documents/students.json','utf8',(err,result)=>{
        if(err){console.log(err)}
        var file=JSON.parse(result)
        //#1: Check if Student is already registered
        //#2: Assign Reg_No
        var highest_id=0
        for(let r_student of file){
            if(Number(r_student.id.slice(-3))>highest_id){
                highest_id=Number(r_student.id.slice(-3))
            }};
        const new_student_id=String(highest_id+1)
        student.id=`2024-00${new_student_id}`
        file.push(student)
        fs.writeFile('./documents/students.json',JSON.stringify(file),(err,result)=>{if(err){console.log(err)}})
        return res.status(201).json({id:student.id,F_name:student.first_name,L_name:student.last_name,password:student.password})
    })
    
})

app.get('/api/students/:id',(req,res)=>{
    const {id}=req.params
    fs.readFile('./documents/students.json','utf8',(err,result)=>{
        if(err){console.log(err)}
        var file=JSON.parse(result)
        const student= file.find(student=>{
            if(student.id===id){
                return student
            }
        })
        console.log("Student")
        if(!student){
            return res.status(200).send(`No Student with id ${id}`)
        }
        return res.status(200).json(student)
    })
})

app.get('/api/students',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,'./documents/students.json'))
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})


//MIDDLEWARE TO CREATE. ONE TO





