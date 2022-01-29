import BaseElement from './BaseElement';

describe('BaseElement', () => {
  describe('constructor(type, className)', () => {
    it('create element with passed tag', () => {
      const tags = ['DIN', 'SPAN', 'A', 'H1', 'INPUT'];
      tags.forEach((tag) => {
        const element = new BaseElement(tag);
        expect(element.getComponent().tagName).toBe(tag);
      });
    });

    it('assign passed class name to element', () => {
      const classNames = ['class1', 'class2 class3', 'class4-class5'];
      classNames.forEach((className) => {
        const element = new BaseElement('div', className);
        expect(element.getComponent().className).toBe(className);
      });
    });
  });

  describe('getComponent()', () => {
    it('return HTML element', () => {
      const element = new BaseElement();

      expect(element.getComponent()).toBeInstanceOf(HTMLElement);
    });
  });

  describe('getBoundingClientRect()', () => {
    it('return component coordinates', () => {
      const element = new BaseElement();
      const coords = element.getBoundingClientRect();

      expect(coords).toEqual(element.getComponent().getBoundingClientRect());
    });
  });

  describe('getWidth()', () => {
    it('return component width', () => {
      const element = new BaseElement();
      const width = element.getWidth();

      expect(width).toBe(element.getComponent().offsetWidth);
    });
  });

  describe('getHeight()', () => {
    const element = new BaseElement();
    const height = element.getHeight();

    it('return component height', () => {
      expect(height).toBe(element.getComponent().offsetHeight);
    });
  });

  describe('setIndent(side, indent)', () => {
    const element = new BaseElement();
    const sides: ['top', 'right', 'bottom', 'left'] = ['top', 'right', 'bottom', 'left'];

    it('if indent is number, set indent in %', () => {
      sides.forEach((side) => {
        for (let i = 0; i <= 100; i += 1) {
          element.setIndent(side, i);
          expect(element.getComponent().style[side]).toBe(`${i}%`);
        }
      });
    });

    it('if indent is string, set indent as it is', () => {
      sides.forEach((side) => {
        for (let i = 0; i <= 100; i += 1) {
          element.setIndent(side, `${i}px`);
          expect(element.getComponent().style[side]).toBe(`${i}px`);
        }
      });
    });
  });

  describe('remove()', () => {
    it('remove component from DOM', () => {
      const element = new BaseElement();
      const container = document.createElement('div');
      container.append(element.getComponent());

      expect(container.children).toContain(element.getComponent());

      element.remove();

      expect(container.children).not.toContain(element.getComponent());
    });
  });
});
