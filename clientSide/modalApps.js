document.getElementById("addlist").addEventListener("click", (e) =>{
  $("#exampleModal").modal("show");
})
//addding a new list :
$("#NewList").on( "click", function() {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 ){
          let listUl = document.querySelector(".list_section ul");
          listUl.innerHTML = "";
            let list = JSON.parse(xhr.responseText); 
          
              if(list != null){
                myfunc();
              }
           
          }
      }
      let listname =  document.getElementById("ListName").value;
      xhr.open("POST", "http://localhost:5000/lists",true);
      xhr.setRequestHeader("Content-Type", "application/json");
      let postedList = {name : listname};
      xhr.send(JSON.stringify(postedList));

});
//adding a new item 

$("#NewItem").on( "click", function() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 ){
        let listUl = document.querySelector(".list_section ul");
        listUl.innerHTML = "";
        let item = JSON.parse(xhr.responseText); 
        if(item != null){
          myfunc();
          getItems(listId);
        }
       
      }
  }
  let itemValue =  document.getElementById("itemValue").value;
  let listId = document.querySelector("#modal_body label").id;
  xhr.open("POST", "http://localhost:5000/items",true);
  xhr.setRequestHeader("Content-Type", "application/json");
  let postedItem = {value : itemValue, listId:listId};
  xhr.send(JSON.stringify(postedItem));

});
