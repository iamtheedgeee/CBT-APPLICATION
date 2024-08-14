require('express-async-errors')
require('dotenv').config()
const express=require('express')
const cookieParser = require('cookie-parser')
const os=require('os')


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
app.use(express.static('./html/public'))
app.use('/api/v2/auth-student',auth_student_router)
app.use('/api/v2/auth-admin',auth_admin_router)
app.use('/api/v2/exam',exam_router)
app.use('/api/v2/student',auth_student,students_router)
app.use('/api/v2/admin',auth_admin,admin_router)
app.use('/api/v2/course',auth_admin,courses_router)
app.use('/admin/',auth_admin,express.static('./html/private/admin'))
app.use('/student/',auth_student,express.static('./html/private/student'))


//ERROR HANDLING MIDDLEWARE
app.use(error_handler_middleware)
app.use(not_found_error)

//START SEVRER
const PORT=process.env.PORT || 3000
var IP;
const networkInterfaces = os.networkInterfaces()
const ipv4Address = Object.values(networkInterfaces)
    .flat()
    .find(ip => !ip.internal && ip.family === 'IPv4')
if (ipv4Address) {
    IP=ipv4Address.address
} else {
    IP='localhost'
}


const start= async ()=>{
    try {
        console.log("Attempting to connect to database.....")
        await connect_db(process.env.MONGO_URI_STRING)
        console.log("connected successfully")
        app.listen(PORT,IP,()=>{
            console.log(`Server is listening on port ${PORT} with ${IP}: http://${IP}:${PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()
