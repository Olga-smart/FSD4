import createElement from '../../helpers/createElement';

export default class Slider {
  component: HTMLElement;

  constructor() {
    this.component = createElement('div', 'range-slider__slider');
  }

  append(...elements: HTMLElement[]) {
    this.component.append(...elements);
  }

  before(...elements: HTMLElement[]) {
    this.component.before(...elements);
  }

  after(...elements: HTMLElement[]) {
    this.component.after(...elements);
  }
}
