const Students=require('../models/Students')
const Admins=require('../models/Admins')
const Exams=require('../models/Exams')
const {StatusCodes}=require('http-status-codes')

const get_student=async(req,res)=>{
    const student=await Students.findOne({reg_no:req.student.reg_no})
    res.status(StatusCodes.OK).json({student})
}

const update_student=async(req,res)=>{
    console.log("Updating")    
}

const delete_student=async(req,res)=>{
    res.send("delete Student")
}


module.exports={
    get_student,
    update_student,
    delete_student,
}

