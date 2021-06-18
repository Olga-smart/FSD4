import {Input} from "./input.js";

describe('Input', function() {

  describe('constructor(type)', function() {
      
    let input = new Input();

    it('set up view property', function() {
      expect(input).toHaveProperty('view');
    });

    it('set up type property', function() {
      expect(input).toHaveProperty('type');
    });

    it('set up type = left by default', function() {
      let input = new Input();
      expect(input.type).toBe('left');
    });

    it('set up type = right if the argument is "right"', function() {
      let input = new Input('right');
      expect(input.type).toBe('right');
    });

    it('set up component property', function() {
      expect(input).toHaveProperty('component');
    });

    it('set up type = range', function() {
      expect(input.component.type).toBe('range');
    });

  });

  describe('registerWith(view)', function() {

    let input = new Input();
    let view = {};
    input.registerWith(view);

    it('set up view', function() {
      expect(input.view).toBe(view);
    });

  });

  describe('setMinValue(min)', function() {
    
    let input = new Input();
    input.setMinValue(10);

    it('set up min attribute', function() {
      expect(input.component.getAttribute('min')).toBe('10');
    });

  });

  describe('setMaxValue(max)', function() {
    
    let input = new Input();
    input.setMaxValue(100);

    it('set up max attribute', function() {
      expect(input.component.getAttribute('max')).toBe('100');
    });

  });

  describe('setStep(step)', function() {

    let input = new Input();
    input.setStep(5);

    it('set up step attribute of input', function() {
      expect(input.component.getAttribute('step')).toBe('5');
    });

  });

  describe('setValue(value)', function() {

    let input = new Input();
    input.setValue(50);

    it('set up value attribute of input', function() {
      expect(input.component.getAttribute('value')).toBe('50');
    });

  });

  describe('setZIndex(value)', function() {

    let input = new Input();
    input.setZIndex(5);

    it('set up z-index of input', function() {
      expect(input.component.style.zIndex).toBe('5');
    });

  });

  describe('getValue()', function() {

    let input = new Input();
    input.setValue(10);

    it('return value attribute of input', function() {
      expect(input.getValue()).toBe('10');
    });

  });
  
  describe('getMin()', function() {

    let input = new Input();
    input.setMinValue(10);

    it('return min attribute of input', function() {
      expect(input.getMin()).toBe('10');
    });

  });

  describe('getMax()', function() {

    let input = new Input();
    input.setMaxValue(100);

    it('return max attribute of input', function() {
      expect(input.getMax()).toBe('100');
    });

  });

});