
// this function adds click event to button and add columns
document.querySelector(".add").addEventListener("click", function(){
    let a=document.querySelector(".container");
    let b=document.createElement("div");
    //creating div with class "table2" in container
    
    b.setAttribute("class", "table2");
    
    //also assigning to the same div id "date"
    b.setAttribute("id", "date");
    
    a.appendChild(b);
    
    for(let i=0; i<11; i++) {
        let d = document.createElement("div");
        //creating div with class "table-cell2 " in the b
        
        d.setAttribute("class", "table-cell2");
        d.setAttribute("id", `date${i}`);
        //appending elements to b element
        b.appendChild(d);
        d.addEventListener("click",function(e){
            
            let input=prompt("add number");
            d.textContent = Number(input);
            
            
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










