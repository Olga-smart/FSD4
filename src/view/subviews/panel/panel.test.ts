import { Panel } from './Panel';

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
        expect((panel.min as HTMLInputElement).type).toBe('number');
      });

      it('set up type "number" for max input', () => {
        expect((panel.max as HTMLInputElement).type).toBe('number');
      });

      it('set up type "number" for step input', () => {
        expect((panel.step as HTMLInputElement).type).toBe('number');
      });

      it('set up type "number" for from input', () => {
        expect((panel.from as HTMLInputElement).type).toBe('number');
      });

      it('set up type "number" for to input', () => {
        expect((panel.to as HTMLInputElement).type).toBe('number');
      });

      it('set up type "checkbox" for vertical input', () => {
        expect((panel.vertical as HTMLInputElement).type).toBe('checkbox');
      });

      it('set up type "checkbox" for range input', () => {
        expect((panel.range as HTMLInputElement).type).toBe('checkbox');
      });

      it('set up type "checkbox" for scale input', () => {
        expect((panel.scale as HTMLInputElement).type).toBe('checkbox');
      });

      it('set up type "number" for scaleIntervals input', () => {
        expect((panel.scaleIntervals as HTMLInputElement).type).toBe('number');
      });

      it('set up type "checkbox" for valueLabels input', () => {
        expect((panel.valueLabels as HTMLInputElement).type).toBe('checkbox');
      });

      it('set up type "checkbox" for minMaxLabels input', () => {
        expect((panel.minMaxLabels as HTMLInputElement).type).toBe('checkbox');
      });
    });

    describe('append all necessary inputs to panel component', () => {
      const panel = new Panel();

      it('range', () => {
        expect(panel.component.contains(panel.range)).toBe(true);
      });

      it('vertical', () => {
        expect(panel.component.contains(panel.vertical)).toBe(true);
      });

      it('valueLabels', () => {
        expect(panel.component.contains(panel.valueLabels)).toBe(true);
      });

      it('minMaxLabels', () => {
        expect(panel.component.contains(panel.minMaxLabels)).toBe(true);
      });

      it('scale', () => {
        expect(panel.component.contains(panel.scale)).toBe(true);
      });

      it('scaleIntervals', () => {
        expect(panel.component.contains(panel.scaleIntervals)).toBe(true);
      });

      it('min', () => {
        expect(panel.component.contains(panel.min)).toBe(true);
      });

      it('max', () => {
        expect(panel.component.contains(panel.max)).toBe(true);
      });

      it('from', () => {
        expect(panel.component.contains(panel.from)).toBe(true);
      });

      it('to', () => {
        expect(panel.component.contains(panel.to)).toBe(true);
      });

      it('step', () => {
        expect(panel.component.contains(panel.step)).toBe(true);
      });
    });
  });

  describe('registerWith(view)', () => {
    const panel = new Panel();
    const view: any = {};
    panel.registerWith(view);

    it('set up view', () => {
      expect(panel.view).toBe(view);
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
        expect((panel.min as HTMLInputElement).value).toBe('0');
      });

      it('set up max value', () => {
        expect((panel.max as HTMLInputElement).value).toBe('100');
      });

      it('set up step value', () => {
        expect((panel.step as HTMLInputElement).value).toBe('5');
      });

      it('set up from value', () => {
        expect((panel.from as HTMLInputElement).value).toBe('20');
      });

      it('set up to value', () => {
        expect((panel.to as HTMLInputElement).value).toBe('60');
      });

      it('set up vertical value', () => {
        expect((panel.vertical as HTMLInputElement).checked).toBe(false);
      });

      it('set up range value', () => {
        expect((panel.range as HTMLInputElement).checked).toBe(true);
      });

      it('set up scale value', () => {
        expect((panel.scale as HTMLInputElement).checked).toBe(true);
      });

      it('set up scaleIntervals value', () => {
        expect((panel.scaleIntervals as HTMLInputElement).value).toBe('6');
      });

      it('set up valueLabels value', () => {
        expect((panel.valueLabels as HTMLInputElement).checked).toBe(true);
      });

      it('set up minMaxLabels value', () => {
        expect((panel.minMaxLabels as HTMLInputElement).checked).toBe(true);
      });
    });

    describe('setAttributes(options)', () => {
      const panel = new Panel();

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

        expect((panel.from as HTMLInputElement).max).toBe('60');
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

        expect((panel.from as HTMLInputElement).max).toBe('100');
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

        expect((panel.max as HTMLInputElement).min).toBe('60');
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

        expect((panel.max as HTMLInputElement).min).toBe('20');
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

        expect((panel.to as HTMLInputElement).disabled).toBe(true);
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

        expect((panel.scaleIntervals as HTMLInputElement).disabled).toBe(true);
      });
    });
  });

  describe('updateFrom(value)', () => {
    const panel = new Panel();
    panel.updateFrom(20);

    it('set up from.value', () => {
      expect((panel.from as HTMLInputElement).value).toBe('20');
    });

    it('update to.min if this.view.isRange', () => {
      const view = {
        isRange: true,
      };
      panel.registerWith(view);
      panel.updateFrom(20);

      expect((panel.to as HTMLInputElement).min).toBe('20');
    });
  });

  describe('updateTo(value)', () => {
    const panel = new Panel();
    panel.updateTo(50);

    it('set up to.value', () => {
      expect((panel.to as HTMLInputElement).value).toBe('50');
    });

    it('set up from.max', () => {
      expect((panel.from as HTMLInputElement).max).toBe('50');
    });
  });

  describe('updateScaleIntervals(value)', () => {
    const panel = new Panel();
    panel.updateScaleIntervals(10);

    it('set up scaleIntervals.value', () => {
      expect((panel.scaleIntervals as HTMLInputElement).value).toBe('10');
    });
  });

  describe('handle events', () => {
    describe('handle min change', () => {
      const panel = new Panel();
      const view: any = {};
      panel.registerWith(view);
      panel.view.changeMinFromOutside = jest.fn();
      const event = new Event('change');

      it('set up min.value = from.value, if min.value > from.value', () => {
        (panel.from as HTMLInputElement).value = '10';
        (panel.min as HTMLInputElement).value = '20';
        panel.min.dispatchEvent(event);

        expect((panel.min as HTMLInputElement).value).toBe('10');
      });

      it('nothing happens if min.value <= from.value', () => {
        (panel.from as HTMLInputElement).value = '30';
        (panel.min as HTMLInputElement).value = '20';
        panel.min.dispatchEvent(event);

        expect((panel.min as HTMLInputElement).value).toBe('20');
      });

      it('say view that min was changed and pass it value', () => {
        (panel.from as HTMLInputElement).value = '20';
        (panel.min as HTMLInputElement).value = '10';
        panel.min.dispatchEvent(event);

        expect(panel.view.changeMinFromOutside).toBeCalledWith(10);
      });
    });

    describe('handle max change', () => {
      describe('if !this.view.isRange', () => {
        const panel = new Panel();
        const view = {
          isRange: false,
        };
        panel.registerWith(view);
        panel.view.changeMaxFromOutside = jest.fn();
        const event = new Event('change');

        it('set up max.value = from.value, if max.value < from.value', () => {
          (panel.from as HTMLInputElement).value = '100';
          (panel.max as HTMLInputElement).value = '50';
          panel.max.dispatchEvent(event);

          expect((panel.max as HTMLInputElement).value).toBe('100');
        });

        it('nothing happens if max.value >= from.value', () => {
          (panel.from as HTMLInputElement).value = '50';
          (panel.max as HTMLInputElement).value = '100';
          panel.max.dispatchEvent(event);

          expect((panel.max as HTMLInputElement).value).toBe('100');
        });
      });

      describe('if this.view.isRange', () => {
        const panel = new Panel();
        const view = {
          isRange: true,
        };
        panel.registerWith(view);
        panel.view.changeMaxFromOutside = jest.fn();
        const event = new Event('change');

        it('set up max.value = to.value, if max.value < to.value', () => {
          (panel.to as HTMLInputElement).value = '100';
          (panel.max as HTMLInputElement).value = '50';
          panel.max.dispatchEvent(event);

          expect((panel.max as HTMLInputElement).value).toBe('100');
        });

        it('nothing happens if max.value >= to.value', () => {
          (panel.to as HTMLInputElement).value = '50';
          (panel.max as HTMLInputElement).value = '100';
          panel.max.dispatchEvent(event);

          expect((panel.max as HTMLInputElement).value).toBe('100');
        });
      });

      it('say view that max was changed and pass it value', () => {
        const panel = new Panel();
        const view = {};
        panel.registerWith(view);
        (panel.to as HTMLInputElement).value = '50';
        (panel.max as HTMLInputElement).value = '100';
        panel.view.changeMaxFromOutside = jest.fn();
        const event = new Event('change');
        panel.max.dispatchEvent(event);

        expect(panel.view.changeMaxFromOutside).toBeCalledWith(100);
      });

      it('update step.max', () => {
        const panel = new Panel();
        (panel.to as HTMLInputElement).value = '50';
        (panel.max as HTMLInputElement).value = '100';
        const event = new Event('change');
        panel.max.dispatchEvent(event);

        expect((panel.step as HTMLInputElement).max).toBe('100');
      });
    });

    describe('handle step change', () => {
      const panel = new Panel();
      const step = panel.step as HTMLInputElement;
      const event = new Event('change');

      it('set up step.value = step.min, if step.value < step.min', () => {
        step.min = '1';
        step.value = '-1';
        panel.step.dispatchEvent(event);

        expect(step.value).toBe('1');
      });

      it('set up step.value = step.max, if step.value > step.max', () => {
        step.max = '100';
        step.value = '150';
        panel.step.dispatchEvent(event);

        expect(step.value).toBe('100');
      });

      it('say view that step was changed and pass it value', () => {
        const view = {};
        panel.registerWith(view);
        step.value = '5';
        panel.view.changeStepFromOutside = jest.fn();
        panel.step.dispatchEvent(event);

        expect(panel.view.changeStepFromOutside).toBeCalledWith(5);
      });
    });

    describe('handle from change', () => {
      const panel = new Panel();
      const from = panel.from as HTMLInputElement;
      const event = new Event('change');

      it('set up from.value = from.min, if from.value < from.min', () => {
        from.min = '20';
        from.value = '10';
        panel.from.dispatchEvent(event);

        expect(from.value).toBe('20');
      });

      it('set up from.value = from.max, if from.value > from.max', () => {
        from.max = '100';
        from.value = '150';
        panel.from.dispatchEvent(event);

        expect(from.value).toBe('100');
      });

      it('say view that left value was changed and pass it value', () => {
        const view = {};
        panel.registerWith(view);
        panel.view.changeLeftValueFromOutside = jest.fn();
        from.min = '0';
        from.value = '10';
        panel.from.dispatchEvent(event);

        expect(panel.view.changeLeftValueFromOutside).toBeCalledWith(10);
      });

      it('set up to.min = from.value, if !this.view.isRange', () => {
        const view = {
          isRange: true,
        };
        panel.registerWith(view);
        panel.view.changeLeftValueFromOutside = jest.fn();
        from.min = '0';
        from.value = '10';
        panel.from.dispatchEvent(event);

        expect((panel.to as HTMLInputElement).min).toBe('10');
      });
    });

    describe('handle to change', () => {
      const panel = new Panel();
      const to = panel.to as HTMLInputElement;
      const event = new Event('change');

      it('set up to.value = to.max, if to.value > to.max', () => {
        to.max = '100';
        to.value = '110';
        panel.to.dispatchEvent(event);

        expect(to.value).toBe('100');
      });

      it('set up to.value = to.min, if to.value < to.min', () => {
        to.min = '50';
        to.value = '40';
        panel.to.dispatchEvent(event);

        expect(to.value).toBe('50');
      });

      it('say view that right value was changed and pass it value', () => {
        const view = {
          isRange: true,
        };
        panel.registerWith(view);
        panel.view.changeRightValueFromOutside = jest.fn();
        to.min = '0';
        to.max = '200';
        to.value = '100';
        panel.to.dispatchEvent(event);

        expect(panel.view.changeRightValueFromOutside).toBeCalledWith(100);
      });

      it('set up from.max = to.value', () => {
        to.min = '0';
        to.max = '200';
        to.value = '100';
        panel.to.dispatchEvent(event);

        expect((panel.from as HTMLInputElement).max).toBe('100');
      });
    });

    describe('handle vertical change', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      panel.view.changeOrientationFromOutside = jest.fn();
      const event = new Event('change');
      panel.vertical.dispatchEvent(event);

      it('say view that orientation was changed', () => {
        expect(panel.view.changeOrientationFromOutside).toBeCalled();
      });
    });

    describe('handle range change', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      panel.view.toggleRangeFromOutside = jest.fn();
      const event = new Event('change');
      panel.range.dispatchEvent(event);

      it('say view that range was changed', () => {
        expect(panel.view.toggleRangeFromOutside).toBeCalled();
      });

      it('make to disabled, if it was not disabled', () => {
        expect((panel.to as HTMLInputElement).disabled).toBe(true);
      });

      it('make to not disabled, if it was disabled', () => {
        (panel.to as HTMLInputElement).disabled = true;
        panel.range.dispatchEvent(event);

        expect((panel.to as HTMLInputElement).disabled).toBe(false);
      });

      it('set up from.max = to.value if range becomes checked', () => {
        (panel.range as HTMLInputElement).checked = false;
        (panel.range as HTMLInputElement).checked = true;
        (panel.to as HTMLInputElement).value = '50';
        panel.range.dispatchEvent(event);

        expect((panel.from as HTMLInputElement).max).toBe('50');
      });
    });

    describe('handle scale change', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      panel.view.toggleScaleFromOutside = jest.fn();
      const event = new Event('change');
      panel.scale.dispatchEvent(event);

      it('say view that scale was changed', () => {
        expect(panel.view.toggleScaleFromOutside).toBeCalled();
      });

      it('make scaleIntervals disabled, if it was not disabled', () => {
        expect((panel.scaleIntervals as HTMLInputElement).disabled).toBe(true);
      });

      it('make scaleIntervals not disabled, if it was disabled', () => {
        (panel.scaleIntervals as HTMLInputElement).disabled = true;
        panel.scale.dispatchEvent(event);

        expect((panel.scaleIntervals as HTMLInputElement).disabled).toBe(false);
      });
    });

    describe('handle scaleIntervals change', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      panel.view.changeScaleIntervals = jest.fn();
      const scaleIntervals = panel.scaleIntervals as HTMLInputElement;
      const event = new Event('change');

      it('set up scaleIntervals.value = scaleIntervals.min, if scaleIntervals.value < scaleIntervals.min', () => {
        scaleIntervals.min = '1';
        scaleIntervals.value = '-1';
        panel.scaleIntervals.dispatchEvent(event);

        expect(scaleIntervals.value).toBe('1');
      });

      it('say view that scaleIntervals was changed ans pass it value', () => {
        scaleIntervals.min = '1';
        scaleIntervals.value = '5';
        panel.scaleIntervals.dispatchEvent(event);

        expect(panel.view.changeScaleIntervals).toBeCalledWith(5);
      });
    });

    describe('handle valueLabels change', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      panel.view.toggleValueLabels = jest.fn();
      const event = new Event('change');
      panel.valueLabels.dispatchEvent(event);

      it('say view that valueLabels was changed', () => {
        expect(panel.view.toggleValueLabels).toBeCalled();
      });
    });

    describe('handle minMaxLabels change', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      panel.view.toggleMinMaxLabels = jest.fn();
      const event = new Event('change');
      panel.minMaxLabels.dispatchEvent(event);

      it('say view that minMaxLabels was changed', () => {
        expect(panel.view.toggleMinMaxLabels).toBeCalled();
      });
    });
  });
});
