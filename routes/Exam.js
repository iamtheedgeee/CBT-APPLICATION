const express= require('express')
const router=express.Router()
const auth_exam=require('../middle_ware/authenticate-exam')

const{
    get_admins,
    submit,
    get_hosting,
    student_login
}=require('../controllers/Exam')

//api/v2/exam
router.route('/admins').get(get_admins)
router.route('/:id').get(get_hosting)
router.route('/login').post(student_login)
router.route('/submit').put(auth_exam,submit)

module.exports=router