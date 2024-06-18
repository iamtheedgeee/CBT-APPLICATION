const Admin=require('../models/Admins')
const Exams=require('../models/Exams')
const {StatusCodes}=require('http-status-codes')

const get_admin=async(req,res)=>{
    const{id:admin_id}=req.admin
    const admin=await Admin.findOne({_id:admin_id})
    if(!admin){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'no admin found'})
    }
    res.status(StatusCodes.OK).json({msg:'success',admin})
}

const select_exam=async(req,res)=>{
    const{course_id}=req.body
    const{id:admin_id}=req.admin
    const course=await Exams.findOne({_id:course_id})
    if(course.completed){
        const admin=await Admin.findOneAndUpdate({_id:admin_id},{hosting:course_id},{new:true,runValidators:true})
        return res.status(StatusCodes.OK).json({msg:`success`})
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'cannot host an incomplete course'})
    }
    
}

module.exports={
    get_admin,
    select_exam
}