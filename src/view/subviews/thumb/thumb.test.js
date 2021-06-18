import {Thumb} from "./thumb.js";

describe('Thumb', function() {

  describe('constructor(type)', function() {

    describe('set up type property', function() {

      let thumb = new Thumb();
  
      it('type = left by default', function() {
        let thumb = new Thumb();
        expect(thumb.type).toBe('left');
      });
  
      it('type = right if the argument is "right"', function() {
        let thumb = new Thumb('right');
        expect(thumb.type).toBe('right');
      });

    });    

    describe('set up component property with necessary classes', function() {

      it('common class', function() {
        let thumb = new Thumb();
        expect(thumb.component.classList).toContain('range-slider__thumb');
      });

      it('class for left thumb if argument "type" == "left" or by default', function() {
        let thumb = new Thumb();
        expect(thumb.component.classList).toContain('range-slider__thumb_left');

        thumb = new Thumb('left');
        expect(thumb.component.classList).toContain('range-slider__thumb_left');
      });

      it('js-class for left thumb if argument "type" == "left" or by default', function() {
        let thumb = new Thumb();
        expect(thumb.component.classList).toContain('js-range-slider__thumb_left');

        thumb = new Thumb('left');
        expect(thumb.component.classList).toContain('js-range-slider__thumb_left');
      }); 

      it('class for right thumb if argument "type" == "right"', function() {
        let thumb = new Thumb('right');
        expect(thumb.component.classList).toContain('range-slider__thumb_right');
      });

      it('js-class for right thumb if argument "type" == "right"', function() {
        let thumb = new Thumb('right');
        expect(thumb.component.classList).toContain('js-range-slider__thumb_right');
      });

    });

  });

  describe('addHover()', function() {

    let thumb = new Thumb();
    thumb.addHover();

    it('add class for hover styling', function() {
      expect(thumb.component.classList).toContain('range-slider__thumb_hover');
    });

  });

  describe('removeHover()', function() {

    let thumb = new Thumb();
    thumb.addHover();
    thumb.removeHover();

    it('remove class for hover styling', function() {
      expect(thumb.component.classList).not.toContain('range-slider__thumb_hover');
    });

  });

  describe('makeActive()', function() {

    let thumb = new Thumb();
    thumb.makeActive();

    it('add class for active styling', function() {
      expect(thumb.component.classList).toContain('range-slider__thumb_active');
    });

  });

  describe('makeInactive()', function() {

    let thumb = new Thumb();
    thumb.makeActive();
    thumb.makeInactive();

    it('remove class for active styling', function() {
      expect(thumb.component.classList).not.toContain('range-slider__thumb_active');
    });

  });

  describe('setLeftIndent(percent)', function() {

    let thumb = new Thumb();
    thumb.setLeftIndent(20);

    it('set up left property of component', function() {
      expect(thumb.component.style.left).toBe('20%');
    });

  });

  describe('setRightIndent(percent)', function() {

    let thumb = new Thumb();
    thumb.setRightIndent(20);

    it('set up right property of component', function() {
      expect(thumb.component.style.right). toBe('20%');
    });

  });

  describe('getLeftIndent()', function() {

    let thumb = new Thumb();

    it('return left property of component', function() {
      for (let i = 0; i <= 100; i++) {
        thumb.setLeftIndent(i);
        let indent = thumb.getLeftIndent();
        expect(indent).toBe(i + '%');
      }
      
    });  

  });

  describe('getRightIndent()', function() {

    let thumb = new Thumb();

    it('return right property of component', function() {
      for (let i = 0; i <= 100; i++) {
        thumb.setRightIndent(i);
        let indent = thumb.getRightIndent();
        expect(indent).toBe(i + '%');
      }
      
    });  

  });

  describe('getBoundingClientRect()', function() {

    let thumb = new Thumb();
    let coords = thumb.getBoundingClientRect();

    it('return component coordinates', function() {
      expect(coords).toHaveProperty('top');
      expect(coords).toHaveProperty('right');
      expect(coords).toHaveProperty('bottom');
      expect(coords).toHaveProperty('left');
    });

  });

});