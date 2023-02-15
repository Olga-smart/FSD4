import BaseElement from './BaseElement/BaseElement';
import Track from './subviews/Track/Track';
import Range from './subviews/Range/Range';
import Thumb from './subviews/Thumb/Thumb';
import Scale from './subviews/Scale/Scale';
import LabelsContainer from './subviews/LabelsContainer/LabelsContainer';
import Label from './subviews/Label/Label';
import Input from './subviews/Input/Input';
import {
  EventManager, IEventListener, PossibleEvents, EventHandlers,
} from '../EventManager/EventManager';

type ViewOptions = {
  minMaxLabels: boolean,
  valueLabels: boolean,
  vertical: boolean,
  range: boolean,
  scale: boolean,
  scaleIntervals: number,
};

class View extends BaseElement<'div'> {
  static defaults: Readonly<ViewOptions> = {
    minMaxLabels: true,
    valueLabels: true,
    vertical: false,
    range: true,
    scale: false,
    scaleIntervals: 5,
  };

  private eventManager: EventManager = new EventManager();

  private slider: HTMLDivElement = BaseElement.createComponent('div', 'range-slider__slider');

  private track: Track = new Track();

  private range: Range = new Range();

  private input: Input = new Input();

  private thumbLeft: Thumb = new Thumb('left');

  private thumbRight?: Thumb;

  private scale?: Scale;

  private scaleIntervals: number = 5;

  private minLabel?: Label;

  private maxLabel?: Label;

  private valueLabelLeft?: Label;

  private valueLabelRight?: Label;

  private valueLabelCommon?: Label;

  private vertical?: boolean;

  private labelsContainer?: LabelsContainer;

  constructor(component: HTMLDivElement, options?: Partial<ViewOptions>) {
    super('div');
    this.component = component;
    const validOptions = View.validate({ ...View.defaults, ...options });
    this.initOptionalFields(validOptions);
    this.subscribeToSubviews();
    this.render();
  }

  static validate(options: ViewOptions): ViewOptions {
    let fixedOptions: ViewOptions = { ...options };

    const removeWrongTypes = (): void => {
      const checkType = (property: keyof ViewOptions): void => {
        if (typeof options[property] !== typeof View.defaults[property]) {
          delete fixedOptions[property];
        }
      };

      /* There is no Object.keys().forEach because TS throws an error:
       * "Type 'string[]' is not assignable to type 'keyof RangeSliderOptions[]'" */
      checkType('range');
      checkType('minMaxLabels');
      checkType('valueLabels');
      checkType('vertical');
      checkType('scale');
      checkType('scaleIntervals');
    };

    const mergeWithDefaults = (): void => {
      fixedOptions = { ...View.defaults, ...fixedOptions };
    };

    const fixValues = (): void => {
      if (fixedOptions.scaleIntervals !== undefined) {
        if (fixedOptions.scaleIntervals < 1) {
          fixedOptions.scaleIntervals = 1;
        }

        if (!Number.isInteger(fixedOptions.scaleIntervals)) {
          fixedOptions.scaleIntervals = Math.floor(fixedOptions.scaleIntervals);
        }
      }
    };

    removeWrongTypes();
    mergeWithDefaults();
    fixValues();

    return fixedOptions;
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
  }

  inform<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void {
    const eventHandlers: EventHandlers = {
      scaleClick: [this.handleScaleOrTrackClick],
      trackClick: [this.handleScaleOrTrackClick],
      leftThumbChangePosition: [this.handleLeftInput],
      rightThumbChangePosition: [this.handleRightInput],
    };

    const handler = eventHandlers[eventType];
    if (handler !== undefined && Array.isArray(data)) {
      const x: number = data[0];
      const y: number = data[1];
      handler[0].call(this, x, y);
    }
  }

  setMinValue(value: number): void {
    this.minLabel?.setValue(value);
  }

  setMaxValue(value: number): void {
    this.maxLabel?.setValue(value);
  }

