const result_span=document.getElementById("status")
 async function register(){
    event.preventDefault()
    const first_name=document.getElementById("F_name").value
    const last_name=document.getElementById("L_name").value
    const password=document.getElementById("password").value
    const email=document.getElementById("email").value
    try{
        const response= await fetch('/api/v2/auth-student/register',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({first_name,last_name,password,email})
    })
        const {msg}=await response.json()
        if(msg==='success'){
            result_span.innerHTML=msg
            login()
        }else{
            result_span.innerHTML=msg
        }
        
    }catch(err){console.log(err);document.write("An error occured")}

}

async function validate(){
    event.preventDefault()
    const reg_no=document.getElementById('reg_no').value
    const password=document.getElementById('password').value
    try {
        const response= await fetch('/api/v2/auth-student/login',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({reg_no,password})
    })
    const {msg}=await response.json()
    if(msg==='success'){
        result_span.innerHTML=msg
        login()
    }else{
        result_span.innerHTML=msg
    }
    } catch (error) {console.log(error);document.write("an error occured")}
}
async function login(){
    document.location='/student'
}
