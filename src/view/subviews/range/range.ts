import BaseElement from '../../BaseElement/BaseElement';

class Range extends BaseElement {
  constructor() {
    super('div', 'range-slider__range');
  }

  setLeftIndent(percent: number): void {
    this.component.style.left = `${percent}%`;
  }

  setRightIndent(percent: number): void {
    this.component.style.right = `${percent}%`;
  }

  setTopIndent(percent: number): void {
    this.component.style.top = `${percent}%`;
  }

  setBottomIndent(percent: number): void {
    this.component.style.bottom = `${percent}%`;
  }

  setWidth(percent: number): void {
    this.component.style.width = `${percent}%`;
  }

  setHeight(percent: number): void {
    this.component.style.height = `${percent}%`;
  }

  resetWidth(): void {
    this.component.style.width = 'unset';
  }

  resetHeight(): void {
    this.component.style.height = 'unset';
  }

  resetTopIndent(): void {
    this.component.style.top = 'unset';
  }
}

export default Range;
