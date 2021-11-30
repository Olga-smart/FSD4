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
      const model = new Model({
        min: 10,
        max: 100,
        leftValue: 25,
        rightValue: 75,
        step: 5,
        range: false,
      });
      model.setLeftValue(101);

      expect(model.leftValue).toBe(100);
    });

    it('set up left value = right value, if user is trying to set left value > right value', () => {
      const model = new Model(defaultOptions);
      model.setLeftValue(80);

      expect(model.leftValue).toBe(75);
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
  });
});
