import { createElement } from '../../helpers/createElement';
import { Label } from '../label/label';

export class LabelsContainer {
  component: HTMLElement;

  constructor() {
    this.component = createElement('div', 'range-slider__labels-container');
  }

  append(...elements: HTMLElement[]) {
    this.component.append(...elements);
  }

  fixWidthForVertical(labels: Label[]): void {
    let maxWidth = 0;

    labels.forEach((label) => {
      if (label.getOffsetWidth() > maxWidth) {
        maxWidth = label.getOffsetWidth();
      }
    });

    this.component.style.paddingLeft = `${maxWidth + 4}px`;
  }

  fixHeightForHorizontal(labels: Label[]): void {
    let maxHeight = 0;

    labels.forEach((label) => {
      if (label.getOffsetHeight() > maxHeight) {
        maxHeight = label.getOffsetHeight();
      }
    });

    this.component.style.paddingTop = `${maxHeight + 4}px`;
  }
}
