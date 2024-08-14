const CustommAPIError=require('../errors/custom-api-error')
const {StatusCodes}=require('http-status-codes')
const path=require('path')

const jwt=require('jsonwebtoken')
const auth= async(req,res,next)=>{
    const {student_token}=req.cookies
    try{
        //depending on the error here,
        //choose whether to say unauthorized or session expired
        const payload=jwt.verify(student_token,process.env.JWT_SECRET)
        req.student={reg_no:payload.reg_no,first_name:payload.first_name}
        next()
    } catch(error){
        //throw new CustommAPIError('Authentication Invalid',StatusCodes.UNAUTHORIZED)
        res.sendFile(path.resolve(__dirname,'../html/public/student-login.html'))
    }

}

module.exports=auth