  setLeftValue(value: number, percent: number): void {
    if (!this.vertical) {
      this.thumbLeft.setIndent('left', percent);
      this.thumbLeft.setZIndex(percent === 100 ? 100 : 3);

      if (this.isRange()) {
        this.range.setIndent('left', percent);
      } else {
        this.range.setWidth(percent);
      }

      this.valueLabelLeft?.setIndent('left', `${percent}%`);
    }

    if (this.vertical) {
      this.thumbLeft.setIndent('top', 100 - percent);
      this.thumbLeft.setZIndex(percent === 100 ? 100 : 3);

      if (this.isRange()) {
        this.range.setIndent('bottom', percent);
      } else {
        this.range.setHeight(percent);
      }

      this.valueLabelLeft?.setIndent('top', `${100 - percent}%`);
    }

    if (this.valueLabelLeft) {
      this.valueLabelLeft.setValue(value);

      if (this.isRange()) {
        this.valueLabelCommon?.setValue(`${value} - ${this.valueLabelRight?.getValue()}`);
      }
    }

    this.eventManager.notify('viewSetLeft', null);
  }

  setRightValue(value: number, percent: number): void {
    if (!this.vertical) {
      this.thumbRight?.setIndent('left', percent);
      this.range.setIndent('right', 100 - percent);
      this.valueLabelRight?.setIndent('left', `${percent}%`);
    }

    if (this.vertical) {
      this.thumbRight?.setIndent('top', 100 - percent);
      this.range.setIndent('top', 100 - percent);
      this.valueLabelRight?.setIndent('top', `${100 - percent}%`);
    }

    if (this.valueLabelRight) {
      this.valueLabelRight.setValue(value);
      this.valueLabelCommon?.setValue(`${this.valueLabelLeft?.getValue()} - ${value}`);
    }

    this.eventManager.notify('viewSetRight', null);
  }

  updateInput(value1: number, value2: number | null = null): void {
    this.input.setValue(value1, value2);
  }

  addScale(min: number, max: number): void {
    this.scale = new Scale(min, max, this.getScaleIntervals());
    this.slider.after(this.scale.getComponent());
    this.scale.subscribe(this);

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

  setScaleIntervals(value: number): void {
    if (value <= 0) return;

    this.scaleIntervals = Math.floor(value);
    this.eventManager.notify('viewSetScaleIntervals', null);
  }

  getScaleIntervals(): number {
    return this.scaleIntervals;
  }

  fixLabelsContainerWidthForVertical(): void {
    const labels: HTMLElement[] = this.collectLabels();
    this.labelsContainer?.fixWidthForVertical(labels);
  }

  fixLabelsContainerHeightForHorizontal(): void {
    const labels: HTMLElement[] = this.collectLabels();
    this.labelsContainer?.fixHeightForHorizontal(labels);
  }

  toggleOrientation(): void {
    this.vertical = !this.vertical;
    this.destroy();
    this.render();

    if (this.vertical) {
      this.thumbLeft.setIndent('left', 0);
      this.thumbRight?.setIndent('left', 0);
      this.range.setIndent('left', 0);
      this.range.setIndent('right', 0);
      this.range.resetTopIndent();
      this.range.resetWidth();
      this.valueLabelLeft?.setIndent('left', 'unset');
      this.valueLabelRight?.setIndent('left', 'unset');
      this.valueLabelCommon?.setIndent('left', 'unset');
      if (this.hasLabels()) this.fixLabelsContainerWidthForVertical();
      this.scale?.handleSwitchFromHorizontalToVertical();
    }

    if (!this.vertical) {
      this.component.classList.remove('range-slider_vertical');
      this.thumbLeft.setIndent('top', 0);
      this.thumbRight?.setIndent('top', 0);
      this.range.setIndent('bottom', 0);
      this.range.setIndent('top', 0);
      this.range.resetHeight();
      this.valueLabelLeft?.setIndent('top', 'unset');
      this.valueLabelRight?.setIndent('top', 'unset');
      this.valueLabelCommon?.setIndent('top', 'unset');
      if (this.hasLabels()) this.fixLabelsContainerHeightForHorizontal();
      this.scale?.handleSwitchFromVerticalToHorizontal();
    }

    this.eventManager.notify('viewToggleOrientation', null);
  }

  toggleRange(): void {
    const isRange = !this.isRange();
    this.destroy();

    if (isRange) {
      this.thumbRight = new Thumb('right');
      this.thumbRight.subscribe(this);

      if (this.valueLabelLeft) {
        this.valueLabelRight = new Label('range-slider__value-label range-slider__value-label_right');
        this.valueLabelCommon = new Label('range-slider__value-label range-slider__value-label_common');
      }

      if (!this.vertical) {
        this.range.resetWidth();
      }

      if (this.vertical) {
        this.range.resetHeight();
      }
    }

    if (!isRange) {
      this.thumbRight = undefined;
      this.valueLabelRight = undefined;
      this.valueLabelCommon = undefined;

      if (this.vertical) {
        this.range.resetTopIndent();
      }
    }

    this.render();
    this.eventManager.notify('viewToggleRange', null);
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
      this.valueLabelLeft = new Label('range-slider__value-label range-slider__value-label_left');

      if (!this.labelsContainer) {
        this.labelsContainer = new LabelsContainer();
        this.slider.before(this.labelsContainer.getComponent());
      }

      this.labelsContainer.append(this.valueLabelLeft.getComponent());

      if (this.isRange()) {
        this.valueLabelRight = new Label('range-slider__value-label range-slider__value-label_right');
        this.valueLabelCommon = new Label('range-slider__value-label range-slider__value-label_common');

        this.labelsContainer
          .append(this.valueLabelRight?.getComponent(), this.valueLabelCommon?.getComponent());
      }

      this.eventManager.notify('viewAddValueLabels', null);

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
      this.minLabel = new Label('range-slider__min-max-label range-slider__min-max-label_left');
      this.maxLabel = new Label('range-slider__min-max-label range-slider__min-max-label_right');

      if (!this.labelsContainer) {
        this.labelsContainer = new LabelsContainer();
        this.slider.before(this.labelsContainer.getComponent());
      }

      this.labelsContainer.append(this.minLabel.getComponent(), this.maxLabel.getComponent());

      this.eventManager.notify('viewAddMinMaxLabels', null);

      if (!this.vertical) {
        this.fixLabelsContainerHeightForHorizontal();
      }

      if (this.vertical) {
        this.fixLabelsContainerWidthForVertical();
      }
    }
  }

