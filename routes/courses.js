const express= require('express')
const router=express.Router()

const{
    get_all_exams,
    get_exam,
    create_exam,
    update_exam,
    delete_exam
}=require('../controllers/courses')

//api/v2/course
router.route('/').get(get_all_exams).post(create_exam)
router.route('/:name').get(get_exam).patch(update_exam).delete(delete_exam)

module.exports=router