import {MinMaxLabel} from './minMaxLabel';
import {Label} from '../label/label';

describe('MinMaxLabel', function() {

  describe('constructor(type)', function() {

    describe('set up component property with necessary classes', function() {

      it('set up common class', function() {
        let label = new MinMaxLabel();
        expect(label.component.classList).toContain('range-slider__min-max-label');
      });

      it('set up class for left label if argument "type" == "left" or by default', function() {
        let label = new MinMaxLabel();
        expect(label.component.classList).toContain('range-slider__min-max-label_left');

        label = new MinMaxLabel('left');
        expect(label.component.classList).toContain('range-slider__min-max-label_left');
      });

      it('set up js-class for left label if argument "type" == "left" or by default', function() {
        let label = new MinMaxLabel();
        expect(label.component.classList).toContain('js-range-slider__min-max-label_left');

        label = new MinMaxLabel('left');
        expect(label.component.classList).toContain('js-range-slider__min-max-label_left');
      }); 

      it('set up class for right label if argument "type" == "right"', function() {
        let label = new MinMaxLabel('right');
        expect(label.component.classList).toContain('range-slider__min-max-label_right');
      });

      it('set up js-class for right label if argument "type" == "right"', function() {
        let label = new MinMaxLabel('right');
        expect(label.component.classList).toContain('js-range-slider__min-max-label_right');
      });

      it('component property is div element', function() {
        let label = new MinMaxLabel();
        expect(label.component).toBeInstanceOf(HTMLDivElement);
      });

    });    

    describe('inherit from Label', function() {

        let label = new MinMaxLabel();

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

});