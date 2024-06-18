list=[
    {   number:1,
        set:false},
    {number:2,
        set:true},
    {   number:3,
        set:true}
]

new_list=[]
list.find(numbers=>{
    if(numbers.set){
        new_list.push(numbers)
    }
})

console.log(new_list)