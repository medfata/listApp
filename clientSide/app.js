const xhr  = new XMLHttpRequest();

xhr.open("GET", "http://localhost:5000/lists", false);


try {
    xhr.send();
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      alert(xhr.response);
    }
  } catch(err) { // instead of onerror
    alert("Request failed");
  }
