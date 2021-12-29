import { EventManager } from '../EventManager/EventManager';

type ModelOptions = {
  min: number;
  max: number;
  leftValue: number;
  rightValue?: number;
  step: number;
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

  constructor(options: ModelOptions) {
    this.eventManager = new EventManager();

    this.min = options.min;
    this.max = options.max;
    this.leftValue = options.leftValue;
    this.step = options.step;
    if (options.range) {
      this.rightValue = options.rightValue;
      this.isRange = true;
    } else {
      this.isRange = false;
    }
  }

  setLeftValue(value: number): void {
    if (value < this.min) {
      this.leftValue = this.min;
    } else {
      if (!this.isRange) {
        this.leftValue = Math.min(value, this.max);
      }

      if (this.isRange) {
        this.leftValue = Math.min(value, this.rightValue!);
      }
    }

    this.eventManager.notify('modelLeftSet');
  }

  setRightValue(value: number = this.max): void {
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
    if (value <= 0) return;
    if (value > this.max) return;

    this.step = value;

    this.eventManager.notify('modelStepSet');
  }

  toggleRange(): void {
    this.isRange = !this.isRange;

    this.eventManager.notify('modelRangeToggle');
  }
}

export default Model;
