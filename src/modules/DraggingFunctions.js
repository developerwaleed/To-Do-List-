/* eslint-disable linebreak-style */
import getPositionOfElement from './getElementPostion.js';
import List, { task } from './toDoTask.js';

export default function dragging() {
  const draggables = document.querySelectorAll('.draggables');
  // const dragging = document.querySelectorAll('.dragging');
  const container = document.getElementById('task-list');

  function setIndex() {
    const objArray = [...container.querySelectorAll('.draggables')];
    objArray.forEach((element) => {
      let rex = /\d/;
      const {id} = element;
      let elementId = id.match(rex);
      console.log(elementId);
      // console.log(element);
      // console.log(id.substring(id.indexOf('-'), id.length - 0));
      // task.listObj.filter((x) => `li-${x.index}` === id).index = id.substring(
      //   id.lastindexOf(1),
      //   id.length - 0
      // );
    });
    // console.log(task.listObj);
    // console.log(objArray);
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
