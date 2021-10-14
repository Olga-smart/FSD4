import { MinMaxLabel } from './minMaxLabel';
import { Label } from '../label/label';

describe('MinMaxLabel', () => {
  describe('constructor(type)', () => {
    describe('set up component property with necessary classes', () => {
      it('set up common class', () => {
        const label = new MinMaxLabel();
        expect(label.component.classList).toContain('range-slider__min-max-label');
      });

      it('set up class for left label if argument "type" == "left" or by default', () => {
        let label = new MinMaxLabel();
        expect(label.component.classList).toContain('range-slider__min-max-label_left');

        label = new MinMaxLabel('left');
        expect(label.component.classList).toContain('range-slider__min-max-label_left');
      });

      it('set up js-class for left label if argument "type" == "left" or by default', () => {
        let label = new MinMaxLabel();
        expect(label.component.classList).toContain('js-range-slider__min-max-label_left');

        label = new MinMaxLabel('left');
        expect(label.component.classList).toContain('js-range-slider__min-max-label_left');
      });

      it('set up class for right label if argument "type" == "right"', () => {
        const label = new MinMaxLabel('right');
        expect(label.component.classList).toContain('range-slider__min-max-label_right');
      });

      it('set up js-class for right label if argument "type" == "right"', () => {
        const label = new MinMaxLabel('right');
        expect(label.component.classList).toContain('js-range-slider__min-max-label_right');
      });

      it('component property is div element', () => {
        const label = new MinMaxLabel();
        expect(label.component).toBeInstanceOf(HTMLDivElement);
      });
    });

    describe('inherit from Label', () => {
      const label = new MinMaxLabel();

      it('is instance of Label', () => {
        expect(label).toBeInstanceOf(Label);
      });

      describe('has parent properties', () => {
        it('has type property', () => {
          expect(label).toHaveProperty('type');
        });
      });

      describe('has parent methods', () => {
        it('has setOpacity() method', () => {
          expect(label).toHaveProperty('setOpacity');
        });

        it('has setValue() method', () => {
          expect(label).toHaveProperty('setValue');
        });

        it('has getValue() method', () => {
          expect(label).toHaveProperty('getValue');
        });

        it('has getBoundingClientRect() method', () => {
          expect(label).toHaveProperty('getBoundingClientRect');
        });

        it('has getOffsetWidth() method', () => {
          expect(label).toHaveProperty('getOffsetWidth');
        });

        it('has getOffsetHeight() method', () => {
          expect(label).toHaveProperty('getOffsetHeight');
        });
      });
    });
  });
});
