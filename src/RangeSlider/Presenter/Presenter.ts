import Model from '../Model/Model';
import View from '../View/View';
import {
  EventManager, IEventListener, PossibleEvents, EventHandlers,
} from '../EventManager/EventManager';
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

  inform<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void {
    const eventHandlers: EventHandlers = {
      viewInputLeft: [this.handleViewInputLeft, 'number', data],
      viewInputRight: [this.handleViewInputRight, 'number', data],
      viewSetLeft: [this.handleViewSetLeft],
      viewSetRight: [this.handleViewSetRight],
      viewToggleOrientation: [this.handleViewToggleOrientation],
      viewToggleRange: [this.handleViewToggleRange],
      viewSetScaleIntervals: [this.handleViewSetScaleIntervals],
      viewAddValueLabels: [this.handleViewAddValueLabels],
      viewAddMinMaxLabels: [this.handleViewAddMinMaxLabels],
      modelSetLeft: [this.handleModelSetLeft],
      modelSetRight: [this.handleModelSetRight],
      modelSetMin: [this.handleModelSetMin],
      modelSetMax: [this.handleModelSetMax],
      modelToggleRange: [this.handleModelToggleRange],
      modelSetStep: [this.handleModelSetStep],
    };

    const handler = eventHandlers[eventType];
    if (handler !== undefined) {
      if (typeof data === handler[1] || data === null) {
        handler[0].call(this, handler[2]);
      }
    }
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
  }

  setLeftValue(value: number): this {
    if (typeof value === 'number') {
      this.model.setLeftValue(value);
    }
    return this;
  }

  setRightValue(value: number): this {
    if (typeof value === 'number') {
      this.model.setRightValue(value);
    }
    return this;
  }

  setStep(value: number): this {
    if (typeof value === 'number') {
      this.model.setStep(value);
    }
    return this;
  }

  setMin(value: number): this {
    if (typeof value === 'number') {
      this.model.setMin(value);
    }
    return this;
  }

  setMax(value: number): this {
    if (typeof value === 'number') {
      this.model.setMax(value);
    }
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
      this.view.addScale(this.model.getOptions().min, this.model.getOptions().max);
    } else {
      this.view.removeScale();
    }

    this.eventManager.notify('sliderToggleScale', null);
    return this;
  }

  setScaleIntervals(value: number): this {
    if (typeof value === 'number') {
      this.view.setScaleIntervals(value);
    }
    return this;
  }

  getValues(): SliderOptions {
    return { ...this.model.getOptions(), ...this.view.getOptions() };
  }

  private initViewValues(): void {
    const { model } = this;
    const { view } = this;

    const { min } = model.getOptions();
    const { max } = model.getOptions();
    const { leftValue } = model.getOptions();
    const { rightValue } = model.getOptions();

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
    const value: number = this.model.getOptions().leftValue;
    this.passLeftValueToView(value);
    this.updateViewInput();

    if (this.onChange) {
      this.onChange(this.model.getOptions().leftValue, this.model.getOptions().rightValue);
    }

    this.eventManager.notify('sliderSetLeft', value);
  }

  private handleViewInputRight(px: number): void {
    this.model.setRightValueFromPx(px, this.view.getTrackLength());
  }

  private handleModelSetRight(): void {
    const value = this.model.getOptions().rightValue!;
    this.passRightValueToView(value);
    this.updateViewInput();

    if (this.onChange) {
      this.onChange(this.model.getOptions().leftValue, this.model.getOptions().rightValue);
    }

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
      this.view.updateInput(this.model.getOptions().leftValue);
    }

    if (this.view.isRange()) {
      this.view.updateInput(this.model.getOptions().leftValue, this.model.getOptions().rightValue);
    }
  }

  private handleModelSetMin(): void {
    const value = this.model.getOptions().min;
    this.view.setMinValue(value);
    this.passLeftValueToView(this.model.getOptions().leftValue);

    const { rightValue } = this.model.getOptions();
    if (rightValue !== undefined) {
      this.passRightValueToView(rightValue);
    }

    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getOptions().min, this.model.getOptions().max);
    }

    this.eventManager.notify('sliderSetMin', value);
  }

  private handleModelSetMax(): void {
    const value = this.model.getOptions().max;
    this.view.setMaxValue(value);
    this.passLeftValueToView(this.model.getOptions().leftValue);

    const { rightValue } = this.model.getOptions();
    if (rightValue !== undefined) {
      this.passRightValueToView(rightValue);
    }

    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getOptions().min, this.model.getOptions().max);
    }

    this.eventManager.notify('sliderSetMax', value);
  }

  private handleViewToggleOrientation(): void {
    this.passLeftValueToView(this.model.getOptions().leftValue);

    if (this.view.isRange()) {
      const { rightValue } = this.model.getOptions();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
      }
    }

    this.eventManager.notify('sliderToggleOrientation', null);
  }

  private handleViewToggleRange(): void {
    this.passLeftValueToView(this.model.getOptions().leftValue);

    if (this.model.getOptions().range) {
      this.model.setRightValue();
      const { rightValue } = this.model.getOptions();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
        this.view.updateInput(this.model.getOptions().leftValue, rightValue);
      }
    }

    if (!this.model.getOptions().range) {
      this.model.removeRightValue();
      this.view.updateInput(this.model.getOptions().leftValue);
    }

    this.eventManager.notify('sliderToggleRange', null);
  }

  private handleModelToggleRange(): void {
    this.view.toggleRange();
  }

  private handleModelSetStep(): void {
    this.eventManager.notify('sliderSetStep', this.model.getOptions().step);
  }

  private handleViewSetScaleIntervals(): void {
    if (this.view.hasScale()) {
      this.view.removeScale();
      this.view.addScale(this.model.getOptions().min, this.model.getOptions().max);
    }
    this.eventManager.notify('sliderSetScaleIntervals', this.view.getScaleIntervals());
  }

  private handleViewAddValueLabels(): void {
    this.passLeftValueToView(this.model.getOptions().leftValue);
    if (this.view.isRange()) {
      const { rightValue } = this.model.getOptions();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
      }
    }
  }

  private handleViewAddMinMaxLabels(): void {
    this.view.setMinValue(this.model.getOptions().min);
    this.view.setMaxValue(this.model.getOptions().max);
  }
}

export default Presenter;
