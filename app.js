require('express-async-errors')
require('dotenv').config()
const express=require('express')
const cookieParser = require('cookie-parser')
const path=require('path')


const app=express()
const connect_db=require('./db/connect')


const auth_student_router=require('./routes/auth-student')
const auth_admin_router=require('./routes/auth-admin')
const courses_router=require('./routes/courses')
const students_router=require('./routes/student')
const admin_router=require('./routes/admin')
const exam_router=require('./routes/Exam')

const not_found_error=require('./middle_ware/not-found')
const error_handler_middleware=require('./middle_ware/error-handler')
const auth_student=require('./middle_ware/authenticate-student')
const auth_admin=require('./middle_ware/authenticate-admin')


app.use(express.json())
app.use(cookieParser())

//ROUTING
app.use(express.static('./public'))
app.use('/api/v2/auth-student',auth_student_router)
app.use('/api/v2/auth-admin',auth_admin_router)
app.use('/api/v2/exam',exam_router)
app.use('/api/v2/student',auth_student,students_router)
app.use('/api/v2/admin',auth_admin,admin_router)
app.use('/api/v2/course',auth_admin,courses_router)
app.use('/admin/',auth_admin,express.static('./admin'))
app.use('/student/',auth_student,express.static('./student'))


//ERROR HANDLING MIDDLEWARE
app.use(error_handler_middleware)
app.use(not_found_error)

//START SEVRER
const port=process.env.PORT || 3000
const ip=process.env.IP_ADDRESS

const start_with_local=()=>{
    console.log("Attempting to start with localhost")
    return app.listen(port,`localhost`,
    ()=>{console.log(`Server is listening on port ${port} with localhost`)})
}

const start_with_ip=()=>{console.log("Attempting to start with ip")
        return app.listen(port,`${ip}`,
        ()=>{console.log(`Server is listening on port ${port} with ip address`)})
        .on('error',start_with_local)}

const start= async ()=>{
    try {
        console.log("Attempting to connect to database.....")
        await connect_db(process.env.MONGO_URI_STRING)
        console.log("connected successfully")
        start_with_ip()
        
    } catch (error) {
        console.log(error)
    }
}

start()
