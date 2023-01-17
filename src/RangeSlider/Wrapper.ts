import 'airbnb-browser-shims';

// import { Presenter, SliderOptions } from './Presenter/Presenter';
import Presenter from './Presenter/Presenter';
import SliderOptions from './Presenter/SliderOptions';
import './style.scss';

declare global {
  interface JQuery {
    rangeSlider: IRangeSlider;
  }

  interface IRangeSlider {
    (options?: object): JQuery<HTMLElement>;
  }
}

(function Wrapper(jQ) {
  const $ = jQ;

  $.fn.rangeSlider = function initSliders(options: Partial<SliderOptions> = {}): JQuery {
    return this.each(function initSlider() {
      const settingsFromDataset: Partial<SliderOptions> = {
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

      const settings: Partial<SliderOptions> = $.extend({}, options, settingsFromDataset);

      if (this instanceof HTMLDivElement) {
        $(this).data('rangeSlider', new Presenter(this, settings));
      }
    });
  };
}(jQuery));
