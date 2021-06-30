import {Model} from '../model/model.js';
import {View} from '../view/view.js';
import {Presenter} from './presenter.js';

describe('Presenter', function() {

    jest.mock('../model/model.js');
    jest.mock('../view/view.js');
  
    let slider = document.createElement('div');
    let model = new Model();
    let view = new View(slider);
    let presenter = new Presenter(model, view);
  
    describe('consructor()', function() {
  
      it('set up model', function() {
        expect(presenter.model).toBe(model);
      });
  
      it('set up view', function() {
        expect(presenter.view).toBe(view);
      });
  
      it('set min value for view', function() {
        view.setMinValue = jest.fn();
        let presenter = new Presenter(model, view);

        expect(view.setMinValue).toBeCalledWith(model.min);
      });
  
      it('set max value for view', function() {
        view.setMaxValue = jest.fn();
        let presenter = new Presenter(model, view);

        expect(view.setMaxValue).toBeCalledWith(model.max);
      });
  
      it('set left value for view', function() {
        view.setLeftValue = jest.fn();
        let presenter = new Presenter(model, view);

        expect(view.setLeftValue).toBeCalledWith(model.leftValue);
      });
  
      it('set right value for view if range', function() {
        let model = new Model({
          range: true
        });
        let view = new View(slider, {
          range: true
        });
        view.setRightValue = jest.fn();
        let presenter = new Presenter(model, view);

        expect(view.setRightValue).toBeCalledWith(model.rightValue);
      });
  
      it('set step for view', function() {
        view.setStep = jest.fn();
        let presenter = new Presenter(model, view);
        expect(view.setStep).toBeCalledWith(model.step);
      });

      it('add scale for view if it has scale', function() {
        let model = new Model();
        let view = new View(slider, {
          scale: true
        });
        view.addScale = jest.fn();
        let presenter = new Presenter(model, view);

        expect(view.addScale).toBeCalledWith(model.min, model.max, view.scaleIntervals);
      });
  
    });
  
    describe('handleLeftInput(value)', function() {
  
      it('set left value for model', function() {
        model.setLeftValue = jest.fn();
        presenter.handleLeftInput(10);

        expect(model.setLeftValue).toBeCalledWith(10);
      });
  
      it('set left value for view', function() {
        view.setLeftValue = jest.fn();
        presenter.handleLeftInput(10);

        expect(view.setLeftValue).toBeCalledWith(model.leftValue);
      });
  
    });
  
    describe('handleRightInput(value)', function() {
  
      it('set right value for model', function() {
        let model = new Model({
          range: true
        });
        let view = new View(slider, {
          range: true
        });
        model.setRightValue = jest.fn();
        let presenter = new Presenter(model, view);
        presenter.handleRightInput(10);

        expect(model.setRightValue).toBeCalledWith(10);
      });
  
      it('set right value for view', function() {
        let model = new Model({
          range: true
        });
        let view = new View(slider, {
          range: true
        });
        view.setRightValue = jest.fn();
        let presenter = new Presenter(model, view);
        presenter.handleRightInput(10);
        
        expect(view.setRightValue).toBeCalledWith(model.rightValue);
      });
  
    });
  
  });