const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {get_registration_number} = require('../middle_ware/utility')

const Student_Schema=new mongoose.Schema({
    reg_no:{
        type:String,
        unique:true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email'],

    },
    results:[
        {
            course_id: mongoose.Types.ObjectId,
            course_name: String,
            course_admin: String,
            score: Number,
            grade: String
        }
    ]
})

Student_Schema.pre('save',async function(next){
    if(this.isNew){
        const salt=await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
        this.reg_no=get_registration_number()
    }
    next()
})
Student_Schema.methods.create_token=function(){
    return jwt.sign({reg_no:this.reg_no,first_name:this.first_name},process.env.JWT_SECRET,{expiresIn :'30d'})
}
Student_Schema.methods.compare_passwords=async function(candidate_password){
    const isCorrect=await bcrypt.compare(candidate_password,this.password)
    return isCorrect
}
Student_Schema.methods.Submit=function(course_id,course_name,course_admin,score,grade){
    this.results.push({course_id:course_id,course_name:course_name,course_admin:course_admin,score:score,grade:grade})
    this.save()
}
module.exports=mongoose.model("Students",Student_Schema)