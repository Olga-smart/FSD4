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
      this.passLeftValueToView(model.leftValue);

      if (this.view.isRange) {
        this.passRightValueToView(model.rightValue);
      }

      if (this.view.hasScale) {
        this.view.addScale(model.min, model.max, view.scaleIntervals!);
      } 

      if (!this.view.vertical && (this.view.valueLabelLeft || this.view.minLabel)) {
        this.view.fixLabelsContainerHeightForHorizontal();
      }

      if (this.view.vertical && (this.view.valueLabelLeft || this.view.minLabel)) {
        this.view.fixLabelsContainerWidthForVertical();
      }
    }

    handleLeftInput(px: number) {
      let value = this.convertPxToValue(px);
      this.model.setLeftValue(value);
      this.view.setLeftValue(value, this.convertValueToPx(value));
    }

    handleRightInput(px: number) {
      let value = this.convertPxToValue(px);
      this.model.setRightValue(value);
      this.view.setRightValue(value, this.convertValueToPx(value));
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
      let min: number = this.model.min;
      let max: number = this.model.max;
      let percent: number = ((value - min) / (max - min)) * 100;
      let px: number = 0; 

      if (!this.view.vertical) {
        let trackWidthInPx: number = +this.view.track.getOffsetWidth();
        px = trackWidthInPx * percent / 100;
      }
      
      if (this.view.vertical) {
        let trackHeightInPx: number = +this.view.track.getOffsetHeight();
        px = trackHeightInPx * percent / 100;
      }

      return px;
    }

    convertPxToValue(px: number): number {
      let min: number = this.model.min;
      let max: number = this.model.max;
      let percent: number = 0;
      
      if (!this.view.vertical) {
        let trackWidthInPx: number = +this.view.track.getOffsetWidth();
        percent = px * 100 / trackWidthInPx;
      }

      if (this.view.vertical) {
        let trackHeightInPx: number = +this.view.track.getOffsetHeight();
        percent = px * 100 / trackHeightInPx;
      }

      let value: number = ((max - min) * percent / 100 + min);
      value = this.fitToStep(value);
      value = this.removeCalcInaccuracy(value);

      return value;
    }

    fitToStep(value: number): number {
      return Math.round(value / this.model.step) * this.model.step;
    }

    removeCalcInaccuracy(value: number): number {
      return +value.toFixed(10)
    }

  }