  hasLabels(): boolean {
    return Boolean(this.valueLabelLeft || this.minLabel);
  }

  hasScale(): boolean {
    return Boolean(this.scale);
  }

  hasMinMaxLabels(): boolean {
    return Boolean(this.maxLabel);
  }

  hasValueLabels(): boolean {
    return Boolean(this.valueLabelLeft);
  }

  isRange(): boolean {
    return Boolean(this.thumbRight);
  }

  isVertical(): boolean {
    return Boolean(this.vertical);
  }

  getTrackLength(): number {
    const length = this.isVertical() ? this.track.getHeight() : this.track.getWidth();
    return length;
  }

  getOptions(): ViewOptions {
    return {
      minMaxLabels: this.hasMinMaxLabels(),
      valueLabels: this.hasValueLabels(),
      vertical: this.isVertical(),
      range: this.isRange(),
      scale: this.hasScale(),
      scaleIntervals: this.getScaleIntervals(),
    };
  }

  mergeLabels(): void {
    this.valueLabelLeft?.setOpacity(0);
    this.valueLabelRight?.setOpacity(0);
    this.valueLabelCommon?.setOpacity(1);

    if (!this.vertical && this.thumbRight) {
      const distanceBetweenThumbs = (
        parseInt(this.thumbRight.getLeftIndent(), 10)
        - parseInt(this.thumbLeft.getLeftIndent(), 10)
      );

      if (this.valueLabelLeft) {
        this.valueLabelCommon?.setIndent('left', `${parseInt(this.valueLabelLeft.getLeftIndent(), 10) + distanceBetweenThumbs / 2}%`);
      }
    }

    if (this.vertical && this.thumbRight) {
      const distanceBetweenThumbs = (
        parseInt(this.thumbLeft.getTopIndent(), 10) - parseInt(this.thumbRight.getTopIndent(), 10)
      );

      if (this.valueLabelRight) {
        this.valueLabelCommon?.setIndent('top', `${parseInt(this.valueLabelRight.getTopIndent(), 10) + distanceBetweenThumbs / 2}%`);
      }
    }
  }

