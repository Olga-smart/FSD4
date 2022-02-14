import BaseElement from './BaseElement/BaseElement';
import Slider from './subviews/Slider/Slider';
import Track from './subviews/Track/Track';
import Range from './subviews/Range/Range';
import Thumb from './subviews/Thumb/Thumb';
import MinMaxLabel from './subviews/MinMaxLabel/MinMaxLabel';
import ValueLabel from './subviews/ValueLabel/ValueLabel';
import Scale from './subviews/Scale/Scale';
import LabelsContainer from './subviews/LabelsContainer/LabelsContainer';
import Label from './subviews/Label/Label';
import Input from './subviews/Input/Input';
import { Panel, PanelOptions } from './subviews/Panel/Panel';
import { EventManager, IEventListener } from '../EventManager/EventManager';

type ViewOptions = {
  minMaxLabels?: boolean,
  valueLabels?: boolean,
  vertical?: boolean,
  range?: boolean,
  scale?: boolean,
  scaleIntervals?: number,
  panel?: boolean
};

class View extends BaseElement<'div'> {
  private eventManager: EventManager;

  private slider: Slider;

  private track: Track;

  private range: Range;

  private input: Input;

  private thumbLeft: Thumb;

  private thumbRight?: Thumb;

  private scale?: Scale;

  private scaleIntervals?: number;

  private minLabel?: MinMaxLabel;

  private maxLabel?: MinMaxLabel;

  private valueLabelLeft?: ValueLabel;

  private valueLabelRight?: ValueLabel;

  private valueLabelCommon?: ValueLabel;

  private vertical?: boolean;

  private labelsContainer?: LabelsContainer;

  private panel?: Panel;

  constructor(component: HTMLDivElement, options: ViewOptions = {}) {
    super('div');

    this.component = component;
    this.eventManager = new EventManager();

    this.slider = new Slider();
    this.track = new Track();
    this.track.registerWith(this);
    this.range = new Range();

    this.thumbLeft = new Thumb('left');
    this.thumbLeft.registerWith(this);

    this.input = new Input();

    if (options.range) {
      this.thumbRight = new Thumb('right');
      this.thumbRight.registerWith(this);
    }

    if (options.scale) {
      this.scaleIntervals = options.scaleIntervals ?? 4;

      // create scale with arbitrary values, which will be replaced later by Presenter
      // it is necessary for hasScale() return true
      this.scale = new Scale(0, 100, this.scaleIntervals);
    }

    if (options.minMaxLabels || options.valueLabels) {
      this.labelsContainer = new LabelsContainer();

      if (options.minMaxLabels) {
        this.minLabel = new MinMaxLabel('left');
        this.maxLabel = new MinMaxLabel('right');
      }

      if (options.valueLabels) {
        this.valueLabelLeft = new ValueLabel('left');

        if (options.range) {
          this.valueLabelRight = new ValueLabel('right');
          this.valueLabelCommon = new ValueLabel('common');
        }
      }
    }

    if (options.vertical) {
      this.vertical = true;
    }

    if (options.panel) {
      this.panel = new Panel(this);
    }

    this.render();
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
  }

  notify(eventType: string, data: any = null): void {
    this.eventManager.notify(eventType, data);
  }

  setMinValue(min: number): void {
    this.minLabel?.setValue(min);
  }

  setMaxValue(max: number): void {
    this.maxLabel?.setValue(max);
  }

  setLeftValue(value: number, percent: number): void {
    if (!this.vertical) {
      this.thumbLeft.setIndent('left', percent);

      if (!this.isRange()) {
        this.range.setWidth(percent);
      }

      if (this.isRange()) {
        this.range.setIndent('left', percent);
      }

      this.valueLabelLeft?.setIndent('left', this.thumbLeft.getLeftIndent());

      if (this.thumbLeft.getLeftIndent() === '100%') {
        this.thumbLeft.setZIndex(100);
      } else {
        this.thumbLeft.setZIndex(3);
      }
    }

    if (this.vertical) {
      this.thumbLeft.setIndent('top', 100 - percent);

      if (!this.isRange()) {
        this.range.setHeight(percent);
      }

      if (this.isRange()) {
        this.range.setIndent('bottom', percent);
      }

      this.valueLabelLeft?.setIndent('top', this.thumbLeft.getTopIndent());

      if (this.thumbLeft.getTopIndent() === '0%') {
        this.thumbLeft.setZIndex(100);
      } else {
        this.thumbLeft.setZIndex(3);
      }
    }

    if (this.valueLabelLeft) {
      this.valueLabelLeft.setValue(value);

      if (this.isRange()) {
        this.valueLabelCommon!.setValue(`${value} - ${this.valueLabelRight!.getValue()}`);

        if (this.isTwoValueLabelsClose()) {
          this.mergeLabels();
        } else {
          this.splitLabels();
        }
      }
    }

    if (this.valueLabelLeft && this.minLabel) {
      if (this.isLeftValueLabelCloseToMinLabel()) {
        this.minLabel.setOpacity(0);
      } else {
        this.minLabel.setOpacity(1);
      }

      if (!this.isRange()) {
        if (this.isLeftValueLabelCloseToMaxLabel()) {
          this.maxLabel!.setOpacity(0);
        } else {
          this.maxLabel!.setOpacity(1);
        }
      }
    }
  }

