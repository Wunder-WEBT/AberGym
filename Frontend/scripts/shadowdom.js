
//needs style.css, bootstrap.css, script.js
const tabPanel1 = document.querySelector('#tabpanel-1');
const shadow1 = tabPanel1.attachShadow({mode: 'open'});


//needs style.css
const tabPanel2 = document.querySelector('#tabpanel-2');
const shadow2 = tabPanel2.attachShadow({mode: 'open'});


//needs style.css
const tabPanel3 = document.querySelector('#tabpanel-3');
const shadow3 = tabPanel3.attachShadow({mode: 'open'});


  fetch('html/workoutPlanCreation.html')
  .then(response => response.text())
  .then(html => {
    shadow1.innerHTML = html;
    let script = document.createElement('script');
    script.setAttribute('src', './scripts/script.js');
    shadow1.appendChild(script);
  })

fetch('html/templates.html')
  .then(response => response.text())
  .then(html => {
    shadow2.innerHTML = html;
  })

fetch('html/user.html')
  .then(response => response.text())
  .then(html => {
    shadow3.innerHTML = html;
  })
  