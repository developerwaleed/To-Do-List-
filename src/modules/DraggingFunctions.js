/* eslint-disable linebreak-style */
import getPositionOfElement from './getElementPostion.js';
// eslint-disable-next-line import/no-cycle
import { task } from './toDoTask.js';

export default function dragging() {
  const draggables = document.querySelectorAll('.draggables');
  // const dragging = document.querySelectorAll('.dragging');
  const container = document.getElementById('task-list');

  function setIndex() {
    const objArray = [...container.querySelectorAll('.draggables')];

    const tempArr = objArray.map((element) => ({
      description: element.children[0].children[1].value,
      completed: element.children[0].children[0].checked,
      index: element.id.substring(
        element.id.indexOf('-') + 1,
        element.id.length,
      ),
    }));
    task.listObj = tempArr;
    task.display();
    task.populateLocalStorage();
  }

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
    container.addEventListener('dragover', (e) => {
      const dragging = document.querySelector('.dragging');
      e.preventDefault();
      const detectElement = getPositionOfElement(container, e.clientY);
      if (detectElement !== null) {
        container.insertBefore(dragging, detectElement);
      }
    });
  });
}
