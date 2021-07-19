import {Label} from '../label/label';
import {createElement} from '../../helpers/createElement';

export class ValueLabel extends Label {
  component: HTMLElement;

  constructor(type: 'left' | 'right' | 'common' = 'left') {
    super(type);
    this.component = createElement('div', `range-slider__value-label range-slider__value-label_${type} js-range-slider__value-label_${type}`);
  }

  setLeftIndent(value: string): void {
    this.component.style.left = value;
  }

  getLeftIndent(): string {
    return this.component.style.left;
  }

  setRightIndent(value: string): void {
    this.component.style.right = value;
  }

  getRightIndent(): string {
    return this.component.style.right;
  }

  fixPositionForVertical(): void {
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