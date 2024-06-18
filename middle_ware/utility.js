//VARIOUS MIDDLEWARE FUNCTIONS LIE HERE

const get_registration_number= (students_list)=>{
    const head='2024/'
    let registration_number=''
    while (registration_number.length<=5){
        registration_number+=String(Math.floor(Math.random()*9))
    }
    return head+registration_number
}

const genCourseCode=()=>{
    let course_code=''
    while(course_code.length<=5){
        course_code+=String(Math.floor(Math.random()*9))
    }
    return course_code
}

function check_complete(question){
 if(
    question.question!==''
        &&
    question.options.a!==''
        &&
    question.options.b!==''
        &&        
    question.options.c!==''
        &&
    question.options.d!==''
        &&
    question.answer!==''
 ){
    return true
 }
}

function get_admin_registration_number(){
    let reg_no=''
    while(reg_no.length<=3){
        reg_no+=String(Math.floor(Math.random()*9))
    }
    return reg_no
}
module.exports={
    get_registration_number,
    genCourseCode,
    check_complete,
    get_admin_registration_number}


