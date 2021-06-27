import {createElement} from '../../helpers/createElement.js';

export class Scale {
  constructor(min, max, intervalsNumber = 4) {
    this.view = null;
    this.component = createElement('div', 'range-slider__scale');
    this.min = min;
    this.max = max;
    this.intervalsNumber = intervalsNumber;
    this.intervals = [];
    this.values = [];

    this.createIntervals();
    this.addMarksInIntervals();
    this.addValues();
    this.attachEventHandlers();
  }    

  registerWith(view) {
    this.view = view;
  }

  createIntervals() {
    for (let i = 0; i < this.intervalsNumber; i++) {
      this.intervals[i] = createElement('div', 'range-slider__scale-interval');
      this.component.append(this.intervals[i]);
    }
  }

  addMarksInIntervals() {
    this.intervals.forEach(item => {
      let fragment = new DocumentFragment();
      if (this.intervalsNumber < 29) {
        fragment.append( createElement('span', 'range-slider__scale-mark') );
      }
      if (this.intervalsNumber < 15) {
        fragment.append( createElement('span', 'range-slider__scale-mark') );
      }
      if (this.intervalsNumber < 8) {
        fragment.append( createElement('span', 'range-slider__scale-mark') );
      }
      if (this.intervalsNumber < 5) {
        fragment.append( createElement('span', 'range-slider__scale-mark') );
      }
      item.append(fragment);
    });
  }

  addValues() {
    this.values[0] = this.min;
    let step = Math.round(this.max / this.intervalsNumber);
    for (let i = 1; i < this.intervalsNumber; i++) {
      this.values[i] = i * step;
    }
    this.values.push(this.max);

    let value = createElement('span', 'range-slider__scale-interval-value range-slider__scale-interval-value_min');
    value.textContent = this.values[0];
    this.intervals[0].append(value);  

    for (let i = 1; i < this.values.length; i++) {
      let value = createElement('span', 'range-slider__scale-interval-value range-slider__scale-interval-value');
      value.textContent = this.values[i];
      this.intervals[i-1].append(value); 
    }
  }

  attachEventHandlers() {
    this.component.addEventListener('click', (event) => {
      this.view.handleScaleClick(event.clientX, event.clientY);
    });
  }
}