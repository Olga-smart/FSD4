import {MinMaxLabel} from './minMaxLabel.js';

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

    });

  });

  describe('fixPositionForVertical()', function() {

    describe('apply necessary transformation', function() {

      it('if this.type == left or by default', function() {
        let label = new MinMaxLabel();
        label.fixPositionForVertical();

        expect(label.component.style.transform).toStrictEqual(expect.stringContaining('rotate(90deg) translateX'));

        label = new MinMaxLabel('left');
        label.fixPositionForVertical();

        expect(label.component.style.transform).toStrictEqual(expect.stringContaining('rotate(90deg) translateX'));
      });

      it('if this.type == right', function() {
        let label = new MinMaxLabel('right');
        label.fixPositionForVertical();

        expect(label.component.style.transform).toStrictEqual(expect.stringContaining('rotate(90deg) translateX'));
      })

    });

  });

});