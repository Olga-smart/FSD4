import {Label} from './label.js';
import {createElement} from './createElement.js';

export class MinMaxLabel extends Label {
  constructor(type = 'left') {
    super(type);
    this.component = createElement('div', `range-slider__min-max-label range-slider__min-max-label_${type} js-range-slider__min-max-label_${type}`);
  }

  fixPositionForVertical() {
    if (this.type == 'left') {
      this.component.style.transform = `rotate(90deg) translateX(-${this.component.offsetWidth}px)`;
    }
    if (this.type == 'right') {
      this.component.style.transform = `rotate(90deg) translateX(${this.component.offsetHeight}px)`;
    }
  }
}