  splitLabels(): void {
    this.valueLabelCommon?.setOpacity(0);
    this.valueLabelLeft?.setOpacity(1);
    this.valueLabelRight?.setOpacity(1);
  }

  hideMinLabel(): void {
    this.minLabel?.setOpacity(0);
  }

  showMinLabel(): void {
    this.minLabel?.setOpacity(1);
  }

  hideMaxLabel(): void {
    this.maxLabel?.setOpacity(0);
  }

  showMaxLabel(): void {
    this.maxLabel?.setOpacity(1);
  }

  getDistanceBetweenValueLabels(): number | undefined {
    if (this.valueLabelLeft && this.valueLabelRight) {
      return this.getDistanceBetweenTwoLabels(this.valueLabelLeft, this.valueLabelRight);
    }
    return undefined;
  }

  getDistanceBetweenLeftValueLabelAndMinLabel(): number | undefined {
    if (this.valueLabelLeft && this.minLabel) {
      return this.getDistanceBetweenTwoLabels(this.minLabel, this.valueLabelLeft);
    }
    return undefined;
  }

  getDistanceBetweenLeftValueLabelAndMaxLabel(): number | undefined {
    if (this.valueLabelLeft && this.maxLabel) {
      return this.getDistanceBetweenTwoLabels(this.valueLabelLeft, this.maxLabel);
    }
    return undefined;
  }

  getDistanceBetweenRightValueLabelAndMaxLabel(): number | undefined {
    if (this.valueLabelRight && this.maxLabel) {
      return this.getDistanceBetweenTwoLabels(this.valueLabelRight, this.maxLabel);
    }
    return undefined;
  }

  private initOptionalFields(options: ViewOptions): void {
    if (options.range) {
      this.thumbRight = new Thumb('right');
    }

    // this field is always initialized in case the toggleScale() method will be called
    this.scaleIntervals = options.scaleIntervals;

    if (options.scale) {
      /* create scale with arbitrary values, which will be replaced later by Presenter
       * it is necessary for hasScale() return true */
      this.scale = new Scale(0, 100, this.getScaleIntervals());
    }

    if (options.minMaxLabels || options.valueLabels) {
      this.labelsContainer = new LabelsContainer();

      if (options.minMaxLabels) {
        this.minLabel = new Label('range-slider__min-max-label range-slider__min-max-label_left');
        this.maxLabel = new Label('range-slider__min-max-label range-slider__min-max-label_right');
      }

      if (options.valueLabels) {
        this.valueLabelLeft = new Label('range-slider__value-label range-slider__value-label_left');

        if (options.range) {
          this.valueLabelRight = new Label('range-slider__value-label range-slider__value-label_right');
          this.valueLabelCommon = new Label('range-slider__value-label range-slider__value-label_common');
        }
      }
    }

    if (options.vertical) {
      this.vertical = true;
    }
  }

  private subscribeToSubviews(): void {
    this.track.subscribe(this);
    this.thumbLeft.subscribe(this);

    if (this.isRange()) {
      this.thumbRight?.subscribe(this);
    }
  }

