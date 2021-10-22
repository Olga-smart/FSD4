import Model from '../model/model';
import View from '../view/view';
import { IEventListener } from '../eventManager/eventManager';

export default class Presenter implements IEventListener {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    // this.view.eventManager.subscribe(this);

    this.view.setMinValue(model.min);
    this.view.setMaxValue(model.max);
    this.passLeftValueToView(model.leftValue);

    if (this.view.isRange) {
      this.passRightValueToView(model.rightValue!);
    }

    if (this.view.hasScale) {
      this.view.addScale(model.min, model.max, view.scaleIntervals!);
    }

    if (!this.view.vertical && this.hasViewLabels()) {
      this.view.fixLabelsContainerHeightForHorizontal();
    }

    if (this.view.vertical && this.hasViewLabels()) {
      this.view.fixLabelsContainerWidthForVertical();
    }

    if (view.panel) {
      view.setPanelValues({
        min: model.min,
        max: model.max,
        step: model.step,
        from: model.leftValue,
        to: model.rightValue ?? null,
        vertical: view.vertical ?? false,
        range: view.isRange,
        scale: view.hasScale,
        scaleIntervals: view.scaleIntervals ?? null,
        valueLabels: !!view.valueLabelLeft,
        minMaxLabels: !!view.minLabel,
      });
      view.panel.registerWith(this.view);
    }
  }

  inform(eventType: string, data: any): void {
    switch (eventType) {
      case 'viewLeftInput':
        this.handleLeftInput(data);
        break;
      case 'viewRightInput':
        this.handleRightInput(data);
        break;
      case 'viewChangeLeftValueFromOutside':
        this.changeLeftValueFromOutside(data);
        break;
      case 'viewChangeRightValueFromOutside':
        this.changeRightValueFromOutside(data);
        break;
      case 'viewChangeMinFromOutside':
        this.changeMinFromOutside(data);
        break;
      case 'viewChangeMaxFromOutside':
        this.changeMaxFromOutside(data);
        break;
      case 'viewChangeStepFromOutside':
        this.changeStepFromOutside(data);
        break;
      case 'viewChangeOrientationFromOutside':
        this.handleViewOrientationChange();
        break;
      case 'viewToggleRangeFromOutside':
        this.handleRangeToggle();
        break;
      case 'viewToggleScaleFromOutside':
        this.handleScaleToggle();
        return;
      case 'viewChangeScaleIntervals':
        this.handleChangeScaleIntervals();
        return;
      case 'viewAddValueLabels':
        this.handleAddValueLabels();
        return;
      case 'viewAddMinMaxLabels':
        this.handleAddMinMaxLabels();
        break;
      default:
        break;
    }
  }

  hasViewLabels(): boolean {
    if (this.view.valueLabelLeft || this.view.minLabel) {
      return true;
    }
    return false;
  }

  handleLeftInput(px: number): void {
    const value = this.convertPxToValue(px);
    this.model.setLeftValue(value);
    this.view.setLeftValue(value, this.convertValueToPx(value));

    if (this.view.panel) {
      this.view.updatePanelFrom(value);
    }
  }

  handleRightInput(px: number): void {
    const value = this.convertPxToValue(px);
    this.model.setRightValue(value);
    this.view.setRightValue(value, this.convertValueToPx(value));

    if (this.view.panel) {
      this.view.updatePanelTo(value);
    }
  }

  passLeftValueToView(value: number): void {
    const px = this.convertValueToPx(value);
    this.view.setLeftValue(value, px);
  }

  passRightValueToView(value: number): void {
    const px = this.convertValueToPx(value);
    this.view.setRightValue(value, px);
  }

  convertValueToPx(value: number): number {
    const { min } = this.model;
    const { max } = this.model;
    const percent: number = ((value - min) / (max - min)) * 100;
    let px: number = 0;

    if (!this.view.vertical) {
      const trackWidthInPx: number = +this.view.track.getOffsetWidth();
      px = (trackWidthInPx * percent) / 100;
    }

    if (this.view.vertical) {
      const trackHeightInPx: number = +this.view.track.getOffsetHeight();
      px = (trackHeightInPx * percent) / 100;
    }

    return px;
  }

  convertPxToValue(px: number): number {
    const { min } = this.model;
    const { max } = this.model;
    let percent: number = 0;

    if (!this.view.vertical) {
      const trackWidthInPx: number = +this.view.track.getOffsetWidth();
      percent = (px * 100) / trackWidthInPx;
    }

    if (this.view.vertical) {
      const trackHeightInPx: number = +this.view.track.getOffsetHeight();
      percent = (px * 100) / trackHeightInPx;
    }

    let value: number = ((max - min) * (percent / 100) + min);
    value = this.fitToStep(value);
    value = Presenter.removeCalcInaccuracy(value);

    return value;
  }

  fitToStep(value: number): number {
    let result = Math.round(value / this.model.step) * this.model.step;
    result = Presenter.removeCalcInaccuracy(result);
    return result;
  }

  static removeCalcInaccuracy(value: number): number {
    return +value.toFixed(10);
  }

  changeLeftValueFromOutside(value: number): void {
    this.model.setLeftValue(value);
    this.view.setLeftValue(this.model.leftValue, this.convertValueToPx(this.model.leftValue));
  }

  changeRightValueFromOutside(value: number): void {
    this.model.setRightValue(value);
    this.view.setRightValue(this.model.rightValue!, this.convertValueToPx(this.model.rightValue!));
  }

  changeMinFromOutside(value: number): void {
    this.model.changeMinFromOutside(value);
    this.view.setMinValue(this.model.min);
    this.passLeftValueToView(this.model.leftValue);
    if (this.model.rightValue) {
      this.passRightValueToView(this.model.rightValue);
    }
    this.view.removeScale();
    this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
  }

  changeMaxFromOutside(value: number): void {
    this.model.changeMaxFromOutside(value);
    this.view.setMaxValue(this.model.max);
    this.passLeftValueToView(this.model.leftValue);
    if (this.model.rightValue) {
      this.passRightValueToView(this.model.rightValue);
    }
    this.view.removeScale();
    this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
  }

  changeStepFromOutside(value: number): void {
    this.model.setStep(value);
  }

  handleViewOrientationChange(): void {
    this.passLeftValueToView(this.model.leftValue);

    if (this.view.isRange) {
      this.passRightValueToView(this.model.rightValue!);
    }

    if (this.view.hasScale) {
      this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
    }

    if (!this.view.vertical && this.hasViewLabels()) {
      this.view.fixLabelsContainerHeightForHorizontal();
    }

    if (this.view.vertical && this.hasViewLabels) {
      this.view.fixLabelsContainerWidthForVertical();
    }
  }

  handleRangeToggle(): void {
    this.model.isRange = !this.model.isRange;
    this.passLeftValueToView(this.model.leftValue);

    if (this.model.isRange) {
      this.model.setRightValue();
      this.passRightValueToView(this.model.rightValue!);
      if (this.view.panel) {
        this.view.updatePanelTo(this.model.rightValue!);
      }
    }

    if (!this.model.isRange) {
      this.model.removeRightValue();
      this.view.updatePanelTo('');
    }

    if (this.view.hasScale) {
      this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
    }
  }

  handleScaleToggle(): void {
    if (this.view.hasScale) {
      this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals ?? 4);
      this.view.updatePanelScaleIntervals(this.view.scaleIntervals ?? 4);
    }

    if (!this.view.hasScale) {
      this.view.removeScale();
      this.view.updatePanelScaleIntervals('');
    }
  }

  handleChangeScaleIntervals(): void {
    this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
  }

  handleAddValueLabels(): void {
    this.passLeftValueToView(this.model.leftValue);
    if (this.view.isRange) {
      this.passRightValueToView(this.model.rightValue!);
    }
  }

  handleAddMinMaxLabels(): void {
    this.view.setMinValue(this.model.min);
    this.view.setMaxValue(this.model.max);
  }
}
