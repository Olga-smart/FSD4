import { EventManager, IEventListener } from '../EventManager/EventManager';

type ModelOptions = {
  min: number;
  max: number;
  leftValue: number;
  rightValue?: number;
  step: number;
  range?: boolean;
};

class Model {
  private eventManager: EventManager;

  private min: number;

  private max: number;

  private leftValue: number;

  private rightValue?: number;

  private step: number;

  private range: boolean;

  constructor(options: ModelOptions) {
    this.eventManager = new EventManager();

    this.min = options.min;
    this.max = options.max;
    this.leftValue = options.leftValue;
    this.step = options.step;

    if (options.range) {
      this.rightValue = options.rightValue;
      this.range = true;
    } else {
      this.range = false;
    }
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
  }

  notify(eventType: string, data: number | null = null): void {
    this.eventManager.notify(eventType, data);
  }

  setLeftValue(value: number): void {
    if (value < this.min) {
      this.leftValue = this.min;
    } else {
      if (!this.isRange()) {
        this.leftValue = Math.min(value, this.max);
      }

      if (this.isRange() && this.rightValue !== undefined) {
        this.leftValue = Math.min(value, this.rightValue);
      }
    }

    this.notify('modelLeftSet');
  }

  setRightValue(value: number = this.max): void {
    if (!this.isRange()) return;

    if (value > this.max) {
      this.rightValue = this.max;
    } else {
      this.rightValue = Math.max(value, this.leftValue);
    }

    this.notify('modelRightSet');
  }

  removeRightValue(): void {
    this.rightValue = undefined;
  }

  changeMinFromOutside(value: number): void {
    if (value > this.leftValue) return;
    this.min = value;

    this.notify('modelChangeMin');
  }

  changeMaxFromOutside(value: number): void {
    if (!this.isRange()) {
      if (value < this.leftValue) return;
    }

    if (this.isRange() && this.rightValue !== undefined) {
      if (value < this.rightValue) return;
    }

    this.max = value;

    this.notify('modelChangeMax');
  }

  setStep(value: number): void {
    if (value <= 0) return;
    if (value > Math.abs(this.max - this.min)) return;

    this.step = value;

    this.notify('modelStepSet');
  }

  toggleRange(): void {
    this.range = !this.range;

    this.notify('modelRangeToggle');
  }

  getMin(): number {
    return this.min;
  }

  getMax(): number {
    return this.max;
  }

  getLeftValue(): number {
    return this.leftValue;
  }

  getRightValue(): number | undefined {
    return this.rightValue;
  }

  getStep(): number {
    return this.step;
  }

  isRange(): boolean {
    return this.range;
  }
}

export default Model;
