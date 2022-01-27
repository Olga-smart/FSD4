import Label from './Label';

describe('Label', () => {
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
});
