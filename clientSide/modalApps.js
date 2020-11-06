$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
    });
    $("#NewList").on( "click", function() {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 ){
            let listUl = document.querySelector('.list_section ul');
            let list = JSON.parse(xhr.responseText); 
            console.log(list);
            let li = document.createElement("li");  
            li.id = list.id;
            li.className  =" btn-outline-info border border-info";
            li.innerHTML =`<span>${list.name}</span>
            <svg style="float:right;position: relative;right:20px;top: 9px;" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square btn-outline-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <svg style="float:right;position: relative;left:9px;top: 9px;" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill btn-outline-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
            </svg>`;
            listUl.appendChild(li);
           
          }
      }
      let listname =  document.getElementById("ListName").value;
      console.log(listname);
      xhr.open("POST", "http://localhost:5000/lists",true);
      xhr.setRequestHeader("Content-Type", "application/json");
      let postedList = {name : listname};
      xhr.send(JSON.stringify(postedList));

    });