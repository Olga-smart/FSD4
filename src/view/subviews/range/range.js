import {createElement} from '../../helpers/createElement.js';

export class Range {
  constructor() {
    this.component = createElement('div', 'range-slider__range js-range-slider__range');
  }

  setLeftIndent(percent) {
    this.component.style.left = percent + '%';
  }

  setRightIndent(percent) {
    this.component.style.right = percent + '%';
  }
}