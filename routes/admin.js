const express= require('express')
const router=express.Router()

const{
    get_admin,
    select_exam
}=require('../controllers/admin')

//api/v2/admin
router.route('/').get(get_admin)
router.route('/select').put(select_exam)
module.exports=router