import Model from '../Model/Model';
import View from '../View/View';
import { EventManager, IEventListener, PossibleEvents } from '../EventManager/EventManager';
import SliderOptions from './SliderOptions';

class Presenter implements IEventListener {
  private model: Model;

  private view: View;

  private eventManager: EventManager = new EventManager();

  onChange?: (leftValue: number, rightValue: number | undefined) => void;

  constructor(element: HTMLDivElement, options: Partial<SliderOptions>) {
    this.model = new Model({
      min: options.min,
      max: options.max,
      leftValue: options.leftValue,
      rightValue: options.rightValue,
      range: options.range,
      step: options.step,
    });
    this.view = new View(element, {
      minMaxLabels: options.minMaxLabels,
      valueLabels: options.valueLabels,
      vertical: options.vertical,
      range: options.range,
      scale: options.scale,
      scaleIntervals: options.scaleIntervals,
    });

    this.initViewValues();
    this.model.subscribe(this);
    this.view.subscribe(this);
  }

  // очень длинный свичкейс, но много кейсов уберется когда сделаю независимую панель
  inform<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void {
    switch (eventType) {
      case 'viewInputLeft':
        if (typeof data === 'number') {
          this.handleViewInputLeft(data);
        }
        break;
      case 'viewInputRight':
        if (typeof data === 'number') {
          this.handleViewInputRight(data);
        }
        break;
      case 'viewSetLeft':
        this.handleViewSetLeft();
        break;
      case 'viewSetRight':
        this.handleViewSetRight();
        break;
      case 'viewToggleOrientation':
        this.handleViewToggleOrientation();
        break;
      case 'viewToggleRange':
        this.handleViewToggleRange();
        break;
      case 'viewSetScaleIntervals':
        this.handleViewSetScaleIntervals();
        break;
      case 'viewAddValueLabels':
        this.handleViewAddValueLabels();
        break;
      case 'viewAddMinMaxLabels':
        this.handleViewAddMinMaxLabels();
        break;

      case 'modelSetLeft':
        this.handleModelSetLeft();
        if (this.onChange) {
          this.onChange(this.model.getLeftValue(), this.model.getRightValue());
        }
        break;
      case 'modelSetRight':
        this.handleModelSetRight();
        if (this.onChange) {
          this.onChange(this.model.getLeftValue(), this.model.getRightValue());
        }
        break;
      case 'modelSetMin':
        this.handleModelSetMin();
        break;
      case 'modelSetMax':
        this.handleModelSetMax();
        break;
      case 'modelToggleRange':
        this.handleModelToggleRange();
        break;
      case 'modelSetStep':
        this.handleModelSetStep();
        break;

      default:
        break;
    }
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
  }

  setLeftValue(value: number): this {
    this.model.setLeftValue(value);
    return this;
  }

  setRightValue(value: number): this {
    this.model.setRightValue(value);
    return this;
  }

  setStep(value: number): this {
    this.model.setStep(value);
    return this;
  }

  setMin(value: number): this {
    this.model.setMin(value);
    return this;
  }

  setMax(value: number): this {
    this.model.setMax(value);
    return this;
  }

  toggleOrientation(): this {
    this.view.toggleOrientation();
    return this;
  }

  toggleRange(): this {
    this.model.toggleRange();
    return this;
  }

  toggleValueLabels(): this {
    this.view.toggleValueLabels();
    this.eventManager.notify('sliderToggleValueLabels', null);
    return this;
  }

  toggleMinMaxLabels(): this {
    this.view.toggleMinMaxLabels();
    this.eventManager.notify('sliderToggleMinMaxLabels', null);
    return this;
  }

  toggleScale(): this {
    if (!this.view.hasScale()) {
      this.view.addScale(this.model.getMin(), this.model.getMax());
    } else {
      this.view.removeScale();
    }

    this.eventManager.notify('sliderToggleScale', null);
    return this;
  }

  setScaleIntervals(value: number): this {
    this.view.setScaleIntervals(value);
    return this;
  }

  getValues(): SliderOptions {
    return { ...this.model.getOptions(), ...this.view.getOptions() };
  }

  private initViewValues(): void {
    const { model } = this;
    const { view } = this;

    const min = model.getMin();
    const max = model.getMax();
    const leftValue = model.getLeftValue();
    const rightValue = model.getRightValue();

    view.setMinValue(min);
    view.setMaxValue(max);
    this.passLeftValueToView(leftValue);

    if (view.isRange() && (rightValue !== undefined)) {
      this.passRightValueToView(rightValue);
      view.updateInput(leftValue, rightValue);
    } else {
      view.updateInput(leftValue);
    }

    if (view.hasScale()) {
      // first remove scale with arbitrary values, which was added as a plug
      view.removeScale();
      view.addScale(min, max);
    }

    if (this.view.hasLabels()) {
      if (!view.isVertical()) {
        view.fixLabelsContainerHeightForHorizontal();
      }

      if (view.isVertical()) {
        view.fixLabelsContainerWidthForVertical();
      }
    }
  }

  private handleViewInputLeft(px: number): void {
    this.model.setLeftValueFromPx(px, this.view.getTrackLength());
  }

