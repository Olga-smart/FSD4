export class Model {
    constructor(options = {}) {
      this.min = options.min || 0;
      this.max = options.max || 150;
      this.leftValue = options.leftValue || 25;
      this.rightValue = options.rightValue || 75;
      this.step = options.step || 1;  
    }
    
    setLeftValue(value) {
      if (value < this.min) {
        this.leftValue = this.min;
      } else {
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