//FRONTEND LOGIC

const student_btn=document.querySelector('.btn.student')
const instructor_btn=document.querySelector('.btn.instructor')
const popups=document.querySelectorAll('.popup')
const student_registeration_popup=document.getElementById('student-registeration-popup')
const student_login_popup=document.getElementById('student-login-popup')
const instructor_registeration_popup=document.getElementById('instructor-registeration-popup')
const instructor_login_popup=document.getElementById('instructor-login-popup')
const close_btns=document.querySelectorAll('.close')
student_btn.addEventListener('click',()=>{student_registeration_popup.style.display='flex'})
instructor_btn.addEventListener('click',()=>{instructor_registeration_popup.style.display='flex'})
function close(){
    for(let popup of popups){popup.style.display='none'}
}
function student_logging_in(){
    close()
    student_login_popup.style.display='flex'
}
function student_signing_up(){
    close()
    student_registeration_popup.style.display='flex'
}
function instructor_logging_in(){
    close()
    instructor_login_popup.style.display='flex'
}
function instructor_signing_up(){
    close()
    instructor_registeration_popup.style.display='flex'
}
for(let close_btn of close_btns){
    close_btn.addEventListener('click',()=>{close()})
}

//#######


//BACKEND LOGIC
const student_reg_btn=document.getElementById('stdnt-reg-btn')
const student_login_btn=document.getElementById('stdnt-login-btn')
const instructor_reg_btn=document.getElementById('inst-reg-btn')
const instructor_login_btn=document.getElementById('inst-login-btn')

student_reg_btn.addEventListener('click',async()=>{
    event.preventDefault()
    const first_name=document.getElementById("sr_F_name").value
    const last_name=document.getElementById("sr_L_name").value
    const password=document.getElementById("sr_password").value
    const repeated_password=document.getElementById("sr_R_password").value
    const email=document.getElementById("sr_email").value
    if(!(first_name && last_name && password && repeated_password && email)){
        alert('Fill in all Fields')
    }
    else if(password!==repeated_password){
        alert('Passwords must match')
    }
    else{
        try{
            const response= await fetch('/api/v2/auth-student/register',{
                method:"POST",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({first_name,last_name,password,email})
        })
            const {msg}=await response.json()
            if(msg==='success'){
                document.location='/student'
            }else{
                alert(msg)
            }        
        }catch(err){console.log(err);document.write("An error occured")}
    }
})

student_login_btn.addEventListener('click',async()=>{
    event.preventDefault()
    const reg_email=document.getElementById('sl_reg_email').value
    const password=document.getElementById('sl_password').value
    if(!(reg_email && password)){
        alert("Fill in all Fields")
    }
    else{
        try {
            const response= await fetch('/api/v2/auth-student/login',{
                method:"POST",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({reg_email,password})
        })
        const {msg}=await response.json()
        console.log(msg)
        if(msg==='success'){
            document.location='/student'
        }else{
            alert(msg)
        }
        } catch (error) {console.log(error);document.write("An error occured")}
    }
})

instructor_reg_btn.addEventListener('click',async()=>{
    event.preventDefault()
    const username=document.getElementById("ir_username").value
    const password=document.getElementById("ir_password").value
    const repeated_password=document.getElementById("ir_R_password").value
    const email=document.getElementById("ir_email").value
    if(!(username && password && repeated_password && email)){
        alert("Fill in all Fields")
    }
    else if(password !== repeated_password){
        alert("Passwords must match")
    }
    else{
        try{
            const response=await fetch('/api/v2/auth-admin/register',{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username,password,email})
            })
            const {msg}=await response.json()
            if(msg==='success'){
            document.location='/admin'
            }else{
                alert(msg)
            }
        } catch(err){console.log(err);document.write("An error occured")}
    }
})

instructor_login_btn.addEventListener('click',async()=>{
    event.preventDefault()
    const email=document.getElementById("il_email").value
    const password=document.getElementById("il_password").value
    if(!(email && password)){
        alert("Fill in all Fields")
    }
    else{
        try{
            const response=await fetch('/api/v2/auth-admin/login',{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            })
            const {msg}=await response.json()
            if(msg==='success'){
                document.location='/admin'
            }else{
                alert(msg)
            }
        } catch(err){console.log(err);document.write("An error occured")}
    }
})
//####################