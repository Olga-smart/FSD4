import {ValueLabel} from "./valueLabel";
import {Label} from '../label/label';

describe('ValueLabel', function() {

  describe('constructor(type)', function() {

    describe('set up component property with necessary classes', function() {

      it('set up common class', function() {
        let valueLabel = new ValueLabel();
        expect(valueLabel.component.classList).toContain('range-slider__value-label');
      });

      it('set up class for left label if argument "type" == "left" or by default', function() {
        let valueLabel = new ValueLabel();
        expect(valueLabel.component.classList).toContain('range-slider__value-label_left');

        valueLabel = new ValueLabel('left');
        expect(valueLabel.component.classList).toContain('range-slider__value-label_left');
      });

      it('set up js-class for left label if argument "type" == "left" or by default', function() {
        let valueLabel = new ValueLabel();
        expect(valueLabel.component.classList).toContain('js-range-slider__value-label_left');

        valueLabel = new ValueLabel('left');
        expect(valueLabel.component.classList).toContain('js-range-slider__value-label_left');
      }); 

      it('set up class for right label if argument "type" == "right"', function() {
        let valueLabel = new ValueLabel('right');
        expect(valueLabel.component.classList).toContain('range-slider__value-label_right');
      });

      it('set up js-class for right label if argument "type" == "right"', function() {
        let valueLabel = new ValueLabel('right');
        expect(valueLabel.component.classList).toContain('js-range-slider__value-label_right');
      });

      it('component property is div element', function() {
        let valueLabel = new ValueLabel();
        expect(valueLabel.component).toBeInstanceOf(HTMLDivElement);
      });

    });

    describe('inherit from Label', function() {

        let label = new ValueLabel();

        it('is instance of Label', function() {
          expect(label).toBeInstanceOf(Label);
        });

        describe('has parent properties', function() {

          it('has type property', function() {
            expect(label).toHaveProperty('type');
          });

        });

        describe('has parent methods', function() {

          it('has setOpacity() method', function() {
            expect(label).toHaveProperty('setOpacity');
          });

          it('has setValue() method', function() {
            expect(label).toHaveProperty('setValue');
          });

          it('has getValue() method', function() {
            expect(label).toHaveProperty('getValue');
          });

          it('has getBoundingClientRect() method', function() {
            expect(label).toHaveProperty('getBoundingClientRect');
          });

          it('has getOffsetWidth() method', function() {
            expect(label).toHaveProperty('getOffsetWidth');
          });

          it('has getOffsetHeight() method', function() {
            expect(label).toHaveProperty('getOffsetHeight');
          });

        });

    });

  });

  describe('setLeftIndent(value)', function () {
    
    let valueLabel = new ValueLabel();

    it('set up left property of component', function() {
      for (let i = 0; i <= 100; i++) {
        valueLabel.setLeftIndent(`${i}px`);
        expect(valueLabel.component.style.left).toBe(`${i}px`);
      }
    });

  });

  describe('getLeftIndent()', function() {

    let valueLabel = new ValueLabel();

    it('return left property of component', function() {
      for (let i = 0; i <= 100; i++) {
        valueLabel.component.style.left = `${i}px`;
        expect(valueLabel.getLeftIndent()).toBe(`${i}px`);
      }
    });    

  });

  describe('setTopIndent(value)', function () {
    
    let valueLabel = new ValueLabel();

    it('set up top property of component', function() {
      for (let i = 0; i <= 100; i++) {
        valueLabel.setTopIndent(`${i}px`);
        expect(valueLabel.component.style.top).toBe(`${i}px`);
      }
    });

  });

  describe('getTopIndent()', function() {

    let valueLabel = new ValueLabel();

    it('return top property of component', function() {
      for (let i = 0; i <= 100; i++) {
        valueLabel.component.style.top = `${i}px`;
        expect(valueLabel.getTopIndent()).toBe(`${i}px`);
      }
    });    

  });

});