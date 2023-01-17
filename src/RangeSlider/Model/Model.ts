import { EventManager, IEventListener } from '../EventManager/EventManager';
import ModelOptions from './ModelOptions';

class Model {
  static defaults: Readonly<ModelOptions> = {
    min: 0,
    max: 100,
    leftValue: 25,
    rightValue: 75,
    step: 1,
    range: true,
  };

  private eventManager: EventManager;

  private min: number;

  private max: number;

  private leftValue: number;

  private rightValue?: number;

  private step: number;

  private range: boolean;

  constructor(options: Partial<ModelOptions>) {
    this.eventManager = new EventManager();

    const validOptions = Model.validate({ ...Model.defaults, ...options });

    this.min = validOptions.min;
    this.max = validOptions.max;
    this.leftValue = validOptions.leftValue;
    this.step = validOptions.step;

    if (validOptions.range) {
      this.rightValue = validOptions.rightValue;
      this.range = true;
    } else {
      this.range = false;
    }
  }

  static validate(options: ModelOptions): ModelOptions {
    let fixedOptions: ModelOptions = { ...options };

    const removeWrongTypes = (): void => {
      const checkType = (property: keyof ModelOptions): void => {
        if (typeof options[property] !== typeof Model.defaults[property]) {
          delete fixedOptions[property];
        }
      };

      /* There is no Object.keys().forEach because TS throws an error:
       * "Type 'string[]' is not assignable to type 'keyof RangeSliderOptions[]'" */
      checkType('min');
      checkType('max');
      checkType('leftValue');
      checkType('rightValue');
      checkType('range');
      checkType('step');
    };

    const mergeWithDefaults = (): void => {
      fixedOptions = { ...Model.defaults, ...fixedOptions };
    };

    const fixValues = (): void => {
      if (fixedOptions.min > fixedOptions.max) {
        [fixedOptions.min, fixedOptions.max] = [fixedOptions.max, fixedOptions.min];
      }

      if (fixedOptions.rightValue !== undefined) {
        if (fixedOptions.leftValue > fixedOptions.rightValue) {
          [fixedOptions.leftValue, fixedOptions.rightValue] = (
            [fixedOptions.rightValue, fixedOptions.leftValue]
          );
        }

        if (fixedOptions.rightValue > fixedOptions.max) {
          fixedOptions.rightValue = fixedOptions.max;
        }
      }

      if (fixedOptions.leftValue < fixedOptions.min) {
        fixedOptions.leftValue = fixedOptions.min;
      }

      if (fixedOptions.leftValue > fixedOptions.max) {
        fixedOptions.leftValue = fixedOptions.max;
      }

      if (fixedOptions.step > Math.abs(fixedOptions.max - fixedOptions.min)) {
        fixedOptions.step = Math.abs(fixedOptions.max - fixedOptions.min);
      }
    };

    removeWrongTypes();
    mergeWithDefaults();
    fixValues();

    return fixedOptions;
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
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

      this.leftValue = this.fitToStep(this.leftValue);
    }

    this.eventManager.notify('modelSetLeft', null);
  }

  setRightValue(value: number = this.max): void {
    if (!this.isRange()) return;

    if (value > this.max) {
      this.rightValue = this.max;
    } else {
      this.rightValue = Math.max(value, this.leftValue);
    }

    this.rightValue = this.fitToStep(this.rightValue);

    this.eventManager.notify('modelSetRight', null);
  }

  setLeftValueFromPx(px: number, trackLengthInPx: number): void {
    const value = this.convertPxToValue(px, trackLengthInPx);
    this.setLeftValue(value);
  }

  setRightValueFromPx(px: number, trackLengthInPx: number): void {
    const value = this.convertPxToValue(px, trackLengthInPx);
    this.setRightValue(value);
  }

  removeRightValue(): void {
    this.rightValue = undefined;
  }

  setMin(value: number): void {
    if (value > this.leftValue) return;
    this.min = value;

    this.eventManager.notify('modelSetMin', null);
  }

  setMax(value: number): void {
    if (!this.isRange()) {
      if (value < this.leftValue) return;
    }

    if (this.isRange() && this.rightValue !== undefined) {
      if (value < this.rightValue) return;
    }

    this.max = value;

    this.eventManager.notify('modelSetMax', null);
  }

  setStep(value: number): void {
    if (value <= 0) return;
    if (value > Math.abs(this.max - this.min)) return;

    this.step = value;

    this.eventManager.notify('modelSetStep', null);
  }

  toggleRange(): void {
    this.range = !this.range;

    this.eventManager.notify('modelToggleRange', null);
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

  getOptions(): ModelOptions {
    return {
      min: this.min,
      max: this.max,
      leftValue: this.leftValue,
      rightValue: this.rightValue,
      step: this.step,
      range: this.range,
    };
  }

  convertValueToPercent(value: number): number {
    let percent = ((value - this.min) / (this.max - this.min)) * 100;
    percent = Model.removeCalcInaccuracy(percent);

    return percent;
  }

  convertPxToValue(px: number, trackLengthInPx: number): number {
    const percent = (px * 100) / trackLengthInPx;

    let value = ((this.max - this.min) * (percent / 100) + this.min);
    value = this.fitToStep(value);

    return value;
  }

  static isTwoLabelsClose(distanceInPx: number): boolean {
    const minDistanceBetweenLabels = 3;

    if (distanceInPx < minDistanceBetweenLabels) {
      return true;
    }

    return false;
  }

  private static removeCalcInaccuracy(value: number): number {
    return Number(value.toFixed(10));
  }

  private fitToStep(value: number): number {
    let result = Math.round(value / this.step) * this.step;
    result = Model.removeCalcInaccuracy(result);
    return result;
  }
}

export default Model;
