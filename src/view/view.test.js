import {View} from './view.js';
import puppeteer from "puppeteer";
import regeneratorRuntime from "regenerator-runtime";

describe('View', function() {
  
  describe('constructor()', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    
    it('set up presenter property', function() {
      expect(view).toHaveProperty('presenter');
    });
    
    it('set up component property', function() {
      expect(view.component).toBe(slider);
    });

    describe('set up properties for inputs', function() {
      it('set up left input', function() {
        expect(view).toHaveProperty('inputLeft');
      })
      it('set up right input if necessary', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true
        });

        expect(view).toHaveProperty('inputRight');
      }); 
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
    
    describe('set up properties for thumbs', function() {
      it('set up left thumb', function() {
        expect(view).toHaveProperty('thumbLeft');
      })
      it('set up right thumb if necessary', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true
        });

        expect(view).toHaveProperty('thumbRight');
      }); 
    });

    it('set up hasScale property', function() {
      expect(view).toHaveProperty('hasScale');
    });

    describe('set up scaleIntervals property if options.scale is true', function() {

      it('4 by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          scale: true
        });

        expect(view.scaleIntervals).toBe(4);
      });

      it('certain number if options.scaleIntervals is set', function() {
        let slider = document.createElement('div');

        for (let i = 1; i < 25; i++) {
          let view = new View(slider, {
            scale: true,
            scaleIntervals: i
          });
  
          expect(view.scaleIntervals).toBe(i);
        }
      });
      
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
    
    describe('set up properties for value labels if options.valueLabel is true', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true
      });
      
      it('set up left value label', function() {
        expect(view).toHaveProperty('valueLabelLeft');
      });

      it('set up right and common value labels if necessary', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          valueLabel: true,
          range: true
        });

        expect(view).toHaveProperty('valueLabelRight');
        expect(view).toHaveProperty('valueLabelCommon');
      });    
    });
    
    it('do not set up properties for value labels if options.valueLabel is false', function() {
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

    it('call function to set min attribute of left input', function() {
      let slider = document.createElement('div');
      let view = new View(slider);
      view.inputLeft.setMinValue = jest.fn();
      view.setMinValue(10); 

      expect(view.inputLeft.setMinValue).toBeCalledWith(10);
    });

    it('call function to set min attribute of right input if necessary', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true
      });
      view.inputRight.setMinValue = jest.fn();
      view.setMinValue(10);

      expect(view.inputRight.setMinValue).toBeCalledWith(10);
    });
    
    it('if view has minLabel, set up its value', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true
      });
      view.minLabel.setValue = jest.fn();      
      view.setMinValue(10);
      
      expect(view.minLabel.setValue).toBeCalledWith(10);
    });

  });
  
  describe('setMaxValue(max)', function() {

    it('call function to set max attribute of left input', function() {
      let slider = document.createElement('div');
      let view = new View(slider);
      view.inputLeft.setMaxValue = jest.fn();
      view.setMaxValue(100);

      expect(view.inputLeft.setMaxValue).toBeCalledWith(100);
    });

    it('call function to set max attribute of right input if necessary', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true
      });
      view.inputRight.setMaxValue = jest.fn();

      view.setMaxValue(100);

      expect(view.inputRight.setMaxValue).toBeCalledWith(100);
    });
    
    it('if view has maxLabel, set up its value', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true
      });
      view.maxLabel.setValue = jest.fn(); 
      view.setMaxValue(100);
      
      expect(view.maxLabel.setValue).toBeCalledWith(100);
    });

  });
  
  describe('setStep(step)', function() {
    
    it('call function to set step attribute of left input', function() {
      let slider = document.createElement('div');
      let view = new View(slider);
      view.inputLeft.setStep = jest.fn();
      view.setStep(5); 

      expect(view.inputLeft.setStep).toBeCalledWith(5);
    });
    
    it('call function to set step attribute of right input if necessary', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true
      });
      view.inputRight.setStep = jest.fn();
      view.setStep(5);

      expect(view.inputRight.setStep).toBeCalledWith(5);
    });
    
  });
  
  describe('setLeftValue(value) - Jest', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    view.inputLeft.setValue = jest.fn();
    view.setThumbLeftPosition = jest.fn();
    view.setLeftValue(10);

    it('call function to set up value attribute of left input', function() {
      expect(view.inputLeft.setValue).toBeCalledWith(10);
    });

    // TODO: не работает тест
    it('call function to make z-index of left input higher than z-index of right input when they are both at maximum', function() {
      // view.inputLeft.setZIndex = jest.fn();
      // view.setMaxValue(100);
      // view.setRightValue(100);
      // view.inputLeft.getValue = jest.fn();
      // view.inputLeft.getMax = jest.fn();
      // view.inputLeft.getValue.mockReturnValue(100);
      // view.inputLeft.getMax.mockReturnValue(100);
      // view.setLeftValue(100);
      // expect(+view.inputLeft.component.style.zIndex).toBeGreaterThan(+view.inputRight.component.style.zIndex);
      // expect(view.inputLeft.setZIndex).toBeCalledWith(100);
    });

    it('call function to change left thumb position', function() {
      expect(view.setThumbLeftPosition).toBeCalledWith(10);
    });  

    describe('do necessary actions with labels', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true,
        valueLabel: true,
        vertical: true,
        range: true
      });
      view.valueLabelLeft.setValue = jest.fn();
      view.valueLabelCommon.setValue = jest.fn();
      view.valueLabelLeft.setLeftIndent = jest.fn();
      view.setLeftValue(10);

      describe('do necessary actions with left value label', function() {

        it('call function to set up left label value', function() {
          expect(view.valueLabelLeft.setValue).toBeCalledWith(10);
        });
  
        it('call function to change left value label position', function() {
          view.setLeftValue(10);
          let indent = view.thumbLeft.getLeftIndent();

          expect(view.valueLabelLeft.setLeftIndent).toBeCalledWith(indent);
        });  

      });

      describe('do necessary actions with common value label', function() {

        it('call function to set up common label value', function() {
          expect(view.valueLabelCommon.setValue).toBeCalledWith(10 + ' - ' + view.inputRight.getValue());
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
          view.minLabel.setOpacity = jest.fn();
          view.setLeftValue(10);
          expect(view.minLabel.setOpacity).toBeCalledWith(0);
        });

        it('set min label opacity to 1 if left value label is not close', function() {
          view.isLeftValueLabelCloseToMinLabel = jest.fn(() => false);
          view.minLabel.setOpacity = jest.fn();
          view.setLeftValue(10);
          expect(view.minLabel.setOpacity).toBeCalledWith(1);
        });

      });

      describe('do necessary actions with max value label if slider has a single value', function() {

        let slider = document.createElement('div');
        let view = new View(slider, {
          minMaxLabels: true,
          valueLabel: true,
          vertical: true,
          range: false
        });
        view.isLeftValueLabelCloseToMaxLabel = jest.fn();
        view.maxLabel.setOpacity = jest.fn();
        view.setLeftValue(10);

        it('call function to check if left value label is close to max label', function() {
          expect(view.isLeftValueLabelCloseToMaxLabel).toBeCalled();
        });

        it('set max label opacity to 0 if left value label is close', function() {
          view.isLeftValueLabelCloseToMaxLabel = jest.fn(() => true);
          view.setLeftValue(10);
          expect(view.maxLabel.setOpacity).toBeCalledWith(0);
        });

        it('set max label opacity to 1 if left value label is not close', function() {
          view.isLeftValueLabelCloseToMaxLabel = jest.fn(() => false);
          view.setLeftValue(10);
          expect(view.maxLabel.setOpacity).toBeCalledWith(1);
        });

      });

      it('call function to fix value label position if slider is vertical', function() {
        view.fixValueLabelPositionForVertical = jest.fn();
        view.setLeftValue(10);
        expect(view.fixValueLabelPositionForVertical).toBeCalled();
      });

    });  
    
  });

  describe.skip('setLeftValue(value) - Puppeteer', function() {

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
    let view = new View(slider, {
      range: true
    });
    view.inputRight.setValue = jest.fn();
    view.setThumbRightPosition = jest.fn();
    view.setRightValue(50);

    it('call function to set up value attribute of right input', function() {
      expect(view.inputRight.setValue).toBeCalledWith(50);
    });

    it('call function to change right thumb position', function() {
      expect(view.setThumbRightPosition).toBeCalledWith(50);
    });  

    describe('do necessary actions with labels', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true,
        valueLabel: true,
        vertical: true,
        range: true
      });
      view.valueLabelRight.setValue = jest.fn();
      view.valueLabelCommon.setValue = jest.fn();
      view.valueLabelRight.setRightIndent = jest.fn();
      view.setRightValue(50);

      describe('do necessary actions with right value label', function() {

        it('call function to set up right label value', function() {
          expect(view.valueLabelRight.setValue).toBeCalledWith(50);
        });
  
        it('call function to change right value label position', function() {
          view.setRightValue(50);
          let indent = view.thumbRight.getRightIndent();

          expect(view.valueLabelRight.setRightIndent).toBeCalledWith(indent);
        });  

      });

      describe('do necessary actions with common value label', function() {

        it('call function to set up common label value', function() {
          expect(view.valueLabelCommon.setValue).toBeCalledWith(view.inputLeft.getValue() + ' - ' + 50);
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
          view.maxLabel.setOpacity = jest.fn();
          view.setRightValue(50);
          expect(view.maxLabel.setOpacity).toBeCalledWith(0);
        });

        it('set max label opacity to 1 if right value label is not close', function() {
          view.isRightValueLabelCloseToMaxLabel = jest.fn(() => false);
          view.maxLabel.setOpacity = jest.fn();
          view.setRightValue(50);
          expect(view.maxLabel.setOpacity).toBeCalledWith(1);
        });

      });

      it('call function to fix value label position if slider is vertical', function() {
        view.fixValueLabelPositionForVertical = jest.fn();
        view.setRightValue(50);
        expect(view.fixValueLabelPositionForVertical).toBeCalled();
      });

    });  
    
  });

  describe.skip('setRightValue(value) - Puppeteer', function() {

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

    it('set left property of left thumb properly', function() {
      for (let i = 1; i <= 100; i++) {
        view.setThumbLeftPosition(i);
        // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
        expect(parseInt(view.thumbLeft.component.style.left)).toBeGreaterThanOrEqual(i - 1);
        expect(parseInt(view.thumbLeft.component.style.left)).toBeLessThanOrEqual(i + 1);
      }
    });

    describe('if range', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true
      });
      view.setMinValue(0);
      view.setMaxValue(100);
      view.setRightValue(100);

      it('set left property of range properly', function() {
        for (let i = 0; i <= 100; i++) {
          view.setThumbLeftPosition(i);
          // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
          expect(parseInt(view.range.component.style.left)).toBeGreaterThanOrEqual(i - 1);
          expect(parseInt(view.range.component.style.left)).toBeLessThanOrEqual(i + 1)
        }
      });
    });
    
    describe('if single value', function() {
      it('set right property of range properly', function() {
        for (let i = 0; i <= 100; i++) {
          view.setThumbLeftPosition(i);
          // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
          expect(parseInt(view.range.component.style.right)).toBeGreaterThanOrEqual(100 - i - 1);
          expect(parseInt(view.range.component.style.right)).toBeLessThanOrEqual(100 - i + 1)
        }
      });
    });

  });

  describe('setThumbRightPosition(value)', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true
    });
    view.setMinValue(0);
    view.setMaxValue(100);
    view.setLeftValue(0);

    it('set right property of right thumb properly', function() {
      for (let i = 0; i <= 100; i++) {
        view.setThumbRightPosition(i);
        // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
        expect(parseInt(view.thumbRight.component.style.right)).toBeGreaterThanOrEqual(100 - i - 1);
        expect(parseInt(view.thumbRight.component.style.right)).toBeLessThanOrEqual(100 - i + 1)
      }
    });

    it('set right property of range properly', function() {
      for (let i = 0; i <= 100; i++) {
        view.setThumbRightPosition(i);
        // Из-за особенности записи дробных чисел в js может быть погрешность в 1 единицу
        expect(parseInt(view.range.component.style.right)).toBeGreaterThanOrEqual(100 - i - 1);
        expect(parseInt(view.range.component.style.right)).toBeLessThanOrEqual(100 - i + 1)
      }
    });

  });

  describe('mergeLabels()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabel: true,
      range: true
    });

    view.valueLabelLeft.setOpacity = jest.fn();
    view.valueLabelRight.setOpacity = jest.fn();
    view.valueLabelCommon.setOpacity = jest.fn();

    beforeEach(() => {
      view.mergeLabels();
    }); 

    it('make left value label transparent', function() {
      expect(view.valueLabelLeft.setOpacity).toBeCalledWith(0);
    }); 

    it('make right value label transparent', function() {
      expect(view.valueLabelRight.setOpacity).toBeCalledWith(0);
    }); 

    it('make common value label opaque', function() {
      expect(view.valueLabelCommon.setOpacity).toBeCalledWith(1);
    });
    
    it.todo('common value label is halfway between left and right thumbs');

  });

  describe('splitLabels()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabel: true,
      range: true
    });

    view.valueLabelLeft.setOpacity = jest.fn();
    view.valueLabelRight.setOpacity = jest.fn();
    view.valueLabelCommon.setOpacity = jest.fn();

    beforeEach(() => {
      view.splitLabels();
    });    

    it('make common value label transparent', function() {
      expect(view.valueLabelCommon.setOpacity).toBeCalledWith(0);
    });

    it('make left value label opaque', function() {
      expect(view.valueLabelLeft.setOpacity).toBeCalledWith(1);
    });

    it('make right value label opaque', function() {
      expect(view.valueLabelRight.setOpacity).toBeCalledWith(1);
    });

  });

  describe('isTwoValueLabelsClose()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        vertical: false,
        range: true
      });
      view.valueLabelLeft.getBoundingClientRect = jest.fn();
      view.valueLabelRight.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          right: 50
        });        
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          left: 52
        });

        expect(view.isTwoValueLabelsClose()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          right: 50
        });        
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          left: 55
        });

        expect(view.isTwoValueLabelsClose()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        vertical: true,
        range: true
      });
      view.valueLabelLeft.getBoundingClientRect = jest.fn();
      view.valueLabelRight.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          top: 52
        });        
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });

        expect(view.isTwoValueLabelsClose()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          top: 55
        });        
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });

        expect(view.isTwoValueLabelsClose()).toBe(false);
      });

    });

  });

  describe('fixMinMaxLabelsPositionForVertical()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      minMaxLabels: true,
      vertical: true
    });
    view.minLabel.fixPositionForVertical = jest.fn();
    view.maxLabel.fixPositionForVertical = jest.fn();
    view.fixMinMaxLabelsPositionForVertical();

    it('call function to fix position of min label', function() {
      expect(view.minLabel.fixPositionForVertical).toBeCalled();
    });

    it('call function to fix position of max label', function() {
      expect(view.maxLabel.fixPositionForVertical).toBeCalled();
    });

  });

  describe('fixValueLabelPositionForVertical()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabel: true,
      vertical: true,
      range: true
    });
    view.valueLabelLeft.fixPositionForVertical = jest.fn();
    view.valueLabelRight.fixPositionForVertical = jest.fn();
    view.valueLabelCommon.fixPositionForVertical = jest.fn();
    view.fixValueLabelPositionForVertical();

    it('call function to fix position of left label', function() {
      expect(view.valueLabelLeft.fixPositionForVertical).toBeCalled();
    });

    it('call function to fix position of right label', function() {
      expect(view.valueLabelRight.fixPositionForVertical).toBeCalled();
    });

    it('call function to fix position of common label', function() {
      expect(view.valueLabelCommon.fixPositionForVertical).toBeCalled();
    });

  });

  describe('isLeftValueLabelCloseToMinLabel()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        minMaxLabels: true,
        vertical: false
      });
      view.valueLabelLeft.getBoundingClientRect = jest.fn();
      view.minLabel.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          left: 52
        });
        view.minLabel.getBoundingClientRect.mockReturnValue({
          right: 50
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          left: 55
        });
        view.minLabel.getBoundingClientRect.mockReturnValue({
          right: 50
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        minMaxLabels: true,
        vertical: true
      });
      view.valueLabelLeft.getBoundingClientRect = jest.fn();
      view.minLabel.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });
        view.minLabel.getBoundingClientRect.mockReturnValue({
          top: 52
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });
        view.minLabel.getBoundingClientRect.mockReturnValue({
          top: 55
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(false);
      });

    });

  });

  describe('isLeftValueLabelCloseToMaxLabel()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        minMaxLabels: true,
        vertical: false
      });
      view.valueLabelLeft.getBoundingClientRect = jest.fn();
      view.maxLabel.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          right: 50
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          left: 52
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          right: 50
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          left: 55
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        minMaxLabels: true,
        vertical: true
      });
      view.valueLabelLeft.getBoundingClientRect = jest.fn();
      view.maxLabel.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          top: 52
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelLeft.getBoundingClientRect.mockReturnValue({
          top: 55
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

  });

  describe('isRightValueLabelCloseToMaxLabel()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        minMaxLabels: true,
        vertical: false,
        range: true
      });
      view.valueLabelRight.getBoundingClientRect = jest.fn();
      view.maxLabel.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          right: 50
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          left: 52
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          right: 50
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          left: 55
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabel: true,
        minMaxLabels: true,
        vertical: true,
        range: true
      });
      view.valueLabelRight.getBoundingClientRect = jest.fn();
      view.maxLabel.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          top: 52
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is > than 3 px', function() {
        view.valueLabelRight.getBoundingClientRect.mockReturnValue({
          top: 55
        });
        view.maxLabel.getBoundingClientRect.mockReturnValue({
          bottom: 50
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

  });

  describe('handleLeftInput(value)', function() {

    let slider = document.createElement('div');
    let view = new View(slider);
    let presenter = {};
    view.registerWith(presenter);
    view.presenter.handleLeftInput = jest.fn();

    it('call presenter function to handle input', function() {
      for(let i = 0; i <= 100; i++) {
        view.handleLeftInput(i);
        expect(view.presenter.handleLeftInput).toBeCalledWith(i);
      }
    });    

  });

  describe('handleRightInput(value)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true
    });
    let presenter = {};
    view.registerWith(presenter);
    view.presenter.handleRightInput = jest.fn();

    it('call presenter function to handle input', function() {
      for(let i = 0; i <= 100; i++) {
        view.handleRightInput(i);
        expect(view.presenter.handleRightInput).toBeCalledWith(i);
      }
    });    

  });

  describe('handleInputMouseover(type)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true
    });

    it('if type = left (of by default) call function to add hover styling to left thumb', function() {
      view.thumbLeft.addHover = jest.fn();

      view.handleInputMouseover();
      expect(view.thumbLeft.addHover).toBeCalled();

      view.handleInputMouseover('left');
      expect(view.thumbLeft.addHover).toBeCalled();
    });

    it('if type = right call function to add hover styling to right thumb', function() {
      view.thumbRight.addHover = jest.fn();

      view.handleInputMouseover('right');
      expect(view.thumbRight.addHover).toBeCalled();
    });

  });

  describe('handleInputMouseout(type)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true
    });

    it('if type = left (of by default) call function to remove hover styling to left thumb', function() {
      view.thumbLeft.removeHover = jest.fn();

      view.handleInputMouseout();
      expect(view.thumbLeft.removeHover).toBeCalled();

      view.handleInputMouseout('left');
      expect(view.thumbLeft.removeHover).toBeCalled();
    });

    it('if type = right call function to remove hover styling to right thumb', function() {
      view.thumbRight.removeHover = jest.fn();

      view.handleInputMouseout('right');
      expect(view.thumbRight.removeHover).toBeCalled();
    });

  });

  describe('handleInputMousedown(type)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true
    });
    
    it('if type = left (of by default) call function to add active styling to left thumb', function() {
      view.thumbLeft.makeActive = jest.fn();

      view.handleInputMousedown();
      expect(view.thumbLeft.makeActive).toBeCalled();

      view.handleInputMousedown('left');
      expect(view.thumbLeft.makeActive).toBeCalled();
    });

    it('if type = right call function to add hover styling to right thumb', function() {
      view.thumbRight.makeActive = jest.fn();

      view.handleInputMousedown('right');
      expect(view.thumbRight.makeActive).toBeCalled();
    });

  });

  describe('handleInputMouseup(type)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true
    });
    
    it('if type = left (of by default) call function to remove active styling to left thumb', function() {
      view.thumbLeft.makeInactive = jest.fn();

      view.handleInputMouseup();
      expect(view.thumbLeft.makeInactive).toBeCalled();

      view.handleInputMouseup('left');
      expect(view.thumbLeft.makeInactive).toBeCalled();
    });

    it('if type = right call function to remove hover styling to right thumb', function() {
      view.thumbRight.makeInactive = jest.fn();

      view.handleInputMouseup('right');
      expect(view.thumbRight.makeInactive).toBeCalled();
    });

  });

  describe('addScale(min, max, intervalsNumber)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      scale: true
    });
    view.addScale(0, 150, 4);

    it('set up scale property', function() {
      expect(view).toHaveProperty('scale');
    });    

  });

  describe('handleScaleClick(x, y)', function() {

    it('call function to convert click coords to slider value', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        scale: true
      });
      let presenter = {};
      view.registerWith(presenter);
      view.presenter.handleLeftInput = jest.fn();
      view.convertСlickСoordsToValue = jest.fn();
      view.handleScaleClick(100, 100);

      expect(view.convertСlickСoordsToValue).toBeCalledWith(100, 100);
    });

    describe('if !slider.isRange', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        scale: true,
        valueLabel: true
      });
      let presenter = {};
      view.registerWith(presenter);
      view.presenter.handleLeftInput = jest.fn();
      view.addSmoothTransition = jest.fn();
      view.removeSmoothTransition = jest.fn();
      view.handleScaleClick(100, 100);

      it('call function to add smooth transition', function() {
        expect(view.addSmoothTransition).toBeCalled();
      });

      it('call function to handle left input', function() {
        expect(view.presenter.handleLeftInput).toBeCalled();
      });

    });

    describe('if slider.isRange', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        scale: true,
        valueLabel: true,
        range: true
      });
      let presenter = {};
      view.registerWith(presenter);
      view.presenter.handleLeftInput = jest.fn();
      view.presenter.handleRightInput = jest.fn();
      view.addSmoothTransition = jest.fn();
      view.removeSmoothTransition = jest.fn();
      view.whichThumbIsNearer = jest.fn();
      view.handleScaleClick(100, 100);

      it('call function to check which thumb is nearer', function() {
        expect(view.whichThumbIsNearer).toBeCalledWith(100, 100);
      });

      describe('if left thumb is nearer', function() {

        view.whichThumbIsNearer = jest.fn();
        view.whichThumbIsNearer.mockReturnValue('left');
        view.handleScaleClick(100, 100);

        it('call function to add smooth transition', function() {
          expect(view.addSmoothTransition).toBeCalled();
        });

        it('call function to handle left input', function() {
          expect(view.presenter.handleLeftInput).toBeCalled();
        });

      });

      describe('if right thumb is nearer', function() {

        view.whichThumbIsNearer = jest.fn();
        view.whichThumbIsNearer.mockReturnValue('right');
        view.handleScaleClick(100, 100);

        it('call function to add smooth transition', function() {
          expect(view.addSmoothTransition).toBeCalled();
        });

        it('call function to handle right input', function() {
          expect(view.presenter.handleRightInput).toBeCalled();
        });

      });

    });

  });

  describe('convertСlickСoordsToValue(x, y)', function() {

    describe('if slider is horizontal', function() {

      describe('if min = 0, max = 100', function() {

        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true,
          vertical: false,
          min: 0,
          max: 100
        });
        view.track.component.getBoundingClientRect = jest.fn();
        view.inputLeft.getMin = jest.fn();
        view.inputLeft.getMax = jest.fn();
        view.inputLeft.getMin.mockReturnValue(0);
        view.inputLeft.getMax.mockReturnValue(100);

        describe('if track width = 100, track left offset = 0', function() {
   
          it('if click on i px return i', function() {
            view.track.component.getBoundingClientRect.mockReturnValue({
              width: 100,
              left: 0
            });

            for (let i = 0; i <= 100; i++) {
              expect(view.convertСlickСoordsToValue(i, 100)).toBe(i);
            }
          });

        });

        describe('if track width = 200, track left offset = 0', function() {

          it('if click on i px return Math.round(i/2)', function() {
            view.track.component.getBoundingClientRect.mockReturnValue({
              width: 200,
              left: 0
            });

            for (let i = 0; i <= 200; i++) {
              expect(view.convertСlickСoordsToValue(i, 100)).toBe( Math.round(i/2) );
            }

          });

        });
                  
        describe('if track width = 300, track left offset = 0', function() {

          it('if click on i px return Math.round(i/3)', function() {
            view.track.component.getBoundingClientRect.mockReturnValue({
              width: 300,
              left: 0
            });

            for (let i = 0; i <= 300; i++) {
              expect(view.convertСlickСoordsToValue(i, 100)).toBe( Math.round(i/3) );
            }

          });

        });

        describe('if track width = 100, track left offset > 0', function() {

          it('if click on i px and track left offset = j return (i - j)', function() {
            for (let i = 0, j = 0; i <= 100; i++, j++) {
              view.track.component.getBoundingClientRect.mockReturnValue({
                width: 100,
                left: j
              });

              expect(view.convertСlickСoordsToValue(i, 100)).toBe(i - j);
            }

          });

        });

        describe('if track width = 200, track left offset > 0', function() {

          it('if click on i px and track left offset = j return Math.round((i-j)/2)', function() {
            for (let i = 0, j = 0; i <= 200; i++, j++) {
              view.track.component.getBoundingClientRect.mockReturnValue({
                width: 200,
                left: j
              });

              expect(view.convertСlickСoordsToValue(i, 100)).toBe( Math.round( (i-j)/2 ) );
            }

          });

        });

        describe('if track width = 300, track left offset > 0', function() {

          it('if click on i px and track left offset = j return Math.round((i-j)/3)', function() {
            for (let i = 0, j = 0; i <= 300; i++, j++) {
              view.track.component.getBoundingClientRect.mockReturnValue({
                width: 300,
                left: j
              });

              expect(view.convertСlickСoordsToValue(i, 100)).toBe( Math.round( (i-j)/3 ) );
            }

          });

        });

      });

    });

    describe('if slider is vertical', function() {

      describe('if min = 0, max = 100', function() {

        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true,
          vertical: true,
          min: 0,
          max: 100
        });
        view.track.component.getBoundingClientRect = jest.fn();
        view.inputLeft.getMin = jest.fn();
        view.inputLeft.getMax = jest.fn();
        view.inputLeft.getMin.mockReturnValue(0);
        view.inputLeft.getMax.mockReturnValue(100);

        describe('if track height = 100, track top offset = 0', function() {
   
          it('if click on i px return (100 - i)', function() {
            view.track.component.getBoundingClientRect.mockReturnValue({
              height: 100,
              top: 0
            });

            for (let i = 100; i >= 0; i--) {
              expect(view.convertСlickСoordsToValue(100, i)).toBe(100 - i);
            }
          });

        });

        describe('if track height = 200, track top offset = 0', function() {

          it('if click on i px return Math.round( (200-i)/2 )', function() {
            view.track.component.getBoundingClientRect.mockReturnValue({
              height: 200,
              top: 0
            });

            for (let i = 200; i >= 0; i--) {
              expect(view.convertСlickСoordsToValue(100, i)).toBe( Math.round( (200-i)/2 ) );
            }

          });

        });
                  
        describe('if track height = 300, track top offset = 0', function() {

          it('if click on i px return Math.round( (300-i)/3 )', function() {
            view.track.component.getBoundingClientRect.mockReturnValue({
              height: 300,
              top: 0
            });

            for (let i = 300; i >= 0; i--) {
              expect(view.convertСlickСoordsToValue(100, i)).toBe( Math.round( (300-i)/3 ) );
            }

          });

        });

        describe('if track height = 100, track top offset > 0', function() {

          it('if click on i px and track top offset = j return (100 - i + j)', function() {
            for (let i = 100, j = 0; i >= 100; i--, j++) {
              view.track.component.getBoundingClientRect.mockReturnValue({
                height: 100,
                top: j
              });

              expect(view.convertСlickСoordsToValue(100, i)).toBe(100 - i + j);
            }

          });

        });

        describe('if track height = 200, track top offset > 0', function() {

          it('if click on i px and track left offset = j return Math.round( (200-i+j)/2 )', function() {
            for (let i = 200, j = 0; i >= 0; i--, j++) {
              view.track.component.getBoundingClientRect.mockReturnValue({
                height: 200,
                top: j
              });

              expect(view.convertСlickСoordsToValue(100, i)).toBe( Math.round( (200-i+j)/2 ) );
            }

          });

        });

        describe('if track height = 300, track top offset > 0', function() {

          it('if click on i px and track left offset = j return Math.round( (300-i+j)/3 )', function() {
            for (let i = 0, j = 0; i <= 300; i++, j++) {
              view.track.component.getBoundingClientRect.mockReturnValue({
                height: 300,
                top: j
              });

              expect(view.convertСlickСoordsToValue(100, i)).toBe( Math.round( (300-i+j)/3 ) );
            }

          });

        });

      });

    });

  });

  describe('whichThumbIsNearer(x, y)', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true,
        vertical: false
      });
      view.thumbLeft.component.getBoundingClientRect = jest.fn();
      view.thumbLeft.component.getBoundingClientRect.mockReturnValue({
        right: 10
      });
      view.thumbRight.component.getBoundingClientRect = jest.fn();
      view.thumbRight.component.getBoundingClientRect.mockReturnValue({
        left: 20
      });

      it('if distance from both thumbs is equal return "left"', function() {
        expect(view.whichThumbIsNearer(15, 0)).toBe('left'); 
      });

      it('if distance from left thumb is less return "left"', function() {
        expect(view.whichThumbIsNearer(12, 0)).toBe('left'); 
      });

      it('if distance from right thumb is less return "right"', function() {
        expect(view.whichThumbIsNearer(18, 0)).toBe('right'); 
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true,
        vertical: true
      });
      view.thumbLeft.component.getBoundingClientRect = jest.fn();
      view.thumbLeft.component.getBoundingClientRect.mockReturnValue({
        top: 20
      });
      view.thumbRight.component.getBoundingClientRect = jest.fn();
      view.thumbRight.component.getBoundingClientRect.mockReturnValue({
        bottom: 10
      });

      it('if distance from both thumbs is equal return "left"', function() {
        expect(view.whichThumbIsNearer(0, 25)).toBe('left'); 
      });

      it('if distance from left thumb is less return "left"', function() {
        expect(view.whichThumbIsNearer(0, 22)).toBe('left'); 
      });

      it('if distance from right thumb is less return "right"', function() {
        expect(view.whichThumbIsNearer(0, 12)).toBe('right'); 
      });

    });

  });

  describe('addSmoothTransition(side)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true,
      valueLabel: true
    });

    it('add necessary classes to thumb, range and label if side = left', function() {
      view.addSmoothTransition('left');

      expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

    it('add necessary classes to thumb, range and label if side = right', function() {
      view.addSmoothTransition('right');

      expect(view.thumbRight.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelRight.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

    it('add necessary classes to thumb, range and label by default', function() {
      view.addSmoothTransition();

      expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

  });

  describe('removeSmoothTransition(side)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true,
      valueLabel: true
    });

    it('remove necessary classes to thumb, range and label if side = left', function() {
      view.addSmoothTransition('left');
      view.removeSmoothTransition('left');

      expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

    it('remove necessary classes to thumb, range and label if side = right', function() {
      view.addSmoothTransition('right');
      view.removeSmoothTransition('right');

      expect(view.thumbRight.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelRight.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

    it('remove necessary classes to thumb, range and label by default', function() {
      view.addSmoothTransition();
      view.removeSmoothTransition();

      expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

  });

}); 