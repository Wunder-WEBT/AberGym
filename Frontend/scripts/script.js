console.log('started');
let start = `<div class="draggable exercise" data-et="`;

//group

let second = `" draggable="true">
  <h4>`;

//name

let third = `</h4>
  <button class="deleteButton noPrint">&#10006;</button>
  <h6></h6>
  <p>`;

//descricption

let end =
  '</p> <p> Wdh: <input type="text" /> &emsp; Sätze:<input type="text" /> &emsp; Gewicht: <input type="text" /></p></div>';


const exerciseRequest = new XMLHttpRequest();
exerciseRequest.open('GET', 'http://localhost:8080/exercises', false);  // `false` makes the request synchronous
exerciseRequest.send(null);
let exerciseResponse = JSON.parse(exerciseRequest.responseText);

console.log(exerciseResponse);  

for (let i = 0; i < exerciseResponse.length; i++) {
      if (document.getElementById(exerciseResponse[i]["muscleGroup"]) !== null) {
        let exercise =
          start + exerciseResponse[i].muscleGroup + second + exerciseResponse[i].name + third;

        if (exerciseResponse[i].description !== undefined) {
          exercise += exerciseResponse[i].description;
        }
        exercise += end;
        let helper = document.createElement("a");
        helper.innerHTML = exercise;
        helper.firstChild.dataset.et = "chest";
        document.getElementById(exerciseResponse[i]["muscleGroup"])
          .appendChild(helper.firstChild);
      }
    }


let protoDrag =
  '<div class="draggable exercise" data-et="legs" draggable="true"><h4><input type="text" style="width:300px;border: none;HEIGHT:32px;"/></h4><button type="deleteButton" class="deleteButton noPrint">&#10006;</button><h6></h6><p>Wdh: <input type="text" /> &emsp; Sätze:<input type="text" /> &emsp; Gewicht: <input type="text" /></p></div>';

let draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
let nextElemEBox = null;
let parentEBox = null;
let deleteN = null;

document.querySelectorAll(".exercise").forEach((exercise) => {
  exercise.addEventListener("dragend", (e) => {
    if (!exercise.parentElement.classList.contains("exerciseBox")) {
      const tmp = exercise.cloneNode(true);
      tmp.classList.remove("dragging");
      tmp.classList.remove("exercise");
      tmp.querySelector("button").addEventListener("click", function () {
        deleteN = tmp;
        on();
      });
      tmp.addEventListener("dragstart", () => {
        tmp.classList.add("dragging");
      });
      tmp.addEventListener("dragend", () => {
        tmp.classList.remove("dragging");
      });

      exercise.replaceWith(tmp);
      if (nextElemEBox === null) {
        parentEBox.appendChild(exercise);
      } else {
        parentEBox.insertBefore(exercise, nextElemEBox);
      }
    }
  });

  exercise.addEventListener("dragstart", (e) => {
    nextElemEBox = exercise.nextElementSibling;
    parentEBox = exercise.parentElement;
  });
});

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    const draggable = document.querySelector(".dragging");
    if (
      !container.classList.contains("exerciseBox") ||
      (draggable.classList.contains("exercise") &&
        container.dataset.et === draggable.dataset.et)
    ) {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

let coll = document.getElementsByClassName("collapsible");
let ci;

for (ci = 0; ci < coll.length; ci++) {
  coll[ci].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

document.querySelectorAll(".deleteButton").forEach((button) => {
  button.addEventListener("click", function () {
    deleteN = button.parentElement;
    on();
  });
});

document.querySelectorAll(".addButton").forEach((button) => {
  button.addEventListener("click", function () {
    let newElemP = document.createElement("a");
    newElemP.innerHTML = protoDrag;
    let newElem = newElemP.firstChild;
    newElem.dataset.et = button.nextElementSibling.dataset.et;
    newElem.addEventListener("dragend", (e) => {
      if (!newElem.parentElement.classList.contains("exerciseBox")) {
        const tmp = newElem.cloneNode(true);
        tmp.classList.remove("dragging");
        tmp.classList.remove("exercise");
        tmp.querySelector("button").addEventListener("click", function () {
          deleteN = tmp;
          on();
        });
        tmp.addEventListener("dragstart", () => {
          tmp.classList.add("dragging");
        });
        tmp.addEventListener("dragend", () => {
          tmp.classList.remove("dragging");
        });

        newElem.replaceWith(tmp);
        if (nextElemEBox === null) {
          parentEBox.appendChild(newElem);
        } else {
          parentEBox.insertBefore(newElem, nextElemEBox);
        }
      }
    });
    newElem.querySelector("button").addEventListener("click", function () {
      deleteN = newElem;
      on();
    });
    newElem.addEventListener("dragstart", (e) => {
      nextElemEBox = newElem.nextElementSibling;
      parentEBox = newElem.parentElement;
      newElem.classList.add("dragging");
    });
    newElem.addEventListener("dragend", () => {
      newElem.classList.remove("dragging");
    });
    button.nextElementSibling.prepend(newElem);
    this.parentElement.style.maxHeight = this.parentElement.scrollHeight + "px";
  });
});

document.querySelector("#text").addEventListener("click", function () {
  event.stopPropagation();
});

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function deleteButton() {
  deleteN.remove();
  off();
}

function printButton() {
  window.print();
}
console.log('finished script')
