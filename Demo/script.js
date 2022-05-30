let protoDrag =
  '<div class="draggable exercise" data-et="legs" draggable="true"><h4><input type="text" /></h4><button type="deleteButton" class="deleteButton">&#10006;</button><h6></h6><p><input type="text" /></p><p>Wdh: <input type="text" /> &emsp; Sätze:<input type="text" /> &emsp; Gewicht: <input type="text" /></p></div>';

let draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
let nextElemEBox = null;
let parentEBox = null;

document.querySelectorAll(".exercise").forEach((exercise) => {
  exercise.addEventListener("dragend", (e) => {
    if (!exercise.parentElement.classList.contains("exerciseBox")) {
      const tmp = exercise.cloneNode(true);
      tmp.classList.remove("dragging");
      tmp.classList.remove("exercise");
      tmp.querySelector("button").addEventListener("click", function () {
        tmp.remove();
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
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

document.querySelectorAll(".deleteButton").forEach((button) => {
  button.addEventListener("click", function () {
    button.parentElement.remove();
  });
});

document.querySelectorAll(".addButton").forEach((button) => {
  button.addEventListener("click", function () {
    var newElem  = document.createElement("a");
    newElem.innerHTML = protoDrag;
    newElem.firstChild.dataset.et = button.nextElementSibling.dataset.et
    newElem.firstChild.addEventListener("dragend", (e) => {
      if (!exercise.parentElement.classList.contains("exerciseBox")) {
        const tmp = exercise.cloneNode(true);
        tmp.classList.remove("dragging");
        tmp.classList.remove("exercise");
        tmp.querySelector("button").addEventListener("click", function () {
          tmp.remove();
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
    newElem.firstChild.addEventListener("dragstart", (e) => {
      nextElemEBox = exercise.nextElementSibling;
      parentEBox = exercise.parentElement;
      draggable.classList.add("dragging");
    });
    newElem.firstChild.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
    button.nextElementSibling.prepend(newElem.firstChild);
  });
});
