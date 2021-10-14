import { createElement } from './createElement';

describe('createElement(tag, classname)', () => {
  it('create element with passed tag', () => {
    const tags = ['DIN', 'SPAN', 'A', 'H1', 'INPUT'];
    tags.forEach((tag) => {
      const element = createElement(tag);
      expect(element.tagName).toBe(tag);
    });
  });

  it('assign passed class name to element', () => {
    const classNames = ['class1', 'class2 class3', 'class4-class5'];
    classNames.forEach((className) => {
      const element = createElement('div', className);
      expect(element.className).toBe(className);
    });
  });

  it('return created element', () => {
    const element = createElement('div');
    expect(element).toBeInstanceOf(HTMLElement);
  });
});
