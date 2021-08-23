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

    it('set up type = left if the argument is "left"', function() {
      let label = new Label('left');
      expect(label.type).toBe('left');
    });

    it('set up type = common if the argument is "common"', function() {
      let label = new Label('common');
      expect(label.type).toBe('common');
    });

    it('set up component property', function() {
      expect(label).toHaveProperty('component');
    });

    it('component property is div element', function() {
      expect(label.component).toBeInstanceOf(HTMLDivElement);
    });

  });

  describe('setOpacity(value)', function() {

    let label = new Label();

    it('change opacity of component', function() {
      for (let i = 0; i <= 1; i += 0.1) {
        label.setOpacity(i);
        expect(label.component.style.opacity).toBe(`${i}`);
      }
    });

  });

  describe('setValue(value)', function() {

    let label = new Label();    

    it('change textContent of component', function() {
      for (let i = -50; i <= 50; i++) {
        label.setValue(i);
        expect(label.component.textContent).toBe(`${i}`);
      }
    });

  });

  describe('getValue()', function() {

    let label = new Label();    

    it('return textContent of component', function() {
      for (let i = -50; i <= 50; i++) {
        label.component.textContent = `${i}`;
        let value = label.getValue();
        expect(value).toBe(`${i}`);
      }
    });

  });

  describe('getBoundingClientRect()', function() {

    let label = new Label();
    let coords = label.getBoundingClientRect();

    it('return component coordinates', function() {
      expect(coords).toEqual(label.component.getBoundingClientRect());
    });

  });

  describe('getOffsetWidth()', function() {

    let label = new Label();
    let width = label.getOffsetWidth();

    it('return component width', function() {
      expect(width).toBe(label.component.offsetWidth);
    });

  });

  describe('getOffsetHeight()', function() {

    let label = new Label();
    let height = label.getOffsetHeight();

    it('return component height', function() {
      expect(height).toBe(label.component.offsetHeight);
    });

  });

});