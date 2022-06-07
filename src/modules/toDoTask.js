/* eslint-disable linebreak-style */
import listItem from './listItem.js';
// import getPositionOfElement from './getElementPostion.js';
// eslint-disable-next-line import/no-cycle
import { dragging } from './DraggingFunctions.js';

export default class ToDoList {
  constructor() {
    this.taskObjArray = JSON.parse(localStorage.getItem('Tasks')) || []; // taskObjArray conatins all the values for TODO TAKS
  }

  self = this;

  i = 0;

  add(description, completed = false, index = (this.i += 1)) {
    this.taskObjArray.push({ description, completed, index });
    this.populateLocalStorage();
  }

  reAssignIndex() {
    let k = 0;
    this.taskObjArray.forEach((elem) => {
      k += 1;
      elem.index = k;
    });
  }

  updateCompleteTask(checkbox) {
    const checkboxId = checkbox.target;
    if (checkboxId.checked) {
      document
        .getElementById(`label-text ${checkboxId.id}`)
        .classList.add('checked');
      this.taskObjArray[checkboxId.id - 1].completed = true;
    } else {
      document
        .getElementById(`label-text ${checkboxId.id}`)
        .classList.remove('checked');
      this.taskObjArray[checkboxId.id - 1].completed = false;
    }
    this.populateLocalStorage();
  }

  // eslint-disable-next-line class-methods-use-this
  kebabMenuClicked(dot) {
    const targetMenu = dot.target;
    const targetParent = targetMenu.parentElement;
    targetParent.classList.add('dot-menu');
    targetParent.children[0].children[1].disabled = false;
    targetParent.children[1].style.display = 'none';
    targetParent.children[3].style.display = 'block';
    targetParent.children[2].style.display = 'block';
  }

  saveChanges(done) {
    const targebtn = done.target;
    const targetParent = targebtn.parentElement;
    targetParent.classList.remove('dot-menu');
    targetParent.children[0].children[1].disabled = true;
    targetParent.children[1].style.display = 'block';
    targetParent.children[3].style.display = 'none';
    targetParent.children[2].style.display = 'none';

    this.taskObjArray.forEach((n) => {
      if (targebtn.id === `done${n.index}`) {
        n.description = targebtn.parentElement.children[0].children[1].value;
      }
    });
    this.populateLocalStorage();
    this.display();
  }

  delTask(del) {
    const delBtn = del.target;
    this.taskObjArray.forEach((n) => {
      if (delBtn.id === `del${n.index}`) {
        this.self.taskObjArray.splice(n.index - 1, 1);
      }
    });
    this.reAssignIndex();
    this.populateLocalStorage();
    this.display();
  }

  saveEditedValue(taskField) {
    const targetTaskField = taskField.target;
    targetTaskField.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        const parentElem = targetTaskField.parentElement.parentElement;
        parentElem.classList.remove('dot-menu');
        parentElem.children[0].children[1].disabled = true;
        parentElem.children[1].style.display = 'block';
        parentElem.children[3].style.display = 'none';
        parentElem.children[2].style.display = 'none';

        this.taskObjArray.forEach((n) => {
          if (targetTaskField.id === `label-text ${n.index}`) {
            n.description = parentElem.children[0].children[1].value;
          }
        });

        this.populateLocalStorage();
        this.display();
      }
    });
  }

  registerElements() {
    if (this.taskObjArray.length > 0) {
      const checkboxes = document.querySelectorAll('.check-box');
      const targetTaskField = document.querySelectorAll('.labels');
      const kebabMenu = document.querySelectorAll('.vertical-dots');
      const doneBtn = document.querySelectorAll('.done-btn');
      const delBtn = document.querySelectorAll('.delete-btn');

      checkboxes.forEach((box) => {
        box.addEventListener('click', this.updateCompleteTask.bind(this));
      });
      targetTaskField.forEach((input) => {
        input.addEventListener('click', this.saveEditedValue.bind(this));
      });
      kebabMenu.forEach((dot) => {
        dot.addEventListener('click', this.kebabMenuClicked.bind(this));
      });
      doneBtn.forEach((done) => {
        done.addEventListener('click', this.saveChanges.bind(this));
      });
      delBtn.forEach((del) => {
        del.addEventListener('click', this.delTask.bind(this));
      });
      dragging();
    }
  }

  display() {
    const container = document.getElementById('task-list');
    container.innerHTML = '';
    let j = 0;
    this.taskObjArray.forEach((i) => {
      j += 1;
      container.innerHTML += listItem(j, i.description, i.completed);
    });
    this.registerElements();
  }

  populateLocalStorage() {
    const data = JSON.stringify(this.taskObjArray);
    localStorage.setItem('Tasks', data);
  }
}

// Creating Instance of Class
export const task = new ToDoList();
const addTask = document.getElementById('input-task');
const form = document.getElementById('form');

// Adding Event Listener to the "Submit Form Event"
form.addEventListener('submit', (e) => {
  e.preventDefault();
  task.add(addTask.value);
  form.reset();
  task.reAssignIndex();
  task.populateLocalStorage();
  task.display();
});

// Adding Event Listener to the 'CLEAR ALL COMPLETED TASK" Button
const targetClearBtn = document.getElementById('clear-btn');

targetClearBtn.addEventListener('click', () => {
  const filteredArr = task.taskObjArray.filter((x) => x.completed !== true);
  task.taskObjArray = filteredArr;
  task.reAssignIndex();
  task.populateLocalStorage();
  task.display();
});