  setRightValue(value: number, percent: number): void {
    if (!this.vertical) {
      this.thumbRight?.setIndent('left', percent);
      this.range.setIndent('right', 100 - percent);

      this.valueLabelRight?.setIndent('left', this.thumbRight!.getLeftIndent());
    }

    if (this.vertical) {
      this.thumbRight?.setIndent('top', 100 - percent);
      this.range.setIndent('top', 100 - percent);

      this.valueLabelRight?.setIndent('top', this.thumbRight!.getTopIndent());
    }

    if (this.valueLabelRight) {
      this.valueLabelRight.setValue(value);
      this.valueLabelCommon!.setValue(`${this.valueLabelLeft!.getValue()} - ${value}`);

      if (this.isTwoValueLabelsClose()) {
        this.mergeLabels();
      } else {
        this.splitLabels();
      }
    }

    if (this.valueLabelRight && this.maxLabel) {
      if (this.isRightValueLabelCloseToMaxLabel()) {
        this.maxLabel.setOpacity(0);
      } else {
        this.maxLabel.setOpacity(1);
      }
    }
  }

  updateInput(value1: number, value2: number | null = null): void {
    this.input.setValue(value1, value2);
  }

  handleLeftInput(clientX: number, clientY: number, shiftX: number = 0, shiftY: number = 0): void {
    if (!this.vertical) {
      const trackShift = this.track.getBoundingClientRect().left;
      let newLeft = clientX - shiftX - trackShift;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (!this.isRange()) {
        const trackWidth = this.getTrackWidth();

        if (newLeft > trackWidth) {
          newLeft = trackWidth;
        }
      }

      if (this.isRange()) {
        const rightThumbShift = this.thumbRight!.getBoundingClientRect().left;
        const rightThumbPosition = rightThumbShift + this.thumbRight!.getWidth() / 2 - trackShift;

        if (newLeft > rightThumbPosition) {
          newLeft = rightThumbPosition;
        }
      }

      this.notify('viewLeftInput', newLeft);
    }

    if (this.vertical) {
      const trackShift = this.track.getBoundingClientRect().top;
      let newTop = clientY - shiftY - trackShift;

      const trackHeight = this.getTrackHeight();
      if (newTop > trackHeight) {
        newTop = trackHeight;
      }

      if (!this.isRange() && newTop < 0) {
        newTop = 0;
      }

      if (this.isRange()) {
        const rightThumbShift = this.thumbRight!.getBoundingClientRect().top;
        const rightThumbPosition = rightThumbShift + this.thumbRight!.getHeight() / 2 - trackShift;

        if (newTop < rightThumbPosition) {
          newTop = rightThumbPosition;
        }
      }

      const newBottom = trackHeight - newTop;

      this.notify('viewLeftInput', newBottom);
    }
  }

  handleRightInput(clientX: number, clientY: number, shiftX: number = 0, shiftY: number = 0): void {
    if (!this.vertical) {
      const trackShift = this.track.getBoundingClientRect().left;
      let newLeft = clientX - shiftX - trackShift;

      const leftThumbShift = this.thumbLeft.getBoundingClientRect().left;
      const leftThumbPosition = leftThumbShift + this.thumbLeft.getWidth() / 2 - trackShift;

      if (newLeft < leftThumbPosition) {
        newLeft = leftThumbPosition;
      }

      const trackWidth = this.getTrackWidth();

      if (newLeft > trackWidth) {
        newLeft = trackWidth;
      }

      this.notify('viewRightInput', newLeft);
    }

    if (this.vertical) {
      const trackShift = this.track.getBoundingClientRect().top;
      let newTop = clientY - shiftY - trackShift;

      if (newTop < 0) {
        newTop = 0;
      }

      const leftThumbShift = this.thumbLeft.getBoundingClientRect().top;
      const leftThumbPosition = leftThumbShift + this.thumbLeft.getHeight() / 2 - trackShift;

      if (newTop > leftThumbPosition) {
        newTop = leftThumbPosition;
      }

      const newBottom = this.getTrackHeight() - newTop;

      this.notify('viewRightInput', newBottom);
    }
  }

