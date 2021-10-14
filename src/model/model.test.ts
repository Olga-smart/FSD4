import { Model } from './model';

describe('Model', () => {
  describe('consructor()', () => {
    describe('set up default values', () => {
      let model: Model;

      beforeEach(() => {
        model = new Model();
      });

      it('set up default min value = 0', () => {
        expect(model.min).toBe(0);
      });

      it('set up default max value = 150', () => {
        expect(model.max).toBe(150);
      });

      it('set up default left value = 25', () => {
        expect(model.leftValue).toBe(25);
      });

      it('set up default right value = 75 (if range: true)', () => {
        model = new Model({
          range: true,
        });

        expect(model.rightValue).toBe(75);
      });

      it('set up default step = 1', () => {
        expect(model.step).toBe(1);
      });

      it('set up isRange = false', () => {
        expect(model.isRange).toBe(false);
      });
    });

    describe('set up custom values', () => {
      it('set up min value', () => {
        const model = new Model({
          min: 10,
        });

        expect(model.min).toBe(10);
      });

      it('set up max value', () => {
        const model = new Model({
          max: 10,
        });

        expect(model.max).toBe(10);
      });

      it('set up left value', () => {
        const model = new Model({
          leftValue: 10,
        });

        expect(model.leftValue).toBe(10);
      });

      it('set up right value (if range: true)', () => {
        const model = new Model({
          rightValue: 10,
          range: true,
        });

        expect(model.rightValue).toBe(10);
      });

      it('set up step', () => {
        const model = new Model({
          step: 10,
        });

        expect(model.step).toBe(10);
      });

      it('set up isRange', () => {
        const model = new Model({
          range: true,
        });

        expect(model.isRange).toBe(true);
      });
    });
  });

  describe('setLeftValue(value)', () => {
    it('set up left value', () => {
      const model = new Model();
      model.setLeftValue(10);

      expect(model.leftValue).toBe(10);
    });

    it('set up left value = min, if user is trying to set left value < min', () => {
      const model = new Model({
        min: 10,
      });
      model.setLeftValue(9);

      expect(model.leftValue).toBe(10);
    });

    it('set up left value = max, if user is trying to set left value > max', () => {
      const model = new Model({
        max: 100,
      });
      model.setLeftValue(101);

      expect(model.leftValue).toBe(100);
    });

    it('set up left value = right value, if user is trying to set left value > right value', () => {
      const model = new Model({
        rightValue: 50,
        range: true,
      });
      model.setLeftValue(51);

      expect(model.leftValue).toBe(50);
    });
  });

  describe('setRightValue(value)', () => {
    it('set up right value', () => {
      const model = new Model({
        range: true,
      });
      model.setRightValue(100);

      expect(model.rightValue).toBe(100);
    });

    it('set up right value = max, if user is trying to set right value > max', () => {
      const model = new Model({
        max: 100,
        range: true,
      });
      model.setRightValue(101);

      expect(model.rightValue).toBe(100);
    });

    it('set up right value = left value, if user is trying to set right value < left value', () => {
      const model = new Model({
        leftValue: 30,
        range: true,
      });
      model.setRightValue(29);

      expect(model.rightValue).toBe(30);
    });
  });
});
