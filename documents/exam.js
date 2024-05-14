exam=document.getElementById("EXAM")
document.body.removeChild(exam)
choose=document.getElementById("CHOOSE")
Login=document.getElementById("LOGIN")


async function login(){
    event.preventDefault()
    const student_id=document.getElementById("student_id").value
    const password=document.getElementById("password").value
    const response= await fetch(`http://192.168.43.93:5000/api/students/${student_id}`)
    try{
        const student=await response.json()
        if(student.password===password){
            document.body.removeChild(Login)
            document.body.appendChild(exam)
            main(student)
        }else{
            document.write("Incorrect password")
        }
    }catch(err){document.write("Invalid ID")}
}
async function main(student){
    const response= await fetch('http://192.168.43.93:5000/api/exam/')
    questions=await response.json()
    course_meta_data=questions[0]
    console.log(student)
    console.log(questions)
    Student=student
    student_id=student.id
    first_name=student.first_name
    last_name=student.last_name
    course_name=course_meta_data.Course_name
    students_written=course_meta_data.Students_written
    time_milliseconds=course_meta_data.time*60000
    if(students_written.includes(student_id)){
        document.write("You've already written this course!")
        setTimeout(() => {
            document.location='http://192.168.43.93:5000/exam.html'
        },1500);
    }else{
        index=1
        answers={}
        //start timer

        setInterval(() => {
            time_milliseconds-=1000
            console.log(time_milliseconds)
            render()
        },1000);

       
    }
    
}
function render(){ 
    
    if(index>questions.length-1){
        index=1
    }
    if(index<1){
        index=1
    }
    selected_question=questions[index]
    let exam_title=document.getElementById("exam")
    let question_obj=document.getElementById("question")
    let time= document.getElementById("time")
    let option_1=document.getElementById("A")
    let option_2=document.getElementById("B")
    let option_3=document.getElementById("C")
    let option_4=document.getElementById("D")

    let option_1_span=document.getElementById("a")
    let option_2_span=document.getElementById("b")
    let option_3_span=document.getElementById("c")
    let option_4_span=document.getElementById("d")

    time_seconds=Math.floor(time_milliseconds/1000)

    exam_title.innerHTML=`Exam-${course_name}`
    time.innerHTML=`Time Left--${time_seconds}`
    question_obj.innerHTML=`${index}. ${selected_question.Question}`
    option_1.value=selected_question.options["a"]
    option_1_span.innerHTML=`<b>A</b>: ${selected_question.options["a"]}`

    option_2.value=selected_question.options["b"]
    option_2_span.innerHTML=`<b>B</b>: ${selected_question.options["b"]}`

    option_3.value=selected_question.options["c"]
    option_3_span.innerHTML=`<b>C</b>: ${selected_question.options["c"]}`

    option_4.value=selected_question.options["d"]
    option_4_span.innerHTML=`<b>D</b>: ${selected_question.options["d"]}`

    buttons=document.querySelectorAll('input[type="radio"]')
    
    
    for(let button of buttons){
        if(button.checked){
             button.checked=false
        }
    }
    for(let answer in answers){
        //console.log(answer)
        if(answer===`Q${index}`){
            for(let button of buttons){
                if(button.value===answers[`Q${index}`]){
                    button.checked=true
                }
            }
        }
    }
    if(time_milliseconds<0){
        submit()
    }

    document.onvisibilitychange=()=>{
        if(document.visibilityState==='hidden'){
            submit()
        }
    }
    window.onload=()=> {
        submit()
    }

}

function next(){index+=1;render();}
function previous(){index-=1;render();}
function save(){
    for(let button of buttons){
        if(button.checked){
            answers[`Q${index}`]=button.value
        }
    }    
}

function submit(){
    let score=0
    let total=questions.length-1
    for(let question of questions.slice(1)){
        for(let answer in answers){
            if(question.Number==answer){
                if(question.Answer==answers[answer]){
                    score+=1
                }else{
                    console.log(`Failed ${question.Number}`)
                }  
            }
        }
    }
    console.log(score)
    score=get_score(score,total)
    grade=get_grade(score)
    Student.results.push(
        {
            course: course_name,
            score: score,
            grade: grade
        }
    )
    questions[0].Students_written.push(student_id)
    update_course()
    update_student()
   
    document.write("Successfully finished exam")
    setTimeout(() => {
        document.location="http://192.168.43.93:5000/exam.html"
    }, 2000);
}
function get_score(score,total){
    let Score=(score/total)*100
    return Score
}
function get_grade(score){
    let grade=""
    if(score>=70){
        grade="A"
    }
    else if(score>=60){
        grade="B"
    }
    else if(score>=50){
        grade="C"
    }
    else if(score>=40){
        grade="D"
    }
    else{
        grade="F"
    }
    return grade
}

async function update_student(){
    try{
        const response= await fetch(`http://192.168.43.93:5000/api/students/`,{
        method:"PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(Student)
        })
        console.log(await response.text())
    }catch(err){console.log(err)}
    
}

async function update_course(){
    try{
        const response= await fetch(`http://192.168.43.93:5000/api/exam/`,{
        method:"PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({course:course_name,questions:questions})
        })
        console.log(await response.text())
    }catch(err){console.log(err)}
}