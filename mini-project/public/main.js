window.onload = () =>{
    const editInfo  = document.getElementById("formEdit");
    const editBtn = document.getElementById("edit");
    editBtn.addEventListener('click',() =>{
        editInfo.hidden = false;
    })
}