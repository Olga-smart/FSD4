import {Thumb} from './thumb';
import {View} from '../../view';

describe('Thumb', function() {

  describe('constructor(type)', function() {

    describe('set up necessary properties', function() {

      it('set up view property', function() {
        let thumb = new Thumb();
        expect(thumb).toHaveProperty('view');
      });
  
      describe('set up type property', function() {
    
        it('type = left by default', function() {
          let thumb = new Thumb();
          expect(thumb.type).toBe('left');
        });
    
        it('type = right if the argument is "right"', function() {
          let thumb = new Thumb('right');
          expect(thumb.type).toBe('right');
        });
  
        it('type = leftt if the argument is "left"', function() {
          let thumb = new Thumb('left');
          expect(thumb.type).toBe('left');
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
  
        it('component property is div element', function() {
          let thumb = new Thumb();
          expect(thumb.component).toBeInstanceOf(HTMLDivElement);
        });
  
      });

    });

    it('attach event handlers', function() {
      jest.spyOn(Thumb.prototype, 'attachEventHandlers');
      let thumb = new Thumb();

      expect(thumb.attachEventHandlers).toBeCalled();

      jest.restoreAllMocks();
    });

  });

  describe('registerWith(view)', function() {

    let thumb = new Thumb();
    let view: any = {};
    thumb.registerWith(view);

    it('set up view', function() {
      expect(thumb.view).toBe(view);
    });

  });

  describe('setLeftIndentInPx(px)', function() {

    let thumb = new Thumb();

    it('set up left property of component', function() {
      for (let i = 0; i <=100; i++) {
        thumb.setLeftIndentInPx(i);
        expect(thumb.component.style.left).toBe(`${i}px`);
      }
    });

  });

  describe('setTopIndentInPx(px)', function() {

    let thumb = new Thumb();

    it('set up top property of component', function() {
      for (let i = 0; i <=100; i++) {
        thumb.setTopIndentInPx(i);
        expect(thumb.component.style.top).toBe(`${i}px`);
      }
    });

  });

  describe('getLeftIndent()', function() {

    let thumb = new Thumb();

    it('return left property of component', function() {
      for (let i = 0; i <= 100; i++) {
        thumb.setLeftIndentInPx(i);
        let indent = thumb.getLeftIndent();
        expect(indent).toBe(`${i}px`);
      }      
    });  

  });

  describe('getTopIndent()', function() {

    let thumb = new Thumb();

    it('return top property of component', function() {
      for (let i = 0; i <= 100; i++) {
        thumb.setTopIndentInPx(i);
        let indent = thumb.getTopIndent();
        expect(indent).toBe(`${i}px`);
      }      
    });  

  });

  describe('setZIndex(value)', function() {

    let thumb = new Thumb();

    it('change z-index of component', function() {
      for (let i = 0; i <= 100; i++) {
        thumb.setZIndex(i);
        expect(thumb.component.style.zIndex).toBe(`${i}`);
      }
    });

  });

  describe('getBoundingClientRect()', function() {

    let thumb = new Thumb();
    let coords = thumb.getBoundingClientRect();

    it('return component coordinates', function() {
      expect(coords).toEqual(thumb.component.getBoundingClientRect());
    });

  });

  describe('attachEventHandlers()', function() {

    let thumb = new Thumb();
    let view: any = {};
    thumb.registerWith(view);

    it('handle pointerover', function() {
      let event = new Event('pointerover');
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).toContain('range-slider__thumb_hover');
    });

    it('handle pointerout', function() {
      let event = new Event('pointerout');
      thumb.component.classList.add('range-slider__thumb_hover');
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).not.toContain('range-slider__thumb_hover');
    });

    it('handle pointerdown', function() {
      let event = new Event('pointerdown');
      thumb.component.setPointerCapture = jest.fn();
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).toContain('range-slider__thumb_active');
    });

    it('handle pointerup', function() {
      let event = new Event('pointerup');
      thumb.component.classList.add('range-slider__thumb_active');
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).not.toContain('range-slider__thumb_active');
    });

    describe('handle dragging', function() {

      it('call handler for left input if thumb type is left', function() {
        let thumb = new Thumb('left');
        let view: any = {};
        thumb.registerWith(view);
        thumb.view!.handleLeftInput = jest.fn();
        thumb.component.setPointerCapture = jest.fn();

        thumb.component.dispatchEvent(new Event('pointerdown'));
        thumb.component.dispatchEvent(new Event('pointermove'));
  
        expect(thumb.view!.handleLeftInput).toBeCalled();
      });

      it('call handler for right input if thumb type is right', function() {
        let thumb = new Thumb('right');
        let view: any = {};
        thumb.registerWith(view);
        thumb.view!.handleRightInput = jest.fn();
        thumb.component.setPointerCapture = jest.fn();

        thumb.component.dispatchEvent(new Event('pointerdown'));
        thumb.component.dispatchEvent(new Event('pointermove'));
  
        expect(thumb.view!.handleRightInput).toBeCalled();
      });

      it('nothing happens if view is not registered', function() {
        let thumb = new Thumb('left');
        thumb.component.setPointerCapture = jest.fn();
        jest.spyOn(View.prototype, 'handleLeftInput');

        thumb.component.dispatchEvent(new Event('pointerdown'));
        thumb.component.dispatchEvent(new Event('pointermove'));
  
        expect(View.prototype.handleLeftInput).not.toBeCalled();

        
        thumb = new Thumb('right');
        thumb.component.setPointerCapture = jest.fn();
        jest.spyOn(View.prototype, 'handleRightInput');

        thumb.component.dispatchEvent(new Event('pointerdown'));
        thumb.component.dispatchEvent(new Event('pointermove'));
  
        expect(View.prototype.handleRightInput).not.toBeCalled();
      });
      
    });

  });

});