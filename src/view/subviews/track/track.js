import {createElement} from '../../helpers/createElement.js';

export class Track {
  constructor() {
    this.view = null;
    this.component = createElement('div', 'range-slider__track');
    this.attachEventHandlers();
  }

  registerWith(view) {
    this.view = view;
  }

  attachEventHandlers() {
    this.component.addEventListener('click', (event) => {
      this.view.handleScaleClick(event.clientX, event.clientY);
    });
  }
}