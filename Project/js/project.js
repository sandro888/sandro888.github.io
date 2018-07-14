// this function adds click event to button and add columns

document.querySelector(".add").addEventListener("click", function(){
    let a=document.querySelector(".container");
    let b=document.createElement("div");
    b.setAttribute("class", "table2");
    b.setAttribute("id", "date");
    a.appendChild(b);
    
    for(let i=0; i<11; i++) {
        let d = document.createElement("div");
        d.setAttribute("class", "table-cell2");
        d.setAttribute("id", "date1");
        b.appendChild(d);
        d.addEventListener("click",function(e){
           
            let input=prompt("add number");
            d.innerHTML = Number(input);
            
            
            if(input<=5){
                d.style.backgroundColor="#05c46b"
            }

            if(input>5){
                
                d.style.backgroundColor="#05c46b"
                d.innerHTML="5";
            }
            if(input<0){
                d.style.backgroundColor="#05c46b"
                d.innerHTML="0";

            }
            
            
    
        });
    }
});
// this function adds click event to button and remove columns

document.querySelector(".remove").addEventListener("click", function(){
    var elem = document.getElementById("date");
    elem.remove();
   
});


//
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var date = new Date();
var day = date.getDate();
var month = date.getMonth();

var time = document.createElement('div');
time.innerHTML = months[3] + " " + 30;
document.getElementById('date1').appendChild(time).stepUp(5);;










