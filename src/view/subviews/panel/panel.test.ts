import { Panel } from './panel';

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

    it('attach event handlers', () => {
      jest.spyOn(Panel.prototype, 'attachEventHandlers');
      const panel = new Panel();

      expect(panel.attachEventHandlers).toBeCalled();

      jest.restoreAllMocks();
    });

    it('call render() method', () => {
      const spy = jest.spyOn(Panel.prototype, 'render');
      const panel = new Panel();

      expect(panel.render).toBeCalled();

      spy.mockClear();
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

  describe('render()', () => {
    it('call setTypes() method', () => {
      const spy = jest.spyOn(Panel.prototype, 'setTypes');
      const panel = new Panel();
      panel.render();

      expect(panel.setTypes).toBeCalled();

      spy.mockClear();
    });

    it('call setIds() method', () => {
      const spy = jest.spyOn(Panel.prototype, 'setIds');
      const panel = new Panel();
      panel.render();

      expect(panel.setIds).toBeCalled();

      spy.mockClear();
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

  describe('setValues(options)', () => {
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
      panel.setAttributes({
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
      panel.setAttributes({
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
      panel.setAttributes({
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
      panel.setAttributes({
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
      panel.setAttributes({
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
      panel.setAttributes({
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

  describe('updateFrom(value)', () => {
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

  describe('handleMinChange()', () => {
    it('set up min.value = from.value, if min.value > from.value', () => {
      const panel = new Panel();
      (panel.from as HTMLInputElement).value = '10';
      (panel.min as HTMLInputElement).value = '20';
      panel.handleMinChange();

      expect((panel.min as HTMLInputElement).value).toBe('10');
    });

    it('nothing happens if min.value <= from.value', () => {
      const panel = new Panel();
      (panel.from as HTMLInputElement).value = '30';
      (panel.min as HTMLInputElement).value = '20';
      panel.handleMinChange();

      expect((panel.min as HTMLInputElement).value).toBe('20');
    });

    it('call view.changeMinFromOutside() with proper value', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      (panel.from as HTMLInputElement).value = '20';
      (panel.min as HTMLInputElement).value = '10';
      panel.view.changeMinFromOutside = jest.fn();
      panel.handleMinChange();

      expect(panel.view.changeMinFromOutside).toBeCalledWith(10);
    });
  });

  describe('handleMaxChange()', () => {
    describe('if !this.view.isRange', () => {
      const panel = new Panel();
      const view = {
        isRange: false,
      };
      panel.registerWith(view);
      panel.view.changeMaxFromOutside = jest.fn();

      it('set up max.value = from.value, if max.value < from.value', () => {
        (panel.from as HTMLInputElement).value = '100';
        (panel.max as HTMLInputElement).value = '50';
        panel.handleMaxChange();

        expect((panel.max as HTMLInputElement).value).toBe('100');
      });

      it('nothing happens if max.value >= from.value', () => {
        (panel.from as HTMLInputElement).value = '50';
        (panel.max as HTMLInputElement).value = '100';
        panel.handleMaxChange();

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

      it('set up max.value = to.value, if max.value < to.value', () => {
        (panel.to as HTMLInputElement).value = '100';
        (panel.max as HTMLInputElement).value = '50';
        panel.handleMaxChange();

        expect((panel.max as HTMLInputElement).value).toBe('100');
      });

      it('nothing happens if max.value >= to.value', () => {
        (panel.to as HTMLInputElement).value = '50';
        (panel.max as HTMLInputElement).value = '100';
        panel.handleMaxChange();

        expect((panel.max as HTMLInputElement).value).toBe('100');
      });
    });

    it('call view.changeMaxFromOutside() with proper value', () => {
      const panel = new Panel();
      const view = {};
      panel.registerWith(view);
      (panel.to as HTMLInputElement).value = '50';
      (panel.max as HTMLInputElement).value = '100';
      panel.view.changeMaxFromOutside = jest.fn();
      panel.handleMaxChange();

      expect(panel.view.changeMaxFromOutside).toBeCalledWith(100);
    });

    it('update step.max', () => {
      const panel = new Panel();
      (panel.to as HTMLInputElement).value = '50';
      (panel.max as HTMLInputElement).value = '100';
      panel.handleMaxChange();

      expect((panel.step as HTMLInputElement).max).toBe('100');
    });
  });

  describe('handleStepChange()', () => {
    const panel = new Panel();
    const step = panel.step as HTMLInputElement;

    it('set up step.value = step.min, if step.value < step.min', () => {
      step.min = '1';
      step.value = '-1';
      panel.handleStepChange();

      expect(step.value).toBe('1');
    });

    it('set up step.value = step.max, if step.value > step.max', () => {
      step.max = '100';
      step.value = '150';
      panel.handleStepChange();

      expect(step.value).toBe('100');
    });

    it('call view.changeStepFromOutside() with proper value', () => {
      const view = {};
      panel.registerWith(view);
      step.value = '5';
      panel.view.changeStepFromOutside = jest.fn();
      panel.handleStepChange();

      expect(panel.view.changeStepFromOutside).toBeCalledWith(5);
    });
  });

  describe('handleFromChange()', () => {
    const panel = new Panel();
    const from = panel.from as HTMLInputElement;

    it('set up from.value = from.min, if from.value < from.min', () => {
      from.min = '20';
      from.value = '10';
      panel.handleFromChange();

      expect(from.value).toBe('20');
    });

    it('set up from.value = from.max, if from.value > from.max', () => {
      from.max = '100';
      from.value = '150';
      panel.handleFromChange();

      expect(from.value).toBe('100');
    });

    it('call view.changeLeftValueFromOutside() with proper value', () => {
      const view = {};
      panel.registerWith(view);
      panel.view.changeLeftValueFromOutside = jest.fn();
      from.min = '0';
      from.value = '10';
      panel.handleFromChange();

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
      panel.handleFromChange();

      expect((panel.to as HTMLInputElement).min).toBe('10');
    });
  });

  describe('handleToChange()', () => {
    const panel = new Panel();
    const to = panel.to as HTMLInputElement;

    it('set up to.value = to.max, if to.value > to.max', () => {
      to.max = '100';
      to.value = '110';
      panel.handleToChange();

      expect(to.value).toBe('100');
    });

    it('set up to.value = to.min, if to.value < to.min', () => {
      to.min = '50';
      to.value = '40';
      panel.handleToChange();

      expect(to.value).toBe('50');
    });

    it('call view.changeRightValueFromOutside() with proper value', () => {
      const view = {
        isRange: true,
      };
      panel.registerWith(view);
      panel.view.changeRightValueFromOutside = jest.fn();
      to.min = '0';
      to.max = '200';
      to.value = '100';
      panel.handleToChange();

      expect(panel.view.changeRightValueFromOutside).toBeCalledWith(100);
    });

    it('set up from.max = to.value', () => {
      to.min = '0';
      to.max = '200';
      to.value = '100';
      panel.handleToChange();

      expect((panel.from as HTMLInputElement).max).toBe('100');
    });
  });

  describe('handleVerticalChange()', () => {
    const panel = new Panel();
    const view = {};
    panel.registerWith(view);
    panel.view.changeOrientationFromOutside = jest.fn();
    panel.handleVerticalChange();

    it('call view.changeOrientationFromOutside()', () => {
      expect(panel.view.changeOrientationFromOutside).toBeCalled();
    });
  });

  describe('handleRangeChange()', () => {
    const panel = new Panel();
    const view = {};
    panel.registerWith(view);
    panel.view.toggleRangeFromOutside = jest.fn();
    panel.handleRangeChange();

    it('call view.toggleRangeFromOutside()', () => {
      expect(panel.view.toggleRangeFromOutside).toBeCalled();
    });

    it('make to disabled, if it was not disabled', () => {
      expect((panel.to as HTMLInputElement).disabled).toBe(true);
    });

    it('make to not disabled, if it was disabled', () => {
      (panel.to as HTMLInputElement).disabled = true;
      panel.handleRangeChange();

      expect((panel.to as HTMLInputElement).disabled).toBe(false);
    });
  });

  describe('handleScaleChange()', () => {
    const panel = new Panel();
    const view = {};
    panel.registerWith(view);
    panel.view.toggleScaleFromOutside = jest.fn();
    panel.handleScaleChange();

    it('call view.toggleScaleFromOutside()', () => {
      expect(panel.view.toggleScaleFromOutside).toBeCalled();
    });

    it('make scaleIntervals disabled, if it was not disabled', () => {
      expect((panel.scaleIntervals as HTMLInputElement).disabled).toBe(true);
    });

    it('make scaleIntervals not disabled, if it was disabled', () => {
      (panel.scaleIntervals as HTMLInputElement).disabled = true;
      panel.handleScaleChange();

      expect((panel.scaleIntervals as HTMLInputElement).disabled).toBe(false);
    });
  });

  describe('handleScaleIntervalsChange()', () => {
    const panel = new Panel();
    const view = {};
    panel.registerWith(view);
    panel.view.changeScaleIntervals = jest.fn();
    const scaleIntervals = panel.scaleIntervals as HTMLInputElement;

    it('set up scaleIntervals.value = scaleIntervals.min, if scaleIntervals.value < scaleIntervals.min', () => {
      scaleIntervals.min = '1';
      scaleIntervals.value = '-1';
      panel.handleScaleIntervalsChange();

      expect(scaleIntervals.value).toBe('1');
    });

    it('call view.changeScaleIntervals() with proper value', () => {
      scaleIntervals.min = '1';
      scaleIntervals.value = '5';
      panel.handleScaleIntervalsChange();

      expect(panel.view.changeScaleIntervals).toBeCalledWith(5);
    });
  });

  describe('handleValueLabelsChange()', () => {
    const panel = new Panel();
    const view = {};
    panel.registerWith(view);
    panel.view.toggleValueLabels = jest.fn();
    panel.handleValueLabelsChange();

    it('call view.toggleValueLabels()', () => {
      expect(panel.view.toggleValueLabels).toBeCalled();
    });
  });

  describe('handleMinMaxLabelsChange', () => {
    const panel = new Panel();
    const view = {};
    panel.registerWith(view);
    panel.view.toggleMinMaxLabels = jest.fn();
    panel.handleMinMaxLabelsChange();

    it('call view.toggleMinMaxLabels()', () => {
      expect(panel.view.toggleMinMaxLabels).toBeCalled();
    });
  });
});
