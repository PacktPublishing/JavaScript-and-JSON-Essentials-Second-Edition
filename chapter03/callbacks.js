
function greetAll(callback){
    console.log("Hello Readers!");
    console.log(`Greeting from the ${callback()}`)
    callback()
}

greetAll(()=>{
    return "Author";
})