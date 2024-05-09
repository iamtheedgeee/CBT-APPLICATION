async function main(){
    const response= await fetch('./questions.json')
    questions=await response.json()
    index=1
    answers={}
    render()
}
function render(){ 
    if(index>questions.length-1){
        index=1
        
    }
    if(index<1){
        index=1
    }
    selected_question=questions[index]
    let question_obj=document.getElementById("question")
    let question_number=document.getElementById("q_number")
    let option_1=document.getElementById("A")
    let option_2=document.getElementById("B")
    let option_3=document.getElementById("C")
    let option_4=document.getElementById("D")

    let option_1_span=document.getElementById("a")
    let option_2_span=document.getElementById("b")
    let option_3_span=document.getElementById("c")
    let option_4_span=document.getElementById("d")

    

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
    
    //console.log(answers)      
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
    score=0
    //console.log(answers)
    for(let question of questions.slice(1)){
        //console.log(question.Number+question.Answer)
        for(let answer in answers){
            //console.log(`${answer}${answers[answer]}`)
            if(question.Number==answer && question.Answer==answers[answer]){
                score+=1
            
            }
        }
    }
    console.log(score)
}
main()