  private render(): void {
    const fragment = new DocumentFragment();

    this.track.append(this.range.getComponent());
    this.slider.append(this.track.getComponent(), this.thumbLeft.getComponent());
    fragment.append(this.slider, this.input.getComponent());

    if (this.isRange() && this.thumbRight) {
      this.slider.append(this.thumbRight.getComponent());
    } else {
      if (!this.vertical) {
        this.range.setIndent('left', 0);
      }

      if (this.vertical) {
        this.range.setIndent('bottom', 0);
      }
    }

    if (this.minLabel && this.maxLabel) {
      this.labelsContainer?.append(this.minLabel.getComponent(), this.maxLabel.getComponent());
    }

    if (this.valueLabelLeft) {
      this.labelsContainer?.append(this.valueLabelLeft.getComponent());

      if (this.isRange()) {
        if (this.valueLabelRight && this.valueLabelCommon) {
          this.labelsContainer?.append(
            this.valueLabelRight.getComponent(),
            this.valueLabelCommon.getComponent(),
          );
        }
      }
    }

    if (this.labelsContainer) {
      this.slider.before(this.labelsContainer.getComponent());
    }

    if (this.vertical) {
      this.component.classList.add('range-slider_vertical');
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

    [...this.slider.children].forEach((element) => {
      element.remove();
    });

    [...this.component.children].forEach((element) => {
      element.remove();
    });
  }

  private handleLeftInput(x: number, y: number): void {
    if (!this.vertical) {
      const trackShift = this.track.getBoundingClientRect().left;
      const newLeft = x - trackShift;

      this.eventManager.notify('viewInputLeft', newLeft);
    }

    if (this.vertical) {
      const trackShift = this.track.getBoundingClientRect().top;
      const newTop = y - trackShift;
      const newBottom = this.getTrackLength() - newTop;

      this.eventManager.notify('viewInputLeft', newBottom);
    }
  }

  private handleRightInput(x: number, y: number): void {
    if (!this.vertical) {
      const trackShift = this.track.getBoundingClientRect().left;
      const newLeft = x - trackShift;

      this.eventManager.notify('viewInputRight', newLeft);
    }

    if (this.vertical) {
      const trackShift = this.track.getBoundingClientRect().top;
      const newTop = y - trackShift;
      const newBottom = this.getTrackLength() - newTop;

      this.eventManager.notify('viewInputRight', newBottom);
    }
  }

  private handleScaleOrTrackClick(x: number, y: number): void {
    if (!this.isRange()) {
      this.addSmoothTransition('left');

      if (this.vertical) {
        this.eventManager.notify('viewInputLeft', this.getTrackLength() - y);
      } else {
        this.eventManager.notify('viewInputLeft', x);
      }

      setTimeout(() => {
        this.removeSmoothTransition('left');
      }, 1000);
    }

    if (this.isRange()) {
      if (this.whichThumbIsNearer(x, y) === 'left') {
        this.addSmoothTransition('left');

        if (this.vertical) {
          this.eventManager.notify('viewInputLeft', this.getTrackLength() - y);
        } else {
          this.eventManager.notify('viewInputLeft', x);
        }

        setTimeout(() => {
          this.removeSmoothTransition('left');
        }, 1000);
      } else {
        this.addSmoothTransition('right');

        if (this.vertical) {
          this.eventManager.notify('viewInputRight', this.getTrackLength() - y);
        } else {
          this.eventManager.notify('viewInputRight', x);
        }

        setTimeout(() => {
          this.removeSmoothTransition('right');
        }, 1000);
      }
    }
  }

  private whichThumbIsNearer(x: number, y: number): 'left' | 'right' {
    const leftThumbCoords = this.thumbLeft.getBoundingClientRect();
    const rightThumbCoords = this.thumbRight?.getBoundingClientRect();
    const trackCoords = this.track.getBoundingClientRect();

    let distanceFromLeftThumbCenter: number = 0;
    let distanceFromRightThumbCenter: number = 0;

    if (!this.vertical && rightThumbCoords) {
      const leftThumbCenter = leftThumbCoords.left + leftThumbCoords.width / 2 - trackCoords.left;
      const rightThumbCenter = rightThumbCoords.left
        + rightThumbCoords.width / 2
        - trackCoords.left;

      distanceFromLeftThumbCenter = Math.abs(x - leftThumbCenter);
      distanceFromRightThumbCenter = Math.abs(x - rightThumbCenter);
    }

    if (this.vertical && rightThumbCoords) {
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
      this.thumbRight?.getComponent().classList.add('range-slider__thumb_smooth-transition');
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
      this.thumbRight?.getComponent().classList.remove('range-slider__thumb_smooth-transition');
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

  private getDistanceBetweenTwoLabels(label1: Label, label2: Label): number {
    if (this.vertical) {
      const bottomLabelEdge = label1.getBoundingClientRect().top;
      const topLabelEdge = label2.getBoundingClientRect().bottom;

      return (bottomLabelEdge - topLabelEdge);
    }

    const leftLabelEdge = label1.getBoundingClientRect().right;
    const rightLabelEdge = label2.getBoundingClientRect().left;

    return (rightLabelEdge - leftLabelEdge);
  }
}

export default View;
