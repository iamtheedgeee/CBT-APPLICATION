const express= require('express')
const router=express.Router()

const{
    get_all_courses,
    get_course,
    create_course,
    update_course,
}=require('../controllers/courses')

//api/v2/course
router.route('/').get(get_all_courses).post(create_course)
router.route('/:name').get(get_course).patch(update_course)

module.exports=router