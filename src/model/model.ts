type ModelOptions = {
  min?: number;
  max?: number;
  leftValue?: number;
  rightValue?: number;
  step?: number;
  range?: boolean;
}

export class Model {
    min: number;
    max: number;
    leftValue: number;
    rightValue!: number;
    step: number;
    isRange: boolean;

    constructor(options: ModelOptions = {}) {
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
        this.leftValue = Math.min(value, this.rightValue);
      }
    }
    
    setRightValue(value: number): void {
      if (value > this.max) {
        this.rightValue = this.max;
      } else {
        this.rightValue = Math.max(value, this.leftValue);
      }    
    }
  }