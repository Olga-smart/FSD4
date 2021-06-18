export class Presenter {
    constructor(model, view) {  
      this.model = model;
      this.view = view;
      
      view.setMinValue(model.min);
      view.setMaxValue(model.max);
      view.setLeftValue(model.leftValue);
      view.setRightValue(model.rightValue);
      view.setStep(model.step);
    }
    
    handleLeftInput(value) {
      this.model.setLeftValue(value);
      this.view.setLeftValue(this.model.leftValue);
    }
    
    handleRightInput(value) {
      this.model.setRightValue(value);
      this.view.setRightValue(this.model.rightValue);
    }
    
  }