import { Thumb } from './thumb';
import { View } from '../../view';

describe('Thumb', () => {
  describe('constructor(type)', () => {
    describe('set up necessary properties', () => {
      it('set up view property', () => {
        const thumb = new Thumb();
        expect(thumb).toHaveProperty('view');
      });

      describe('set up type property', () => {
        it('type = left by default', () => {
          const thumb = new Thumb();
          expect(thumb.type).toBe('left');
        });

        it('type = right if the argument is "right"', () => {
          const thumb = new Thumb('right');
          expect(thumb.type).toBe('right');
        });

        it('type = leftt if the argument is "left"', () => {
          const thumb = new Thumb('left');
          expect(thumb.type).toBe('left');
        });
      });

      describe('set up component property with necessary classes', () => {
        it('common class', () => {
          const thumb = new Thumb();
          expect(thumb.component.classList).toContain('range-slider__thumb');
        });

        it('class for left thumb if argument "type" == "left" or by default', () => {
          let thumb = new Thumb();
          expect(thumb.component.classList).toContain('range-slider__thumb_left');

          thumb = new Thumb('left');
          expect(thumb.component.classList).toContain('range-slider__thumb_left');
        });

        it('js-class for left thumb if argument "type" == "left" or by default', () => {
          let thumb = new Thumb();
          expect(thumb.component.classList).toContain('js-range-slider__thumb_left');

          thumb = new Thumb('left');
          expect(thumb.component.classList).toContain('js-range-slider__thumb_left');
        });

        it('class for right thumb if argument "type" == "right"', () => {
          const thumb = new Thumb('right');
          expect(thumb.component.classList).toContain('range-slider__thumb_right');
        });

        it('js-class for right thumb if argument "type" == "right"', () => {
          const thumb = new Thumb('right');
          expect(thumb.component.classList).toContain('js-range-slider__thumb_right');
        });

        it('component property is div element', () => {
          const thumb = new Thumb();
          expect(thumb.component).toBeInstanceOf(HTMLDivElement);
        });
      });
    });

    it('attach event handlers', () => {
      jest.spyOn(Thumb.prototype, 'attachEventHandlers');
      const thumb = new Thumb();

      expect(thumb.attachEventHandlers).toBeCalled();

      jest.restoreAllMocks();
    });
  });

  describe('registerWith(view)', () => {
    const thumb = new Thumb();
    const view: any = {};
    thumb.registerWith(view);

    it('set up view', () => {
      expect(thumb.view).toBe(view);
    });
  });

  describe('setLeftIndentInPx(px)', () => {
    const thumb = new Thumb();

    it('set up left property of component', () => {
      for (let i = 0; i <= 100; i++) {
        thumb.setLeftIndentInPx(i);
        expect(thumb.component.style.left).toBe(`${i}px`);
      }
    });
  });

  describe('setTopIndentInPx(px)', () => {
    const thumb = new Thumb();

    it('set up top property of component', () => {
      for (let i = 0; i <= 100; i++) {
        thumb.setTopIndentInPx(i);
        expect(thumb.component.style.top).toBe(`${i}px`);
      }
    });
  });

  describe('getLeftIndent()', () => {
    const thumb = new Thumb();

    it('return left property of component', () => {
      for (let i = 0; i <= 100; i++) {
        thumb.setLeftIndentInPx(i);
        const indent = thumb.getLeftIndent();
        expect(indent).toBe(`${i}px`);
      }
    });
  });

  describe('getTopIndent()', () => {
    const thumb = new Thumb();

    it('return top property of component', () => {
      for (let i = 0; i <= 100; i++) {
        thumb.setTopIndentInPx(i);
        const indent = thumb.getTopIndent();
        expect(indent).toBe(`${i}px`);
      }
    });
  });

  describe('setZIndex(value)', () => {
    const thumb = new Thumb();

    it('change z-index of component', () => {
      for (let i = 0; i <= 100; i++) {
        thumb.setZIndex(i);
        expect(thumb.component.style.zIndex).toBe(`${i}`);
      }
    });
  });

  describe('getBoundingClientRect()', () => {
    const thumb = new Thumb();
    const coords = thumb.getBoundingClientRect();

    it('return component coordinates', () => {
      expect(coords).toEqual(thumb.component.getBoundingClientRect());
    });
  });

  describe('attachEventHandlers()', () => {
    const thumb = new Thumb();
    const view: any = {};
    thumb.registerWith(view);

    it('handle pointerover', () => {
      const event = new Event('pointerover');
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).toContain('range-slider__thumb_hover');
    });

    it('handle pointerout', () => {
      const event = new Event('pointerout');
      thumb.component.classList.add('range-slider__thumb_hover');
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).not.toContain('range-slider__thumb_hover');
    });

    it('handle pointerdown', () => {
      const event = new Event('pointerdown');
      thumb.component.setPointerCapture = jest.fn();
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).toContain('range-slider__thumb_active');
    });

    it('handle pointerup', () => {
      const event = new Event('pointerup');
      thumb.component.classList.add('range-slider__thumb_active');
      thumb.component.dispatchEvent(event);

      expect(thumb.component.classList).not.toContain('range-slider__thumb_active');
    });

    describe('handle dragging', () => {
      it('call handler for left input if thumb type is left', () => {
        const thumb = new Thumb('left');
        const view: any = {};
        thumb.registerWith(view);
        thumb.view!.handleLeftInput = jest.fn();
        thumb.component.setPointerCapture = jest.fn();

        thumb.component.dispatchEvent(new Event('pointerdown'));
        thumb.component.dispatchEvent(new Event('pointermove'));

        expect(thumb.view!.handleLeftInput).toBeCalled();
      });

      it('call handler for right input if thumb type is right', () => {
        const thumb = new Thumb('right');
        const view: any = {};
        thumb.registerWith(view);
        thumb.view!.handleRightInput = jest.fn();
        thumb.component.setPointerCapture = jest.fn();

        thumb.component.dispatchEvent(new Event('pointerdown'));
        thumb.component.dispatchEvent(new Event('pointermove'));

        expect(thumb.view!.handleRightInput).toBeCalled();
      });

      it('nothing happens if view is not registered', () => {
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
