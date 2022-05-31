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

  delTask(task) {
    const taskId = task.target;
    if (taskId.checked) {
      document.getElementById(`label-text${taskId.id}`).classList.add('checked');
      this.listObj[taskId.id - 1].completed = true;
    } else {
      document.getElementById(`label-text${taskId.id}`).classList.remove('checked');
      this.listObj[taskId.id - 1].completed = false;
    }
    this.populateLocalStorage();
  }

  registerCheckBox() {
    if (this.listObj.length > 0) {
      const checkboxes = document.querySelectorAll('.check-box');
      checkboxes.forEach((box) => {
        box.addEventListener('click', this.delTask.bind(this));
      });
    }
  }

  updateCompletedTasks() {
    this.listObj.forEach((Element) => {
      if (Element.completed === true) {
        document.getElementById(`label-text${Element.index}`).classList.add('checked');
        document.getElementById(`${Element.index}`).checked = true;
      }
    });
  }

  display() {
    const container = document.getElementById('task-list');
    container.innerHTML = '';
    let j = 0;
    this.listObj.forEach((i) => {
      j += 1;
      container.innerHTML += `<li class="padding">
            <div class="list-item">
                <input class="check-box" type="checkbox" id="${j}" name="task${j}" value="task">
                <label id="label-text${j}" for="task${j}"> ${i.description}</label><br>
            </div>
            <div class="vertical-dots"></div>
        </li>`;
    });
    this.registerCheckBox();
    this.updateCompletedTasks();
  }

  populateLocalStorage() {
    const data = JSON.stringify(this.listObj);
    localStorage.setItem('Tasks', data);
  }
}

const task = new List();
const addTask = document.getElementById('input-task');
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  task.add(addTask.value);
  form.reset();
  task.display();
});