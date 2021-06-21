export class Model {
    constructor(options = {}) {
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
    
    setLeftValue(value) {
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
    
    setRightValue(value) {
      if (value > this.max) {
        this.rightValue = this.max;
      } else {
        this.rightValue = Math.max(value, this.leftValue);
      }    
    }
  }