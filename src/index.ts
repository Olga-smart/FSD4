import * as jQuery from 'jquery';
import 'airbnb-browser-shims';

import Model from './Model/Model';
import View from './View/View';
import Presenter from './Presenter/Presenter';
import './style.scss';

declare global {
  interface JQuery {
    rangeSlider: IRangeSlider;
  }

  interface IRangeSlider {
    (options: object): JQuery<HTMLElement>;
  }

  type RangeSliderOptions = {
    min: number,
    max: number,
    leftValue: number,
    rightValue: number,
    range: boolean,
    step: number,
    minMaxLabels: boolean,
    valueLabels: boolean,
    vertical: boolean,
    scale: boolean,
    scaleIntervals: number,
    panel: boolean,
  };
}

class RangeSlider {
  element: HTMLDivElement;

  model: Model;

  view: View;

  presenter: Presenter;

  constructor(element: HTMLDivElement, options: RangeSliderOptions) {
    this.element = element;
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
      panel: options.panel,
    });
    this.presenter = new Presenter(this.model, this.view);

    this.model.subscribe(this);
  }

  inform(eventType: string): void {
    switch (eventType) {
      case 'modelLeftSet':
        if (this.onChange) {
          this.onChange(this.model.getLeftValue(), this.model.getRightValue());
        }
        break;
      case 'modelRightSet':
        if (this.onChange) {
          this.onChange(this.model.getLeftValue(), this.model.getRightValue());
        }
        break;

      default:
        break;
    }
  }

  setLeftValue(value: number): this {
    this.view.changeLeftValueFromOutside(value);
    return this;
  }

  setRightValue(value: number): this {
    this.view.changeRightValueFromOutside(value);
    return this;
  }

  setStep(value: number): this {
    this.view.changeStepFromOutside(value);
    return this;
  }

  onChange?: (leftValue: number, rightValue: number | undefined) => void;
}

(function rangeSliderWrapper(jQ) {
  const $ = jQ;

  const defaults: RangeSliderOptions = {
    min: 0,
    max: 100,
    range: true,
    leftValue: 25,
    rightValue: 75,
    step: 1,
    minMaxLabels: true,
    valueLabels: true,
    vertical: false,
    scale: false,
    scaleIntervals: 5,
    panel: false,
  };

  $.fn.rangeSlider = function initRangeSliders(options: Partial<RangeSliderOptions> = {}): JQuery {
    return this.each(function initRangeSlider() {
      const settingsFromDataset: Partial<RangeSliderOptions> = {
        min: $(this).data('min'),
        max: $(this).data('max'),
        range: $(this).data('range'),
        leftValue: $(this).data('leftValue'),
        rightValue: $(this).data('rightValue'),
        step: $(this).data('step'),
        minMaxLabels: $(this).data('minMaxLabels'),
        valueLabels: $(this).data('valueLabels'),
        vertical: $(this).data('vertical'),
        scale: $(this).data('scale'),
        scaleIntervals: $(this).data('scaleIntervals'),
        panel: $(this).data('panel'),
      };

      function validate(settings: RangeSliderOptions): RangeSliderOptions {
        let fixedSettings: RangeSliderOptions = $.extend({}, settings);

        function removeWrongTypes(): void {
          function checkType(property: keyof RangeSliderOptions): void {
            if (typeof settings[property] !== typeof defaults[property]) {
              delete fixedSettings[property];
            }
          }

          // There is no Object.keys().forEach because TS throws an error:
          // "Type 'string[]' is not assignable to type 'keyof RangeSliderOptions[]'"
          checkType('min');
          checkType('max');
          checkType('leftValue');
          checkType('rightValue');
          checkType('range');
          checkType('step');
          checkType('minMaxLabels');
          checkType('valueLabels');
          checkType('vertical');
          checkType('scale');
          checkType('scaleIntervals');
          checkType('panel');
        }

        function mergeWithDefaults(): void {
          fixedSettings = $.extend(defaults, fixedSettings);
        }

        function fixValues(): void {
          if (fixedSettings.min > fixedSettings.max) {
            [fixedSettings.min, fixedSettings.max] = [fixedSettings.max, fixedSettings.min];
          }

          if (fixedSettings.leftValue < fixedSettings.min) {
            fixedSettings.leftValue = fixedSettings.min;
          }

          if (fixedSettings.rightValue > fixedSettings.max) {
            fixedSettings.rightValue = fixedSettings.max;
          }

          if (fixedSettings.leftValue > fixedSettings.max) {
            fixedSettings.leftValue = fixedSettings.max;
          }

          if (fixedSettings.leftValue > fixedSettings.rightValue) {
            [fixedSettings.leftValue, fixedSettings.rightValue] = (
              [fixedSettings.rightValue, fixedSettings.leftValue]
            );
          }

          if (fixedSettings.step > Math.abs(fixedSettings.max - fixedSettings.min)) {
            fixedSettings.step = Math.abs(fixedSettings.max - fixedSettings.min);
          }

          if (fixedSettings.scaleIntervals < 1) {
            fixedSettings.scaleIntervals = 1;
          }

          if (Number.isInteger(fixedSettings.scaleIntervals)) {
            fixedSettings.scaleIntervals = Math.floor(fixedSettings.scaleIntervals);
          }
        }

        removeWrongTypes();
        mergeWithDefaults();
        fixValues();

        return fixedSettings;
      }

      let settings: RangeSliderOptions = $.extend({}, defaults, options, settingsFromDataset);
      settings = validate(settings);

      if (this instanceof HTMLDivElement) {
        $(this).data('rangeSlider', new RangeSlider(this, settings));
      }
    });
  };
}(jQuery));

$(() => {
  // eslint-disable-next-line fsd/jq-cache-dom-elements
  $('.js-range-slider').rangeSlider({
    panel: true,
    scale: true,
  });
  const slider = $('.js-range-slider').data('rangeSlider');
  slider.setLeftValue(50).setRightValue(80).setStep(10);
  // slider.onChange = (leftValue: number, rightValue: number | undefined) => {
  //   console.log(`${leftValue} + ${rightValue}`);
  // };
  // delete slider.onChange;
});
