
myfunc = function(){
    const xhr  = new XMLHttpRequest();



    xhr.onreadystatechange = ()  => {
        let listUl = document.querySelector('.list_section ul');
        if(xhr.readyState == 4){

            JSON.parse(xhr.response).forEach(list =>{
  
                let li = document.createElement("li");
            
                li.id = list.id;
                li.className  =" btn-outline-info border border-info";
                li.innerHTML =`<span>${list.name}</span><svg style="float:right;position: relative;right:5px;top: 9px;" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
              </svg>`;
              
              listUl.appendChild(li);

                li.addEventListener('click', function(){
                    let list = document.querySelector(".item_section ul");
                    list.innerHTML = "";
                    getItems(this.id);
                });
            
            });
        }
            
    }

    xhr.open("GET", "http://localhost:5000/lists",true);
    xhr.send();
}
myfunc();

getItems = function(id){
 
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()  => {
        let itemUl = document.querySelector('.item_section ul');
        if(xhr.readyState == 4){

            JSON.parse(xhr.response).forEach(item =>{
                let done  = (item.done) ? "done":"not yet";
                let li = document.createElement("li");
                li.textContent = `- ${item.value} - state :${done}`;
  
                itemUl.appendChild(li);
       
            
            });
        }
     
            
    }

    xhr.open("GET", `http://localhost:5000/listItems/${id}`,true);
    xhr.send();
}

