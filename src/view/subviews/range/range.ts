import {createElement} from '../../helpers/createElement';

export class Range {
  component: HTMLElement;

  constructor() {
    this.component = createElement('div', 'range-slider__range js-range-slider__range');
  }

  setLeftIndentInPx(px: number): void {
    this.component.style.left = `${px}px`;
  }

  setRightIndentInPx(px: number): void {
    this.component.style.right = `${px}px`;
  }

  setTopIndentInPx(px: number): void {
    this.component.style.top = `${px}px`;
  }

  setBottomIndentInPx(px: number): void {
    this.component.style.bottom = `${px}px`;
  }

  setWidthInPx(px: number): void {
    this.component.style.width = `${px}px`;
  }

  setHeightInPx(px: number): void {
    this.component.style.height = `${px}px`;
  }
}