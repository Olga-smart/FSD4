import {Label} from './label.js';
import {createElement} from './createElement.js';

export class ValueLabel extends Label {
  constructor(type = 'left') {
    super(type);
    this.component = createElement('div', `range-slider__value-label range-slider__value-label_${type} js-range-slider__value-label_${type}`);
  }

  setLeftIndent(value) {
    this.component.style.left = value;
  }

  getLeftIndent() {
    return this.component.style.left;
  }

  setRightIndent(value) {
    this.component.style.right = value;
  }

  getRightIndent() {
    return this.component.style.right;
  }

  fixPositionForVertical() {
    if (this.type == 'left') {
      this.component.style.transform = `rotate(90deg) translateX(${this.component.offsetHeight}px) translateY(${this.component.offsetWidth}px) translateY(-50%)`;
    }
    if (this.type == 'right') {
      this.component.style.transform = `rotate(90deg) translateX(${this.component.offsetHeight}px) translateY(-50%)`;
    }
    if (this.type == 'common') {
      this.component.style.transform = `rotate(90deg) translateX(${this.component.offsetHeight}px) translateY(${this.component.offsetWidth}px) translateY(-50%)`;
    }
  }
}