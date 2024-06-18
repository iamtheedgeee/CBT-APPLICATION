const Student=require('../models/Students')
const CustomAPIError=require('../errors/custom-api-error')
const {StatusCodes}=require('http-status-codes')
const register=async(req,res)=>{
    const{first_name,last_name,password,email}=req.body
    if(!first_name || !last_name || !password || !email){
        throw new CustomAPIError('Please provide Credentials',StatusCodes.BAD_REQUEST)
    }
    const student= await Student.create(req.body)
    const token=student.create_token()
    res.cookie("student_token",token)
    res.status(201).json({msg:'success'})    
}

const login=async(req,res)=>{
    const{reg_no,password}=req.body
    if(!reg_no || !password){
        throw new CustomAPIError('Please Provide Reg_No and password',StatusCodes.BAD_REQUEST)
    }
    const student=await Student.findOne({reg_no})
    if(!student){
        throw new CustomAPIError('Invalid Credentials',StatusCodes.UNAUTHORIZED)
    }
    const accurate_password=student.compare_passwords(password)
    if(!accurate_password){
        throw new CustomAPIError('Invalid Credentials',StatusCodes.UNAUTHORIZED)
    }
    const token=student.create_token()
    res.cookie("student_token",token)
    res.status(201).json({msg:'success'})
}

module.exports={register,login}