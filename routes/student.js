const express= require('express')
const router=express.Router()

const{
    get_student,
    update_student,
    delete_student,
    get_admins,
    get_exam
}=require('../controllers/student')

//api/v2/student
router.route('/').get(get_student).patch(update_student).delete(delete_student)
module.exports=router 