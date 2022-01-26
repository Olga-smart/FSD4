import Label from './Label';

describe('Label', () => {
  describe('constructor(type)', () => {
    const label = new Label();

    it('set up type property', () => {
      expect(label).toHaveProperty('type');
    });

    // it('set up type = left by default', () => {
    //   const newLabel = new Label();
    //   expect(newLabel.type).toBe('left');
    // });

    // it('set up type = right if the argument is "right"', () => {
    //   const newLabel = new Label('right');
    //   expect(newLabel.type).toBe('right');
    // });

    // it('set up type = left if the argument is "left"', () => {
    //   const newLabel = new Label('left');
    //   expect(newLabel.type).toBe('left');
    // });

    // it('set up type = common if the argument is "common"', () => {
    //   const newLabel = new Label('common');
    //   expect(newLabel.type).toBe('common');
    // });

    it('set up component property', () => {
      expect(label).toHaveProperty('component');
    });

    it('component property is div element', () => {
      expect(label.getComponent()).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('setOpacity(value)', () => {
    const label = new Label();

    it('change opacity of component', () => {
      for (let i = 0; i <= 1; i += 0.1) {
        label.setOpacity(i);
        expect(label.getComponent().style.opacity).toBe(`${i}`);
      }
    });
  });

  describe('setValue(value)', () => {
    const label = new Label();

    it('change textContent of component', () => {
      for (let i = -50; i <= 50; i += 1) {
        label.setValue(i);
        expect(label.getValue()).toBe(i);
      }
    });
  });

  describe('getValue()', () => {
    const label = new Label();

    it('return textContent of component', () => {
      for (let i = -50; i <= 50; i += 1) {
        label.setValue(i);
        expect(label.getValue()).toBe(i);
      }
    });
  });

  describe('getBoundingClientRect()', () => {
    const label = new Label();
    const coords = label.getBoundingClientRect();

    it('return component coordinates', () => {
      expect(coords).toEqual(label.getComponent().getBoundingClientRect());
    });
  });

  describe('getOffsetWidth()', () => {
    const label = new Label();
    const width = label.getOffsetWidth();

    it('return component width', () => {
      expect(width).toBe(label.getComponent().offsetWidth);
    });
  });

  describe('getOffsetHeight()', () => {
    const label = new Label();
    const height = label.getOffsetHeight();

    it('return component height', () => {
      expect(height).toBe(label.getComponent().offsetHeight);
    });
  });

  describe('getComponent()', () => {
    it('return HTML element', () => {
      const label = new Label();
      expect(label.getComponent()).toBeInstanceOf(HTMLElement);
    });
  });

  describe('remove()', () => {
    it('remove component from DOM', () => {
      const parent = document.createElement('div');
      const label = new Label();

      parent.append(label.getComponent());
      expect(parent.children).toContain(label.getComponent());

      label.remove();
      expect(parent.children).not.toContain(label.getComponent());
    });
  });
});
