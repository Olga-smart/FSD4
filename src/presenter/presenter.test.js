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
        expect(view.setMinValue).toBeCalled();
      });
  
      it('set max value for view', function() {
        view.setMaxValue = jest.fn();
        let presenter = new Presenter(model, view);
        expect(view.setMaxValue).toBeCalled();
      });
  
      it('set left value for view', function() {
        view.setLeftValue = jest.fn();
        let presenter = new Presenter(model, view);
        expect(view.setLeftValue).toBeCalled();
      });
  
      it('set right value for view', function() {
        view.setRightValue = jest.fn();
        let presenter = new Presenter(model, view);
        expect(view.setRightValue).toBeCalled();
      });
  
      it('set step for view', function() {
        view.setStep = jest.fn();
        let presenter = new Presenter(model, view);
        expect(view.setStep).toBeCalled();
      });
  
    });
  
    describe('handleLeftInput(value)', function() {
  
      it('set left value for model', function() {
        model.setLeftValue = jest.fn();
        presenter.handleLeftInput(10);
        expect(model.setLeftValue).toBeCalled();
      });
  
      it('set left value for view', function() {
        view.setLeftValue = jest.fn();
        presenter.handleLeftInput(10);
        expect(view.setLeftValue).toBeCalled();
      });
  
    });
  
    describe('handleRightInput(value)', function() {
  
      it('set rightt value for model', function() {
        model.setRightValue = jest.fn();
        presenter.handleRightInput(10);
        expect(model.setRightValue).toBeCalled();
      });
  
      it('set rightt value for view', function() {
        view.setRightValue = jest.fn();
        presenter.handleRightInput(10);
        expect(view.setRightValue).toBeCalled();
      });
  
    });
  
  });