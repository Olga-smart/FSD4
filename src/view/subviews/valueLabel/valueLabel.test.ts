import ValueLabel from './ValueLabel';
import Label from '../Label/Label';

describe('ValueLabel', () => {
  describe('constructor(type)', () => {
    describe('set up component property with necessary classes', () => {
      it('set up common class', () => {
        const valueLabel = new ValueLabel();
        expect(valueLabel.getComponent().classList).toContain('range-slider__value-label');
      });

      it('set up class for left label if argument "type" == "left" or by default', () => {
        let valueLabel = new ValueLabel();
        expect(valueLabel.getComponent().classList).toContain('range-slider__value-label_left');

        valueLabel = new ValueLabel('left');
        expect(valueLabel.getComponent().classList).toContain('range-slider__value-label_left');
      });

      it('set up class for right label if argument "type" == "right"', () => {
        const valueLabel = new ValueLabel('right');
        expect(valueLabel.getComponent().classList).toContain('range-slider__value-label_right');
      });

      it('component property is div element', () => {
        const valueLabel = new ValueLabel();
        expect(valueLabel.getComponent()).toBeInstanceOf(HTMLDivElement);
      });
    });

    it('inherit from Label', () => {
      const label = new ValueLabel();

      expect(label).toBeInstanceOf(Label);
    });
  });

  describe('getLeftIndent()', () => {
    const valueLabel = new ValueLabel();

    it('return left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        valueLabel.getComponent().style.left = `${i}px`;
        expect(valueLabel.getLeftIndent()).toBe(`${i}px`);
      }
    });
  });

  describe('getTopIndent()', () => {
    const valueLabel = new ValueLabel();

    it('return top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        valueLabel.getComponent().style.top = `${i}px`;
        expect(valueLabel.getTopIndent()).toBe(`${i}px`);
      }
    });
  });
});
