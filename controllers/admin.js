const Admin=require('../models/Admins')
const Courses=require('../models/Courses')
const {StatusCodes}=require('http-status-codes')
const CustomAPIError=require('../errors/custom-api-error')

const get_admin=async(req,res)=>{
    const{id:admin_id}=req.admin
    const admin=await Admin.findOne({_id:admin_id})
    if(!admin){
        throw new CustomAPIError("no admin found", StatusCodes.BAD_REQUEST)
    }
    res.status(StatusCodes.OK).json({msg:'success',admin})
}

const select_exam=async(req,res)=>{
    const{course_id}=req.body
    const{id:admin_id}=req.admin
    const course=await Courses.findOne({_id:course_id})
    if(course.completed){
        const admin=await Admin.findOneAndUpdate({_id:admin_id},{hosting:course_id},{new:true,runValidators:true})
        return res.status(StatusCodes.OK).json({msg:`success`})
    }else{
        throw new CustomAPIError('cannot host an incomplete course',StatusCodes.BAD_REQUEST)
    }
}

const deselect=async(req,res)=>{
    const{id:admin_id}=req.admin
    await Admin.findOneAndUpdate({_id:admin_id},{hosting:null})
    return res.status(StatusCodes.OK).json({msg:'success'})
}

module.exports={
    get_admin,
    select_exam,
    deselect
}