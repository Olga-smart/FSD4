import {Range} from "./range";

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

      it('component property is div element', function() {
        expect(range.component).toBeInstanceOf(HTMLDivElement);
      });

    });    

  });

  describe('setLeftIndentInPx(px)', function() {

    let range = new Range();

    it('set up left property of component', function() {
      for (let i = 0; i <=100; i++) {
        range.setLeftIndentInPx(i);
        expect(range.component.style.left).toBe(`${i}px`);
      }
    });

  });

  describe('setRightIndentInPx(px)', function() {

    let range = new Range();

    it('set up right property of component', function() {
      for (let i = 0; i <=100; i++) {
        range.setRightIndentInPx(i);
        expect(range.component.style.right).toBe(`${i}px`);
      }
    });

  });

  describe('setTopIndentInPx(px)', function() {

    let range = new Range();

    it('set up top property of component', function() {
      for (let i = 0; i <=100; i++) {
        range.setTopIndentInPx(i);
        expect(range.component.style.top).toBe(`${i}px`);
      }
    });

  });

  describe('setBottomIndentInPx(px)', function() {

    let range = new Range();

    it('set up bottom property of component', function() {
      for (let i = 0; i <=100; i++) {
        range.setBottomIndentInPx(i);
        expect(range.component.style.bottom).toBe(`${i}px`);
      }
    });

  });

  describe('setWidthInPx(px)', function() {

    let range = new Range();

    it('set up width property of component', function() {
      for (let i = 0; i <=100; i++) {
        range.setWidthInPx(i);
        expect(range.component.style.width).toBe(`${i}px`);
      }
    });

  });

  describe('setHeightInPx(px)', function() {

    let range = new Range();

    it('set up height property of component', function() {
      for (let i = 0; i <=100; i++) {
        range.setHeightInPx(i);
        expect(range.component.style.height).toBe(`${i}px`);
      }
    });

  });

});