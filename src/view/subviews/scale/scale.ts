import createElement from '../../helpers/createElement';

class Scale {
  view: any;

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

  registerWith(view: any): void {
    this.view = view;
  }

  createIntervals(): void {
    for (let i = 0; i < this.intervalsNumber; i += 1) {
      this.intervals[i] = createElement('div', 'range-slider__scale-interval');
      this.component.append(this.intervals[i]);
    }
  }

  addMarksInIntervals(): void {
    this.intervals.forEach((item) => {
      const fragment = new DocumentFragment();
      if (this.intervalsNumber < 29) {
        fragment.append(createElement('span', 'range-slider__scale-mark'));
      }
      if (this.intervalsNumber < 15) {
        fragment.append(createElement('span', 'range-slider__scale-mark'));
      }
      if (this.intervalsNumber < 8) {
        fragment.append(createElement('span', 'range-slider__scale-mark'));
      }
      if (this.intervalsNumber < 5) {
        fragment.append(createElement('span', 'range-slider__scale-mark'));
      }
      item.append(fragment);
    });
  }

  addValues(): void {
    this.values[0] = this.min;
    const step = Math.round((this.max - this.min) / this.intervalsNumber);
    for (let i = 1; i < this.intervalsNumber; i += 1) {
      this.values[i] = i * step + this.min;
    }
    this.values.push(this.max);

    const valueElement = createElement('span', 'range-slider__scale-interval-value range-slider__scale-interval-value_min');
    valueElement.textContent = `${this.values[0]}`;
    this.intervals[0].append(valueElement);
    this.valueElements.push(valueElement);

    for (let i = 1; i < this.values.length; i += 1) {
      const newValueElement = createElement('span', 'range-slider__scale-interval-value');
      newValueElement.textContent = `${this.values[i]}`;
      this.intervals[i - 1].append(newValueElement);
      this.valueElements.push(newValueElement);
    }
  }

  fitWidthForVertical() {
    let maxWidth = 0;

    this.valueElements.forEach((valueElement) => {
      if (valueElement.offsetWidth > maxWidth) {
        maxWidth = valueElement.offsetWidth;
      }
    });

    this.component.style.paddingRight = `${maxWidth + 3}px`;
  }

  fitHeightForHorizontal() {
    let maxHeight = 0;

    this.valueElements.forEach((valueElement) => {
      if (valueElement.offsetHeight > maxHeight) {
        maxHeight = valueElement.offsetHeight;
      }
    });

    this.component.style.paddingBottom = `${maxHeight + 3}px`;
  }

  handleClick(event: MouseEvent): void {
    const x: number = event.clientX - (event.currentTarget as Element).getBoundingClientRect().left;
    const y: number = event.clientY - (event.currentTarget as Element).getBoundingClientRect().top;
    this.view?.handleScaleOrTrackClick(x, y);
  }

  attachEventHandlers(): void {
    this.component.addEventListener('click', this.handleClick.bind(this));
  }
}

export default Scale;
