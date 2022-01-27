import { Panel } from './Panel';
import View from '../../View';

describe('Panel', () => {
  describe('constructor()', () => {
    describe('set up necessary properties', () => {
      const panel = new Panel();

      it('set up view property', () => {
        expect(panel).toHaveProperty('view');
      });

      it('set up component property', () => {
        expect(panel).toHaveProperty('component');
      });

      it('set up min property', () => {
        expect(panel).toHaveProperty('min');
      });

      it('set up max property', () => {
        expect(panel).toHaveProperty('max');
      });

      it('set up step property', () => {
        expect(panel).toHaveProperty('step');
      });

      it('set up from property', () => {
        expect(panel).toHaveProperty('from');
      });

      it('set up to property', () => {
        expect(panel).toHaveProperty('to');
      });

      it('set up vertical property', () => {
        expect(panel).toHaveProperty('vertical');
      });

      it('set up range property', () => {
        expect(panel).toHaveProperty('range');
      });

      it('set up scale property', () => {
        expect(panel).toHaveProperty('scale');
      });

      it('set up scaleIntervals property', () => {
        expect(panel).toHaveProperty('scaleIntervals');
      });

      it('set up valueLabels property', () => {
        expect(panel).toHaveProperty('valueLabels');
      });

      it('set up minMaxLabels property', () => {
        expect(panel).toHaveProperty('minMaxLabels');
      });
    });

    describe('set types', () => {
      const panel = new Panel();

      it('set up type "number" for min input', () => {
        const min = panel.getComponent().querySelector('.panel__min') as HTMLInputElement;
        expect(min.type).toBe('number');
      });

      it('set up type "number" for max input', () => {
        const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
        expect(max.type).toBe('number');
      });

      it('set up type "number" for step input', () => {
        const step = panel.getComponent().querySelector('.panel__step') as HTMLInputElement;
        expect(step.type).toBe('number');
      });

      it('set up type "number" for from input', () => {
        const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;
        expect(from.type).toBe('number');
      });

      it('set up type "number" for to input', () => {
        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
        expect(to.type).toBe('number');
      });

      it('set up type "checkbox" for vertical input', () => {
        const vertical = panel.getComponent().querySelector('.panel__vertical') as HTMLInputElement;
        expect(vertical.type).toBe('checkbox');
      });

      it('set up type "checkbox" for range input', () => {
        const range = panel.getComponent().querySelector('.panel__range') as HTMLInputElement;
        expect(range.type).toBe('checkbox');
      });

      it('set up type "checkbox" for scale input', () => {
        const scale = panel.getComponent().querySelector('.panel__scale') as HTMLInputElement;
        expect(scale.type).toBe('checkbox');
      });

      it('set up type "number" for scaleIntervals input', () => {
        const scaleIntervals = panel.getComponent().querySelector('.panel__scale-intervals') as HTMLInputElement;
        expect(scaleIntervals.type).toBe('number');
      });

      it('set up type "checkbox" for valueLabels input', () => {
        const valueLabels = panel.getComponent().querySelector('.panel__value-labels') as HTMLInputElement;
        expect(valueLabels.type).toBe('checkbox');
      });

      it('set up type "checkbox" for minMaxLabels input', () => {
        const minMaxLabels = panel.getComponent().querySelector('.panel__min-max-labels') as HTMLInputElement;
        expect(minMaxLabels.type).toBe('checkbox');
      });
    });

    describe('append all necessary inputs to panel component', () => {
      const panel = new Panel();

      it('range', () => {
        const range = panel.getComponent().querySelector('.panel__range') as HTMLInputElement;
        expect(panel.getComponent().contains(range)).toBe(true);
      });

      it('vertical', () => {
        const vertical = panel.getComponent().querySelector('.panel__vertical') as HTMLInputElement;
        expect(panel.getComponent().contains(vertical)).toBe(true);
      });

      it('valueLabels', () => {
        const valueLabels = panel.getComponent().querySelector('.panel__value-labels') as HTMLInputElement;
        expect(panel.getComponent().contains(valueLabels)).toBe(true);
      });

      it('minMaxLabels', () => {
        const minMaxLabels = panel.getComponent().querySelector('.panel__min-max-labels') as HTMLInputElement;
        expect(panel.getComponent().contains(minMaxLabels)).toBe(true);
      });

      it('scale', () => {
        const scale = panel.getComponent().querySelector('.panel__scale') as HTMLInputElement;
        expect(panel.getComponent().contains(scale)).toBe(true);
      });

      it('scaleIntervals', () => {
        const scaleIntervals = panel.getComponent().querySelector('.panel__scale-intervals') as HTMLInputElement;
        expect(panel.getComponent().contains(scaleIntervals)).toBe(true);
      });

      it('min', () => {
        const min = panel.getComponent().querySelector('.panel__min') as HTMLInputElement;
        expect(panel.getComponent().contains(min)).toBe(true);
      });

      it('max', () => {
        const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
        expect(panel.getComponent().contains(max)).toBe(true);
      });

      it('from', () => {
        const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;
        expect(panel.getComponent().contains(from)).toBe(true);
      });

      it('to', () => {
        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
        expect(panel.getComponent().contains(to)).toBe(true);
      });

      it('step', () => {
        const step = panel.getComponent().querySelector('.panel__step') as HTMLInputElement;
        expect(panel.getComponent().contains(step)).toBe(true);
      });
    });
  });

  describe('setValues(options)', () => {
    describe('set up values', () => {
      const panel = new Panel();
      panel.setValues({
        min: 0,
        max: 100,
        step: 5,
        from: 20,
        to: 60,
        vertical: false,
        range: true,
        scale: true,
        scaleIntervals: 6,
        valueLabels: true,
        minMaxLabels: true,
      });

      it('set up min value', () => {
        const min = panel.getComponent().querySelector('.panel__min') as HTMLInputElement;
        expect(min.value).toBe('0');
      });

      it('set up max value', () => {
        const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
        expect(max.value).toBe('100');
      });

      it('set up step value', () => {
        const step = panel.getComponent().querySelector('.panel__step') as HTMLInputElement;
        expect(step.value).toBe('5');
      });

      it('set up from value', () => {
        const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;
        expect(from.value).toBe('20');
      });

      it('set up to value', () => {
        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
        expect(to.value).toBe('60');
      });

      it('set up vertical value', () => {
        const vertical = panel.getComponent().querySelector('.panel__vertical') as HTMLInputElement;
        expect(vertical.checked).toBe(false);
      });

      it('set up range value', () => {
        const range = panel.getComponent().querySelector('.panel__range') as HTMLInputElement;
        expect(range.checked).toBe(true);
      });

      it('set up scale value', () => {
        const scale = panel.getComponent().querySelector('.panel__scale') as HTMLInputElement;
        expect(scale.checked).toBe(true);
      });

      it('set up scaleIntervals value', () => {
        const scaleIntervals = panel.getComponent().querySelector('.panel__scale-intervals') as HTMLInputElement;
        expect(scaleIntervals.value).toBe('6');
      });

      it('set up valueLabels value', () => {
        const valueLabels = panel.getComponent().querySelector('.panel__value-labels') as HTMLInputElement;
        expect(valueLabels.checked).toBe(true);
      });

      it('set up minMaxLabels value', () => {
        const minMaxLabels = panel.getComponent().querySelector('.panel__min-max-labels') as HTMLInputElement;
        expect(minMaxLabels.checked).toBe(true);
      });
    });

    describe('setAttributes(options)', () => {
      const panel = new Panel();
      const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
      const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;

      it('set up from.max equal to options.to if options.range', () => {
        panel.setValues({
          min: 0,
          max: 100,
          step: 5,
          from: 20,
          to: 60,
          vertical: false,
          range: true,
          scale: true,
          scaleIntervals: 6,
          valueLabels: true,
          minMaxLabels: true,
        });

        expect(from.max).toBe('60');
      });

      it('set up from.max equal to options.max if !options.range', () => {
        panel.setValues({
          min: 0,
          max: 100,
          step: 5,
          from: 20,
          to: 60,
          vertical: false,
          range: false,
          scale: true,
          scaleIntervals: 6,
          valueLabels: true,
          minMaxLabels: true,
        });

        expect(from.max).toBe('100');
      });

      it('set up max.min equal to options.to if options.range', () => {
        panel.setValues({
          min: 0,
          max: 100,
          step: 5,
          from: 20,
          to: 60,
          vertical: false,
          range: true,
          scale: true,
          scaleIntervals: 6,
          valueLabels: true,
          minMaxLabels: true,
        });

        expect(max.min).toBe('60');
      });

      it('set up max.min equal to options.from if !options.range', () => {
        panel.setValues({
          min: 0,
          max: 100,
          step: 5,
          from: 20,
          to: 60,
          vertical: false,
          range: false,
          scale: true,
          scaleIntervals: 6,
          valueLabels: true,
          minMaxLabels: true,
        });

        expect(max.min).toBe('20');
      });

      it('disable to if !options.range', () => {
        panel.setValues({
          min: 0,
          max: 100,
          step: 5,
          from: 20,
          to: 60,
          vertical: false,
          range: false,
          scale: true,
          scaleIntervals: 6,
          valueLabels: true,
          minMaxLabels: true,
        });

        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
        expect(to.disabled).toBe(true);
      });

      it('disable scaleIntervals if !options.scale', () => {
        panel.setValues({
          min: 0,
          max: 100,
          step: 5,
          from: 20,
          to: 60,
          vertical: false,
          range: false,
          scale: false,
          scaleIntervals: 6,
          valueLabels: true,
          minMaxLabels: true,
        });

        const scaleIntervals = panel.getComponent().querySelector('.panel__scale-intervals') as HTMLInputElement;
        expect(scaleIntervals.disabled).toBe(true);
      });
    });
  });

  describe('updateFrom(value)', () => {
    const panel = new Panel();
    panel.updateFrom(20);

    it('set up from.value', () => {
      const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;
      expect(from.value).toBe('20');
    });

    it('update to.min if this.view.isRange', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
      });
      panel.registerWith(view);
      panel.updateFrom(20);

      const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
      expect(to.min).toBe('20');
    });
  });

  describe('updateTo(value)', () => {
    const panel = new Panel();
    panel.updateTo(50);

    it('set up to.value', () => {
      const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
      expect(to.value).toBe('50');
    });

    it('set up from.max', () => {
      const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;
      expect(from.max).toBe('50');
    });
  });

  describe('updateStep(value)', () => {
    const panel = new Panel();
    panel.updateStep(10);

    it('set up step.value', () => {
      const step = panel.getComponent().querySelector('.panel__step') as HTMLInputElement;
      expect(step.value).toBe('10');
    });
  });

  describe('updateScaleIntervals(value)', () => {
    const panel = new Panel();
    panel.updateScaleIntervals(10);

    it('set up scaleIntervals.value', () => {
      const scaleIntervals = panel.getComponent().querySelector('.panel__scale-intervals') as HTMLInputElement;
      expect(scaleIntervals.value).toBe('10');
    });
  });

  describe('handle events', () => {
    describe('handle min change', () => {
      const panel = new Panel();
      const slider = document.createElement('div');
      const view = new View(slider);
      panel.registerWith(view);
      view.changeMinFromOutside = jest.fn();
      const event = new Event('change');
      const min = panel.getComponent().querySelector('.panel__min') as HTMLInputElement;
      const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;

      it('set up min.value = from.value, if min.value > from.value', () => {
        from.value = '10';
        min.value = '20';
        min.dispatchEvent(event);

        expect(min.value).toBe('10');
      });

      it('nothing happens if min.value <= from.value', () => {
        from.value = '30';
        min.value = '20';
        min.dispatchEvent(event);

        expect(min.value).toBe('20');
      });

      it('say view that min was changed and pass it value', () => {
        from.value = '20';
        min.value = '10';
        min.dispatchEvent(event);

        expect(view.changeMinFromOutside).toBeCalledWith(10);
      });

      it('update from.min', () => {
        min.value = '20';
        min.dispatchEvent(event);

        expect(from.min).toBe('20');
      });
    });

    describe('handle max change', () => {
      describe('if !this.view.isRange', () => {
        const panel = new Panel();
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: false,
        });
        panel.registerWith(view);
        view.changeMaxFromOutside = jest.fn();
        const event = new Event('change');
        const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
        const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;

        it('set up max.value = from.value, if max.value < from.value', () => {
          from.value = '100';
          max.value = '50';
          max.dispatchEvent(event);

          expect(max.value).toBe('100');
        });

        it('nothing happens if max.value >= from.value', () => {
          from.value = '50';
          max.value = '100';
          max.dispatchEvent(event);

          expect(max.value).toBe('100');
        });

        it('update from.max', () => {
          max.value = '50';
          max.dispatchEvent(event);

          expect(from.max).toBe('50');
        });
      });

      describe('if this.view.isRange', () => {
        const panel = new Panel();
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: true,
        });
        panel.registerWith(view);
        view.changeMaxFromOutside = jest.fn();
        const event = new Event('change');
        const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;

        it('set up max.value = to.value, if max.value < to.value', () => {
          to.value = '100';
          max.value = '50';
          max.dispatchEvent(event);

          expect(max.value).toBe('100');
        });

        it('nothing happens if max.value >= to.value', () => {
          to.value = '50';
          max.value = '100';
          max.dispatchEvent(event);

          expect(max.value).toBe('100');
        });

        it('update to.max', () => {
          max.value = '50';
          max.dispatchEvent(event);

          expect(to.max).toBe('50');
        });
      });

      it('say view that max was changed and pass it value', () => {
        const panel = new Panel();
        const slider = document.createElement('div');
        const view = new View(slider);
        panel.registerWith(view);
        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
        to.value = '50';
        const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
        max.value = '100';
        view.changeMaxFromOutside = jest.fn();
        const event = new Event('change');
        max.dispatchEvent(event);

        expect(view.changeMaxFromOutside).toBeCalledWith(100);
      });

      it('update step.max', () => {
        const panel = new Panel();
        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
        to.value = '50';
        const min = panel.getComponent().querySelector('.panel__min') as HTMLInputElement;
        min.value = '10';
        const max = panel.getComponent().querySelector('.panel__max') as HTMLInputElement;
        max.value = '100';
        const event = new Event('change');
        max.dispatchEvent(event);

        const step = panel.getComponent().querySelector('.panel__step') as HTMLInputElement;
        expect(step.max).toBe('90');
      });
    });

    describe('handle step change', () => {
      const panel = new Panel();
      const step = panel.getComponent().querySelector('.panel__step') as HTMLInputElement;
      const event = new Event('change');

      it('set up step.value = step.min, if step.value < step.min', () => {
        step.min = '1';
        step.value = '-1';
        step.dispatchEvent(event);

        expect(step.value).toBe('1');
      });

      it('set up step.value = step.max, if step.value > step.max', () => {
        step.max = '100';
        step.value = '150';
        step.dispatchEvent(event);

        expect(step.value).toBe('100');
      });

      it('say view that step was changed and pass it value', () => {
        const slider = document.createElement('div');
        const view = new View(slider);
        panel.registerWith(view);
        step.value = '5';
        view.changeStepFromOutside = jest.fn();
        step.dispatchEvent(event);

        expect(view.changeStepFromOutside).toBeCalledWith(5);
      });
    });

    describe('handle from change', () => {
      const panel = new Panel();
      const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;
      const event = new Event('change');

      it('set up from.value = from.min, if from.value < from.min', () => {
        from.min = '20';
        from.value = '10';
        from.dispatchEvent(event);

        expect(from.value).toBe('20');
      });

      it('set up from.value = from.max, if from.value > from.max', () => {
        from.max = '100';
        from.value = '150';
        from.dispatchEvent(event);

        expect(from.value).toBe('100');
      });

      it('say view that left value was changed and pass it value', () => {
        const slider = document.createElement('div');
        const view = new View(slider);
        panel.registerWith(view);
        view.changeLeftValueFromOutside = jest.fn();
        from.min = '0';
        from.value = '10';
        from.dispatchEvent(event);

        expect(view.changeLeftValueFromOutside).toBeCalledWith(10);
      });

      it('set up to.min = from.value, if !this.view.isRange', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: true,
        });
        panel.registerWith(view);
        view.changeLeftValueFromOutside = jest.fn();
        from.min = '0';
        from.value = '10';
        from.dispatchEvent(event);

        const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
        expect(to.min).toBe('10');
      });
    });

    describe('handle to change', () => {
      const panel = new Panel();
      const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
      const event = new Event('change');

      it('set up to.value = to.max, if to.value > to.max', () => {
        to.max = '100';
        to.value = '110';
        to.dispatchEvent(event);

        expect(to.value).toBe('100');
      });

      it('set up to.value = to.min, if to.value < to.min', () => {
        to.min = '50';
        to.value = '40';
        to.dispatchEvent(event);

        expect(to.value).toBe('50');
      });

      it('say view that right value was changed and pass it value', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: true,
        });
        panel.registerWith(view);
        view.changeRightValueFromOutside = jest.fn();
        to.min = '0';
        to.max = '200';
        to.value = '100';
        to.dispatchEvent(event);

        expect(view.changeRightValueFromOutside).toBeCalledWith(100);
      });

      it('set up from.max = to.value', () => {
        to.min = '0';
        to.max = '200';
        to.value = '100';
        to.dispatchEvent(event);
        const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;

        expect(from.max).toBe('100');
      });
    });

    describe('handle vertical change', () => {
      const panel = new Panel();
      const slider = document.createElement('div');
      const view = new View(slider);
      panel.registerWith(view);
      view.changeOrientationFromOutside = jest.fn();
      const event = new Event('change');
      const vertical = panel.getComponent().querySelector('.panel__vertical') as HTMLInputElement;
      vertical.dispatchEvent(event);

      it('say view that orientation was changed', () => {
        expect(view.changeOrientationFromOutside).toBeCalled();
      });
    });

    describe('handle range change', () => {
      const panel = new Panel();
      const slider = document.createElement('div');
      const view = new View(slider);
      panel.registerWith(view);
      view.toggleRangeFromOutside = jest.fn();
      const event = new Event('change');
      const to = panel.getComponent().querySelector('.panel__to') as HTMLInputElement;
      const range = panel.getComponent().querySelector('.panel__range') as HTMLInputElement;
      range.dispatchEvent(event);

      it('say view that range was changed', () => {
        expect(view.toggleRangeFromOutside).toBeCalled();
      });

      it('make to disabled, if it was not disabled', () => {
        expect(to.disabled).toBe(true);
      });

      it('make to not disabled, if it was disabled', () => {
        to.disabled = true;
        range.dispatchEvent(event);

        expect(to.disabled).toBe(false);
      });

      it('set up from.max = to.value if range becomes checked', () => {
        range.checked = false;
        range.checked = true;
        to.value = '50';
        const from = panel.getComponent().querySelector('.panel__from') as HTMLInputElement;
        range.dispatchEvent(event);

        expect(from.max).toBe('50');
      });
    });

    describe('handle scale change', () => {
      const panel = new Panel();
      const slider = document.createElement('div');
      const view = new View(slider);
      panel.registerWith(view);
      view.toggleScaleFromOutside = jest.fn();
      const event = new Event('change');
      const scale = panel.getComponent().querySelector('.panel__scale') as HTMLInputElement;
      const scaleIntervals = panel.getComponent().querySelector('.panel__scale-intervals') as HTMLInputElement;
      scale.dispatchEvent(event);

      it('say view that scale was changed', () => {
        expect(view.toggleScaleFromOutside).toBeCalled();
      });

      it('make scaleIntervals disabled, if it was not disabled', () => {
        expect(scaleIntervals.disabled).toBe(true);
      });

      it('make scaleIntervals not disabled, if it was disabled', () => {
        scaleIntervals.disabled = true;
        scale.dispatchEvent(event);

        expect(scaleIntervals.disabled).toBe(false);
      });
    });

    describe('handle scaleIntervals change', () => {
      const panel = new Panel();
      const slider = document.createElement('div');
      const view = new View(slider);
      panel.registerWith(view);
      view.changeScaleIntervals = jest.fn();
      const scaleIntervals = panel.getComponent().querySelector('.panel__scale-intervals') as HTMLInputElement;
      const event = new Event('change');

      it('set up scaleIntervals.value = scaleIntervals.min, if scaleIntervals.value < scaleIntervals.min', () => {
        scaleIntervals.min = '1';
        scaleIntervals.value = '-1';
        scaleIntervals.dispatchEvent(event);

        expect(scaleIntervals.value).toBe('1');
      });

      it('say view that scaleIntervals was changed ans pass it value', () => {
        scaleIntervals.min = '1';
        scaleIntervals.value = '5';
        scaleIntervals.dispatchEvent(event);

        expect(view.changeScaleIntervals).toBeCalledWith(5);
      });
    });

    describe('handle valueLabels change', () => {
      const panel = new Panel();
      const slider = document.createElement('div');
      const view = new View(slider);
      panel.registerWith(view);
      view.toggleValueLabels = jest.fn();
      const event = new Event('change');
      const valueLabels = panel.getComponent().querySelector('.panel__value-labels') as HTMLInputElement;
      valueLabels.dispatchEvent(event);

      it('say view that valueLabels was changed', () => {
        expect(view.toggleValueLabels).toBeCalled();
      });
    });

    describe('handle minMaxLabels change', () => {
      const panel = new Panel();
      const slider = document.createElement('div');
      const view = new View(slider);
      panel.registerWith(view);
      view.toggleMinMaxLabels = jest.fn();
      const event = new Event('change');
      const minMaxLabels = panel.getComponent().querySelector('.panel__min-max-labels') as HTMLInputElement;
      minMaxLabels.dispatchEvent(event);

      it('say view that minMaxLabels was changed', () => {
        expect(view.toggleMinMaxLabels).toBeCalled();
      });
    });
  });
});
