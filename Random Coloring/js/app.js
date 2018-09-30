let cont = document.querySelector('.container');
for (let i = 1; i < 21; i++) {
    let div = document.createElement("div")
    div.textContent = `${i}`
    div.className ="block"
    div.id= `${i}`
    cont.appendChild(div)

}
document.querySelector("button").addEventListener("click",randomizeColors);

function randomizeColors(){
    let getRandom = Math.floor((Math.random() * 20)) 
    let divs = document.querySelector(`[id="${getRandom}"]`)

    if(divs.style.backgroundColor == '') {
      divs.style.backgroundColor = "Springgreen";
    } 
    else if(divs.style.backgroundColor == "springgreen") {
      divs.style.backgroundColor = "Yellowgreen ";
    }
    else if (divs.style.backgroundColor == "yellowgreen") {
      divs.style.backgroundColor = "Teal" ; 
    } 
    else if(divs.style.backgroundColor == "teal"){
      divs.style.backgroundColor = '';
    }

}
