import {Slider} from "./slider.js";

describe('Slider', function() {

  describe('constructor()', function() {

    describe('set up component property with necessary classes', function() {

      let slider = new Slider();

      it('common class', function() {        
        expect(slider.component.classList).toContain('range-slider__slider');
      });

    });

  });

  describe('append(...elements)', function() {
    
    let slider = new Slider();
    let div = document.createElement('div');
    slider.append(div);

    it('append elements to slider component', function() {
      expect(div.parentNode).toBe(slider.component);
    });

  });

});