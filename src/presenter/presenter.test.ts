import {Model} from '../model/model';
import {View} from '../view/view';
import {Presenter} from './presenter';

describe('Presenter', function() {  
  jest.mock('../model/model');
  jest.mock('../view/view');

  describe('constructor()', function() {

    let slider = document.createElement('div');
    let model = new Model();
    let view = new View(slider);
    let presenter = new Presenter(model, view);

    it('set up model', function() {
      expect(presenter.model).toBe(model);
    });

    it('set up view', function() {
      expect(presenter.view).toBe(view);
    });

    it('set min value for view', function() {
      view.setMinValue = jest.fn();
      let presenter = new Presenter(model, view);

      expect(presenter.view.setMinValue).toBeCalledWith(model.min);
    });

    it('set max value for view', function() {
      view.setMaxValue = jest.fn();
      let presenter = new Presenter(model, view);

      expect(presenter.view.setMaxValue).toBeCalledWith(model.max);
    });

    it('set left value for view', function() {
      jest.spyOn(Presenter.prototype, 'passLeftValueToView');
      let presenter = new Presenter(model, view);

      expect(presenter.passLeftValueToView).toBeCalledWith(model.leftValue);
    });

    it('set right value for view if range', function() {
      let model = new Model({
        range: true
      });
      let view = new View(slider, {
        range: true
      });
      jest.spyOn(Presenter.prototype, 'passRightValueToView');
      let presenter = new Presenter(model, view);

      expect(presenter.passRightValueToView).toBeCalledWith(model.rightValue);
    });

    it('add scale for view if it has scale', function() {
      let model = new Model();
      let view = new View(slider, {
        scale: true
      });
      view.addScale = jest.fn();
      let presenter = new Presenter(model, view);

      expect(presenter.view.addScale).toBeCalledWith(model.min, model.max, view.scaleIntervals);
    });

    describe('fix labels container height if slider is horizontal and has labels', function() {

      it('if slider has only value labels', function() {
        let model = new Model();
        let view = new View(slider, {
          valueLabels: true
        });
        view.fixLabelsContainerHeightForHorizontal = jest.fn();
        let presenter = new Presenter(model, view);
  
        expect(presenter.view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });

      it('if slider has only min&max labels', function() {
        let model = new Model();
        let view = new View(slider, {
          minMaxLabels: true  
        });
        view.fixLabelsContainerHeightForHorizontal = jest.fn();
        let presenter = new Presenter(model, view);
  
        expect(presenter.view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });

      it('if slider has both value and min&max labels', function() {
        let model = new Model();
        let view = new View(slider, {
          valueLabels: true,
          minMaxLabels: true  
        });
        view.fixLabelsContainerHeightForHorizontal = jest.fn();
        let presenter = new Presenter(model, view);
  
        expect(presenter.view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });
      
    });

    describe('fix labels container width if slider is vertical and has labels', function() {

      it('if slider has only value labels', function() {
        let model = new Model();
        let view = new View(slider, {
          vertical: true,
          valueLabels: true  
        });
        view.fixLabelsContainerWidthForVertical = jest.fn();
        let presenter = new Presenter(model, view);
  
        expect(presenter.view.fixLabelsContainerWidthForVertical).toBeCalled();
      });

      it('if slider has only min&max labels', function() {
        let model = new Model();
        let view = new View(slider, {
          vertical: true,
          minMaxLabels: true  
        });
        view.fixLabelsContainerWidthForVertical = jest.fn();
        let presenter = new Presenter(model, view);
  
        expect(presenter.view.fixLabelsContainerWidthForVertical).toBeCalled();
      });

      it('if slider has both value and min&max labels', function() {
        let model = new Model();
        let view = new View(slider, {
          vertical: true,
          valueLabels: true,
          minMaxLabels: true  
        });
        view.fixLabelsContainerWidthForVertical = jest.fn();
        let presenter = new Presenter(model, view);
  
        expect(presenter.view.fixLabelsContainerWidthForVertical).toBeCalled();
      });
      
    });

  });

  describe('handleLeftInput(px)', function() {

    let slider = document.createElement('div');
    let model = new Model();
    let view = new View(slider);
    let presenter = new Presenter(model, view);

    presenter.convertPxToValue = jest.fn();
    presenter.convertValueToPx = jest.fn();
    model.setLeftValue = jest.fn();
    view.setLeftValue = jest.fn();

    it('convert px to value', function() {        
      for (let i = 0; i <= 100; i++) {
        presenter.handleLeftInput(i);
        expect(presenter.convertPxToValue).toBeCalledWith(i);
      }
    });

    it('set left value for model', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.handleLeftInput(i);
        expect(model.setLeftValue).toBeCalledWith(presenter.convertPxToValue(i));
      }
    });

    it('convert value to px after converting px to value', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.handleLeftInput(i);
        expect(presenter.convertValueToPx).toBeCalledWith(presenter.convertPxToValue(i));
      }
    });

    it('set left value for view', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.handleLeftInput(i);
        let value = presenter.convertPxToValue(i);
        let px = presenter.convertValueToPx(value);
        expect(view.setLeftValue).toBeCalledWith(value, px);
      }
    });

  });

  describe('handleRightInput(px)', function() {

    let slider = document.createElement('div');
    let model = new Model();
    let view = new View(slider);
    let presenter = new Presenter(model, view);

    presenter.convertPxToValue = jest.fn();
    presenter.convertValueToPx = jest.fn();
    model.setRightValue = jest.fn();
    view.setRightValue = jest.fn();

    it('convert px to value', function() {        
      for (let i = 0; i <= 100; i++) {
        presenter.handleRightInput(i);
        expect(presenter.convertPxToValue).toBeCalledWith(i);
      }
    });

    it('set right value for model', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.handleRightInput(i);
        expect(model.setRightValue).toBeCalledWith(presenter.convertPxToValue(i));
      }
    });

    it('convert value to px after converting px to value', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.handleRightInput(i);
        expect(presenter.convertValueToPx).toBeCalledWith(presenter.convertPxToValue(i));
      }
    });

    it('set right value for view', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.handleRightInput(i);
        let value = presenter.convertPxToValue(i);
        let px = presenter.convertValueToPx(value);
        expect(view.setRightValue).toBeCalledWith(value, px);
      }
    });

  });

  describe('passLeftValueToView(value)', function() {

    let slider = document.createElement('div');
    let model = new Model();
    let view = new View(slider);
    let presenter = new Presenter(model, view);

    presenter.convertValueToPx = jest.fn();
    view.setLeftValue = jest.fn();

    it('convert value to px', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.passLeftValueToView(i);
        expect(presenter.convertValueToPx).toBeCalledWith(i);
      }
    });

    it('set left value for view', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.passLeftValueToView(i);
        let px = presenter.convertValueToPx(i);
        expect(view.setLeftValue).toBeCalledWith(i, px);
      }
    });

  });

  describe('passRightValueToView(value)', function() {

    let slider = document.createElement('div');
    let model = new Model();
    let view = new View(slider);
    let presenter = new Presenter(model, view);

    presenter.convertValueToPx = jest.fn();
    view.setRightValue = jest.fn();

    it('convert value to px', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.passRightValueToView(i);
        expect(presenter.convertValueToPx).toBeCalledWith(i);
      }
    });

    it('set left value for view', function() {
      for (let i = 0; i <= 100; i++) {
        presenter.passRightValueToView(i);
        let px = presenter.convertValueToPx(i);
        expect(view.setRightValue).toBeCalledWith(i, px);
      }
    });

  });

  describe('convertValueToPx(value)', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let model = new Model();
      let view = new View(slider);
      let presenter = new Presenter(model, view);

      it('px match value if track length is 100 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertValueToPx(i)).toBeCloseTo(i);
        }
      });
  
      it('px match value / 2 if track length is 100 and min = 0 and max = 200', function() {
        model.min = 0;
        model.max = 200;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertValueToPx(i)).toBeCloseTo(i / 2);
        }
      });
  
      it('px match value * 2 if track length is 200 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(200);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertValueToPx(i)).toBeCloseTo(i * 2);
        }
      });
  
      it('px match value / x if track length is 100 and min = 0 and max = 100 * x', function() {
        model.min = 0;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);
  
        for (let x = 1; x <= 10; x++) {
          model.max = 100 * x;
          for (let i = 0; i <= 100; i++) {
            expect(presenter.convertValueToPx(i)).toBeCloseTo(i / x);
          }
        }     
      });
  
      it('px match value * x if track length is 100 * x and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetWidth = jest.fn();
  
        for (let x = 1; x <= 10; x++) {
          (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100 * x);
          for (let i = 0; i <= 100; i++) {
            expect(presenter.convertValueToPx(i)).toBeCloseTo(i * x);
          }
        }
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let model = new Model();
      let view = new View(slider, {
        vertical: true
      });
      let presenter = new Presenter(model, view);

      it('px match value if track height is 100 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertValueToPx(i)).toBeCloseTo(i);
        }
      });
  
      it('px match value / 2 if track height is 100 and min = 0 and max = 200', function() {
        model.min = 0;
        model.max = 200;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertValueToPx(i)).toBeCloseTo(i / 2);
        }
      });
  
      it('px match value * 2 if track height is 200 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(200);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertValueToPx(i)).toBeCloseTo(i * 2);
        }
      });
  
      it('px match value / x if track height is 100 and min = 0 and max = 100 * x', function() {
        model.min = 0;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);
  
        for (let x = 1; x <= 10; x++) {
          model.max = 100 * x;
          for (let i = 0; i <= 100; i++) {
            expect(presenter.convertValueToPx(i)).toBeCloseTo(i / x);
          }
        }     
      });
  
      it('px match value * x if track height is 100 * x and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetHeight = jest.fn();
  
        for (let x = 1; x <= 10; x++) {
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100 * x);
          for (let i = 0; i <= 100; i++) {
            expect(presenter.convertValueToPx(i)).toBeCloseTo(i * x);
          }
        }
      });

    });

  });

  describe('convertPxToValue(value)', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let model = new Model();
      let view = new View(slider);
      let presenter = new Presenter(model, view);

      it('value match px if track length is 100 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertPxToValue(i)).toBeCloseTo(i);
        }
      });
  
      it('value match px * 2 if track length is 100 and min = 0 and max = 200', function() {
        model.min = 0;
        model.max = 200;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertPxToValue(i)).toBeCloseTo(i * 2);
        }
      });
  
      it('value match px / 2 if track length is 200 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(200);
        let fitToStepOriginal = presenter.fitToStep;
        presenter.fitToStep = jest.fn();
  
        for (let i = 0; i <= 100; i++) {
          (presenter.fitToStep as jest.Mock).mockReturnValue(i / 2);
          expect(presenter.convertPxToValue(i)).toBeCloseTo(i / 2);
        }

        presenter.fitToStep = fitToStepOriginal;
      });
  
      it('value match px * x if track length is 100 and min = 0 and max = 100 * x', function() {
        model.min = 0;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);
  
        for (let x = 1; x <= 10; x++) {
          model.max = 100 * x;
          for (let i = 0; i <= 100; i++) {
            expect(presenter.convertPxToValue(i)).toBeCloseTo(i * x);
          }
        }     
      });
  
      it('value match px / x if track length is 100 * x and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetWidth = jest.fn();
        let fitToStepOriginal = presenter.fitToStep;
        presenter.fitToStep = jest.fn();
  
        for (let x = 1; x <= 10; x++) {
          (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100 * x);
          for (let i = 0; i <= 100; i++) {
            (presenter.fitToStep as jest.Mock).mockReturnValue(i / x);
            expect(presenter.convertPxToValue(i)).toBeCloseTo(i / x);
          }
        }

        presenter.fitToStep = fitToStepOriginal;
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let model = new Model();
      let view = new View(slider, {
        vertical: true
      });
      let presenter = new Presenter(model, view);

      it('value match px if track height is 100 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertPxToValue(i)).toBeCloseTo(i);
        }
      });
  
      it('value match px * 2 if track height is 100 and min = 0 and max = 200', function() {
        model.min = 0;
        model.max = 200;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);
  
        for (let i = 0; i <= 100; i++) {
          expect(presenter.convertPxToValue(i)).toBeCloseTo(i * 2);
        }
      });
  
      it('value match px / 2 if track height is 200 and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(200);
        let fitToStepOriginal = presenter.fitToStep;
        presenter.fitToStep = jest.fn();
  
        for (let i = 0; i <= 100; i++) {
          (presenter.fitToStep as jest.Mock).mockReturnValue(i / 2);
          expect(presenter.convertPxToValue(i)).toBeCloseTo(i / 2);
        }

        presenter.fitToStep = fitToStepOriginal;
      });
  
      it('value match px * x if track height is 100 and min = 0 and max = 100 * x', function() {
        model.min = 0;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);
  
        for (let x = 1; x <= 10; x++) {
          model.max = 100 * x;
          for (let i = 0; i <= 100; i++) {
            expect(presenter.convertPxToValue(i)).toBeCloseTo(i * x);
          }
        }     
      });
  
      it('value match px / x if track height is 100 * x and min = 0 and max = 100', function() {
        model.min = 0;
        model.max = 100;
        view.track.getOffsetHeight = jest.fn();
        let fitToStepOriginal = presenter.fitToStep;
        presenter.fitToStep = jest.fn();
  
        for (let x = 1; x <= 10; x++) {
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100 * x);
          for (let i = 0; i <= 100; i++) {
            (presenter.fitToStep as jest.Mock).mockReturnValue(i / x);
            expect(presenter.convertPxToValue(i)).toBeCloseTo(i / x);
          }
        }

        presenter.fitToStep = fitToStepOriginal;
      });

    });

  });
  
  describe('fitToStep(value)', function() {

    it('if step = x, result % x = 0', function() {      
      for(let step = 1; step <= 100; step ++) {
        let slider = document.createElement('div');
        let model = new Model({
          step: step
        });
        let view = new View(slider);
        let presenter = new Presenter(model, view);

        for (let value = 0; value <= 100; value += 0.1) {
          expect(presenter.fitToStep(value) % step).toBe(0);
        }
      }
    });

    it('also works with fractional step', function() {
      for(let step = 0.1; step <= 0.9; step += 0.1) {
        let slider = document.createElement('div');
        let model = new Model({
          step: step
        });
        let view = new View(slider);
        let presenter = new Presenter(model, view);

        for (let value = 0; value <= 100; value += 0.1) {
          expect(Math.floor(presenter.fitToStep(value) % step)).toBeCloseTo(0);
        }
      }
    });

  });
  
});