const CustommAPIError=require('../errors/custom-api-error')
const {StatusCodes}=require('http-status-codes')

const jwt=require('jsonwebtoken')
const auth= async(req,res,next)=>{
    const {exam_token}=req.cookies
    try{
        const payload=jwt.verify(exam_token,process.env.JWT_SECRET)
        req.exam=payload
        next()
    } catch(error){
        throw new CustommAPIError('Authentication Invalid',StatusCodes.UNAUTHORIZED)
    }

}

module.exports=auth