import * as jQuery from 'jquery';
import 'airbnb-browser-shims';
import './style.scss';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

// function initSliders(): void {
//   const sliders = document.querySelectorAll('.js-range-slider');

//   sliders.forEach((slider) => {
//     const model: Model = new Model({

//       // min: 10,
//       // max: 200,
//       // leftValue: 125,
//       // rightValue: 175,
//       range: true,

//       // step: 5
//     });

//     const view = new View(slider, {
//       minMaxLabels: true,
//       valueLabels: true,

//       // vertical: true,
//       range: true,
//       scale: true,
//       scaleIntervals: 5,
//       panel: true,
//     });

//     const presenter = new Presenter(model, view);
//     presenter.view.eventManager.subscribe(presenter);
//     presenter.model.eventManager.subscribe(presenter);
//   });
// }

// window.addEventListener('load', initSliders);

declare global {
  interface JQuery {
    rangeSlider(): (options: object) => JQuery<HTMLElement>;
  }

  interface IRangeSlider {
    defaults: object,
  }
}

// eslint-disable-next-line func-names
(function ($) {
  class RangeSlider {
    element: HTMLElement;

    model: Model;

    view: View;

    presenter: Presenter;

    constructor(element, options) {
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
      this.presenter.view.eventManager.subscribe(this.presenter);
      this.presenter.model.eventManager.subscribe(this.presenter);
    }
  }

  // eslint-disable-next-line no-param-reassign
  // eslint-disable-next-line func-names
  $.fn.rangeSlider = function (options: object): JQuery<HTMLElement> {
    const settings = $.extend({}, $.fn.rangeSlider.defaults, options);

    // eslint-disable-next-line func-names
    return this.each(function (): RangeSlider {
      return new RangeSlider(this, settings);
    });
  };

  // eslint-disable-next-line no-param-reassign
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
}(jQuery));

$('.js-range-slider').rangeSlider().css('background-color', 'yellow');
