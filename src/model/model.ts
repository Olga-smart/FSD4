import { EventManager } from '../eventManager/eventManager';

type ModelOptions = {
  min?: number;
  max?: number;
  leftValue?: number;
  rightValue?: number;
  step?: number;
  range?: boolean;
};

class Model {
  eventManager: EventManager;

  min: number;

  max: number;

  leftValue: number;

  rightValue?: number;

  step: number;

  isRange: boolean;

  constructor(options: ModelOptions = {}) {
    this.eventManager = new EventManager();

    this.min = options.min ?? 0;
    this.max = options.max ?? 150;
    this.leftValue = options.leftValue ?? 25;
    this.step = options.step ?? 1;
    if (options.range) {
      this.rightValue = options.rightValue ?? 75;
      this.isRange = true;
    } else {
      this.isRange = false;
    }
  }

  setLeftValue(value: number): void {
    if (value < this.min) {
      this.leftValue = this.min;
      return;
    }

    if (!this.isRange) {
      this.leftValue = Math.min(value, this.max);
    }

    if (this.isRange) {
      this.leftValue = Math.min(value, this.rightValue!);
    }

    this.eventManager.notify('modelLeftSet');
  }

  setRightValue(value: number = 75): void {
    if (value > this.max) {
      this.rightValue = this.max;
    } else {
      this.rightValue = Math.max(value, this.leftValue);
    }

    this.eventManager.notify('modelRightSet');
  }

  removeRightValue(): void {
    this.rightValue = undefined;
  }

  changeMinFromOutside(value: number): void {
    if (value > this.leftValue) return;
    this.min = value;

    this.eventManager.notify('modelChangeMin');
  }

  changeMaxFromOutside(value: number): void {
    if (!this.isRange) {
      if (value < this.leftValue) return;
    }

    if (this.isRange) {
      if (value < this.rightValue!) return;
    }

    this.max = value;

    this.eventManager.notify('modelChangeMax');
  }

  setStep(value: number): void {
    this.step = value;
  }

  toggleRange(): void {
    this.isRange = !this.isRange;

    this.eventManager.notify('modelRangeToggle');
  }
}

export default Model;
