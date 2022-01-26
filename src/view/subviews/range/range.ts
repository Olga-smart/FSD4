import createElement from '../../helpers/createElement';

class Range {
  private component: HTMLElement;

  constructor() {
    this.component = createElement('div', 'range-slider__range');
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

  getComponent(): HTMLElement {
    return this.component;
  }
}

export default Range;
