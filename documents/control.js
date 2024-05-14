 async function register(){
    event.preventDefault()
    var first_name=document.getElementById("F_name").value
    var last_name=document.getElementById("L_name").value
    var password=document.getElementById("password").value
    try{
        const response= await fetch('http://192.168.43.93:5000/api/students/',{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({id:"",first_name:first_name,last_name:last_name,password:password})
    })
        student=await response.json()
        login(student.id,student.first_name,student.password)
    }catch(err){console.log(error)}
    
    
}

async function validate(){
    event.preventDefault()
    var id=document.getElementById("id").value
    var first_name=document.getElementById("F_name").value
    var last_name=document.getElementById("L_name").value
    var password=document.getElementById("password").value
    try{
    console.log(id)
    const response= await fetch(`http://192.168.43.93:5000/api/students/${id}`)
    const actual =await response.json()

    const valid_f_name=(first_name===actual.first_name)
    const valid_l_name=(last_name===actual.last_name)
    const valid_password=(password===actual.password)

    console.log(valid_f_name,valid_l_name,valid_password)
    if(valid_f_name && valid_l_name && valid_password){
        login(id,first_name,password)

    }
}   catch(err){console.log(err)}

}
async function login(id,first_name,password){
    document.location=`http://192.168.43.93:5000/students/${id}/${first_name}/${password}`
}
