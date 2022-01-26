import Input from './Input';

describe('Input', () => {
  describe('constructor()', () => {
    const input = new Input();

    it('set up component property', () => {
      expect(input).toHaveProperty('component');
    });

    it('component property is input element', () => {
      expect(input.getComponent()).toBeInstanceOf(HTMLInputElement);
    });

    it('set type attribute', () => {
      expect((input.getComponent() as HTMLInputElement).type).toBe('text');
    });

    it('set tabIndex attribute', () => {
      expect((input.getComponent() as HTMLInputElement).tabIndex).toBe(-1);
    });

    it('set readOnly attribute', () => {
      expect((input.getComponent() as HTMLInputElement).readOnly).toBe(true);
    });
  });

  describe('setValue(value1, value2)', () => {
    const input = new Input();

    describe('set value attribute', () => {
      it('if passed 1 value', () => {
        for (let i = 0; i <= 100; i += 1) {
          input.setValue(i);
          expect((input.getComponent() as HTMLInputElement).value).toBe(`${i}`);
        }
      });

      it('if passed 2 values', () => {
        for (let i = 0, j = 200; i <= 100; i += 1, j += 1) {
          input.setValue(i, j);
          expect((input.getComponent() as HTMLInputElement).value).toBe(`${i} - ${j}`);
        }
      });
    });
  });

  describe('getComponent()', () => {
    it('return HTML element', () => {
      const input = new Input();
      expect(input.getComponent()).toBeInstanceOf(HTMLElement);
    });
  });
});
