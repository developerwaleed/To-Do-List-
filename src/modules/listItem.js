export default function listItem(index, description) {
  return `<li class="padding draggables" draggable="true" id=li-${index}>
    <div class="list-item">
        <input class="check-box" type="checkbox" id="${index}" name="task${index}" value="task">
        <input class="labels" id="label-text ${index}" for="task${index}" disabled value="${description}">
        <br>
    </div>
    <div class="material-symbols-outlined vertical-dots" id=dot${index}>&#xe5d4;</div>
    <div class="material-symbols-outlined done-btn" id=done${index}>&#xe876;</div>
    <div class="material-symbols-outlined delete-btn" id=del${index}>&#xe872;</div>
</li>`;
}