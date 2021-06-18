import {Model} from './model.js';

describe('Model', function() {
  
  describe('consructor()', function() {
    
    let model;
    
    beforeAll(() => {
      model = new Model();
    });
    
    it('set up min value', function() {
      let model = new Model({
        min: 10
      });
      expect(model.min).toBe(10);
    });

    it('set up default min value = 0', function() {
      expect(model.min).toBe(0);
    });

    it('set up max value', function() {
      let model = new Model({
        max: 10
      });
      expect(model.max).toBe(10);
    });

    it('set up default max value = 150', function() {
      expect(model.max).toBe(150);
    });

    it('set up left value', function() {
      let model = new Model({
        leftValue: 10
      });
      expect(model.leftValue).toBe(10);
    });

    it('set up default left value = 25', function() {
      expect(model.leftValue).toBe(25);
    });

    it('set up right value', function() {
      let model = new Model({
        rightValue: 10
      });
      expect(model.rightValue).toBe(10);
    });

    it('set up default right value = 75', function() {
      expect(model.rightValue).toBe(75);
    });

    it('set up step', function() {
      let model = new Model({
        step: 10
      });
      expect(model.step).toBe(10);
    });

    it('set up default step = 1', function() {
      expect(model.step).toBe(1);
    });
  });
  
  describe('setLeftValue(value)', function() {
    
    it('set up left value', function() {
      let model = new Model();
      model.setLeftValue(10);
      
      expect(model.leftValue).toBe(10);
      
    });
    
    it('set up left value = right value, if user is trying to set left value > right value', function() {
      let model = new Model({
        rightValue: 50
      });
      model.setLeftValue(51);
      
      expect(model.leftValue).toBe(50);
    });
    
    it('set up left value = min, if user is trying to set left value < min', function() {
      let model = new Model({
        min: 10
      });
      model.setLeftValue(9);
      
      expect(model.leftValue).toBe(10);
    });
    
  });
  
  describe('setRightValue(value)', function() {
    
    it('set up right value', function() {
      let model = new Model();
      model.setRightValue(100);
      
      expect(model.rightValue).toBe(100);
      
    });
    
    it('set up right value = left value, if user is trying to set right value < left value', function() {
      let model = new Model({
        leftValue: 30
      });
      model.setRightValue(29);
      
      expect(model.rightValue).toBe(30);
    });
    
    it('set up right value = max, if user is trying to set right value > max', function() {
      let model = new Model({
        max: 100
      });
      model.setRightValue(101);
      
      expect(model.rightValue).toBe(100);
    });
    
  });

});