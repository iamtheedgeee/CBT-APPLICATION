const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {get_admin_registration_number}=require('../middle_ware/utility')

const Admin_Schema=new mongoose.Schema({
    username:{
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
    reg_no:{
        type: String,
        unique: true
    },
    hosting:{
        type:mongoose.Types.ObjectId,
        default:null
    }
})

Admin_Schema.pre("save",async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    this.reg_no= this.username.slice(0,1)+get_admin_registration_number()
    next()
    
})

Admin_Schema.methods.create_token=function(){
    return jwt.sign({id:this._id,email:this.email},process.env.JWT_SECRET,{expiresIn :'30d'})
}
Admin_Schema.methods.compare_passwords=async function(candidate_password){
    const isCorrect=await bcrypt.compare(candidate_password,this.password)
    return isCorrect
}
module.exports=mongoose.model("Admin",Admin_Schema)
