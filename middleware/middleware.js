const fs=require('fs')
const path=require('path')
const express=require('express')
const storage_path='./documents/students.json'
const exam_storage_path='./documents/Courses/'

//UTILITY FUNCTIONS
async function get_students_list(){
    try{
        const file=await fs.promises.readFile(storage_path,'utf8')
        const students_list= JSON.parse(file)
        return students_list
    }catch(err){console.log(err);return false} 
}

async function get_course_list(){
    try {
        const course_list=await fs.promises.readdir(exam_storage_path)
        return course_list
    } catch (error) {
        return false
    }
    
}

async function write_students_list(body){
    try{
        const process=await fs.promises.writeFile(storage_path,JSON.stringify(body))
        return true
    }catch(err){console.log(err);return false}
}

function get_student_id(students_list){
    let highest_id=0
    for(let student of students_list){
        if(Number(student.id.slice(-3))>highest_id){
            highest_id=Number(student.id.slice(-3))
        }};
    const new_student_id=String(highest_id+1)
    return new_student_id
}

//STUDENT FUNCTIONS
async function create_student(req,res,next){
    const student=req.body
    let students_list=await get_students_list()

    if(!students_list){return res.send("Error in reading storage")}

    const student_id_number=get_student_id(students_list)
    student.id=`2024-00${student_id_number}`
    student["results"]=[]
    students_list.push(student)
    const process=await write_students_list(students_list)
    if(process){return res.status(201).json(student)}
    else{return res.send("Error in updating storage")}
    next()
}

async function get_student(req,res,next){
    const {id}=req.params
    let students_list= await get_students_list()
    if(!students_list){res.send("Error reading storage")}
    const student=students_list.find(student=>{
        if(student.id===id){
            return student
        }
    })
    if(!student){
        return res.status(200).send(`No Student with id ${id}`)
    }
    return res.status(200).json(student)
    next()
}

async function update_student(req,res,next){
    const student=req.body
    
    let students_list=await get_students_list()
    let student_index=Number(student.id.slice(-3))-1
    students_list[student_index]=student
    const process= write_students_list(students_list)
    return res.send("Successfully Updated Student")
    next()
}

async function login(req,res,next){
    const {id,first_name,password}=req.params
    const students_list=await get_students_list()
    const student=students_list.find(student=>{
        if(student.id===id){
            return student
        }
    })
    try{
        if(id===student.id && student.first_name===first_name && student.password===password){
            results=JSON.stringify(student.results)
            res.status(200).send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Student_Dashboard</title>
            </head>
            <body>
                <h1>Welcome ${student.first_name} ${student.last_name}</h1><br>
                <h2>Results</h2>
                <p>${results}</p>
                <a href="http://localhost:5000/exam.html">Take Exam</a>
                <p>More features coming soon..........</p>
            </body>
                <script>
                    async function results(){
                        event.preventDefault()
                    
                    }
                </script>
            </html>`)
        }
    }catch(err){res.send("An error occured")}
    
}


//COURSE FUNCTIONS
async function create_course(req,res,next){
    const{Course_name}=req.body[0]
    const course_list= await get_course_list()
    if(course_list.includes(`${Course_name}.json`)){
        return res.status(201).send("Course already created")
    }
    fs.writeFile(`${exam_storage_path}${Course_name}.json`,JSON.stringify(req.body),(err,result)=>{
        if(err){
            return res.status(404).send("Failure")
        }
    })
    return res.status(201).send("Successfully created course")
    next()
}

async function get_course(req,res,next){
    let {course}=req.params
    let course_list= await get_course_list()

    if(course_list.includes(`${course}.json`)){
        fs.readFile(`${exam_storage_path}${course}.json`,'utf8',(err,result)=>{
            if(err){return res.json(["EIRF"])}
            const questions=JSON.parse(result)
            return res.status(200).json(questions)
        })
    }else{return res.json(["FNF"])}
    next()
}

async function update_course(req,res,next){
    const {course,questions,old_name}=req.body
    try {
        const process= await fs.promises.writeFile(`${exam_storage_path}${course}.json`,JSON.stringify(questions))
        if(old_name){
            if(old_name!==course){
                await fs.promises.unlink(`${exam_storage_path}${old_name}.json`)
            }
        }
        return res.send(`Successfully updated ${course}`)

        
        
    }catch(err){
        console.log(err)
        return res.send("an error occured")
    }
    next()
}

async function set_course(req,res,next){
    const {course}=req.body
    const course_list=await get_course_list()

    if(course_list.includes(`${course}.json`)){
        fs.writeFile('./documents/Courses/current-exam.txt',course,(err,result)=>{
            if(err){
                console.log(err)
                return res.send("An Error Occured")
            }
            return res.send("Successfully Updated Exam")
        })
    }else{
        return res.send("nill")
    }
    next()
}


//ADMIN FUNCTIONS














//EXPORTS
module.exports={
    create_student,
    get_student,
    create_course,
    get_course,
    update_course,
    update_student,
    set_course,
    login}

