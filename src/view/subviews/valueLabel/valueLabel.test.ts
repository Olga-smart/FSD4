import ValueLabel from './ValueLabel';
import Label from '../Label/Label';

describe('ValueLabel', () => {
  describe('constructor(type)', () => {
    describe('set up component property with necessary classes', () => {
      it('set up common class', () => {
        const valueLabel = new ValueLabel();
        expect(valueLabel.component.classList).toContain('range-slider__value-label');
      });

      it('set up class for left label if argument "type" == "left" or by default', () => {
        let valueLabel = new ValueLabel();
        expect(valueLabel.component.classList).toContain('range-slider__value-label_left');

        valueLabel = new ValueLabel('left');
        expect(valueLabel.component.classList).toContain('range-slider__value-label_left');
      });

      it('set up class for right label if argument "type" == "right"', () => {
        const valueLabel = new ValueLabel('right');
        expect(valueLabel.component.classList).toContain('range-slider__value-label_right');
      });

      it('component property is div element', () => {
        const valueLabel = new ValueLabel();
        expect(valueLabel.component).toBeInstanceOf(HTMLDivElement);
      });
    });

    describe('inherit from Label', () => {
      const label = new ValueLabel();

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

  describe('setLeftIndent(value)', () => {
    const valueLabel = new ValueLabel();

    it('set up left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        valueLabel.setLeftIndent(`${i}px`);
        expect(valueLabel.component.style.left).toBe(`${i}px`);
      }
    });
  });

  describe('getLeftIndent()', () => {
    const valueLabel = new ValueLabel();

    it('return left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        valueLabel.component.style.left = `${i}px`;
        expect(valueLabel.getLeftIndent()).toBe(`${i}px`);
      }
    });
  });

  describe('setTopIndent(value)', () => {
    const valueLabel = new ValueLabel();

    it('set up top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        valueLabel.setTopIndent(`${i}px`);
        expect(valueLabel.component.style.top).toBe(`${i}px`);
      }
    });
  });

  describe('getTopIndent()', () => {
    const valueLabel = new ValueLabel();

    it('return top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        valueLabel.component.style.top = `${i}px`;
        expect(valueLabel.getTopIndent()).toBe(`${i}px`);
      }
    });
  });
});
