const mongoose=require('mongoose')
const {genCourseCode, check_complete}=require('../middle_ware/utility')
const Course_Schema=new mongoose.Schema({
    course_name: {
        type: String,
        required: [true,"Course Name is Required"]
    },

    number_of_questions:{
        type: Number,
        required: [true,"Number of Questions is Required"]
    },

    duration: {
        type: Number,
        required: [true,"Duration is Required"]
    },
    admin:{
        type: mongoose.Types.ObjectId, 
        required: [true,"Admin is Required"]
    },
    course_code: {
        type:Number,
        unique: true
    },
    questions: [{
        number: Number,
        question: String,
        options:{
            a:String,
            b:String,
            c:String, 
            d:String
        },
        answer:String

    }],
    completed: Boolean,
    students:[{
        student_id:mongoose.Types.ObjectId,
        student_names: String,
        score: Number,
        grade: String
    }]

})

Course_Schema.index({course_name:1,admin:1},{unique:true})

Course_Schema.pre('save',function(next){
    if(this.isNew){
        this.course_code=genCourseCode()
    }
    
    next()
})

                                                         
Course_Schema.methods.check_status=function(){
    if(this.questions.length===0){
        return false
    }
    let completed=0
    for(let question of this.questions){
        if(check_complete(question)){
            completed+=1
        }
    }
    if(completed<this.number_of_questions){
        return false
    }else{
        return true
    }
}

Course_Schema.methods.update_status=function(){
    this.completed=this.check_status()
    this.save()
}

Course_Schema.methods.check_student=function(student_id){
    const student=this.students.find((student)=>{
        if(String(student.student_id)==student_id){
            return student
        }    
    })
    if(student){return true}else{return false}  
}
Course_Schema.methods.add_student=function(student_id){
    this.students.push({student_id:student_id})
    this.save()
}


Course_Schema.methods.mark=function(answers){ 
    let score=0
    let total=this.questions.length
    for(let question of this.questions){
        for(let answer in answers){
            if(String(question.number)==answer.slice(1)){
                if(question.answer==answers[answer]){

                    score+=1
                }
            }
        }
    }
    score=(score/total)*100
    let grade;
    if(score>=70){grade="A"}
    else if(score>=60){grade="B"}
    else if(score>=50){grade="C"}
    else if(score>=40){grade="D"}
    else{grade="F"}
    return {score,grade}
    
} 

Course_Schema.methods.Submit=function(student_id,answers){
    const {score,grade}=this.mark(answers)
    const student=this.students.find((student)=>{
        if(student.student_id==student_id){
            student.score=score
            student.grade=grade
            return student
        }
    })
    this.save()
    return {score,grade}
}

module.exports=mongoose.model("Course",Course_Schema)