import {Slider} from "./slider";

describe('Slider', function() {

  describe('constructor()', function() {

    describe('set up component property with necessary classes', function() {

      let slider = new Slider();

      it('common class', function() {        
        expect(slider.component.classList).toContain('range-slider__slider');
      });

      it('component property is div element', function() {
        expect(slider.component).toBeInstanceOf(HTMLDivElement);
      });

    });

  });

  describe('append(...elements)', function() {

    afterAll(() => {
      jest.restoreAllMocks();
    });
    
    let slider = new Slider();
    let div = document.createElement('div');
    jest.spyOn(HTMLElement.prototype, 'append');
    slider.append(div);

    it('append elements to slider component', function() {
      expect(div.parentNode).toBe(slider.component);
    });

    it('call built-in method append', function() {
      expect(slider.component.append).toBeCalledWith(div);
    });

    it('work with multiple arguments', function() {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let div3 = document.createElement('div');
      slider.append(div1, div2, div3);

      expect(slider.component.append).toBeCalledWith(div1, div2, div3);
    });

  });

  describe('before(...elements)', function() {

    afterAll(() => {
      jest.restoreAllMocks();
    });
    
    let slider = new Slider();
    let div = document.createElement('div');
    slider.component.before = jest.fn();
    slider.before(div);

    it('call built-in method before', function() {
      expect(slider.component.before).toBeCalledWith(div);
    });

    it('work with multiple arguments', function() {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let div3 = document.createElement('div');
      slider.before(div1, div2, div3);

      expect(slider.component.before).toBeCalledWith(div1, div2, div3);
    });

  });

});