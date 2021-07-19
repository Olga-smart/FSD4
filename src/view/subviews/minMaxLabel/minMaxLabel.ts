import {Label} from '../label/label';
import {createElement} from '../../helpers/createElement';

export class MinMaxLabel extends Label {
  component: HTMLElement;

  constructor(type: 'left' | 'right' = 'left') {
    super(type);
    this.component = createElement('div', `range-slider__min-max-label range-slider__min-max-label_${type} js-range-slider__min-max-label_${type}`);
  }

  fixPositionForVertical(): void {
    if (this.type == 'left') {
      this.component.style.transform = `rotate(90deg) translateX(-${this.component.offsetWidth}px)`;
    }
    if (this.type == 'right') {
      this.component.style.transform = `rotate(90deg) translateX(${this.component.offsetHeight}px)`;
    }
  } 
}