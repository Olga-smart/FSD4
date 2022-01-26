import createElement from '../../helpers/createElement';

class Slider {
  private component: HTMLElement;

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

  getComponent(): HTMLElement {
    return this.component;
  }
}

export default Slider;
