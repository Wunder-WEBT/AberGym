

fetch('http://localhost:8080/exercises', {
  headers: {
    }}
    ).then(response => response.json())
    .then(data => console.log(data));