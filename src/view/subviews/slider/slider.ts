import BaseElement from '../../BaseElement/BaseElement';

class Slider extends BaseElement<'div'> {
  constructor() {
    super('div', 'range-slider__slider');
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

export default Slider;
