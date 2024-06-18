const Admin=require('../models/Admins')
const CustomAPIError=require('../errors/custom-api-error')
const {StatusCodes}=require('http-status-codes')
const register=async(req,res)=>{
    const {username,password,email}=req.body
    if(!username || !password || !email){
        throw new CustomAPIError('Please Provide Credentials')
    }
    const admin= await Admin.create(req.body)
    const token=admin.create_token()
    res.cookie("admin_token",token)
    res.status(201).json({msg:'success'})
    
}

const login=async(req,res)=>{
    const{email,password}=req.body
    const admin=await Admin.findOne({email})
    if(!admin){
        throw new CustomAPIError('invalid Credentials',StatusCodes.UNAUTHORIZED)
    }
    const accurate_password=await admin.compare_passwords(password)
    if(!accurate_password){
        throw new CustomAPIError('incorrect_password',StatusCodes.UNAUTHORIZED)
    }
    const token=admin.create_token()
    res.cookie("admin_token",token)
    res.status(201).json({msg:'success'})
}

module.exports={register,login}