  private handleModelSetLeft(): void {
    const value: number = this.model.getLeftValue();
    this.passLeftValueToView(value);
    this.updateViewInput();

    this.eventManager.notify('sliderSetLeft', value);
  }

  private handleViewInputRight(px: number): void {
    this.model.setRightValueFromPx(px, this.view.getTrackLength());
  }

  private handleModelSetRight(): void {
    const value = this.model.getRightValue()!;
    this.passRightValueToView(value);
    this.updateViewInput();

    this.eventManager.notify('sliderSetRight', value);
  }

  private handleViewSetValue(): void {
    if (this.view.hasValueLabels()) {
      const distanceBetweenValueLabels = this.view.getDistanceBetweenValueLabels();

      if (distanceBetweenValueLabels !== undefined) {
        if (Model.isTwoLabelsClose(distanceBetweenValueLabels)) {
          this.view.mergeLabels();
        } else {
          this.view.splitLabels();
        }
      }
    }
  }

  private handleViewSetLeft(): void {
    this.handleViewSetValue();

    if (this.view.hasMinMaxLabels() && this.view.hasValueLabels()) {
      const distanceBetweenLeftValueLabelAndMinLabel = (
        this.view.getDistanceBetweenLeftValueLabelAndMinLabel());

      if (distanceBetweenLeftValueLabelAndMinLabel !== undefined) {
        if (Model.isTwoLabelsClose(distanceBetweenLeftValueLabelAndMinLabel)) {
          this.view.hideMinLabel();
        } else {
          this.view.showMinLabel();
        }
      }

      if (!this.view.isRange()) {
        const distanceBetweenLeftValueLabelAndMaxLabel = (
          this.view.getDistanceBetweenLeftValueLabelAndMaxLabel());

        if (distanceBetweenLeftValueLabelAndMaxLabel !== undefined) {
          if (Model.isTwoLabelsClose(distanceBetweenLeftValueLabelAndMaxLabel)) {
            this.view.hideMaxLabel();
          } else {
            this.view.showMaxLabel();
          }
        }
      }
    }
  }

  private handleViewSetRight(): void {
    this.handleViewSetValue();

    if (this.view.hasMinMaxLabels() && this.view.hasValueLabels()) {
      const distanceBetweenRightValueLabelAndMaxLabel = (
        this.view.getDistanceBetweenRightValueLabelAndMaxLabel());

      if (distanceBetweenRightValueLabelAndMaxLabel !== undefined) {
        if (Model.isTwoLabelsClose(distanceBetweenRightValueLabelAndMaxLabel)) {
          this.view.hideMaxLabel();
        } else {
          this.view.showMaxLabel();
        }
      }
    }
  }

  private passLeftValueToView(value: number): void {
    const percent = this.model.convertValueToPercent(value);
    this.view.setLeftValue(value, percent);
  }

  private passRightValueToView(value: number): void {
    const percent = this.model.convertValueToPercent(value);
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

  private handleModelSetMin(): void {
    const value = this.model.getMin();
    this.view.setMinValue(value);
    this.passLeftValueToView(this.model.getLeftValue());

    const rightValue = this.model.getRightValue();
    if (rightValue !== undefined) {
      this.passRightValueToView(rightValue);
    }

    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getMin(), this.model.getMax());
    }

    this.eventManager.notify('sliderSetMin', value);
  }

  private handleModelSetMax(): void {
    const value = this.model.getMax();
    this.view.setMaxValue(value);
    this.passLeftValueToView(this.model.getLeftValue());

    const rightValue = this.model.getRightValue();
    if (rightValue !== undefined) {
      this.passRightValueToView(rightValue);
    }

    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getMin(), this.model.getMax());
    }

    this.eventManager.notify('sliderSetMax', value);
  }

  private handleViewToggleOrientation(): void {
    this.passLeftValueToView(this.model.getLeftValue());

    if (this.view.isRange()) {
      const rightValue = this.model.getRightValue();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
      }
    }

    this.eventManager.notify('sliderToggleOrientation', null);
  }

  private handleViewToggleRange(): void {
    this.passLeftValueToView(this.model.getLeftValue());

    if (this.model.isRange()) {
      this.model.setRightValue();
      const rightValue = this.model.getRightValue();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
        this.view.updateInput(this.model.getLeftValue(), rightValue);
      }
    }

    if (!this.model.isRange()) {
      this.model.removeRightValue();
      this.view.updateInput(this.model.getLeftValue());
    }

    this.eventManager.notify('sliderToggleRange', null);
  }

  private handleModelToggleRange(): void {
    this.view.toggleRange();
  }

  private handleModelSetStep(): void {
    this.eventManager.notify('sliderSetStep', this.model.getStep());
  }

  private handleViewSetScaleIntervals(): void {
    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getMin(), this.model.getMax());
    }
    this.eventManager.notify('sliderSetScaleIntervals', this.view.getScaleIntervals());
  }

  private handleViewAddValueLabels(): void {
    this.passLeftValueToView(this.model.getLeftValue());
    if (this.view.isRange()) {
      const rightValue = this.model.getRightValue();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
      }
    }
  }

  private handleViewAddMinMaxLabels(): void {
    this.view.setMinValue(this.model.getMin());
    this.view.setMaxValue(this.model.getMax());
  }
}

export default Presenter;
