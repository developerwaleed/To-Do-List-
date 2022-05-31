export default class List {
  constructor() {
    this.listObj = [];
  }

  add(description, completed, index) {
    this.listObj.push({ description, completed, index });
  }

  display() {
    const container = document.getElementById('task-list');
    for (const i in this.listObj) {
      container.innerHTML += `<li class="padding">
            <div class="list-item">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                <label for="vehicle1"> ${this.listObj[i].description}</label><br>
            </div>
            <div class="vertical-dots"></div>
        </li>`;
    }
  }
}