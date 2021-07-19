import {Model} from '../model/model';
import {View} from '../view/view';

export class Presenter {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {  
      this.model = model;
      this.view = view;
      
      view.setMinValue(model.min);
      view.setMaxValue(model.max);
      view.setLeftValue(model.leftValue);
      view.setStep(model.step);

      if (this.view.isRange) {
        view.setRightValue(model.rightValue);
      }

      if (this.view.hasScale) {
        view.addScale(model.min, model.max, view.scaleIntervals);
      }
    }
    
    handleLeftInput(value: number): void {
      this.model.setLeftValue(value);
      this.view.setLeftValue(this.model.leftValue);
    }
    
    handleRightInput(value: number): void {
      this.model.setRightValue(value);
      this.view.setRightValue(this.model.rightValue);
    }
    
  }