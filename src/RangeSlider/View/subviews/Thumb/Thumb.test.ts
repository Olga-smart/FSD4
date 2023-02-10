import Thumb from './Thumb';

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

  describe('getLeftIndent()', () => {
    const thumb = new Thumb();

    it('return left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setIndent('left', i);
        expect(thumb.getLeftIndent()).toBe(`${i}%`);
      }
    });
  });

  describe('getTopIndent()', () => {
    const thumb = new Thumb();

    it('return top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        thumb.setIndent('top', i);
        expect(thumb.getTopIndent()).toBe(`${i}%`);
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

  describe('handle events', () => {
    const thumb = new Thumb();

    afterAll(() => {
      jest.restoreAllMocks();
    });

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

    describe('handle pointermove', () => {
      const downEvent = new MouseEvent('pointerdown', {
        clientX: 0,
        clientY: 0,
      });
      const moveEvent = new MouseEvent('pointermove', {
        clientX: 100,
        clientY: 100,
      });

      Element.prototype.setPointerCapture = jest.fn();
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        toJSON() { return undefined; },
      }));

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();

      it('if thumb is left', () => {
        thumb.subscribe(subscriber);

        thumb.getComponent().dispatchEvent(downEvent);
        thumb.getComponent().dispatchEvent(moveEvent);

        expect(subscriber.inform).toBeCalledWith('leftThumbChangePosition', [100, 100]);
      });

      it('if thumb is right', () => {
        const newThumb = new Thumb('right');
        newThumb.subscribe(subscriber);

        newThumb.getComponent().dispatchEvent(downEvent);
        newThumb.getComponent().dispatchEvent(moveEvent);

        expect(subscriber.inform).toBeCalledWith('rightThumbChangePosition', [100, 100]);
      });
    });

    it('handle pointerup', () => {
      const event = new Event('pointerup');
      thumb.getComponent().classList.add('range-slider__thumb_active');
      thumb.getComponent().dispatchEvent(event);

      expect(thumb.getComponent().classList).not.toContain('range-slider__thumb_active');
    });
  });
});
