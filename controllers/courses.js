const Courses=require('../models/Courses')
const Admins=require('../models/Admins')
const CustomAPIError=require('../errors/custom-api-error')
const {StatusCodes}=require('http-status-codes')

//'/get-Courses
const get_all_Courses=async(req,res)=>{
    const{id:admin_id}=req.admin
    const courses=await Courses.find({admin:admin_id})
    res.status(StatusCodes.OK).json({courses})
}

//'/get-exam/:id
const get_exam=async(req,res)=>{
    const{id:admin_id}=req.admin
    const course=await Courses.findOne({course_name:req.params.name,admin:admin_id})
    return res.status(StatusCodes.OK).json({course})
}
//'/create-exam
const create_exam=async(req,res)=>{
    const {course_body}=req.body
    course_body.admin=req.admin.id
    const exam=await Courses.create(course_body)
    exam.update_status()
    res.status(201).json({msg:"success",exam})
}
//'/update-exam
const update_exam=async(req,res)=>{
    const {course_body}=req.body
    const {id:admin_id}=req.admin
    course_body.admin=admin_id
    const exam=await Courses.findOneAndUpdate({course_name:req.params.name,admin:admin_id},course_body,{
        new:true,
        runValidators:true
    })
    exam.update_status()
    res.status(201).json({msg:"success",exam})
}

module.exports={
    get_all_Courses,
    get_exam,
    create_exam,
    update_exam
}