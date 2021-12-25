import createElement from '../../helpers/createElement';

class Range {
  component: HTMLElement;

  constructor() {
    this.component = createElement('div', 'range-slider__range');
  }

  // setLeftIndentInPx(px: number): void {
  //   this.component.style.left = `${px}px`;
  // }

  setLeftIndent(percent: number): void {
    this.component.style.left = `${percent}%`;
  }

  // setRightIndentInPx(px: number): void {
  //   this.component.style.right = `${px}px`;
  // }

  setRightIndent(percent: number): void {
    this.component.style.right = `${percent}%`;
  }

  // setTopIndentInPx(px: number): void {
  //   this.component.style.top = `${px}px`;
  // }

  setTopIndent(percent: number): void {
    this.component.style.top = `${percent}%`;
  }

  // setBottomIndentInPx(px: number): void {
  //   this.component.style.bottom = `${px}px`;
  // }

  setBottomIndent(percent: number): void {
    this.component.style.bottom = `${percent}%`;
  }

  // setWidthInPx(px: number): void {
  //   this.component.style.width = `${px}px`;
  // }

  setWidth(percent: number): void {
    this.component.style.width = `${percent}%`;
  }

  // setHeightInPx(px: number): void {
  //   this.component.style.height = `${px}px`;
  // }

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
