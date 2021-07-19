import {createElement} from '../../helpers/createElement';

export class Thumb {
  type: 'left' | 'right';
  component: HTMLElement;

  constructor(type: 'left' | 'right' = 'left') {
    this.type = type;
    this.component = createElement('div', `range-slider__thumb range-slider__thumb_${type} js-range-slider__thumb_${type}`);
  }

  addHover(): void {
    this.component.classList.add('range-slider__thumb_hover');
  }

  removeHover(): void {
    this.component.classList.remove('range-slider__thumb_hover');
  }

  makeActive(): void {
    this.component.classList.add('range-slider__thumb_active');
  }

  makeInactive(): void {
    this.component.classList.remove('range-slider__thumb_active');
  }

  setLeftIndent(percent: number): void {
    this.component.style.left = percent + '%';
  }

  setRightIndent(percent: number): void {
    this.component.style.right = percent + '%';
  }

  getLeftIndent(): string {
    return this.component.style.left;
  }

  getRightIndent(): string {
    return this.component.style.right;
  }

  getBoundingClientRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }
}