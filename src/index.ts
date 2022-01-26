/* eslint-disable no-new */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
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
    (options?: object): JQuery<HTMLElement>;
    defaults?: RangeSliderOptions;
    validate?: (settings: RangeSliderOptions) => RangeSliderOptions;
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

(function ($) {
  class RangeSlider {
    element: HTMLElement;

    model: Model;

    view: View;

    presenter: Presenter;

    constructor(element: HTMLElement, options: RangeSliderOptions) {
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
  }

  $.fn.rangeSlider = function (options: object = {}): JQuery<HTMLElement> {
    return this.each(function () {
      const settingsFromDataset: RangeSliderOptions = {
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

      let settings = $.extend({}, $.fn.rangeSlider.defaults, options, settingsFromDataset);
      settings = $.fn.rangeSlider.validate!(settings);

      $(this).data('rangeSlider', new RangeSlider(this, settings));
    });
  };

  $.fn.rangeSlider.defaults = {
    min: 0,
    max: 100,
    range: true,
    leftValue: 25,
    rightValue: 75,
    step: 1,
    minMaxLabels: true,
    valueLabels: true,
    vertical: false,
    scale: true,
    scaleIntervals: 5,
    panel: false,
  };

  $.fn.rangeSlider.validate = (settings: RangeSliderOptions) => {
    const fixedSettings: RangeSliderOptions = $.extend({}, settings);

    function fixType(property: keyof RangeSliderOptions, type: string): void {
      if (typeof settings[property] !== type) {
        (fixedSettings as any)[property] = $.fn.rangeSlider.defaults![property];
      }
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
    }

    function checkTypes(): void {
      fixType('min', 'number');
      fixType('max', 'number');
      fixType('leftValue', 'number');
      fixType('rightValue', 'number');
      fixType('range', 'boolean');
      fixType('step', 'number');
      fixType('minMaxLabels', 'boolean');
      fixType('valueLabels', 'boolean');
      fixType('vertical', 'boolean');
      fixType('scale', 'boolean');
      fixType('scaleIntervals', 'number');
      fixType('panel', 'boolean');
    }

    checkTypes();

    fixValues();

    return fixedSettings;
  };
}(jQuery));

$(() => {
  // eslint-disable-next-line fsd/jq-cache-dom-elements
  $('.js-range-slider').rangeSlider({
    panel: true,
    vertical: false,
    range: true,
  });
  // const slider = $('.js-range-slider').data('rangeSlider');
  // slider.setLeftValue(50).setRightValue(80).setStep(10);
});
