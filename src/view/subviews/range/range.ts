import {createElement} from '../../helpers/createElement';

export class Range {
  component: HTMLElement;

  constructor() {
    this.component = createElement('div', 'range-slider__range js-range-slider__range');
  }

  setLeftIndent(percent: number): void {
    this.component.style.left = percent + '%';
  }

  setRightIndent(percent: number): void {
    this.component.style.right = percent + '%';
  }
}