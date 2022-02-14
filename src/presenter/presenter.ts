import Model from '../Model/Model';
import View from '../View/View';
import { IEventListener } from '../EventManager/EventManager';

class Presenter implements IEventListener {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.initViewValues();
    this.model.subscribe(this);
    this.view.subscribe(this);
  }

  inform(eventType: string, data: number | null = null): void {
    switch (eventType) {
      case 'viewLeftInput':
        if (typeof data === 'number') {
          this.handleViewLeftInput(data);
        }
        break;
      case 'viewRightInput':
        if (typeof data === 'number') {
          this.handleViewRightInput(data);
        }
        break;
      case 'viewChangeLeftValueFromOutside':
        if (typeof data === 'number') {
          this.handleChangeLeftValueFromOutside(data);
        }
        break;
      case 'viewChangeRightValueFromOutside':
        if (typeof data === 'number') {
          this.handleChangeRightValueFromOutside(data);
        }
        break;
      case 'viewChangeMinFromOutside':
        if (typeof data === 'number') {
          this.handleChangeViewMinFromOutside(data);
        }
        break;
      case 'viewChangeMaxFromOutside':
        if (typeof data === 'number') {
          this.handleChangeViewMaxFromOutside(data);
        }
        break;
      case 'viewChangeStepFromOutside':
        if (typeof data === 'number') {
          this.handleChangeViewStepFromOutside(data);
        }
        break;
      case 'viewChangeOrientationFromOutside':
        this.handleViewOrientationChange();
        break;
      case 'viewToggleRangeFromOutside':
        this.handleViewRangeToggle();
        break;
      case 'viewToggleScaleFromOutside':
        this.handleScaleToggle();
        break;
      case 'viewChangeScaleIntervals':
        this.handleChangeScaleIntervals();
        break;
      case 'viewAddValueLabels':
        this.handleAddValueLabels();
        break;
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
      case 'modelStepSet':
        this.handleModelStepSet();
        break;

      default:
        break;
    }
  }

  private initViewValues(): void {
    const { model } = this;
    const { view } = this;

    view.setMinValue(model.getMin());
    view.setMaxValue(model.getMax());
    this.passLeftValueToView(model.getLeftValue());

    if (view.isRange()) {
      this.passRightValueToView(model.getRightValue()!);
      view.updateInput(model.getLeftValue(), model.getRightValue()!);
    } else {
      view.updateInput(model.getLeftValue());
    }

    if (view.hasScale()) {
      // first remove scale with arbitrary values, which was added as a plug
      view.removeScale();
      view.addScale(model.getMin(), model.getMax());
    }

    if (this.view.hasLabels()) {
      if (!view.isVertical()) {
        view.fixLabelsContainerHeightForHorizontal();
      }

      if (view.isVertical()) {
        view.fixLabelsContainerWidthForVertical();
      }
    }

    if (view.hasPanel()) {
      view.setPanelValues({
        min: model.getMin(),
        max: model.getMax(),
        step: model.getStep(),
        from: model.getLeftValue(),
        to: model.getRightValue() ?? null,
        vertical: view.isVertical() ?? false,
        range: view.isRange(),
        scale: view.hasScale(),
        scaleIntervals: view.getScaleIntervals() ?? null,
        valueLabels: view.hasValueLabels(),
        minMaxLabels: view.hasMinMaxLabels(),
      });
    }
  }

  private handleViewLeftInput(px: number): void {
    const value = this.convertPxToValue(px);
    this.model.setLeftValue(value);
  }

  private handleModelLeftSet(): void {
    const value = this.model.getLeftValue();
    this.view.setLeftValue(value, this.convertValueToPercent(value));
    this.updateViewInput();

    if (this.view.hasPanel()) {
      this.view.updatePanelFrom(value);
    }
  }

  private handleViewRightInput(px: number): void {
    const value = this.convertPxToValue(px);
    this.model.setRightValue(value);
  }

  private handleModelRightSet(): void {
    const value = this.model.getRightValue()!;
    this.view.setRightValue(value, this.convertValueToPercent(value));
    this.updateViewInput();

    if (this.view.hasPanel()) {
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
    if (!this.view.isRange()) {
      this.view.updateInput(this.model.getLeftValue());
    }

    if (this.view.isRange()) {
      this.view.updateInput(this.model.getLeftValue(), this.model.getRightValue());
    }
  }

  private convertValueToPercent(value: number): number {
    const min = this.model.getMin();
    const max = this.model.getMax();
    let percent: number = ((value - min) / (max - min)) * 100;
    percent = Presenter.removeCalcInaccuracy(percent);

    return percent;
  }

  private convertPxToValue(px: number): number {
    let percent: number = 0;

    if (!this.view.isVertical()) {
      const trackWidthInPx: number = this.view.getTrackWidth();
      percent = (px * 100) / trackWidthInPx;
    }

    if (this.view.isVertical()) {
      const trackHeightInPx: number = this.view.getTrackHeight();
      percent = (px * 100) / trackHeightInPx;
    }

    const min = this.model.getMin();
    const max = this.model.getMax();
    let value: number = ((max - min) * (percent / 100) + min);
    value = this.fitToStep(value);
    value = Presenter.removeCalcInaccuracy(value);

    return value;
  }

  private fitToStep(value: number): number {
    let result = Math.round(value / this.model.getStep()) * this.model.getStep();
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
    this.view.setMinValue(this.model.getMin());
    this.passLeftValueToView(this.model.getLeftValue());

    const rightValue = this.model.getRightValue();
    if (rightValue !== undefined) {
      this.passRightValueToView(rightValue);
    }

    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getMin(), this.model.getMax());
    }
  }

  private handleChangeViewMaxFromOutside(value: number): void {
    this.model.changeMaxFromOutside(value);
  }

  private handleModelChangeMax(): void {
    this.view.setMaxValue(this.model.getMax());
    this.passLeftValueToView(this.model.getLeftValue());

    const rightValue = this.model.getRightValue();
    if (rightValue !== undefined) {
      this.passRightValueToView(rightValue);
    }

    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getMin(), this.model.getMax());
    }
  }

  private handleChangeViewStepFromOutside(value: number): void {
    this.model.setStep(value);
  }

  private handleViewOrientationChange(): void {
    this.passLeftValueToView(this.model.getLeftValue());

    if (this.view.isRange()) {
      this.passRightValueToView(this.model.getRightValue()!);
    }

    if (this.view.hasLabels()) {
      if (!this.view.isVertical()) {
        this.view.fixLabelsContainerHeightForHorizontal();
      }

      if (this.view.isVertical()) {
        this.view.fixLabelsContainerWidthForVertical();
      }
    }
  }

  private handleViewRangeToggle(): void {
    this.model.toggleRange();
  }

  private handleModelRangeToggle(): void {
    this.passLeftValueToView(this.model.getLeftValue());

    if (this.model.isRange()) {
      this.model.setRightValue();
      this.passRightValueToView(this.model.getRightValue()!);
      this.view.updateInput(this.model.getLeftValue(), this.model.getRightValue());
      if (this.view.hasPanel()) {
        this.view.updatePanelTo(this.model.getRightValue()!);
      }
    }

    if (!this.model.isRange()) {
      this.model.removeRightValue();
      this.view.updateInput(this.model.getLeftValue());
      if (this.view.hasPanel()) {
        this.view.updatePanelTo('');
      }
    }
  }

  private handleModelStepSet(): void {
    if (this.view.hasPanel()) {
      this.view.updatePanelStep(this.model.getStep());
    }
  }

  private handleScaleToggle(): void {
    if (!this.view.hasScale()) {
      this.view.addScale(this.model.getMin(), this.model.getMax());
      this.view.updatePanelScaleIntervals(this.view.getScaleIntervals() ?? 4);
      return;
    }

    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.updatePanelScaleIntervals('');
    }
  }

  private handleChangeScaleIntervals(): void {
    this.view.addScale(this.model.getMin(), this.model.getMax());
  }

  private handleAddValueLabels(): void {
    this.passLeftValueToView(this.model.getLeftValue());
    if (this.view.isRange()) {
      this.passRightValueToView(this.model.getRightValue()!);
    }
  }

  private handleAddMinMaxLabels(): void {
    this.view.setMinValue(this.model.getMin());
    this.view.setMaxValue(this.model.getMax());
  }
}

export default Presenter;
