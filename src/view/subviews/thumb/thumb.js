import {createElement} from '../../helpers/createElement.js';

export class Thumb {
  constructor(type = 'left') {
    this.type = type;
    this.component = createElement('div', `range-slider__thumb range-slider__thumb_${type} js-range-slider__thumb_${type}`);
  }

  addHover() {
    this.component.classList.add('range-slider__thumb_hover');
  }

  removeHover() {
    this.component.classList.remove('range-slider__thumb_hover');
  }

  makeActive() {
    this.component.classList.add('range-slider__thumb_active');
  }

  makeInactive() {
    this.component.classList.remove('range-slider__thumb_active');
  }

  setLeftIndent(percent) {
    this.component.style.left = percent + '%';
  }

  setRightIndent(percent) {
    this.component.style.right = percent + '%';
  }

  getLeftIndent() {
    return this.component.style.left;
  }

  getRightIndent() {
    return this.component.style.right;
  }

  getBoundingClientRect() {
    return this.component.getBoundingClientRect();
  }
}