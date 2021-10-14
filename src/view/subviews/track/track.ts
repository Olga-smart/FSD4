import { createElement } from '../../helpers/createElement';
import { View } from '../../view';

export class Track {
  view: View | null;

  component: HTMLElement;

  constructor() {
    this.view = null;
    this.component = createElement('div', 'range-slider__track');
    this.attachEventHandlers();
  }

  registerWith(view: View) {
    this.view = view;
  }

  getOffsetWidth() {
    return this.component.offsetWidth;
  }

  getOffsetHeight() {
    return this.component.offsetHeight;
  }

  getBoundingClientRect() {
    return this.component.getBoundingClientRect();
  }

  append(...elements: HTMLElement[]) {
    this.component.append(...elements);
  }

  attachEventHandlers() {
    this.component.addEventListener('click', (event) => {
      const x: number = event.clientX - this.getBoundingClientRect().left;
      const y: number = event.clientY - this.getBoundingClientRect().top;
      this.view?.handleScaleOrTrackClick(x, y);
    });
  }
}
