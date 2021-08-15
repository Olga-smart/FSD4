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

  getBoundingClientRect() {
    return this.component.getBoundingClientRect();
  }

  getOffsetWidth() {
    return this.component.offsetWidth;
  }

  attachEventHandlers() {
    this.component.addEventListener('click', (event) => {
      let x: number = event.clientX - this.getBoundingClientRect().left;
      let y: number = event.clientY - this.getBoundingClientRect().top;
      this.view?.handleScaleClick(x, y);
    });
  }
}