  addScale(min: number, max: number): void {
    const intervalsNumber: number = this.scaleIntervals || 4;
    this.scale = new Scale(min, max, intervalsNumber);
    this.scale.registerWith(this);
    this.slider.after(this.scale.getComponent());

    if (!this.vertical) {
      this.scale.fitHeightForHorizontal();
    }

    if (this.vertical) {
      this.scale.fitWidthForVertical();
    }
  }

  removeScale(): void {
    this.scale?.getComponent().remove();
    this.scale = undefined;
  }

  getScale(): Scale | undefined {
    return this.scale;
  }

  getScaleIntervals(): number {
    return this.scaleIntervals || 0;
  }

  handleScaleOrTrackClick(x: number, y: number): void {
    if (!this.isRange()) {
      this.addSmoothTransition('left');

      if (!this.vertical) {
        this.notify('viewLeftInput', x);
      } else {
        this.notify('viewLeftInput', this.getTrackHeight() - y);
      }

      setTimeout(() => {
        this.removeSmoothTransition('left');
      }, 1000);
    }

    if (this.isRange()) {
      if (this.whichThumbIsNearer(x, y) === 'left') {
        this.addSmoothTransition('left');

        if (!this.vertical) {
          this.notify('viewLeftInput', x);
        } else {
          this.notify('viewLeftInput', this.getTrackHeight() - y);
        }

        setTimeout(() => {
          this.removeSmoothTransition('left');
        }, 1000);
      } else {
        this.addSmoothTransition('right');

        if (!this.vertical) {
          this.notify('viewRightInput', x);
        } else {
          this.notify('viewRightInput', this.getTrackHeight() - y);
        }

        setTimeout(() => {
          this.removeSmoothTransition('right');
        }, 1000);
      }
    }
  }

  fixLabelsContainerWidthForVertical(): void {
    const labels: HTMLElement[] = this.collectLabels();
    this.labelsContainer?.fixWidthForVertical(labels);
  }

  fixLabelsContainerHeightForHorizontal(): void {
    const labels: HTMLElement[] = this.collectLabels();
    this.labelsContainer?.fixHeightForHorizontal(labels);
  }

  setPanelValues(options: PanelOptions): void {
    this.panel?.setValues(options);
  }

  updatePanelFrom(value: number): void {
    this.panel?.updateFrom(value);
  }

  updatePanelTo(value: number | ''): void {
    this.panel?.updateTo(value);
  }

  updatePanelScaleIntervals(value: number | ''): void {
    this.panel?.updateScaleIntervals(value);
  }

  updatePanelStep(value: number): void {
    this.panel?.updateStep(value);
  }

  changeLeftValueFromOutside(value: number): void {
    this.notify('viewChangeLeftValueFromOutside', value);
  }

  changeRightValueFromOutside(value: number): void {
    this.notify('viewChangeRightValueFromOutside', value);
  }

  changeMinFromOutside(value: number): void {
    this.notify('viewChangeMinFromOutside', value);
  }

  changeMaxFromOutside(value: number): void {
    this.notify('viewChangeMaxFromOutside', value);
  }

  changeStepFromOutside(value: number): void {
    this.notify('viewChangeStepFromOutside', value);
  }

