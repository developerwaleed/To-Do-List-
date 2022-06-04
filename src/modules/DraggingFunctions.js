/* eslint-disable linebreak-style */
import getPositionOfElement from './getElementPostion.js';
// import List, { task } from './toDoTask.js';

export default function dragging() {
  const draggables = document.querySelectorAll('.draggables');
  // const dragging = document.querySelectorAll('.dragging');
  const container = document.getElementById('task-list');

  // function setIndex(element) {
  //   task.listObj.forEach((obj) => {
  //     if (obj.index === element.target.id) {
  //     }
  //     // });
  //     // console.log(task.listObj);
  //   });
  // }

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
      draggable.classList.add('dot-menu');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      draggable.classList.remove('dot-menu');
    });
    container.addEventListener('dragover', (e) => {
      const dragging = document.querySelector('.dragging');
      e.preventDefault();
      const detectElement = getPositionOfElement(container, e.clientY);
      if (detectElement !== null) {
        // console.log('DetectedElem=', detectElement.children[0].children[1]);

        container.insertBefore(dragging, detectElement);
      }
    });
  });
}
