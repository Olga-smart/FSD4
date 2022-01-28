import MinMaxLabel from './MinMaxLabel';
import Label from '../Label/Label';

describe('MinMaxLabel', () => {
  describe('constructor(type)', () => {
    describe('set up component property with necessary classes', () => {
      it('set up common class', () => {
        const label = new MinMaxLabel();
        expect(label.getComponent().classList).toContain('range-slider__min-max-label');
      });

      it('set up class for left label if argument "type" == "left" or by default', () => {
        let label = new MinMaxLabel();
        expect(label.getComponent().classList).toContain('range-slider__min-max-label_left');

        label = new MinMaxLabel('left');
        expect(label.getComponent().classList).toContain('range-slider__min-max-label_left');
      });

      it('set up class for right label if argument "type" == "right"', () => {
        const label = new MinMaxLabel('right');
        expect(label.getComponent().classList).toContain('range-slider__min-max-label_right');
      });

      it('component property is div element', () => {
        const label = new MinMaxLabel();
        expect(label.getComponent()).toBeInstanceOf(HTMLDivElement);
      });
    });

    it('inherit from Label', () => {
      const label = new MinMaxLabel();

      expect(label).toBeInstanceOf(Label);
    });
  });
});