  changeOrientationFromOutside(): void {
    if (!this.vertical) {
      this.vertical = true;
      this.destroy();
      this.render();
      this.thumbLeft.setIndent('left', 0);
      this.thumbRight?.setIndent('left', 0);
      this.range.setIndent('left', 0);
      this.range.setIndent('right', 0);
      this.range.resetTopIndent();
      this.range.resetWidth();
      this.valueLabelLeft?.setIndent('left', 'unset');
      this.valueLabelRight?.setIndent('left', 'unset');
      this.valueLabelCommon?.setIndent('left', 'unset');
      this.scale?.handleSwitchFromHorizontalToVertical();
      this.notify('viewChangeOrientationFromOutside');
      return;
    }

    if (this.vertical) {
      this.vertical = false;
      this.component.classList.remove('range-slider_vertical');
      this.destroy();
      this.render();
      this.thumbLeft.setIndent('top', 0);
      this.thumbRight?.setIndent('top', 0);
      this.range.setIndent('bottom', 0);
      this.range.setIndent('top', 0);
      this.range.resetHeight();
      this.valueLabelLeft?.setIndent('top', 'unset');
      this.valueLabelRight?.setIndent('top', 'unset');
      this.valueLabelCommon?.setIndent('top', 'unset');
      this.scale?.handleSwitchFromVerticalToHorizontal();
      this.notify('viewChangeOrientationFromOutside');
    }
  }

  toggleRangeFromOutside(): void {
    const isRange = !this.isRange();

    if (isRange) {
      this.destroy();
      this.thumbRight = new Thumb('right');
      this.thumbRight.registerWith(this);
      if (this.valueLabelLeft) {
        this.valueLabelRight = new ValueLabel('right');
        this.valueLabelCommon = new ValueLabel('common');
      }
      if (!this.vertical) {
        this.range.resetWidth();
      }
      if (this.vertical) {
        this.range.resetHeight();
      }
      this.render();
    }

    if (!isRange) {
      if (this.vertical) {
        this.range.resetTopIndent();
      }
      this.destroy();
      this.thumbRight = undefined;
      this.render();
    }

    this.notify('viewToggleRangeFromOutside');
  }

  toggleScaleFromOutside(): void {
    this.notify('viewToggleScaleFromOutside');
  }

  changeScaleIntervals(value: number): void {
    if (value <= 0) return;

    this.scaleIntervals = Math.floor(value);
    this.removeScale();
    this.notify('viewChangeScaleIntervals');
  }

  toggleValueLabels(): void {
    if (this.valueLabelLeft) {
      this.valueLabelLeft.remove();
      this.valueLabelRight?.remove();
      this.valueLabelCommon?.remove();

      this.valueLabelLeft = undefined;
      this.valueLabelRight = undefined;
      this.valueLabelCommon = undefined;

      if (this.minLabel) {
        if (!this.vertical) {
          this.fixLabelsContainerHeightForHorizontal();
        }

        if (this.vertical) {
          this.fixLabelsContainerWidthForVertical();
        }
      }

      if (!this.minLabel) {
        this.labelsContainer?.remove();
        this.labelsContainer = undefined;
      }

      return;
    }

    if (!this.valueLabelLeft) {
      this.valueLabelLeft = new ValueLabel('left');

      if (!this.labelsContainer) {
        this.labelsContainer = new LabelsContainer();
        this.slider.before(this.labelsContainer.getComponent());
      }

      this.labelsContainer.append(this.valueLabelLeft.getComponent());

      if (this.isRange()) {
        this.valueLabelRight = new ValueLabel('right');
        this.valueLabelCommon = new ValueLabel('common');

        this.labelsContainer
          .append(this.valueLabelRight!.getComponent(), this.valueLabelCommon!.getComponent());
      }

      this.notify('viewAddValueLabels');

      if (!this.vertical) {
        this.fixLabelsContainerHeightForHorizontal();
      }

      if (this.vertical) {
        this.fixLabelsContainerWidthForVertical();
      }
    }
  }

  toggleMinMaxLabels(): void {
    if (this.minLabel) {
      this.minLabel.remove();
      this.maxLabel?.remove();

      this.minLabel = undefined;
      this.maxLabel = undefined;

      if (this.valueLabelLeft) {
        if (!this.vertical) {
          this.fixLabelsContainerHeightForHorizontal();
        }

        if (this.vertical) {
          this.fixLabelsContainerWidthForVertical();
        }
      }

      if (!this.valueLabelLeft) {
        this.labelsContainer?.remove();
        this.labelsContainer = undefined;
      }

      return;
    }

    if (!this.minLabel) {
      this.minLabel = new MinMaxLabel('left');
      this.maxLabel = new MinMaxLabel('right');

      if (!this.labelsContainer) {
        this.labelsContainer = new LabelsContainer();
        this.slider.before(this.labelsContainer.getComponent());
      }

      this.labelsContainer.append(this.minLabel.getComponent(), this.maxLabel.getComponent());

      this.notify('viewAddMinMaxLabels');

      if (!this.vertical) {
        this.fixLabelsContainerHeightForHorizontal();
      }

      if (this.vertical) {
        this.fixLabelsContainerWidthForVertical();
      }
    }
  }

