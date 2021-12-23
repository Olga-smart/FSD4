import Model from './model';

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
    const model = new Model({
      min: 10,
      max: 100,
      leftValue: 25,
      rightValue: 75,
      step: 5,
      range: true,
    });

    it('set up min value', () => {
      expect(model.min).toBe(10);
    });

    it('set up max value', () => {
      expect(model.max).toBe(100);
    });

    it('set up left value', () => {
      expect(model.leftValue).toBe(25);
    });

    it('set up right value (if range: true)', () => {
      expect(model.rightValue).toBe(75);
    });

    it('set up step', () => {
      expect(model.step).toBe(5);
    });

    it('set up isRange', () => {
      expect(model.isRange).toBe(true);
    });
  });

  describe('setLeftValue(value)', () => {
    it('set up left value', () => {
      const model = new Model(defaultOptions);
      model.setLeftValue(10);

      expect(model.leftValue).toBe(10);
    });

    it('set up left value = min, if user is trying to set left value < min', () => {
      const model = new Model(defaultOptions);
      model.setLeftValue(5);

      expect(model.leftValue).toBe(10);
    });

    it('set up left value = max, if user is trying to set left value > max', () => {
      const model = new Model({ ...defaultOptions, range: false });
      model.setLeftValue(101);

      expect(model.leftValue).toBe(100);
    });

    it('set up left value = right value, if user is trying to set left value > right value', () => {
      const model = new Model(defaultOptions);
      model.setLeftValue(80);

      expect(model.leftValue).toBe(75);
    });

    it('say subscribers that left value was set', () => {
      const model = new Model(defaultOptions);
      model.eventManager.notify = jest.fn();
      model.setLeftValue(10);

      expect(model.eventManager.notify).toBeCalledWith('modelLeftSet');
    });
  });

  describe('setRightValue(value)', () => {
    it('set up right value', () => {
      const model = new Model(defaultOptions);
      model.setRightValue(100);

      expect(model.rightValue).toBe(100);
    });

    it('set up right value = max, if user is trying to set right value > max', () => {
      const model = new Model(defaultOptions);
      model.setRightValue(101);

      expect(model.rightValue).toBe(100);
    });

    it('set up right value = left value, if user is trying to set right value < left value', () => {
      const model = new Model(defaultOptions);
      model.setRightValue(20);

      expect(model.rightValue).toBe(25);
    });

    it('say subscribers that right value was set', () => {
      const model = new Model(defaultOptions);
      model.eventManager.notify = jest.fn();
      model.setRightValue(100);

      expect(model.eventManager.notify).toBeCalledWith('modelRightSet');
    });
  });

  describe('removeRightValue()', () => {
    it('set rightValue property to undefined', () => {
      const model = new Model(defaultOptions);
      expect(model.rightValue).toBe(75);

      model.removeRightValue();
      expect(model.rightValue).toBeUndefined();
    });
  });

  describe('changeMinFromOutside(value)', () => {
    it('set up min value', () => {
      const model = new Model(defaultOptions);
      model.changeMinFromOutside(10);

      expect(model.min).toBe(10);
    });

    it('say subscribers that min was changed', () => {
      const model = new Model(defaultOptions);
      model.eventManager.notify = jest.fn();
      model.changeMinFromOutside(10);

      expect(model.eventManager.notify).toBeCalledWith('modelChangeMin');
    });

    it('nothing happens if passed value > left value', () => {
      const model = new Model(defaultOptions);
      model.eventManager.notify = jest.fn();
      model.changeMinFromOutside(30);

      expect(model.min).toBe(10);
      expect(model.eventManager.notify).not.toBeCalled();
    });
  });

  describe('changeMaxFromOutside(value)', () => {
    describe('set up max value', () => {
      it('if slider is range', () => {
        const model = new Model(defaultOptions);
        model.changeMaxFromOutside(200);

        expect(model.max).toBe(200);
      });

      it('if slider is not range', () => {
        const model = new Model({ ...defaultOptions, range: false });
        model.changeMaxFromOutside(200);

        expect(model.max).toBe(200);
      });
    });

    it('say subscribers that max was changed', () => {
      const model = new Model(defaultOptions);
      model.eventManager.notify = jest.fn();
      model.changeMaxFromOutside(200);

      expect(model.eventManager.notify).toBeCalledWith('modelChangeMax');
    });

    it('nothing happens if passed value < left value', () => {
      const model = new Model({ ...defaultOptions, range: false });
      model.eventManager.notify = jest.fn();
      model.changeMaxFromOutside(20);

      expect(model.max).toBe(100);
      expect(model.eventManager.notify).not.toBeCalled();
    });

    it('nothing happens if passed value < right value', () => {
      const model = new Model(defaultOptions);
      model.eventManager.notify = jest.fn();
      model.changeMaxFromOutside(70);

      expect(model.max).toBe(100);
      expect(model.eventManager.notify).not.toBeCalled();
    });
  });

  describe('setStep()', () => {
    it('set up step value', () => {
      const model = new Model(defaultOptions);
      model.setStep(10);

      expect(model.step).toBe(10);
    });
  });

  describe('toggleRange()', () => {
    it('set up isRange property to false if slider was range', () => {
      const model = new Model({ ...defaultOptions, range: true });
      model.toggleRange();

      expect(model.isRange).toBe(false);
    });

    it('set up isRange property to true if slider was range', () => {
      const model = new Model({ ...defaultOptions, range: false });
      model.toggleRange();

      expect(model.isRange).toBe(true);
    });

    it('say subscribers that range was changed', () => {
      const model = new Model({ ...defaultOptions, range: true });
      model.eventManager.notify = jest.fn();
      model.toggleRange();

      expect(model.eventManager.notify).toBeCalledWith('modelRangeToggle');
    });
  });
});
