
myfunc = function(){
    const xhr  = new XMLHttpRequest();



    xhr.onreadystatechange = ()  => {
        let listUl = document.querySelector('.list_section ul');
        if(xhr.readyState == 4){

            JSON.parse(xhr.response).forEach(list =>{
  
                let li = document.createElement("li");
                li.textContent = `- ${list.name}`;
                li.id = list.id;
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

