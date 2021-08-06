import {Model} from '../model/model';
import {View} from '../view/view';

export class Presenter {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {  
      this.model = model;
      this.view = view;
      
      this.view.setMinValue(model.min);
      this.view.setMaxValue(model.max);
      this.view.setLeftValue(model.leftValue);
      this.view.setStep(model.step);

      if (this.view.isRange) {
        this.view.setRightValue(model.rightValue);
      }

      if (this.view.hasScale) {
        this.view.addScale(model.min, model.max, view.scaleIntervals);
      }
      
      if(this.view.vertical) {

        if (this.view.minLabel && this.view.maxLabel) {
          this.view.fixMinMaxLabelsPositionForVertical();
        }

        if (this.view.valueLabelLeft) {
          this.view.fixValueLabelPositionForVertical();
        }
        
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