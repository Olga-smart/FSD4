import {createElement} from './createElement.js';

export class Input {
  constructor(type = 'left') {
    this.view = null;
    this.type = type;
    this.component = createElement('input', `range-slider__input range-slider__input_${type} js-range-slider__input_${type}`);
    this.component.type = 'range';
    
    this.attachEventHandlers();
  }

  registerWith(view) {
    this.view = view;
  }

  setMinValue(min) {
    this.component.setAttribute('min', min);
  }

  setMaxValue(max) {
    this.component.setAttribute('max', max);
  }

  setStep(step) {
    this.component.setAttribute('step', step);
  }

  setValue(value) {
    this.component.setAttribute('value', value);
  }

  setZIndex(value) {
    this.component.style.zIndex = value;
  }

  getValue() {
    return this.component.value;
  }

  getMin() {
    return this.component.min;
  }

  getMax() {
    return this.component.max;
  }

  attachEventHandlers() {
    this.component.addEventListener('input', () => {
      let value = this.component.value;
      if (this.type == 'left') {
        this.view.handleLeftInput(value);
      }
      if (this.type == 'right') {
        this.view.handleRightInput(value);
      }
    });

    this.component.addEventListener('mouseover', () => {
      this.view.handleInputMouseover(this.type);
    });
    this.component.addEventListener('mouseout', () => {
      this.view.handleInputMouseout(this.type);
    });

    this.component.addEventListener('mousedown', () => {
      this.view.handleInputMousedown(this.type);
    });
    this.component.addEventListener('mouseup', () => {
      this.view.handleInputMouseup(this.type);
    });
  }
}