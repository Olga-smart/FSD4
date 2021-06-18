import {Range} from "./range.js";

describe('Range', function() {

  describe('constructor()', function() {

    describe('set up component property with necessary classes', function() {

      let range = new Range();

      it('common class', function() {        
        expect(range.component.classList).toContain('range-slider__range');
      });

      it('js-class', function() {
        expect(range.component.classList).toContain('js-range-slider__range');
      });

    });

  });

  describe('setLeftIndent(percent)', function() {

    let range = new Range();
    range.setLeftIndent(20);

    it('set up left property of component', function() {
      expect(range.component.style.left).toBe('20%');
    });

  });

  describe('setRightIndent(percent)', function() {

    let range = new Range();
    range.setRightIndent(20);

    it('set up right property of component', function() {
      expect(range.component.style.right).toBe('20%');
    });

  });

});