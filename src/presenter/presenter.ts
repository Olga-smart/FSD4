import Model from '../Model/Model';
import View from '../View/View';
import { IEventListener } from '../EventManager/EventManager';

class Presenter implements IEventListener {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.initViewValues();
  }

  inform(eventType: string, data: any): void {
    switch (eventType) {
      case 'viewLeftInput':
        this.handleViewLeftInput(data);
        break;
      case 'viewRightInput':
        this.handleViewRightInput(data);
        break;
      case 'viewChangeLeftValueFromOutside':
        this.handleChangeLeftValueFromOutside(data);
        break;
      case 'viewChangeRightValueFromOutside':
        this.handleChangeRightValueFromOutside(data);
        break;
      case 'viewChangeMinFromOutside':
        this.handleChangeViewMinFromOutside(data);
        break;
      case 'viewChangeMaxFromOutside':
        this.handleChangeViewMaxFromOutside(data);
        break;
      case 'viewChangeStepFromOutside':
        this.handleChangeViewStepFromOutside(data);
        break;
      case 'viewChangeOrientationFromOutside':
        this.handleViewOrientationChange();
        break;
      case 'viewToggleRangeFromOutside':
        this.handleViewRangeToggle();
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

      case 'modelLeftSet':
        this.handleModelLeftSet();
        break;
      case 'modelRightSet':
        this.handleModelRightSet();
        break;
      case 'modelChangeMin':
        this.handleModelChangeMin();
        break;
      case 'modelChangeMax':
        this.handleModelChangeMax();
        break;
      case 'modelRangeToggle':
        this.handleModelRangeToggle();
        break;

      default:
        break;
    }
  }

  private initViewValues(): void {
    const { model } = this;
    const { view } = this;

    view.setMinValue(model.min);
    view.setMaxValue(model.max);
    this.passLeftValueToView(model.leftValue);

    if (view.isRange) {
      this.passRightValueToView(model.rightValue!);
      view.updateInput(model.leftValue, model.rightValue!);
    } else {
      view.updateInput(model.leftValue);
    }

    if (view.hasScale) {
      view.addScale(model.min, model.max, view.scaleIntervals!);
    }

    if (this.view.hasLabels()) {
      if (!view.vertical) {
        view.fixLabelsContainerHeightForHorizontal();
      }

      if (view.vertical) {
        view.fixLabelsContainerWidthForVertical();
      }
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
      view.panel.registerWith(view);
    }
  }

  private handleViewLeftInput(px: number): void {
    const value = this.convertPxToValue(px);
    this.model.setLeftValue(value);
  }

  private handleModelLeftSet(): void {
    const value = this.model.leftValue;
    this.view.setLeftValue(value, this.convertValueToPercent(value));
    this.updateViewInput();

    if (this.view.panel) {
      this.view.updatePanelFrom(value);
    }
  }

  private handleViewRightInput(px: number): void {
    const value = this.convertPxToValue(px);
    this.model.setRightValue(value);
  }

  private handleModelRightSet(): void {
    const value = this.model.rightValue!;
    this.view.setRightValue(value, this.convertValueToPercent(value));
    this.updateViewInput();

    if (this.view.panel) {
      this.view.updatePanelTo(value);
    }
  }

  private passLeftValueToView(value: number): void {
    const percent = this.convertValueToPercent(value);
    this.view.setLeftValue(value, percent);
  }

  private passRightValueToView(value: number): void {
    const percent = this.convertValueToPercent(value);
    this.view.setRightValue(value, percent);
  }

  private updateViewInput(): void {
    if (!this.view.isRange) {
      this.view.updateInput(this.model.leftValue);
    }

    if (this.view.isRange) {
      this.view.updateInput(this.model.leftValue, this.model.rightValue);
    }
  }

  private convertValueToPercent(value: number): number {
    const { min } = this.model;
    const { max } = this.model;
    let percent: number = ((value - min) / (max - min)) * 100;
    percent = Presenter.removeCalcInaccuracy(percent);

    return percent;
  }

  private convertPxToValue(px: number): number {
    let percent: number = 0;

    if (!this.view.vertical) {
      const trackWidthInPx: number = this.view.track.getOffsetWidth();
      percent = (px * 100) / trackWidthInPx;
    }

    if (this.view.vertical) {
      const trackHeightInPx: number = this.view.track.getOffsetHeight();
      percent = (px * 100) / trackHeightInPx;
    }

    const { min } = this.model;
    const { max } = this.model;
    let value: number = ((max - min) * (percent / 100) + min);
    value = this.fitToStep(value);
    value = Presenter.removeCalcInaccuracy(value);

    return value;
  }

  private fitToStep(value: number): number {
    let result = Math.round(value / this.model.step) * this.model.step;
    result = Presenter.removeCalcInaccuracy(result);
    return result;
  }

  static removeCalcInaccuracy(value: number): number {
    return Number(value.toFixed(10));
  }

  private handleChangeLeftValueFromOutside(value: number): void {
    this.model.setLeftValue(value);
  }

  private handleChangeRightValueFromOutside(value: number): void {
    this.model.setRightValue(value);
  }

  private handleChangeViewMinFromOutside(value: number): void {
    this.model.changeMinFromOutside(value);
  }

  private handleModelChangeMin(): void {
    this.view.setMinValue(this.model.min);
    this.passLeftValueToView(this.model.leftValue);
    if (this.model.rightValue) {
      this.passRightValueToView(this.model.rightValue);
    }
    if (this.view.hasScale) {
      this.view.removeScale();
      this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
    }
  }

  private handleChangeViewMaxFromOutside(value: number): void {
    this.model.changeMaxFromOutside(value);
  }

  private handleModelChangeMax(): void {
    this.view.setMaxValue(this.model.max);
    this.passLeftValueToView(this.model.leftValue);
    if (this.model.rightValue) {
      this.passRightValueToView(this.model.rightValue);
    }
    if (this.view.hasScale) {
      this.view.removeScale();
      this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
    }
  }

  private handleChangeViewStepFromOutside(value: number): void {
    this.model.setStep(value);
  }

  private handleViewOrientationChange(): void {
    this.passLeftValueToView(this.model.leftValue);

    if (this.view.isRange) {
      this.passRightValueToView(this.model.rightValue!);
    }

    if (this.view.hasLabels()) {
      if (!this.view.vertical) {
        this.view.fixLabelsContainerHeightForHorizontal();
      }

      if (this.view.vertical) {
        this.view.fixLabelsContainerWidthForVertical();
      }
    }
  }

  private handleViewRangeToggle(): void {
    this.model.toggleRange();
  }

  private handleModelRangeToggle(): void {
    this.passLeftValueToView(this.model.leftValue);

    if (this.model.isRange) {
      this.model.setRightValue();
      this.passRightValueToView(this.model.rightValue!);
      this.view.updateInput(this.model.leftValue, this.model.rightValue);
      if (this.view.panel) {
        this.view.updatePanelTo(this.model.rightValue!);
      }
    }

    if (!this.model.isRange) {
      this.model.removeRightValue();
      this.view.updateInput(this.model.leftValue);
      if (this.view.panel) {
        this.view.updatePanelTo('');
      }
    }
  }

  private handleScaleToggle(): void {
    if (this.view.hasScale) {
      this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals ?? 4);
      this.view.updatePanelScaleIntervals(this.view.scaleIntervals ?? 4);
    }

    if (!this.view.hasScale) {
      this.view.removeScale();
      this.view.updatePanelScaleIntervals('');
    }
  }

  private handleChangeScaleIntervals(): void {
    this.view.addScale(this.model.min, this.model.max, this.view.scaleIntervals!);
  }

  private handleAddValueLabels(): void {
    this.passLeftValueToView(this.model.leftValue);
    if (this.view.isRange) {
      this.passRightValueToView(this.model.rightValue!);
    }
  }

  private handleAddMinMaxLabels(): void {
    this.view.setMinValue(this.model.min);
    this.view.setMaxValue(this.model.max);
  }
}

export default Presenter;
