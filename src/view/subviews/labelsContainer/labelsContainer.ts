import createElement from '../../helpers/createElement';

class LabelsContainer {
  private component: HTMLElement;

  constructor() {
    this.component = createElement('div', 'range-slider__labels-container');
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

  getComponent(): HTMLElement {
    return this.component;
  }

  remove(): void {
    this.component.remove();
  }
}

export default LabelsContainer;
