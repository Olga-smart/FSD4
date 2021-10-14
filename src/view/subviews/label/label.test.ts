import { Label } from './label';

describe('Label', () => {
  describe('constructor(type)', () => {
    const label = new Label();

    it('set up type property', () => {
      expect(label).toHaveProperty('type');
    });

    it('set up type = left by default', () => {
      const label = new Label();
      expect(label.type).toBe('left');
    });

    it('set up type = right if the argument is "right"', () => {
      const label = new Label('right');
      expect(label.type).toBe('right');
    });

    it('set up type = left if the argument is "left"', () => {
      const label = new Label('left');
      expect(label.type).toBe('left');
    });

    it('set up type = common if the argument is "common"', () => {
      const label = new Label('common');
      expect(label.type).toBe('common');
    });

    it('set up component property', () => {
      expect(label).toHaveProperty('component');
    });

    it('component property is div element', () => {
      expect(label.component).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('setOpacity(value)', () => {
    const label = new Label();

    it('change opacity of component', () => {
      for (let i = 0; i <= 1; i += 0.1) {
        label.setOpacity(i);
        expect(label.component.style.opacity).toBe(`${i}`);
      }
    });
  });

  describe('setValue(value)', () => {
    const label = new Label();

    it('change textContent of component', () => {
      for (let i = -50; i <= 50; i++) {
        label.setValue(i);
        expect(label.component.textContent).toBe(`${i}`);
      }
    });
  });

  describe('getValue()', () => {
    const label = new Label();

    it('return textContent of component', () => {
      for (let i = -50; i <= 50; i++) {
        label.component.textContent = `${i}`;
        const value = label.getValue();
        expect(value).toBe(`${i}`);
      }
    });
  });

  describe('getBoundingClientRect()', () => {
    const label = new Label();
    const coords = label.getBoundingClientRect();

    it('return component coordinates', () => {
      expect(coords).toEqual(label.component.getBoundingClientRect());
    });
  });

  describe('getOffsetWidth()', () => {
    const label = new Label();
    const width = label.getOffsetWidth();

    it('return component width', () => {
      expect(width).toBe(label.component.offsetWidth);
    });
  });

  describe('getOffsetHeight()', () => {
    const label = new Label();
    const height = label.getOffsetHeight();

    it('return component height', () => {
      expect(height).toBe(label.component.offsetHeight);
    });
  });
});
