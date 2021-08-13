import {createElement} from '../../helpers/createElement';
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

  attachEventHandlers() {
    this.component.addEventListener('click', (event) => {
      this.view?.handleScaleClick(event.clientX, event.clientY);
    });
  }

  getBoundingClientRect() {
    return this.component.getBoundingClientRect();
  }

  getOffsetWidth() {
    return this.component.offsetWidth;
  }
}