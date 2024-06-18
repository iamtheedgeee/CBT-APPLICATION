const Admins=require('../models/Admins')
const Courses=require('../models/Courses')
const Students=require('../models/Students')
const {StatusCodes}=require('http-status-codes')
const CustomAPIError=require('../errors/custom-api-error')
const jwt=require('jsonwebtoken')


const get_admins=async(req,res)=>{
    //modify to return only the admins currently hosting an exam
    const admins=await Admins.find({}).select('username reg_no')
    const hosting_admins=[]
    admins.find(admin=>{
        if(admin.hosting!==null){
            hosting_admins.push(admin)
        }
    })
    if(hosting_admins.length>0){
       return res.status(StatusCodes.OK).json({msg:'success',admins:hosting_admins})
    }else{
        return res.status(StatusCodes.OK).json({msg:'none-found'})
    }
}
const get_hosting=async(req,res)=>{
    const {hosting}=await Admins.findOne({_id:req.params.id}).select('hosting')
    const course=await Courses.findOne({_id:hosting})
    res.status(StatusCodes.OK).json({course})
}


const student_login=async(req,res)=>{
    const{reg_no,password,admin_id,course_id}=req.body
    const student=await Students.findOne({reg_no})
    if(!student){
        throw new CustomAPIError('invalid credentials',StatusCodes.BAD_REQUEST)
    }
    const accurate_password=await student.compare_passwords(password)
    if(!accurate_password){
        throw new CustomAPIError('incorrect password',StatusCodes.UNAUTHORIZED)
    }
    const course=await Courses.findOne({_id:course_id})
    const student_written=course.check_student(student._id)
    if(!student_written){
        course.add_student(student._id)
        const token=jwt.sign({student_id:student._id,admin_id,course_id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.cookie("exam_token",token)
        return res.status(201).json({msg:"successful",student})
    }
    else{
        throw new CustomAPIError("You've Already Taken this Exam",StatusCodes.UNAUTHORIZED)
    }    
}

const submit=async(req,res)=>{
    let {answers}=req.body
    const{student_id,course_id,admin_id}=req.exam
    const admin=await Admins.findOne({_id:admin_id})
    course=await Courses.findOne({_id:course_id})
    const {score,grade}=course.Submit(student_id,answers)

    student=await Students.findOne({_id:student_id})
    const results=student.Submit(course_id,course.course_name,`${admin.username}--${admin.reg_no}`,score,grade)

    res.json({msg:"Submitted"})

}


module.exports={
    student_login,
    get_admins,
    get_hosting,
    submit
}