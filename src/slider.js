import {createElement} from './createElement.js';

export class Slider {
  constructor() {
    this.component = createElement('div', 'range-slider__slider');
  }

  append(...elements) {
    this.component.append(...elements);
  }
}