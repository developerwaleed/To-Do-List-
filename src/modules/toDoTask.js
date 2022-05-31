import { add } from "lodash";

/* eslint-disable linebreak-style */
export default class List {
  constructor() {
    this.listObj = JSON.parse(localStorage.getItem('Tasks')) || [];
  }

  i = 0;

  add(description, completed = false, index = this.i += 1) {
    this.listObj.push({ description, completed, index });
    this.populateLocalStorage();
  }

  display() {
    const container = document.getElementById('task-list');
    this.listObj.forEach((i) => {
      container.innerHTML += `<li class="padding">
            <div class="list-item">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                <label for="vehicle1"> ${i.description}</label><br>
            </div>
            <div class="vertical-dots"></div>
        </li>`;
    });
  }

  populateLocalStorage() {
    const data = JSON.stringify(this.listObj);
    localStorage.setItem('Tasks', data);
  }
}

const task = new List();
let addTask = document.getElementById('input-task');
let form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  task.add(addTask.value);
  form.reset();
});