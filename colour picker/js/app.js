let result1=document.querySelector(".first3");
let result2=document.querySelector(".second3");
let result3=document.querySelector(".third3");
function colorPicker(pick){
    if(pick.target.parentNode.className== "one"){
        result1.style.backgroundColor=document.defaultView.getComputedStyle(pick.target).getPropertyValue("background-color");
    }else if(pick.target.parentNode.className== "two"){
        result2.style.backgroundColor=document.defaultView.getComputedStyle(pick.target).getPropertyValue("background-color");
    }else{
        result3.style.backgroundColor=document.defaultView.getComputedStyle(pick.target).getPropertyValue("background-color");
    }
}
function saveColors(){
    let colors =document.querySelectorAll("#add");
    const chosen=Array.from(colors);
    chosen.forEach(function(color){
        color.addEventListener("click", colorPicker)

    })

}
saveColors();


