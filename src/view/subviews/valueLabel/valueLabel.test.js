import { experiments } from "webpack";
import {ValueLabel} from "./valueLabel.js";

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

    });

  });

  describe('setLeftIndent(value)', function () {
    
    let valueLabel = new ValueLabel();
    valueLabel.setLeftIndent('20%');

    it('set up left property of component', function() {
      expect(valueLabel.component.style.left). toBe('20%');
    });

  });

  describe('getLeftIndent()', function() {

    let valueLabel = new ValueLabel();
    valueLabel.setLeftIndent('20%');
    let indent = valueLabel.getLeftIndent();

    it('return left property of component', function() {
      expect(indent).toBe('20%');
    });    

  });

  describe('setRightIndent(value)', function () {
    
    let valueLabel = new ValueLabel();
    valueLabel.setRightIndent('20%');

    it('set up right property of component', function() {
      expect(valueLabel.component.style.right).toBe('20%');
    });

  });

  describe('getRightIndent()', function() {

    let valueLabel = new ValueLabel();
    valueLabel.setRightIndent('20%');
    let indent = valueLabel.getRightIndent();

    it('return right property of component', function() {
      expect(indent).toBe('20%');
    });    

  });

});