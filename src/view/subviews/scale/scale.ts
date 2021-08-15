import {createElement} from '../../helpers/createElement';
import { View } from '../../view';

export class Scale {
  view: View | null;
  component: HTMLElement;
  min: number;
  max: number;
  intervalsNumber: number;
  intervals: HTMLElement[];
  values: number[];
  valueElements: HTMLElement[]; 

  constructor(min: number, max: number, intervalsNumber: number = 4) {
    this.view = null;
    this.component = createElement('div', 'range-slider__scale');
    this.min = min;
    this.max = max;
    this.intervalsNumber = intervalsNumber;
    this.intervals = [];
    this.values = [];
    this.valueElements = [];

    this.createIntervals();
    this.addMarksInIntervals();
    this.addValues();
    this.attachEventHandlers();
  }    

  registerWith(view: View): void {
    this.view = view;
  }

  createIntervals(): void {
    for (let i = 0; i < this.intervalsNumber; i++) {
      this.intervals[i] = createElement('div', 'range-slider__scale-interval');
      this.component.append(this.intervals[i]);
    }
  }

  addMarksInIntervals(): void {
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

  addValues(): void {
    this.values[0] = this.min;
    let step = Math.round( (this.max - this.min) / this.intervalsNumber );
    for (let i = 1; i < this.intervalsNumber; i++) {
      this.values[i] = i * step + this.min;
    }
    this.values.push(this.max);

    let valueElement = createElement('span', 'range-slider__scale-interval-value range-slider__scale-interval-value_min');
    valueElement.textContent = `${this.values[0]}`;
    this.intervals[0].append(valueElement);  
    this.valueElements.push(valueElement);

    for (let i = 1; i < this.values.length; i++) {
      let valueElement = createElement('span', 'range-slider__scale-interval-value range-slider__scale-interval-value');
      valueElement.textContent = `${this.values[i]}`;
      this.intervals[i-1].append(valueElement); 
      this.valueElements.push(valueElement);
    }
  }

  fixPositionForVertical(): void {
    this.valueElements[0].style.transform = `rotate(90deg) translateY(-50%)`;
    for (let i = 1; i < this.valueElements.length; i++) {
      this.valueElements[i].style.transform = `rotate(90deg) translateX(${this.valueElements[i].offsetWidth}px) translateY(${-this.valueElements[i].offsetHeight}px) translateY(50%)`;
    }
  }

  getBoundingClientRect() {
    return this.component.getBoundingClientRect();
  }

  attachEventHandlers(): void {
    this.component.addEventListener('click', (event) => {
      let x: number = event.clientX - this.getBoundingClientRect().left;
      let y: number = event.clientY - this.getBoundingClientRect().top;
      this.view?.handleScaleClick(x, y);
    });
  }
}