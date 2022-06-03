import getPositionOfElement from './getElementPostion.js';

export default function dragging() {
  const draggables = document.querySelectorAll('.draggables');
  const dragging = document.querySelectorAll('.dragging');
  const container = document.getElementById('task-list');
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
        container.insertBefore(dragging, detectElement);
      }
    });
  });
}