  hasLabels(): boolean {
    if (this.valueLabelLeft || this.minLabel) {
      return true;
    }
    return false;
  }

  hasScale(): boolean {
    if (this.scale) {
      return true;
    }
    return false;
  }

  hasMinMaxLabels(): boolean {
    if (this.maxLabel) {
      return true;
    }
    return false;
  }

  hasValueLabels(): boolean {
    if (this.valueLabelLeft) {
      return true;
    }
    return false;
  }

  hasPanel(): boolean {
    if (this.panel) {
      return true;
    }
    return false;
  }

  isRange(): boolean {
    if (this.thumbRight) {
      return true;
    }
    return false;
  }

  isVertical(): boolean {
    if (this.vertical) {
      return true;
    }
    return false;
  }

  getTrackWidth(): number {
    return this.track.getWidth();
  }

  getTrackHeight(): number {
    return this.track.getHeight();
  }

  private render(): void {
    const fragment = new DocumentFragment();

    this.track.append(this.range.getComponent());
    this.slider.append(this.track.getComponent(), this.thumbLeft.getComponent());
    fragment.append(this.slider.getComponent(), this.input.getComponent());

    if (this.isRange()) {
      this.slider.append(this.thumbRight!.getComponent());
    } else {
      if (!this.vertical) {
        this.range.setIndent('left', 0);
      }
      if (this.vertical) {
        this.range.setIndent('bottom', 0);
      }
    }

    if (this.minLabel && this.maxLabel) {
      this.labelsContainer!.append(this.minLabel.getComponent(), this.maxLabel.getComponent());
    }

    if (this.valueLabelLeft) {
      this.labelsContainer!.append(this.valueLabelLeft.getComponent());

      if (this.isRange()) {
        this.labelsContainer!
          .append(this.valueLabelRight!.getComponent(), this.valueLabelCommon!.getComponent());
      }
    }

    if (this.labelsContainer) {
      this.slider.before(this.labelsContainer.getComponent());
    }

    if (this.vertical) {
      this.component.classList.add('range-slider_vertical');
    }

    if (this.panel) {
      fragment.append(this.panel.getComponent());
    }

    if (this.scale) {
      this.slider.after(this.scale.getComponent());
    }

    this.component.append(fragment);
  }

  private destroy(): void {
    if (this.labelsContainer) {
      [...this.labelsContainer.getComponent().children].forEach((element) => {
        element.remove();
      });
    }

    [...this.slider.getComponent().children].forEach((element) => {
      element.remove();
    });

    [...this.component.children].forEach((element) => {
      element.remove();
    });
  }

  private mergeLabels(): void {
    this.valueLabelLeft?.setOpacity(0);
    this.valueLabelRight?.setOpacity(0);
    this.valueLabelCommon?.setOpacity(1);

    if (!this.vertical) {
      const distanceBetweenThumbs = (
        parseInt(this.thumbRight!.getLeftIndent(), 10)
        - parseInt(this.thumbLeft.getLeftIndent(), 10)
      );
      this.valueLabelCommon?.setIndent('left', `${parseInt(this.valueLabelLeft!.getLeftIndent(), 10) + distanceBetweenThumbs / 2}%`);
    }

    if (this.vertical) {
      const distanceBetweenThumbs = (
        parseInt(this.thumbRight!.getTopIndent(), 10) - parseInt(this.thumbLeft.getTopIndent(), 10)
      );
      this.valueLabelCommon?.setIndent('top', `${parseInt(this.valueLabelRight!.getTopIndent(), 10) - distanceBetweenThumbs / 2}%`);
    }
  }

  private splitLabels(): void {
    this.valueLabelCommon?.setOpacity(0);
    this.valueLabelLeft?.setOpacity(1);
    this.valueLabelRight?.setOpacity(1);
  }

  private isTwoLabelsClose(label1: Label, label2: Label): boolean {
    if (this.vertical) {
      const bottomLabelEdge = label1.getBoundingClientRect().top;
      const topLabelEdge = label2.getBoundingClientRect().bottom;

      return ((bottomLabelEdge - topLabelEdge) < 3);
    }

    const leftLabelEdge = label1.getBoundingClientRect().right;
    const rightLabelEdge = label2.getBoundingClientRect().left;

    return ((rightLabelEdge - leftLabelEdge) < 3);
  }

