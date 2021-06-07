export class Label {
  constructor(type = 'left') {
    this.type = type;
  }

  setOpacity(value) {
    this.component.style.opacity = value;
  }

  setValue(value) {
    this.component.textContent = value;
  }

  getBoundingClientRect() {
    return this.component.getBoundingClientRect();
  } 
}