import Model from './Model';

describe('Model', () => {
  const defaultOptions = {
    min: 10,
    max: 100,
    leftValue: 25,
    rightValue: 75,
    step: 5,
    range: true,
  };

  describe('constructor()', () => {
    describe('set up all necessary properties', () => {
      const model = new Model(defaultOptions);

      it('set up event manager', () => {
        expect(model).toHaveProperty('eventManager');
      });

      it('set up min value', () => {
        expect(model).toHaveProperty('min', 10);
      });

      it('set up max value', () => {
        expect(model).toHaveProperty('max', 100);
      });

      it('set up left value', () => {
        expect(model).toHaveProperty('leftValue', 25);
      });

      it('set up right value (if range: true)', () => {
        expect(model).toHaveProperty('rightValue', 75);
      });

      it('set up step', () => {
        expect(model).toHaveProperty('step', 5);
      });

      it('set up isRange', () => {
        expect(model).toHaveProperty('range', true);
      });
    });

    describe('validate options', () => {
      it('if min > max, swap them', () => {
        const model = new Model({
          min: 500,
          max: 50,
        });

        expect(model).toHaveProperty('min', 50);
        expect(model).toHaveProperty('max', 500);
      });

      it('if left value > right value, swap them', () => {
        const model = new Model({
          leftValue: 90,
          rightValue: 10,
        });

        expect(model).toHaveProperty('leftValue', 10);
        expect(model).toHaveProperty('rightValue', 90);
      });

      it('if right value > max, right value = max', () => {
        const model = new Model({
          rightValue: 200,
          max: 100,
        });

        expect(model).toHaveProperty('rightValue', 100);
      });

      it('if left value < min, left value = min', () => {
        const model = new Model({
          leftValue: 10,
          min: 50,
        });

        expect(model).toHaveProperty('leftValue', 50);
      });

      it('if left value > max, left value = max', () => {
        const model = new Model({
          range: false,
          leftValue: 200,
          max: 100,
        });

        expect(model).toHaveProperty('leftValue', 100);
      });

      it('if step > |max - min|, step = |max - min|', () => {
        const model = new Model({
          min: 0,
          max: 10,
          step: 20,
        });

        expect(model).toHaveProperty('step', 10);
      });
    });
  });

  describe('setLeftValue(value)', () => {
    it('set up left value', () => {
      const model = new Model(defaultOptions);
      model.setLeftValue(10);

      expect(model).toHaveProperty('leftValue', 10);
    });

    it('set up left value = min, if user is trying to set left value < min', () => {
      const model = new Model(defaultOptions);
      model.setLeftValue(5);

      expect(model).toHaveProperty('leftValue', 10);
    });

    it('set up left value = max, if user is trying to set left value > max', () => {
      const model = new Model({ ...defaultOptions, range: false });
      model.setLeftValue(101);

      expect(model).toHaveProperty('leftValue', 100);
    });

    it('set up left value = right value, if user is trying to set left value > right value', () => {
      const model = new Model(defaultOptions);
      model.setLeftValue(80);

      expect(model).toHaveProperty('leftValue', 75);
    });

    it('fit value to step', () => {
      const model = new Model({ ...defaultOptions, step: 10 });
      model.setLeftValue(31);

      expect(model).toHaveProperty('leftValue', 30);
    });

    it('say subscribers that left value was set', () => {
      const model = new Model(defaultOptions);
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setLeftValue(10);

      expect(subscriber.inform).toBeCalledWith('modelSetLeft', null);
    });
  });

  describe('setRightValue(value)', () => {
    it('set up right value', () => {
      const model = new Model(defaultOptions);
      model.setRightValue(100);

      expect(model).toHaveProperty('rightValue', 100);
    });

    it('set up right value = max, if user is trying to set right value > max', () => {
      const model = new Model(defaultOptions);
      model.setRightValue(101);

      expect(model).toHaveProperty('rightValue', 100);
    });

    it('set up right value = max, if value is not passed', () => {
      const model = new Model(defaultOptions);
      model.setMax(100);
      model.setRightValue();

      expect(model).toHaveProperty('rightValue', 100);
    });

    it('set up right value = left value, if user is trying to set right value < left value', () => {
      const model = new Model(defaultOptions);
      model.setRightValue(20);

      expect(model).toHaveProperty('rightValue', 25);
    });

    it('say subscribers that right value was set', () => {
      const model = new Model(defaultOptions);
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setRightValue(100);

      expect(subscriber.inform).toBeCalledWith('modelSetRight', null);
    });

    it('fit value to step', () => {
      const model = new Model({ ...defaultOptions, step: 10 });
      model.setRightValue(79);

      expect(model).toHaveProperty('rightValue', 80);
    });

    it('nothing happens, if slider is not range', () => {
      const model = new Model({ ...defaultOptions, range: false });
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setRightValue(100);

      expect(subscriber.inform).not.toBeCalled();
      expect(model).toHaveProperty('rightValue', undefined);
    });
  });

  describe('setLeftValueFromPx(px, trackLengthInPx)', () => {
    it('value match px if track length is 100 and min = 0 and max = 100 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 100,
        leftValue: 0,
        rightValue: 100,
        step: 1,
      });

      for (let i = 0; i <= 100; i += 1) {
        model.setLeftValueFromPx(i, 100);
        expect(model).toHaveProperty('leftValue', i);
      }
    });

    it('value match px * 2 if track length is 100 and min = 0 and max = 200 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 200,
        leftValue: 0,
        rightValue: 200,
        step: 1,
      });

      for (let i = 0; i <= 100; i += 1) {
        model.setLeftValueFromPx(i, 100);
        expect(model).toHaveProperty('leftValue', i * 2);
      }
    });

    it('value match px / 2 if track length is 200 and min = 0 and max = 100 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 100,
        leftValue: 0,
        rightValue: 100,
        step: 1,
      });

      for (let i = 0; i <= 100; i += 1) {
        model.setLeftValueFromPx(i, 200);
        expect(model).toHaveProperty('leftValue', Math.round(i / 2));
      }
    });

    it('value match px * x if track length is 100 and min = 0 and max = 100 * x and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        leftValue: 0,
        step: 1,
      });

      for (let x = 1; x <= 10; x += 1) {
        model.setMax(100 * x);
        model.setRightValue(100 * x);
        for (let i = 0; i <= 100; i += 1) {
          model.setLeftValueFromPx(i, 100);
          expect(model).toHaveProperty('leftValue', i * x);
        }
      }
    });

    it('value match px / x if track length is 100 * x and min = 0 and max = 100 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 100,
        leftValue: 0,
        rightValue: 100,
        step: 1,
      });

      for (let x = 1; x <= 10; x += 1) {
        for (let i = 0; i <= 100; i += 1) {
          model.setLeftValueFromPx(i, 100 * x);
          expect(model).toHaveProperty('leftValue', Math.round(i / x));
        }
      }
    });
  });

  describe('setRightValueFromPx(px, trackLengthInPx)', () => {
    it('value match px if track length is 100 and min = 0 and max = 100 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 100,
        leftValue: 0,
        rightValue: 100,
        step: 1,
      });

      for (let i = 0; i <= 100; i += 1) {
        model.setRightValueFromPx(i, 100);
        expect(model).toHaveProperty('rightValue', i);
      }
    });

    it('value match px * 2 if track length is 100 and min = 0 and max = 200 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 200,
        leftValue: 0,
        rightValue: 200,
        step: 1,
      });

      for (let i = 0; i <= 100; i += 1) {
        model.setRightValueFromPx(i, 100);
        expect(model).toHaveProperty('rightValue', i * 2);
      }
    });

    it('value match px / 2 if track length is 200 and min = 0 and max = 100 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 100,
        leftValue: 0,
        rightValue: 100,
        step: 1,
      });

      for (let i = 0; i <= 100; i += 1) {
        model.setRightValueFromPx(i, 200);
        expect(model).toHaveProperty('rightValue', Math.round(i / 2));
      }
    });

    it('value match px * x if track length is 100 and min = 0 and max = 100 * x and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        leftValue: 0,
        step: 1,
      });

      for (let x = 1; x <= 10; x += 1) {
        model.setMax(100 * x);
        model.setRightValue(100 * x);
        for (let i = 0; i <= 100; i += 1) {
          model.setRightValueFromPx(i, 100);
          expect(model).toHaveProperty('rightValue', i * x);
        }
      }
    });

    it('value match px / x if track length is 100 * x and min = 0 and max = 100 and step = 1', () => {
      const model = new Model({
        ...defaultOptions,
        min: 0,
        max: 100,
        leftValue: 0,
        rightValue: 100,
        step: 1,
      });

      for (let x = 1; x <= 10; x += 1) {
        for (let i = 0; i <= 100; i += 1) {
          model.setRightValueFromPx(i, 100 * x);
          expect(model).toHaveProperty('rightValue', Math.round(i / x));
        }
      }
    });
  });

  describe('removeRightValue()', () => {
    it('set rightValue property to undefined', () => {
      const model = new Model(defaultOptions);
      expect(model).toHaveProperty('rightValue', 75);

      model.removeRightValue();
      expect(model).toHaveProperty('rightValue', undefined);
    });
  });

  describe('setMin(value)', () => {
    it('set up min value', () => {
      const model = new Model(defaultOptions);
      model.setMin(10);

      expect(model).toHaveProperty('min', 10);
    });

    it('say subscribers that min was changed', () => {
      const model = new Model(defaultOptions);
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setMin(10);

      expect(subscriber.inform).toBeCalledWith('modelSetMin', null);
    });

    it('nothing happens if passed value > left value', () => {
      const model = new Model(defaultOptions);
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setMin(30);

      expect(model).toHaveProperty('min', defaultOptions.min);
      expect(subscriber.inform).not.toBeCalled();
    });
  });

  describe('setMax(value)', () => {
    describe('set up max value', () => {
      it('if slider is range', () => {
        const model = new Model(defaultOptions);
        model.setMax(200);

        expect(model).toHaveProperty('max', 200);
      });

      it('if slider is not range', () => {
        const model = new Model({ ...defaultOptions, range: false });
        model.setMax(200);

        expect(model).toHaveProperty('max', 200);
      });
    });

    it('say subscribers that max was changed', () => {
      const model = new Model(defaultOptions);
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setMax(200);

      expect(subscriber.inform).toBeCalledWith('modelSetMax', null);
    });

    it('nothing happens if passed value < left value', () => {
      const model = new Model({ ...defaultOptions, range: false });
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setMax(20);

      expect(model).toHaveProperty('max', defaultOptions.max);
      expect(subscriber.inform).not.toBeCalled();
    });

    it('nothing happens if passed value < right value', () => {
      const model = new Model(defaultOptions);
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setMax(70);

      expect(model).toHaveProperty('max', defaultOptions.max);
      expect(subscriber.inform).not.toBeCalled();
    });
  });

  describe('setStep(value)', () => {
    it('set up step value', () => {
      const model = new Model(defaultOptions);
      model.setStep(10);

      expect(model).toHaveProperty('step', 10);
    });

    it('say subscribers that step was changed', () => {
      const model = new Model(defaultOptions);
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.setStep(10);

      expect(subscriber.inform).toBeCalledWith('modelSetStep', null);
    });

    it('nothing happens, if value = 0', () => {
      const model = new Model(defaultOptions);
      model.setStep(10);
      model.setStep(0);

      expect(model).toHaveProperty('step', 10);
    });

    it('nothing happens, if value < 0', () => {
      const model = new Model(defaultOptions);
      model.setStep(10);
      model.setStep(-5);

      expect(model).toHaveProperty('step', 10);
    });

    it('nothing happens, if value > |max - min|', () => {
      const model = new Model(defaultOptions);
      model.setMin(10);
      model.setMax(100);
      model.setStep(10);
      model.setStep(100);

      expect(model).toHaveProperty('step', 10);
    });
  });

  describe('toggleRange()', () => {
    it('set up isRange property to false, if slider was range', () => {
      const model = new Model({ ...defaultOptions, range: true });
      model.toggleRange();

      expect(model.getOptions().range).toBe(false);
    });

    it('set up isRange property to true, if slider was not range', () => {
      const model = new Model({ ...defaultOptions, range: false });
      model.toggleRange();

      expect(model.getOptions().range).toBe(true);
    });

    it('say subscribers that range was changed', () => {
      const model = new Model({ ...defaultOptions, range: true });
      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      model.subscribe(subscriber);
      model.toggleRange();

      expect(subscriber.inform).toBeCalledWith('modelToggleRange', null);
    });
  });

  describe('getOptions()', () => {
    describe('return object with model options', () => {
      const model = new Model(defaultOptions);
      const options = model.getOptions();

      it('min', () => {
        expect(options.min).toBe(defaultOptions.min);
      });

      it('max', () => {
        expect(options.max).toBe(defaultOptions.max);
      });

      it('leftValue', () => {
        expect(options.leftValue).toBe(defaultOptions.leftValue);
      });

      it('rightValue', () => {
        expect(options.rightValue).toBe(defaultOptions.rightValue);
      });

      it('step', () => {
        expect(options.step).toBe(defaultOptions.step);
      });

      it('range', () => {
        expect(options.range).toBe(defaultOptions.range);
      });
    });
  });

  describe('convertValueToPercent(value)', () => {
    describe('convert value to percent', () => {
      it('percent match value, if min = 0 and max = 100', () => {
        const model = new Model({
          min: 0,
          max: 100,
        });

        for (let i = 0; i <= 100; i += 1) {
          expect(model.convertValueToPercent(i)).toBe(i);
        }
      });

      it('percent match value / 2, if min = 0 and max = 200', () => {
        const model = new Model({
          min: 0,
          max: 200,
        });

        for (let i = 0; i <= 100; i += 1) {
          expect(model.convertValueToPercent(i)).toBe(i / 2);
        }
      });

      it('percent match value / x, if min = 0 and max = 100 * x', () => {
        const model = new Model({
          min: 0,
        });

        for (let x = 1; x <= 10; x += 1) {
          model.setMax(100 * x);
          for (let i = 0; i <= 100; i += 1) {
            expect(model.convertValueToPercent(i)).toBe(Number((i / x).toFixed(10)));
          }
        }
      });
    });
  });

  describe('isTwoLabelsClose(distanceInPx)', () => {
    it('return true, if distanceInPx < 3', () => {
      expect(Model.isTwoLabelsClose(2)).toBeTruthy();
    });

    it('return false, if distanceInPx = 3', () => {
      expect(Model.isTwoLabelsClose(3)).toBeFalsy();
    });

    it('return false, if distanceInPx > 3', () => {
      expect(Model.isTwoLabelsClose(4)).toBeFalsy();
    });
  });
});
