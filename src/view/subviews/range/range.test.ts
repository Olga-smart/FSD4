import { Range } from './range';

describe('Range', () => {
  describe('constructor()', () => {
    describe('set up component property with necessary classes', () => {
      const range = new Range();

      it('common class', () => {
        expect(range.component.classList).toContain('range-slider__range');
      });

      it('js-class', () => {
        expect(range.component.classList).toContain('js-range-slider__range');
      });

      it('component property is div element', () => {
        expect(range.component).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('setLeftIndentInPx(px)', () => {
    const range = new Range();

    it('set up left property of component', () => {
      for (let i = 0; i <= 100; i++) {
        range.setLeftIndentInPx(i);
        expect(range.component.style.left).toBe(`${i}px`);
      }
    });
  });

  describe('setRightIndentInPx(px)', () => {
    const range = new Range();

    it('set up right property of component', () => {
      for (let i = 0; i <= 100; i++) {
        range.setRightIndentInPx(i);
        expect(range.component.style.right).toBe(`${i}px`);
      }
    });
  });

  describe('setTopIndentInPx(px)', () => {
    const range = new Range();

    it('set up top property of component', () => {
      for (let i = 0; i <= 100; i++) {
        range.setTopIndentInPx(i);
        expect(range.component.style.top).toBe(`${i}px`);
      }
    });
  });

  describe('setBottomIndentInPx(px)', () => {
    const range = new Range();

    it('set up bottom property of component', () => {
      for (let i = 0; i <= 100; i++) {
        range.setBottomIndentInPx(i);
        expect(range.component.style.bottom).toBe(`${i}px`);
      }
    });
  });

  describe('setWidthInPx(px)', () => {
    const range = new Range();

    it('set up width property of component', () => {
      for (let i = 0; i <= 100; i++) {
        range.setWidthInPx(i);
        expect(range.component.style.width).toBe(`${i}px`);
      }
    });
  });

  describe('setHeightInPx(px)', () => {
    const range = new Range();

    it('set up height property of component', () => {
      for (let i = 0; i <= 100; i++) {
        range.setHeightInPx(i);
        expect(range.component.style.height).toBe(`${i}px`);
      }
    });
  });
});
