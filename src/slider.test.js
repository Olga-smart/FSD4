import {Model} from './slider.js';
import {View} from './slider.js';
import {Presenter} from './slider.js';
import puppeteer from "puppeteer";
import regeneratorRuntime from "regenerator-runtime";

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

describe('View', function() {
  
  describe('constructor()', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    
    it('set up presenter propery', function() {
      expect(view).toHaveProperty('presenter');
    });
    
    it('set up component property', function() {
      expect(view.component).toBe(slider);
    });
    
    it('set up inputLeft property', function() {
      expect(view).toHaveProperty('inputLeft');
    });
    
    it('set up inputRight property', function() {
      expect(view).toHaveProperty('inputRight');
    });
    
    it('set up type = range for inputs', function() {
      expect(view.inputLeft.type).toBe('range');
      expect(view.inputRight.type).toBe('range');
    });
    
    it('set up slider property', function() {
      expect(view).toHaveProperty('slider');
    });
    
    it('set up track property', function() {
      expect(view).toHaveProperty('track');
    });
    
    it('set up range property', function() {
      expect(view).toHaveProperty('range');
    });
    
    it('set up properties for thumbs', function() {
      expect(view).toHaveProperty('thumbLeft');
      expect(view).toHaveProperty('thumbRight');
    });
    
    it('set up properties for min and max labels if options.minMaxLabels is true', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true
      });
      
      expect(view).toHaveProperty('minLabel');
      expect(view).toHaveProperty('maxLabel');
    });
    
    it('do not set up properties for min and max labels if options.minMaxLabels is true', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: false
      });
      
      expect(view).not.toHaveProperty('minLabel');
      expect(view).not.toHaveProperty('maxLabel');
    });
    
    it('set up properties for value labels if options.valueLabel is true', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true
      });
      
      expect(view).toHaveProperty('valueLabelLeft');
      expect(view).toHaveProperty('valueLabelRight');
      expect(view).toHaveProperty('valueLabelCommon');
    });
    
    it('do not set up properties for value labels if options.valueLabel is true', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: false
      });
      
      expect(view).not.toHaveProperty('valueLabelLeft');
      expect(view).not.toHaveProperty('valueLabelRight');
      expect(view).not.toHaveProperty('valueLabelCommon');
    });
    
    it('set up vertical property of options.vertical is true', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        vertical: true
      });
      
      expect(view.vertical).toBe(true);
    });
    
    it('do not set up vertical property of options.vertical is false', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        vertical: false
      });
      
      expect(view).not.toHaveProperty('vertical');
    });
    
  });
  
  describe('registerWith(presenter)', function() {
      
    let slider = document.createElement('div');
    let view = new View(slider);
    let presenter = {};
    view.registerWith(presenter);

    it('set up presenter', function() {
      expect(view.presenter).toBe(presenter);
    });

  });

  describe('setMinValue(min)', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    view.setMinValue(10);

    it('set up min attribute of inputs', function() {
      expect(view.inputLeft.getAttribute('min')).toBe('10');
      expect(view.inputRight.getAttribute('min')).toBe('10');
    });
    
    it('if view has minLabel, set up its value', function() {
      let view = new View(slider, {
        minMaxLabels: true
      });      
      view.setMinValue(10);
      
      expect(view.minLabel.textContent).toBe('10');
    });

  });
  
  describe('setMaxValue(max)', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    view.setMaxValue(100);

    it('set up max attribute of inputs', function() {
      expect(view.inputLeft.getAttribute('max')).toBe('100');
      expect(view.inputRight.getAttribute('max')).toBe('100');
    });
    
    it('if view has maxLabel, set up its value', function() {
      let view = new View(slider, {
        minMaxLabels: true
      });
      view.setMaxValue(100);
      
      expect(view.maxLabel.textContent).toBe('100');
    });

  });
  
  describe('setStep(step)', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    view.setStep(5);
    
    it('set up step attribute of inputs', function() {
      expect(view.inputLeft.getAttribute('step')).toBe('5');
      expect(view.inputRight.getAttribute('step')).toBe('5');
    });
    
  });
  
  describe('setLeftValue(value) - Jest', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    view.setLeftValue(10);

    it('set up value attribute of left input', function() {
      expect(view.inputLeft.getAttribute('value')).toBe('10');
    });

    // TODO: не работает тест
    it('make z-index of left input higher than z-index of right-input when they are both at maximum', function() {
      // view.setMaxValue(100);
      // view.setRightValue(100);
      // view.setLeftValue(100);
      // expect(+view.inputLeft.style.zIndex).toBeGreaterThan(+view.inputRight.style.zIndex);
    });

    it('call function to change left thumb position', function() {
      view.setThumbLeftPosition = jest.fn();
      view.setLeftValue(10);
      expect(view.setThumbLeftPosition).toBeCalled();
    });  

    describe('do necessary actions with labels', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true,
        valueLabel: true,
        vertical: true
      });
      view.setLeftValue(10);

      describe('do necessary actions with left value label', function() {

        it('update text for left value label', function() {
          expect(view.valueLabelLeft.textContent).toBe('10');
        });
  
        it('call function to change left value label position', function() {
          view.setValueLabelLeftPosition = jest.fn();
          view.setLeftValue(10);
          expect(view.setValueLabelLeftPosition).toBeCalled();
        });  

      });

      describe('do necessary actions with common value label', function() {

        it('update text for common value label', function() {
          expect(view.valueLabelCommon.textContent).toMatch('10 - ');
        });

        it('call function to check if two value labels is close', function() {
          view.isTwoValueLabelsClose = jest.fn();
          view.setLeftValue(10);
          expect(view.isTwoValueLabelsClose).toBeCalled();
        });

        it('call function to merge labels if two value labels is close', function() {
          view.isTwoValueLabelsClose = jest.fn(() => true);
          view.mergeLabels = jest.fn();
          view.setLeftValue(10);
          expect(view.mergeLabels).toBeCalled();
        });

        it('call function to split labels if two value labels is not close', function() {
          view.isTwoValueLabelsClose = jest.fn(() => false);
          view.splitLabels = jest.fn();
          view.setLeftValue(10);
          expect(view.splitLabels).toBeCalled();
        });

      });
    
      describe('do necessary actions with min value label', function() {

        it('call function to check if left value label is close to min label', function() {
          view.isLeftValueLabelCloseToMinLabel = jest.fn();
          view.setLeftValue(10);
          expect(view.isLeftValueLabelCloseToMinLabel).toBeCalled();
        });

        it('set min label opacity to 0 if left value label is close', function() {
          view.isLeftValueLabelCloseToMinLabel = jest.fn(() => true);
          view.setLeftValue(10);
          expect(view.minLabel.style.opacity).toBe('0');
        });

        it('set min label opacity to 1 if left value label is not close', function() {
          view.isLeftValueLabelCloseToMinLabel = jest.fn(() => false);
          view.setLeftValue(10);
          expect(view.minLabel.style.opacity).toBe('1');
        });

      });

      it('call function to fix value label position if slider is vertical', function() {
        view.fixValueLabelPositionForVertical = jest.fn();
        view.setLeftValue(10);
        expect(view.fixValueLabelPositionForVertical).toBeCalled();
      });

    });  
    
  });

  describe('setLeftValue(value) - Puppeteer', function() {

    it('when left thumb is being dragged, value of left input is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const inputValueBefore = await page.evaluate('document.querySelector(".range-slider__input_left").getAttribute("value")');
      const leftThumb = await page.$('.range-slider__thumb_left');
      const box = await leftThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y);
      await page.mouse.up();
      const inputValueAfter = await page.evaluate('document.querySelector(".range-slider__input_left").getAttribute("value")');
      expect(inputValueBefore).not.toBe(inputValueAfter);
      await browser.close();
    });

    it('when left thumb is being dragged, it`s position is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const leftThumb = await page.$('.range-slider__thumb_left');
      const boxBefore = await leftThumb.boundingBox();
      const x = boxBefore.x + boxBefore.width / 2;
      const y = boxBefore.y + boxBefore.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y);
      await page.mouse.up();
      const boxAfter = await leftThumb.boundingBox();
      expect(boxBefore.x).not.toBe(boxAfter.x);
      await browser.close();
    });

    it('when left thumb is being dragged, position of left value label is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const leftValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().x');
      const leftThumb = await page.$('.range-slider__thumb_left');
      const box = await leftThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y);
      await page.mouse.up();
      const leftValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").getBoundingClientRect().x');
      expect(leftValueLabelPositionBefore).not.toBe(leftValueLabelPositionAfter);
      await browser.close();
    }, 10000);

    it('when left thumb is being dragged, text in left value label is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const leftValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
      const leftThumb = await page.$('.range-slider__thumb_left');
      const box = await leftThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 100, y);
      await page.mouse.up();
      const leftValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_left").textContent');
      expect(leftValueLabelTextBefore).not.toBe(leftValueLabelTextAfter);
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close, they merge', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      let leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      const leftThumb = await page.$('.range-slider__thumb_left');
      const box = await leftThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 150, y);
      await page.mouse.up();
      expect(leftValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await browser.close();
    }, 10000);

    // TODO: не работает тест
    it('when 2 value labels get too close and then get too far, they split', async function() {
      // const browser = await puppeteer.launch();
      // const page = await browser.newPage();
      // await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      // const leftThumb = await page.$('.range-slider__thumb_left');
      // const box = await leftThumb.boundingBox();
      // const x = box.x + box.width / 2;
      // const y = box.y + box.height / 2;
      // await page.mouse.move(x, y);
      // await page.mouse.down();
      // await page.mouse.move(x + 150, y);
      // await page.mouse.up();
      // await page.mouse.down();
      // await page.mouse.move(x, y);
      // await page.mouse.up();
      // const leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      // const commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      // expect(leftValueLabelOpacity).toBe('1');
      // expect(commonValueLabelOpacity).toBe('0');
      // await browser.close();
    }, 10000);

    it('when left value label gets too close to min label, min label hides', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const leftThumb = await page.$('.range-slider__thumb_left');
      const box = await leftThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 50, y);
      await page.mouse.up();
      const minLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_left").style.opacity');
      expect(minLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

  });

  describe('setRightValue(value) - Jest', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    view.setRightValue(50);

    it('set up value attribute of right input', function() {
      expect(view.inputRight.getAttribute('value')).toBe('50');
    });

    it('call function to change right thumb position', function() {
      view.setThumbRightPosition = jest.fn();
      view.setRightValue(50);
      expect(view.setThumbRightPosition).toBeCalled();
    });  

    describe('do necessary actions with labels', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true,
        valueLabel: true,
        vertical: true
      });
      view.setRightValue(50);

      describe('do necessary actions with right value label', function() {

        it('update text for right value label', function() {
          expect(view.valueLabelRight.textContent).toBe('50');
        });
  
        it('call function to change right value label position', function() {
          view.setValueLabelRightPosition = jest.fn();
          view.setRightValue(50);
          expect(view.setValueLabelRightPosition).toBeCalled();
        });  

      });

      describe('do necessary actions with common value label', function() {

        it('update text for common value label', function() {
          expect(view.valueLabelCommon.textContent).toMatch(' - 50');
        });

        it('call function to check if two value labels is close', function() {
          view.isTwoValueLabelsClose = jest.fn();
          view.setRightValue(50);
          expect(view.isTwoValueLabelsClose).toBeCalled();
        });

        it('call function to merge labels if two value labels is close', function() {
          view.isTwoValueLabelsClose = jest.fn(() => true);
          view.mergeLabels = jest.fn();
          view.setRightValue(50);
          expect(view.mergeLabels).toBeCalled();
        });

        it('call function to split labels if two value labels is not close', function() {
          view.isTwoValueLabelsClose = jest.fn(() => false);
          view.splitLabels = jest.fn();
          view.setRightValue(50);
          expect(view.splitLabels).toBeCalled();
        });

      });
    
      describe('do necessary actions with max value label', function() {

        it('call function to check if right value label is close to max label', function() {
          view.isRightValueLabelCloseToMaxLabel = jest.fn();
          view.setRightValue(50);
          expect(view.isRightValueLabelCloseToMaxLabel).toBeCalled();
        });

        it('set max label opacity to 0 if right value label is close', function() {
          view.isRightValueLabelCloseToMaxLabel = jest.fn(() => true);
          view.setRightValue(50);
          expect(view.maxLabel.style.opacity).toBe('0');
        });

        it('set max label opacity to 1 if right value label is not close', function() {
          view.isRightValueLabelCloseToMaxLabel = jest.fn(() => false);
          view.setRightValue(50);
          expect(view.maxLabel.style.opacity).toBe('1');
        });

      });

      it('call function to fix value label position if slider is vertical', function() {
        view.fixValueLabelPositionForVertical = jest.fn();
        view.setRightValue(50);
        expect(view.fixValueLabelPositionForVertical).toBeCalled();
      });

    });  
    
  });

  describe('setRightValue(value) - Puppeteer', function() {

    it('when right thumb is being dragged, value of right input is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const inputValueBefore = await page.evaluate('document.querySelector(".range-slider__input_right").getAttribute("value")');
      const rightThumb = await page.$('.range-slider__thumb_right');
      const box = await rightThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 100, y);
      await page.mouse.up();
      const inputValueAfter = await page.evaluate('document.querySelector(".range-slider__input_right").getAttribute("value")');
      expect(inputValueBefore).not.toBe(inputValueAfter);
      await browser.close();
    });

    it('when right thumb is being dragged, it`s position is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const rightThumb = await page.$('.range-slider__thumb_right');
      const boxBefore = await rightThumb.boundingBox();
      const x = boxBefore.x + boxBefore.width / 2;
      const y = boxBefore.y + boxBefore.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 100, y);
      await page.mouse.up();
      const boxAfter = await rightThumb.boundingBox();
      expect(boxBefore.x).not.toBe(boxAfter.x);
      await browser.close();
    });

    it('when right thumb is being dragged, position of right value label is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const rightValueLabelPositionBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().x');
      const rightThumb = await page.$('.range-slider__thumb_right');
      const box = await rightThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 100, y);
      await page.mouse.up();
      const rightValueLabelPositionAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").getBoundingClientRect().x');
      expect(rightValueLabelPositionBefore).not.toBe(rightValueLabelPositionAfter);
      await browser.close();
    }, 10000);

    it('when right thumb is being dragged, text in right value label is being changed', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const rightValueLabelTextBefore = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
      const rightThumb = await page.$('.range-slider__thumb_right');
      const box = await rightThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 100, y);
      await page.mouse.up();
      const rightValueLabelTextAfter = await page.evaluate('document.querySelector(".range-slider__value-label_right").textContent');
      expect(rightValueLabelTextBefore).not.toBe(rightValueLabelTextAfter);
      await browser.close();
    }, 10000);

    it('when 2 value labels get too close, they merge', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      let rightValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_right").style.opacity');
      let commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      const rightThumb = await page.$('.range-slider__thumb_right');
      const box = await rightThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 150, y);
      await page.mouse.up();
      expect(rightValueLabelOpacity).toBe('0');
      expect(commonValueLabelOpacity).toBe('1');
      await browser.close();
    }, 10000);

    // TODO: не работает тест
    it('when 2 value labels get too close and then get too far, they split', async function() {
      // const browser = await puppeteer.launch();
      // const page = await browser.newPage();
      // await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      // const leftThumb = await page.$('.range-slider__thumb_left');
      // const box = await leftThumb.boundingBox();
      // const x = box.x + box.width / 2;
      // const y = box.y + box.height / 2;
      // await page.mouse.move(x, y);
      // await page.mouse.down();
      // await page.mouse.move(x + 150, y);
      // await page.mouse.up();
      // await page.mouse.down();
      // await page.mouse.move(x, y);
      // await page.mouse.up();
      // const leftValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_left").style.opacity');
      // const commonValueLabelOpacity = await page.evaluate('document.querySelector(".range-slider__value-label_common").style.opacity');
      // expect(leftValueLabelOpacity).toBe('1');
      // expect(commonValueLabelOpacity).toBe('0');
      // await browser.close();
    }, 10000);

    it('when right value label gets too close to max label, max label hides', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('file:///C:/Users/%D0%9E%D0%BB%D1%8C%D0%B3%D0%B0/Documents/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/%D0%92%D0%B5%D1%80%D1%81%D1%82%D0%BA%D0%B0/FSD_4/docs/index.html');
      const rightThumb = await page.$('.range-slider__thumb_right');
      const box = await rightThumb.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 150, y);
      await page.mouse.up();
      const maxLabelOpacity = await page.evaluate('document.querySelector(".range-slider__min-max-label_right").style.opacity');
      expect(maxLabelOpacity).toBe('0');
      await browser.close();
    }, 10000);

  });
  
  describe('setThumbLeftPosition(value)', function() {

    let slider = document.createElement('div');
    let view = new View(slider);
    view.setMinValue(0);
    view.setMaxValue(100);
    view.setRightValue(100);

    it('set left property of left thumb properly', function() {
      for (let i = 0; i <= 100; i++) {
        view.setThumbLeftPosition(i);
        // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
        expect(parseInt(view.thumbLeft.style.left)).toBeGreaterThanOrEqual(i - 1);
        expect(parseInt(view.thumbLeft.style.left)).toBeLessThanOrEqual(i + 1)
      }
    });

    it('set left property of range properly', function() {
      for (let i = 0; i <= 100; i++) {
        view.setThumbLeftPosition(i);
        // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
        expect(parseInt(view.range.style.left)).toBeGreaterThanOrEqual(i - 1);
        expect(parseInt(view.range.style.left)).toBeLessThanOrEqual(i + 1)
      }
    });

  });

  describe('setThumbRightPosition(value)', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    view.setMinValue(0);
    view.setMaxValue(100);
    view.setLeftValue(0);

    it('set right property of right thumb properly', function() {
      for (let i = 0; i <= 100; i++) {
        view.setThumbRightPosition(i);
        // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
        expect(parseInt(view.thumbRight.style.right)).toBeGreaterThanOrEqual(100 - i - 1);
        expect(parseInt(view.thumbRight.style.right)).toBeLessThanOrEqual(100 - i + 1)
      }
    });

    it('set right property of range properly', function() {
      for (let i = 0; i <= 100; i++) {
        view.setThumbRightPosition(i);
        // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
        expect(parseInt(view.range.style.right)).toBeGreaterThanOrEqual(100 - i - 1);
        expect(parseInt(view.range.style.right)).toBeLessThanOrEqual(100 - i + 1)
      }
    });

  });

  describe('setValueLabelLeftPosition()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabel: true
    });

    it('left property of left label must be equal to left property of left thumb', function() {
      view.setThumbLeftPosition(10);
      view.setValueLabelLeftPosition();
      expect(parseInt(view.valueLabelLeft.style.left)).toEqual(parseInt(view.thumbLeft.style.left));
    });

  });

  describe('setValueLabelRightPosition()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabel: true
    });

    it('right property of right label must be equal to right property of right thumb', function() {
      view.setThumbRightPosition(50);
      view.setValueLabelRightPosition();
      expect(parseInt(view.valueLabelRight.style.right)).toEqual(parseInt(view.thumbRight.style.right));
    });

  });

  describe('mergeLabels()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabel: true
    });

    beforeEach(() => {
      view.mergeLabels();
    }); 

    it('make left value label transparent', function() {
      expect(view.valueLabelLeft.style.opacity).toBe('0');
    }); 

    it('make right value label transparent', function() {
      expect(view.valueLabelRight.style.opacity).toBe('0');
    }); 

    it('make common value label opaque', function() {
      expect(view.valueLabelCommon.style.opacity).toBe('1');
    });
    
    it.todo('common value label is halfway between left and right thumbs');

  });

  describe('splitLabels()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabel: true
    });

    beforeEach(() => {
      view.splitLabels();
    });    

    it('make common value label transparent', function() {
      expect(view.valueLabelCommon.style.opacity).toBe('0');
    });

    it('make left value label opaque', function() {
      expect(view.valueLabelLeft.style.opacity).toBe('1');
    });

    it('make right value label opaque', function() {
      expect(view.valueLabelRight.style.opacity).toBe('1');
    });

  });

}); 

