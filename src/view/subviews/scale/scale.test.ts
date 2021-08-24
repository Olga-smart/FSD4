// import { values } from "regenerator-runtime";
import {Scale} from "./scale";

describe('Scale', function() {

  describe('constructor(min, max, intervalsNumber)', function() {

    let scale = new Scale(0, 150, 4);

    describe('set up necessary properties', function() {

      it('set up view property', function() {
        expect(scale).toHaveProperty('view');
      });
  
      it('set up component property with necessary class', function() {
        expect(scale.component.classList).toContain('range-slider__scale');
      });
  
      it('set up min property', function() {
        for (let i = -10; i <= 10; i++) {
          let scale = new Scale(i, 150, 4);
          expect(scale.min).toBe(i);
        }      
      });
  
      it('set up max property', function() {
        for (let i = -10; i <= 10; i++) {
          let scale = new Scale(-20, i, 4);
          expect(scale.max).toBe(i);
        }      
      });
  
      it('set up intervalsNumber property', function() {
        for (let i = 1; i <= 10; i++) {
          let scale = new Scale(-20, 150, i);
          expect(scale.intervalsNumber).toBe(i);
        }      
      });
  
      it('set up intervals property', function() {
        expect(scale.intervals).toBeInstanceOf(Array);   
      });
  
      it('set up values property', function() {
        expect(scale.values).toBeInstanceOf(Array);   
      });
  
      it('set up valueElements property', function() {
        expect(scale.valueElements).toBeInstanceOf(Array);   
      });
  
      it('default intervalsNumber is 4', function() {
        let scale = new Scale(0, 150);
        expect(scale.intervalsNumber).toBe(4);
      });

    });

    describe('call necessary methods', function() {

      afterAll(() => {
        jest.restoreAllMocks();
      });

      jest.spyOn(Scale.prototype, 'createIntervals');
      jest.spyOn(Scale.prototype, 'addMarksInIntervals');
      jest.spyOn(Scale.prototype, 'addValues');
      jest.spyOn(Scale.prototype, 'attachEventHandlers');
      let scale = new Scale(0, 150, 4);

      it('call createIntervals()', function() {
        expect(scale.createIntervals).toBeCalled();
      });

      it('call addMarksInIntervals()', function() {
        expect(scale.addMarksInIntervals).toBeCalled();
      });

      it('call addValues()', function() {
        expect(scale.addValues).toBeCalled();
      });

      it('call attachEventHandlers()', function() {
        expect(scale.attachEventHandlers).toBeCalled();
      });

    });

  });

  describe('registerWith(view)', function() {

    let scale = new Scale(0, 150, 4);
    let view: any = {};
    scale.registerWith(view);

    it('set up view', function() {
      expect(scale.view).toBe(view);
    });

  });

  describe('createIntervals()', function() {

    it('create right amount of elements and push them into intervals property', function() {
      for (let i = 1; i <= 20; i++) {
        let scale = new Scale(0, 150, i);
        expect(scale.intervals).toHaveLength(i);
      }
    });

    it('add necessary class to all elements', function() {
      let scale = new Scale(0, 150, 10);
      scale.intervals.forEach(item => {
        expect(item.classList).toContain('range-slider__scale-interval');
      });
    });

    it('create right amount of elements and append them to component', function() {
      for (let i = 1; i <= 20; i++) {
        let scale = new Scale(0, 150, i);
        expect(scale.component.querySelectorAll('.range-slider__scale-interval')).toHaveLength(i);
      }
    });

  });

  describe('addMarksInIntervals()', function() {

    it('if intervalsNumber < 5, add 4 marks', function() {
      for (let i = 1; i < 5; i++) {
        let scale = new Scale(0, 150, i);
        scale.intervals.forEach(item => {
          expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(4);
        });
      }      
    });

    it('if intervalsNumber > 4 and < 8, add 3 marks', function() {
      for (let i = 5; i < 8; i++) {
        let scale = new Scale(0, 150, i);
        scale.intervals.forEach(item => {
          expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(3);
        });
      }      
    });

    it('if intervalsNumber > 7 and < 15, add 2 marks', function() {
      for (let i = 8; i < 15; i++) {
        let scale = new Scale(0, 150, i);
        scale.intervals.forEach(item => {
          expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(2);
        });
      }      
    });

    it('if intervalsNumber > 14 and < 29, add 1 mark', function() {
      for (let i = 15; i < 29; i++) {
        let scale = new Scale(0, 150, i);
        scale.intervals.forEach(item => {
          expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(1);
        });
      }      
    });

    it('if intervalsNumber > 28, add no marks', function() {
      let scale = new Scale(0, 150, 29);
      scale.intervals.forEach(item => {
        expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(0);
      });
    });

  });

  describe('addValues()', function() {
      
    it('values length is 1 more than intervals legth', function() {
      for (let i = 1; i <= 10; i++) {
        let scale = new Scale(0, 150, i);
        expect(scale.values.length).toBe(i + 1); 
      }
    });

    it('first value is min', function() {
      for (let i = -10; i <= 10; i++) {
        let scale = new Scale(i, 150, 4);
        expect(scale.values[0]).toBe(i);
      }
    });

    it('last value is max', function() {
      for (let i = -10; i <= 10; i++) {
        let scale = new Scale(-20, i, 4);
        expect(scale.values[scale.values.length - 1]).toBe(i);
      }
    });

    it('every value element has special class', function() {
      let scale = new Scale(0, 150, 4);
      scale.valueElements.forEach(valueElement => {
        expect(valueElement.classList).toContain('range-slider__scale-interval-value');
      })
    });

    it('first value element has special class', function() {
      let scale = new Scale(0, 150, 4);
      expect(scale.valueElements[0].classList).toContain('range-slider__scale-interval-value_min');
    });

    it('every valueElement contains corresponding value', function() {
      let scale = new Scale(0, 150, 4);
      for (let i = 0; i < scale.valueElements.length; i++) {
        expect(scale.valueElements[i].textContent).toBe(`${scale.values[i]}`);
      }
    });

  });

  describe('fitWidthForVertical()', function() {

    let scale = new Scale(0, 150, 2);

    scale.valueElements[0].style.width = '100px';
    scale.valueElements[1].style.width = '200px';
    scale.valueElements[2].style.width = '300px';

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get () {
          return parseInt(this.style.width); 
        }
      }
    });

    scale.fitWidthForVertical();

    it('set up component padding right equal to width of valueElement with max width + 3px', function() {
      expect(scale.component.style.paddingRight).toBe('303px'); 
    });

  });

  describe('fitHeightForHorizontal()', function() {

    let scale = new Scale(0, 150, 2);

    scale.valueElements[0].style.height = '100px';
    scale.valueElements[1].style.height = '200px';
    scale.valueElements[2].style.height = '300px';

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetHeight: {
        get () {
          return parseInt(this.style.height); 
        }
      }
    });

    scale.fitHeightForHorizontal();

    it('set up component padding bottom equal to height of valueElement with max height + 3px', function() {
      expect(scale.component.style.paddingBottom).toBe('303px'); 
    });

  });

  describe('getBoundingClientRect()', function() {

    let scale = new Scale(0, 150, 4);
    let coords = scale.getBoundingClientRect();

    it('return component coordinates', function() {
      expect(coords).toEqual(scale.component.getBoundingClientRect());
    });

  });

  describe('attachEventHandlers()', function() {

    it('handle click', function() {
      let scale = new Scale(0, 150, 4);
      let view: any = {};
      scale.registerWith(view);
      scale.view!.handleScaleOrTrackClick = jest.fn();
      let event = new Event('click');
      scale.component.dispatchEvent(event);

      let x = (event as MouseEvent).clientX - scale.getBoundingClientRect().left;
      let y = (event as MouseEvent).clientY - scale.getBoundingClientRect().top;

      expect(scale.view!.handleScaleOrTrackClick).toBeCalledWith(x, y);
    });

  });

});