import Thumb from './thumb';
import View from '../../view';

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

        it('type = left if the argument is "left"', () => {
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

        it('class for right thumb if argument "type" == "right"', () => {
          const thumb = new Thumb('right');
          expect(thumb.component.classList).toContain('range-slider__thumb_right');
        });

        it('component property is div element', () => {
          const thumb = new Thumb();
          expect(thumb.component).toBeInstanceOf(HTMLDivElement);
        });
      });
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

  describe('setLeftIndent(percent)', () => {
    const thumb = new Thumb();

    it('set up left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setLeftIndent(i);
        expect(thumb.component.style.left).toBe(`${i}%`);
      }
    });
  });

  describe('setTopIndent(percent)', () => {
    const thumb = new Thumb();

    it('set up top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setTopIndent(i);
        expect(thumb.component.style.top).toBe(`${i}%`);
      }
    });
  });

  describe('getLeftIndent()', () => {
    const thumb = new Thumb();

    it('return left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setLeftIndent(i);
        const indent = thumb.getLeftIndent();
        expect(indent).toBe(`${i}%`);
      }
    });
  });

  describe('getTopIndent()', () => {
    const thumb = new Thumb();

    it('return top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setTopIndent(i);
        const indent = thumb.getTopIndent();
        expect(indent).toBe(`${i}%`);
      }
    });
  });

  describe('setZIndex(value)', () => {
    const thumb = new Thumb();

    it('change z-index of component', () => {
      for (let i = 0; i <= 100; i += 1) {
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

  describe('handle events', () => {
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
        const newThumb = new Thumb('left');
        const newView: any = {};
        newThumb.registerWith(newView);
        newThumb.view!.handleLeftInput = jest.fn();
        newThumb.component.setPointerCapture = jest.fn();

        newThumb.component.dispatchEvent(new Event('pointerdown'));
        newThumb.component.dispatchEvent(new Event('pointermove'));

        expect(newThumb.view!.handleLeftInput).toBeCalled();
      });

      it('call handler for right input if thumb type is right', () => {
        const newThumb = new Thumb('right');
        const newView: any = {};
        newThumb.registerWith(newView);
        newThumb.view!.handleRightInput = jest.fn();
        newThumb.component.setPointerCapture = jest.fn();

        newThumb.component.dispatchEvent(new Event('pointerdown'));
        newThumb.component.dispatchEvent(new Event('pointermove'));

        expect(newThumb.view!.handleRightInput).toBeCalled();
      });

      it('nothing happens if view is not registered', () => {
        let newThumb = new Thumb('left');
        newThumb.component.setPointerCapture = jest.fn();
        jest.spyOn(View.prototype, 'handleLeftInput');

        newThumb.component.dispatchEvent(new Event('pointerdown'));
        newThumb.component.dispatchEvent(new Event('pointermove'));

        expect(View.prototype.handleLeftInput).not.toBeCalled();

        newThumb = new Thumb('right');
        newThumb.component.setPointerCapture = jest.fn();
        jest.spyOn(View.prototype, 'handleRightInput');

        newThumb.component.dispatchEvent(new Event('pointerdown'));
        newThumb.component.dispatchEvent(new Event('pointermove'));

        expect(View.prototype.handleRightInput).not.toBeCalled();
      });
    });
  });
});
