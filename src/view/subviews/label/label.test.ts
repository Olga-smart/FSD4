import {Label} from "./label";

describe('Label', function() {

  describe('constructor(type)', function() {

    let label = new Label();

    it('set up type property', function() {
      expect(label).toHaveProperty('type');
    });

    it('set up type = left by default', function() {
      let label = new Label();
      expect(label.type).toBe('left');
    });

    it('set up type = right if the argument is "right"', function() {
      let label = new Label('right');
      expect(label.type).toBe('right');
    });

    it('set up component property', function() {
      expect(label).toHaveProperty('component');
    });

  });

  describe('setOpacity(value)', function() {

    let label = new Label();
    label.setOpacity(0.5);

    it('change opacity of component', function() {
      expect(label.component.style.opacity).toBe('0.5');
    });

  });

  describe('setValue(value)', function() {

    let label = new Label();
    label.setValue(20)

    it('change textContent of component', function() {
      expect(label.component.textContent).toBe('20');
    });

  });

  describe('getBoundingClientRect()', function() {

    let label = new Label();
    let coords = label.getBoundingClientRect();

    it('return component coordinates', function() {
      expect(coords).toHaveProperty('top');
      expect(coords).toHaveProperty('right');
      expect(coords).toHaveProperty('bottom');
      expect(coords).toHaveProperty('left');
    });

  });

});