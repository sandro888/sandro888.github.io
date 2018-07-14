
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
        
       
        let c = document.getElementsByClassName("table-cell2")
        
        
        //applying zeros in all cells as default
        for(let i=1; i< c.length; i++) {
            c[i].textContent ="0";
        }
        
        
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
            let daymay=getElementById("date0")
            daymay.textContent=day()
            var date =new Date(2018,3,30);
            function day(){
            if(date.getDay()==1 || getDay()==3 || date.getDay() == 5){
                date=new Date(date.getTime()+2*(24*60*1000));
               
            }
            else if(date.getDay()==6){
                date=new Date(date.getTime()+(24*60*1000));

            }
        
        }
            
        document.getElementById("date0").appendChild(date)

    
        });
        
        
    }
    
});


            

// this function adds click event to button and remove columns

document.querySelector(".remove").addEventListener("click", function(){
    var elem = document.getElementsByClassName("table2");
    elem[elem.length-1].remove();
   
});

 


   
    










