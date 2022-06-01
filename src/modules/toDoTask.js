/* eslint-disable linebreak-style */
export default class List {
  constructor() {
    this.listObj = JSON.parse(localStorage.getItem('Tasks')) || [];
  }

  self = this;

  i = 0;

  add(description, completed = false, index = this.i += 1) {
    this.listObj.push({ description, completed, index });
    this.populateLocalStorage();
  }

  reAssignIndex() {
    let k = 0;
    this.listObj.forEach((elem) => {
      k += 1;
      elem.index = k;
    });
  }

  delTask(checkbox) {
    const checkboxId = checkbox.target;
    if (checkboxId.checked) {
      document.getElementById(`label-text ${checkboxId.id}`).classList.add('checked');
      this.listObj[(checkboxId.id) - 1].completed = true;
    } else {
      document.getElementById(`label-text ${checkboxId.id}`).classList.remove('checked');
      this.listObj[checkboxId.id - 1].completed = false;
    }
    this.populateLocalStorage();
  }

  // eslint-disable-next-line class-methods-use-this
  dotMenuPressed(dot) {
    const targetMenu = dot.target;
    targetMenu.parentElement.classList.add('dot-menu');
    targetMenu.parentElement.children[0].children[1].disabled = false;
    targetMenu.parentElement.children[1].style.display = 'none';
    targetMenu.parentElement.children[3].style.display = 'block';
    targetMenu.parentElement.children[2].style.display = 'block';
  }

  doneMenuPressed(done) {
    const targebtn = done.target;
    targebtn.parentElement.classList.remove('dot-menu');
    targebtn.parentElement.children[0].children[1].disabled = true;
    targebtn.parentElement.children[1].style.display = 'block';
    targebtn.parentElement.children[3].style.display = 'none';
    targebtn.parentElement.children[2].style.display = 'none';

    this.listObj.forEach((n) => {
      if (targebtn.id === `done${n.index}`) {
        n.description = targebtn.parentElement.children[0].children[1].value;
      }
    });
    this.populateLocalStorage();
    this.display();
  }

  delbtnPressed(del) {
    const delBtn = del.target;
    this.listObj.forEach((n) => {
      if (delBtn.id === `del${n.index}`) {
        this.self.listObj.splice(n.index - 1, 1);
      }
    });
    this.reAssignIndex();
    this.populateLocalStorage();
    this.display();
  }

  storeValue(label) {
    const labelId = label.target;
    labelId.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        const parentElem = labelId.parentElement.parentElement;
        parentElem.classList.remove('dot-menu');
        parentElem.children[0].children[1].disabled = true;
        parentElem.children[1].style.display = 'block';
        parentElem.children[3].style.display = 'none';
        parentElem.children[2].style.display = 'none';

        this.listObj.forEach((n) => {
          if (labelId.id === `label-text ${n.index}`) {
            n.description = parentElem.children[0].children[1].value;
          }
        });

        this.populateLocalStorage();
        this.display();
      }
    });
  }

  registerCheckBoxandLabelsandVerticalmenu() {
    if (this.listObj.length > 0) {
      const checkboxes = document.querySelectorAll('.check-box');
      const targetLabel = document.querySelectorAll('.labels');
      const dots = document.querySelectorAll('.vertical-dots');
      const doneBtn = document.querySelectorAll('.done-btn');
      const delBtn = document.querySelectorAll('.delete-btn');

      checkboxes.forEach((box) => {
        box.addEventListener('click', this.delTask.bind(this));
      });
      targetLabel.forEach((input) => {
        input.addEventListener('click', this.storeValue.bind(this));
      });
      dots.forEach((dot) => {
        dot.addEventListener('click', this.dotMenuPressed.bind(this));
      });
      doneBtn.forEach((done) => {
        done.addEventListener('click', this.doneMenuPressed.bind(this));
      });
      delBtn.forEach((del) => {
        del.addEventListener('click', this.delbtnPressed.bind(this));
      });
    }
  }

  updateTasksComplete() {
    this.listObj.forEach((Element) => {
      console.log(Element.completed);
      if (Element.completed === true) {
        console.log('rundone');
        document.getElementById(`${Element.index}`).checked = true;
        document.getElementById(`label-text ${Element.index}`).classList.add('checked');
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
                <input class="labels" id="label-text ${j}" for="task${j}" disabled value="${i.description}">
                <br>
            </div>
            <div class="material-symbols-outlined vertical-dots" id=dot${j}>&#xe5d4;</div>
            <div class="material-symbols-outlined done-btn" id=done${j}>&#xe876;</div>
            <div class="material-symbols-outlined delete-btn" id=del${j}>&#xe872;</div>
        </li>`;
    });
    console.table(this.listObj);
    this.registerCheckBoxandLabelsandVerticalmenu();
    this.updateTasksComplete();
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
  task.reAssignIndex();
  task.populateLocalStorage();
  task.display();
});