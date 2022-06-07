/* eslint-disable linebreak-style */
import getPositionOfElement from './getElementPostion.js';
// eslint-disable-next-line import/no-cycle
import { task } from './toDoTask.js';

const taskContainer = document.getElementById('task-list');

export const setIndex = () => {
  const objArray = [...taskContainer.querySelectorAll('.draggables')];

  const tempArr = objArray.map((element) => ({
    description: element.children[0].children[1].value,
    completed: element.children[0].children[0].checked,
    index: element.id.substring(element.id.indexOf('-') + 1, element.id.length),
  }));
  task.taskObjArray = tempArr;
  task.display();
  task.populateLocalStorage();
};

export const dragging = () => {
  const draggables = document.querySelectorAll('.draggables');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
      draggable.classList.add('dot-menu');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      draggable.classList.remove('dot-menu');
      setIndex();
    });
    taskContainer.addEventListener('dragover', (e) => {
      const dragging = document.querySelector('.dragging');
      e.preventDefault();
      const detectElement = getPositionOfElement(taskContainer, e.clientY);
      if (detectElement !== null) {
        taskContainer.insertBefore(dragging, detectElement);
      }
    });
  });
};
