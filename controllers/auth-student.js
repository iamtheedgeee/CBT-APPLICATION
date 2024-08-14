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
    const cookie_options = {
        maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("student_token",token,cookie_options)
    res.status(201).json({msg:'success'})    
}

const login=async(req,res)=>{
    const{reg_email,password}=req.body
    if(!reg_email || !password){
        throw new CustomAPIError('Please Provide Reg_No and password',StatusCodes.BAD_REQUEST)
    }
    let student=await Student.findOne({reg_no:reg_email})
    if(!student){
        student=await Student.findOne({email:reg_email})
        if(!student){
            throw new CustomAPIError('Invalid Credentials',StatusCodes.UNAUTHORIZED)
        }
    }
    const accurate_password=await student.compare_passwords(password)
    if(!accurate_password){
        throw new CustomAPIError('Invalid Credentials',StatusCodes.UNAUTHORIZED)
    }
    const token=student.create_token()
    const cookie_options = {
        maxAge: 24 * 60 * 60 * 1000
    }
    res.cookie("student_token",token,cookie_options)
    res.status(201).json({msg:'success'})
}

module.exports={register,login}