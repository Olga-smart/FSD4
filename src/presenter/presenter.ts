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
      // this.view.setLeftValue(model.leftValue);
      // this.view.setStep(model.step);
      this.passLeftValueToView(model.leftValue);

      if (this.view.isRange) {
        // this.view.setRightValue(model.rightValue);
        this.passRightValueToView(model.rightValue);
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
    
    // handleLeftInput(value: number): void {
    //   this.model.setLeftValue(value);
    //   // this.view.setLeftValue(this.model.leftValue);
    // }

    handleLeftInput(px: number) {
      let value = this.convertPxToValue(px);
      this.model.setLeftValue(value);

      this.view.setLeftValue(value, px);
    }

    // handleRightInput(value: number): void {
    //   this.model.setRightValue(value);
    //   // this.view.setRightValue(this.model.rightValue);
    // }

    handleRightInput(px: number) {
      let value = this.convertPxToValue(px);
      this.model.setRightValue(value);

      this.view.setRightValue(value, px);
    }
    
    passLeftValueToView(value: number) {
      let px = this.convertValueToPx(value);
      this.view.setLeftValue(value, px);
    }

    passRightValueToView(value: number) {
      let px = this.convertValueToPx(value);
      this.view.setRightValue(value, px);
    }

    convertValueToPx(value: number): number {
      let trackWidthInPx: number = +this.view.track.getOffsetWidth();
      let min: number = this.model.min;
      let max: number = this.model.max;

      let percent: number = ((value - min) / (max - min)) * 100;
      let px: number = trackWidthInPx * percent / 100;

      return px;
    }

    convertPxToValue(px: number): number {
      let trackWidthInPx: number = +this.view.track.getOffsetWidth();
      let min: number = this.model.min;
      let max: number = this.model.max;

      let percent: number = px * 100 / trackWidthInPx;
      let value: number = Math.round((max - min) * percent / 100 + min);

      return value;
    }

  }