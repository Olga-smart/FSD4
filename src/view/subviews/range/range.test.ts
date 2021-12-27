import Range from './Range';

describe('Range', () => {
  describe('constructor()', () => {
    describe('set up component property with necessary classes', () => {
      const range = new Range();

      it('common class', () => {
        expect(range.component.classList).toContain('range-slider__range');
      });

      it('component property is div element', () => {
        expect(range.component).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('setLeftIndent(percent)', () => {
    const range = new Range();

    it('set up left property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        range.setLeftIndent(i);
        expect(range.component.style.left).toBe(`${i}%`);
      }
    });
  });

  describe('setRightIndent(percent)', () => {
    const range = new Range();

    it('set up right property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        range.setRightIndent(i);
        expect(range.component.style.right).toBe(`${i}%`);
      }
    });
  });

  describe('setTopIndent(percent)', () => {
    const range = new Range();

    it('set up top property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        range.setTopIndent(i);
        expect(range.component.style.top).toBe(`${i}%`);
      }
    });
  });

  describe('setBottomIndent(percent)', () => {
    const range = new Range();

    it('set up bottom property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        range.setBottomIndent(i);
        expect(range.component.style.bottom).toBe(`${i}%`);
      }
    });
  });

  describe('setWidth(percent)', () => {
    const range = new Range();

    it('set up width property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        range.setWidth(i);
        expect(range.component.style.width).toBe(`${i}%`);
      }
    });
  });

  describe('setHeight(percent)', () => {
    const range = new Range();

    it('set up height property of component', () => {
      for (let i = 0; i <= 100; i += 1) {
        range.setHeight(i);
        expect(range.component.style.height).toBe(`${i}%`);
      }
    });
  });
});
