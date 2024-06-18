const CustommAPIError=require('../errors/custom-api-error')
const {StatusCodes}=require('http-status-codes')

const jwt=require('jsonwebtoken')
const auth= async(req,res,next)=>{
    const {admin_token}=req.cookies
    try{
        //depending on the error here,
        //choose whether to say unauthorized or session expired
        const payload=jwt.verify(admin_token,process.env.JWT_SECRET)
        req.admin={id:payload.id,email:payload.email}
        next()
    } catch(error){
        console.log(error)
        throw new CustommAPIError('Authentication Invalid',StatusCodes.UNAUTHORIZED)
        
    }
}

module.exports=auth