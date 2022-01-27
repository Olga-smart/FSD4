import Thumb from './Thumb';
import View from '../../View';

describe('Thumb', () => {
  describe('constructor(type)', () => {
    describe('set up component property with necessary classes', () => {
      it('common class', () => {
        const thumb = new Thumb();
        expect(thumb.getComponent().classList).toContain('range-slider__thumb');
      });

      it('class for left thumb if argument "type" == "left" or by default', () => {
        let thumb = new Thumb();
        expect(thumb.getComponent().classList).toContain('range-slider__thumb_left');

        thumb = new Thumb('left');
        expect(thumb.getComponent().classList).toContain('range-slider__thumb_left');
      });

      it('class for right thumb if argument "type" == "right"', () => {
        const thumb = new Thumb('right');
        expect(thumb.getComponent().classList).toContain('range-slider__thumb_right');
      });

      it('component property is div element', () => {
        const thumb = new Thumb();
        expect(thumb.getComponent()).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('setLeftIndent(percent)', () => {
    const thumb = new Thumb();

    it('set up left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setLeftIndent(i);
        expect(thumb.getComponent().style.left).toBe(`${i}%`);
      }
    });
  });

  describe('setTopIndent(percent)', () => {
    const thumb = new Thumb();

    it('set up top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setTopIndent(i);
        expect(thumb.getComponent().style.top).toBe(`${i}%`);
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
        expect(thumb.getComponent().style.zIndex).toBe(`${i}`);
      }
    });
  });

  describe('getBoundingClientRect()', () => {
    const thumb = new Thumb();
    const coords = thumb.getBoundingClientRect();

    it('return component coordinates', () => {
      expect(coords).toEqual(thumb.getComponent().getBoundingClientRect());
    });
  });

  describe('handle events', () => {
    const thumb = new Thumb();
    const view: any = {};
    thumb.registerWith(view);

    it('handle pointerover', () => {
      const event = new Event('pointerover');
      thumb.getComponent().dispatchEvent(event);

      expect(thumb.getComponent().classList).toContain('range-slider__thumb_hover');
    });

    it('handle pointerout', () => {
      const event = new Event('pointerout');
      thumb.getComponent().classList.add('range-slider__thumb_hover');
      thumb.getComponent().dispatchEvent(event);

      expect(thumb.getComponent().classList).not.toContain('range-slider__thumb_hover');
    });

    it('handle pointerdown', () => {
      const event = new Event('pointerdown');
      thumb.getComponent().setPointerCapture = jest.fn();
      thumb.getComponent().dispatchEvent(event);

      expect(thumb.getComponent().classList).toContain('range-slider__thumb_active');
    });

    it('handle pointerup', () => {
      const event = new Event('pointerup');
      thumb.getComponent().classList.add('range-slider__thumb_active');
      thumb.getComponent().dispatchEvent(event);

      expect(thumb.getComponent().classList).not.toContain('range-slider__thumb_active');
    });

    describe('handle dragging', () => {
      it('call handler for left input if thumb type is left', () => {
        const newThumb = new Thumb('left');
        const newView: any = {};
        newThumb.registerWith(newView);
        newView.handleLeftInput = jest.fn();
        newThumb.getComponent().setPointerCapture = jest.fn();

        newThumb.getComponent().dispatchEvent(new Event('pointerdown'));
        newThumb.getComponent().dispatchEvent(new Event('pointermove'));

        expect(newView.handleLeftInput).toBeCalled();
      });

      it('call handler for right input if thumb type is right', () => {
        const newThumb = new Thumb('right');
        const newView: any = {};
        newThumb.registerWith(newView);
        newView.handleRightInput = jest.fn();
        newThumb.getComponent().setPointerCapture = jest.fn();

        newThumb.getComponent().dispatchEvent(new Event('pointerdown'));
        newThumb.getComponent().dispatchEvent(new Event('pointermove'));

        expect(newView.handleRightInput).toBeCalled();
      });

      it('nothing happens if view is not registered', () => {
        let newThumb = new Thumb('left');
        newThumb.getComponent().setPointerCapture = jest.fn();
        jest.spyOn(View.prototype, 'handleLeftInput');

        newThumb.getComponent().dispatchEvent(new Event('pointerdown'));
        newThumb.getComponent().dispatchEvent(new Event('pointermove'));

        expect(View.prototype.handleLeftInput).not.toBeCalled();

        newThumb = new Thumb('right');
        newThumb.getComponent().setPointerCapture = jest.fn();
        jest.spyOn(View.prototype, 'handleRightInput');

        newThumb.getComponent().dispatchEvent(new Event('pointerdown'));
        newThumb.getComponent().dispatchEvent(new Event('pointermove'));

        expect(View.prototype.handleRightInput).not.toBeCalled();
      });
    });
  });
});