  private isTwoValueLabelsClose(): boolean {
    if (this.valueLabelLeft && this.valueLabelRight) {
      return this.isTwoLabelsClose(this.valueLabelLeft, this.valueLabelRight);
    }
    return false;
  }

  private isLeftValueLabelCloseToMinLabel(): boolean {
    if (this.minLabel && this.valueLabelLeft) {
      return this.isTwoLabelsClose(this.minLabel, this.valueLabelLeft);
    }
    return false;
  }

  private isLeftValueLabelCloseToMaxLabel(): boolean {
    if (this.valueLabelLeft && this.maxLabel) {
      return this.isTwoLabelsClose(this.valueLabelLeft, this.maxLabel);
    }
    return false;
  }

  private isRightValueLabelCloseToMaxLabel(): boolean {
    if (this.valueLabelRight && this.maxLabel) {
      return this.isTwoLabelsClose(this.valueLabelRight, this.maxLabel);
    }
    return false;
  }

  private whichThumbIsNearer(x: number, y: number): 'left' | 'right' {
    const leftThumbCoords = this.thumbLeft.getBoundingClientRect();
    const rightThumbCoords = this.thumbRight!.getBoundingClientRect();
    const trackCoords = this.track.getBoundingClientRect();

    let distanceFromLeftThumbCenter: number = 0;
    let distanceFromRightThumbCenter: number = 0;

    if (!this.vertical) {
      const leftThumbCenter = leftThumbCoords.left + leftThumbCoords.width / 2 - trackCoords.left;
      const rightThumbCenter = rightThumbCoords.left
        + rightThumbCoords.width / 2
        - trackCoords.left;

      distanceFromLeftThumbCenter = Math.abs(x - leftThumbCenter);
      distanceFromRightThumbCenter = Math.abs(x - rightThumbCenter);
    }

    if (this.vertical) {
      const leftThumbCenter = leftThumbCoords.top + leftThumbCoords.height / 2 - trackCoords.top;
      const rightThumbCenter = rightThumbCoords.top + rightThumbCoords.height / 2 - trackCoords.top;

      distanceFromLeftThumbCenter = Math.abs(y - leftThumbCenter);
      distanceFromRightThumbCenter = Math.abs(y - rightThumbCenter);
    }

    if (distanceFromLeftThumbCenter <= distanceFromRightThumbCenter) {
      return 'left';
    }
    return 'right';
  }

  private addSmoothTransition(side: 'left' | 'right' = 'left'): void {
    if (side === 'left') {
      this.thumbLeft.getComponent().classList.add('range-slider__thumb_smooth-transition');
      this.range.getComponent().classList.add('range-slider__range_smooth-transition');
      this.valueLabelLeft?.getComponent().classList.add('range-slider__value-label_smooth-transition');
    }

    if (side === 'right') {
      this.thumbRight!.getComponent().classList.add('range-slider__thumb_smooth-transition');
      this.range.getComponent().classList.add('range-slider__range_smooth-transition');
      this.valueLabelRight?.getComponent().classList.add('range-slider__value-label_smooth-transition');
    }
  }

  private removeSmoothTransition(side: 'left' | 'right' = 'left'): void {
    if (side === 'left') {
      this.thumbLeft.getComponent().classList.remove('range-slider__thumb_smooth-transition');
      this.range.getComponent().classList.remove('range-slider__range_smooth-transition');
      this.valueLabelLeft?.getComponent().classList.remove('range-slider__value-label_smooth-transition');
    }

    if (side === 'right') {
      this.thumbRight!.getComponent().classList.remove('range-slider__thumb_smooth-transition');
      this.range.getComponent().classList.remove('range-slider__range_smooth-transition');
      this.valueLabelRight?.getComponent().classList.remove('range-slider__value-label_smooth-transition');
    }
  }

  private collectLabels(): HTMLElement[] {
    const labels: HTMLElement[] = [];

    if (this.minLabel && this.maxLabel) {
      labels.push(this.minLabel.getComponent());
      labels.push(this.maxLabel.getComponent());
    }

    if (this.valueLabelLeft) {
      labels.push(this.valueLabelLeft.getComponent());
    }

    if (this.valueLabelRight) {
      labels.push(this.valueLabelRight.getComponent());
    }

    return labels;
  }
}

export default View;
