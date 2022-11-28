import Model from '../Model/Model';
import View from '../View/View';
import { IEventListener } from '../EventManager/EventManager';

class Presenter implements IEventListener {
  private model: Model;

  private view: View;

  // возможно нужно чтобы model и view создавались с конструкторе презентера
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.initViewValues();
    this.model.subscribe(this);
    this.view.subscribe(this);
  }

  // очень длинный свичкейс, но много кейсов уберется когда сделаю независимую панель
  inform(eventType: string, data: number | null = null): void {
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
      case 'viewSetLeftFromOutside':
        if (typeof data === 'number') {
          this.handleViewSetLeftFromOutside(data);
        }
        break;
      case 'viewSetRightFromOutside':
        if (typeof data === 'number') {
          this.handleViewSetRightFromOutside(data);
        }
        break;
      case 'viewSetMin':
        if (typeof data === 'number') {
          this.handleViewSetMin(data);
        }
        break;
      case 'viewSetMax':
        if (typeof data === 'number') {
          this.handleViewSetMax(data);
        }
        break;
      case 'viewSetStep':
        if (typeof data === 'number') {
          this.handleViewSetStep(data);
        }
        break;
      case 'viewToggleOrientation':
        this.handleViewToggleOrientation();
        break;
      case 'viewToggleRange':
        this.handleViewToggleRange();
        break;
      case 'viewToggleScale':
        this.handleViewToggleScale();
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
        break;
      case 'modelSetRight':
        this.handleModelSetRight();
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

    if (view.hasPanel()) {
      view.setPanelValues({
        min,
        max,
        step: model.getStep(),
        from: leftValue,
        to: rightValue ?? null,
        vertical: view.isVertical() ?? false,
        range: view.isRange(),
        scale: view.hasScale(),
        scaleIntervals: view.getScaleIntervals(),
        valueLabels: view.hasValueLabels(),
        minMaxLabels: view.hasMinMaxLabels(),
      });
    }
  }

  private handleViewInputLeft(px: number): void {
    this.model.setLeftValueFromPx(px, this.view.getTrackLength());
  }

  private handleModelSetLeft(): void {
    const value = this.model.getLeftValue();
    this.passLeftValueToView(value);
    this.updateViewInput();

    if (this.view.hasPanel()) {
      this.view.updatePanelFrom(value);
    }
  }

  private handleViewInputRight(px: number): void {
    this.model.setRightValueFromPx(px, this.view.getTrackLength());
  }

  private handleModelSetRight(): void {
    const value = this.model.getRightValue()!;
    this.passRightValueToView(value);
    this.updateViewInput();

    if (this.view.hasPanel()) {
      this.view.updatePanelTo(value);
    }
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

  // изменится когда сделаю независимую панель
  private handleViewSetLeftFromOutside(value: number): void {
    this.model.setLeftValue(value);
  }

  // изменится когда сделаю независимую панель
  private handleViewSetRightFromOutside(value: number): void {
    this.model.setRightValue(value);
  }

  // изменится когда сделаю независимую панель
  private handleViewSetMin(value: number): void {
    this.model.setMin(value);
  }

  private handleModelSetMin(): void {
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

    if (this.view.hasPanel()) {
      this.view.updatePanelMin(this.model.getMin());
    }
  }

  // изменится когда сделаю независимую панель
  private handleViewSetMax(value: number): void {
    this.model.setMax(value);
  }

  private handleModelSetMax(): void {
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

    if (this.view.hasPanel()) {
      this.view.updatePanelMax(this.model.getMax());
    }
  }

  // изменится когда сделаю независимую панель
  private handleViewSetStep(value: number): void {
    this.model.setStep(value);
  }

  // изменится когда сделаю независимую панель
  private handleViewToggleOrientation(): void {
    this.passLeftValueToView(this.model.getLeftValue());

    if (this.view.isRange()) {
      const rightValue = this.model.getRightValue();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
      }
    }
  }

  // изменится когда сделаю независимую панель
  private handleViewToggleRange(): void {
    this.model.toggleRange();
  }

  private handleModelToggleRange(): void {
    this.passLeftValueToView(this.model.getLeftValue());

    if (this.model.isRange()) {
      this.model.setRightValue();
      const rightValue = this.model.getRightValue();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
        this.view.updateInput(this.model.getLeftValue(), rightValue);
        if (this.view.hasPanel()) {
          this.view.updatePanelTo(rightValue);
        }
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

  // изменится когда сделаю независимую панель
  private handleModelSetStep(): void {
    if (this.view.hasPanel()) {
      this.view.updatePanelStep(this.model.getStep());
    }
  }

  // изменится когда сделаю независимую панель
  private handleViewToggleScale(): void {
    if (!this.view.hasScale()) {
      this.view.addScale(this.model.getMin(), this.model.getMax());

      if (this.view.hasPanel()) {
        this.view.updatePanelScaleIntervals(this.view.getScaleIntervals() ?? 4);
      }

      return;
    }

    if (this.view.hasScale()) {
      this.view.removeScale();

      if (this.view.hasPanel()) {
        this.view.updatePanelScaleIntervals('');
      }
    }
  }

  // изменится когда сделаю независимую панель
  private handleViewSetScaleIntervals(): void {
    this.view.addScale(this.model.getMin(), this.model.getMax());
  }

  // изменится когда сделаю независимую панель
  private handleViewAddValueLabels(): void {
    this.passLeftValueToView(this.model.getLeftValue());
    if (this.view.isRange()) {
      const rightValue = this.model.getRightValue();
      if (rightValue !== undefined) {
        this.passRightValueToView(rightValue);
      }
    }
  }

  // изменится когда сделаю независимую панель
  private handleViewAddMinMaxLabels(): void {
    this.view.setMinValue(this.model.getMin());
    this.view.setMaxValue(this.model.getMax());
  }
}

export default Presenter;
