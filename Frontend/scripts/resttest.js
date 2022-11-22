

fetch('http://localhost:8080/hello', {
    mode: 'no-cors',  
  headers: {
    }}
    ).then(response => response.json())
    .then(data => console.log(data));