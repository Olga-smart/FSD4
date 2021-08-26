import {createElement} from './createElement'

describe('createElement(tag, classname)', function() {

  it('create element with passed tag', function() {
    let tags = ['DIN', 'SPAN', 'A', 'H1', 'INPUT'];
    tags.forEach(tag => {
      let element = createElement(tag);
      expect(element.tagName).toBe(tag);
    });
  }); 

  it('assign passed class name to element', function() {
    let classNames = ['class1', 'class2 class3', 'class4-class5'];
    classNames.forEach(className => {
      let element = createElement('div', className);
      expect(element.className).toBe(className);
    });
  });

  it('return created element', function() {
    let element = createElement('div');
    expect(element).toBeInstanceOf(HTMLElement);
  });

});