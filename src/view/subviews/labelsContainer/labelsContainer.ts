import BaseElement from '../../BaseElement/BaseElement';

class LabelsContainer extends BaseElement<'div'> {
  constructor() {
    super('div', 'range-slider__labels-container');
  }

  append(...elements: HTMLElement[]) {
    this.component.append(...elements);
  }

  fixWidthForVertical(labels: HTMLElement[]): void {
    let maxWidth = 0;

    labels.forEach((label) => {
      if (label.offsetWidth > maxWidth) {
        maxWidth = label.offsetWidth;
      }
    });

    this.component.style.paddingLeft = `${maxWidth + 4}px`;
  }

  fixHeightForHorizontal(labels: HTMLElement[]): void {
    let maxHeight = 0;

    labels.forEach((label) => {
      if (label.offsetHeight > maxHeight) {
        maxHeight = label.offsetHeight;
      }
    });

    this.component.style.paddingTop = `${maxHeight + 4}px`;
  }
}

export default LabelsContainer;
