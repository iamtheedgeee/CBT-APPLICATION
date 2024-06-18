const Courses=require('../models/Courses')
const Admins=require('../models/Admins')
const CustomAPIError=require('../errors/custom-api-error')
const {StatusCodes}=require('http-status-codes')


const get_all_courses=async(req,res)=>{
    const{id:admin_id}=req.admin
    const courses=await Courses.find({admin:admin_id})
    res.status(StatusCodes.OK).json({courses})
}


const get_course=async(req,res)=>{
    const{id:admin_id}=req.admin
    const course=await Courses.findOne({course_name:req.params.name,admin:admin_id})
    return res.status(StatusCodes.OK).json({course})
}

const create_course=async(req,res)=>{
    const {course_body}=req.body
    course_body.admin=req.admin.id
    const exam=await Courses.create(course_body)
    exam.update_status()
    res.status(201).json({msg:"success",exam})
}

const update_course=async(req,res)=>{
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
    get_all_courses,
    get_course,
    create_course,
    update_course
}