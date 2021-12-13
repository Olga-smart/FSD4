import Model from '../model/model';
import View from '../view/view';
import Presenter from './presenter';

describe('Presenter', () => {
  jest.mock('../model/model');
  jest.mock('../view/view');

  const defaultModelOptions = {
    min: 10,
    max: 100,
    leftValue: 25,
    rightValue: 75,
    step: 5,
    range: true,
  };

  describe('constructor()', () => {
    const slider = document.createElement('div');
    const model = new Model(defaultModelOptions);
    const view = new View(slider);
    const presenter = new Presenter(model, view);

    it('set up model', () => {
      expect(presenter.model).toBe(model);
    });

    it('set up view', () => {
      expect(presenter.view).toBe(view);
    });

    it('set min value for view', () => {
      view.setMinValue = jest.fn();
      const newPresenter = new Presenter(model, view);

      expect(newPresenter.view.setMinValue).toBeCalledWith(model.min);
    });

    it('set max value for view', () => {
      view.setMaxValue = jest.fn();
      const newPresenter = new Presenter(model, view);

      expect(newPresenter.view.setMaxValue).toBeCalledWith(model.max);
    });

    it('set left value for view', () => {
      view.setLeftValue = jest.fn();
      const newPresenter = new Presenter(model, view);

      expect(newPresenter.view.setLeftValue).toBeCalled();
    });

    it('set right value for view if range', () => {
      const newModel = new Model({ ...defaultModelOptions, range: true });
      const newView = new View(slider, {
        range: true,
      });
      newView.setRightValue = jest.fn();
      const newPresenter = new Presenter(newModel, newView);

      expect(newPresenter.view.setRightValue).toBeCalled();
    });

    it('add scale for view if it has scale', () => {
      const newModel = new Model(defaultModelOptions);
      const newView = new View(slider, {
        scale: true,
      });
      newView.addScale = jest.fn();
      const newPresenter = new Presenter(newModel, newView);

      expect(newPresenter.view.addScale)
        .toBeCalledWith(newModel.min, newModel.max, newView.scaleIntervals);
    });

    describe('fix labels container height if slider is horizontal and has labels', () => {
      it('if slider has only value labels', () => {
        const newModel = new Model(defaultModelOptions);
        const newView = new View(slider, {
          valueLabels: true,
        });
        newView.fixLabelsContainerHeightForHorizontal = jest.fn();
        const newPresenter = new Presenter(newModel, newView);

        expect(newPresenter.view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });

      it('if slider has only min&max labels', () => {
        const newModel = new Model(defaultModelOptions);
        const newView = new View(slider, {
          minMaxLabels: true,
        });
        newView.fixLabelsContainerHeightForHorizontal = jest.fn();
        const newPresenter = new Presenter(newModel, newView);

        expect(newPresenter.view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });

      it('if slider has both value and min&max labels', () => {
        const newModel = new Model(defaultModelOptions);
        const newView = new View(slider, {
          valueLabels: true,
          minMaxLabels: true,
        });
        newView.fixLabelsContainerHeightForHorizontal = jest.fn();
        const newPresenter = new Presenter(newModel, newView);

        expect(newPresenter.view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });
    });

    describe('fix labels container width if slider is vertical and has labels', () => {
      it('if slider has only value labels', () => {
        const newModel = new Model(defaultModelOptions);
        const newView = new View(slider, {
          vertical: true,
          valueLabels: true,
        });
        newView.fixLabelsContainerWidthForVertical = jest.fn();
        const newPresenter = new Presenter(newModel, newView);

        expect(newPresenter.view.fixLabelsContainerWidthForVertical).toBeCalled();
      });

      it('if slider has only min&max labels', () => {
        const newModel = new Model(defaultModelOptions);
        const newView = new View(slider, {
          vertical: true,
          minMaxLabels: true,
        });
        newView.fixLabelsContainerWidthForVertical = jest.fn();
        const newPresenter = new Presenter(newModel, newView);

        expect(newPresenter.view.fixLabelsContainerWidthForVertical).toBeCalled();
      });

      it('if slider has both value and min&max labels', () => {
        const newModel = new Model(defaultModelOptions);
        const newView = new View(slider, {
          vertical: true,
          valueLabels: true,
          minMaxLabels: true,
        });
        newView.fixLabelsContainerWidthForVertical = jest.fn();
        const newPresenter = new Presenter(newModel, newView);

        expect(newPresenter.view.fixLabelsContainerWidthForVertical).toBeCalled();
      });
    });

    describe('if view has panel', () => {
      const newSlider = document.createElement('div');
      const newModel = new Model(defaultModelOptions);
      const newView = new View(newSlider, {
        panel: true,
      });
      newView.setPanelValues = jest.fn();
      newView.panel!.registerWith = jest.fn();
      const newPresenter = new Presenter(newModel, newView);

      it('set panel values', () => {
        expect(newPresenter.view.setPanelValues).toBeCalled();
      });

      it('bind panel with view', () => {
        expect(newPresenter.view.panel?.registerWith).toBeCalledWith(newView);
      });
    });
  });

  describe('inform(eventType, data)', () => {
    describe('if eventType is "viewLeftInput"', () => {
      describe('convert px to value and pass it to model', () => {
        describe('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, step: 1 });
          const view = new View(slider);
          const presenter = new Presenter(model, view);
          presenter.model.setLeftValue = jest.fn();

          it('value match px if track length is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewLeftInput', i);
              expect(presenter.model.setLeftValue).toBeCalledWith(i);
            }
          });

          it('value match px * 2 if track length is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewLeftInput', i);
              expect(presenter.model.setLeftValue).toBeCalledWith(i * 2);
            }
          });

          it('value match px / 2 if track length is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewLeftInput', i);
              expect(presenter.model.setLeftValue).toBeCalledWith(Math.round(i / 2));
            }
          });

          it('value match px * x if track length is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewLeftInput', i);
                expect(presenter.model.setLeftValue).toBeCalledWith(i * x);
              }
            }
          });

          it('value match px / x if track length is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewLeftInput', i);
                expect(presenter.model.setLeftValue).toBeCalledWith(Math.round(i / x));
              }
            }
          });
        });

        describe('if slider is vertical', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, step: 1 });
          const view = new View(slider, {
            vertical: true,
          });
          const presenter = new Presenter(model, view);
          presenter.model.setLeftValue = jest.fn();

          it('value match px if track height is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewLeftInput', i);
              expect(presenter.model.setLeftValue).toBeCalledWith(i);
            }
          });

          it('value match px * 2 if track height is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewLeftInput', i);
              expect(presenter.model.setLeftValue).toBeCalledWith(i * 2);
            }
          });

          it('value match px / 2 if track height is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewLeftInput', i);
              expect(presenter.model.setLeftValue).toBeCalledWith(Math.round(i / 2));
            }
          });

          it('value match px * x if track height is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewLeftInput', i);
                expect(presenter.model.setLeftValue).toBeCalledWith(i * x);
              }
            }
          });

          it('value match px / x if track height is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewLeftInput', i);
                expect(presenter.model.setLeftValue).toBeCalledWith(Math.round(i / x));
              }
            }
          });
        });
      });
    });

    describe('if eventType is "viewRightInput"', () => {
      describe('convert px to value and pass it to model', () => {
        describe('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, step: 1 });
          const view = new View(slider);
          const presenter = new Presenter(model, view);
          presenter.model.setRightValue = jest.fn();

          it('value match px if track length is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewRightInput', i);
              expect(presenter.model.setRightValue).toBeCalledWith(i);
            }
          });

          it('value match px * 2 if track length is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewRightInput', i);
              expect(presenter.model.setRightValue).toBeCalledWith(i * 2);
            }
          });

          it('value match px / 2 if track length is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewRightInput', i);
              expect(presenter.model.setRightValue).toBeCalledWith(Math.round(i / 2));
            }
          });

          it('value match px * x if track length is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewRightInput', i);
                expect(presenter.model.setRightValue).toBeCalledWith(i * x);
              }
            }
          });

          it('value match px / x if track length is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewRightInput', i);
                expect(presenter.model.setRightValue).toBeCalledWith(Math.round(i / x));
              }
            }
          });
        });

        describe('if slider is vertical', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, step: 1 });
          const view = new View(slider, {
            vertical: true,
          });
          const presenter = new Presenter(model, view);
          presenter.model.setRightValue = jest.fn();

          it('value match px if track height is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewRightInput', i);
              expect(presenter.model.setRightValue).toBeCalledWith(i);
            }
          });

          it('value match px * 2 if track height is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewRightInput', i);
              expect(presenter.model.setRightValue).toBeCalledWith(i * 2);
            }
          });

          it('value match px / 2 if track height is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.inform('viewRightInput', i);
              expect(presenter.model.setRightValue).toBeCalledWith(Math.round(i / 2));
            }
          });

          it('value match px * x if track height is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewRightInput', i);
                expect(presenter.model.setRightValue).toBeCalledWith(i * x);
              }
            }
          });

          it('value match px / x if track height is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.inform('viewRightInput', i);
                expect(presenter.model.setRightValue).toBeCalledWith(Math.round(i / x));
              }
            }
          });
        });
      });
    });

    describe('if eventType is "viewChangeLeftValueFromOutside"', () => {
      it('pass value to model', () => {
        const slider = document.createElement('div');
        const model = new Model({ ...defaultModelOptions, step: 1 });
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.model.setLeftValue = jest.fn();

        for (let i = 0; i <= 100; i += 1) {
          presenter.inform('viewChangeLeftValueFromOutside', i);
          expect(presenter.model.setLeftValue).toBeCalledWith(i);
        }
      });
    });

    describe('if eventType is "viewChangeRightValueFromOutside"', () => {
      it('pass value to model', () => {
        const slider = document.createElement('div');
        const model = new Model({ ...defaultModelOptions, step: 1 });
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.model.setRightValue = jest.fn();

        for (let i = 0; i <= 100; i += 1) {
          presenter.inform('viewChangeRightValueFromOutside', i);
          expect(presenter.model.setRightValue).toBeCalledWith(i);
        }
      });
    });

    describe('if eventType is "viewChangeMinFromOutside"', () => {
      it('pass value to model', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.model.changeMinFromOutside = jest.fn();

        for (let i = 0; i <= 100; i += 1) {
          presenter.inform('viewChangeMinFromOutside', i);
          expect(presenter.model.changeMinFromOutside).toBeCalledWith(i);
        }
      });
    });

    describe('if eventType is "viewChangeMaxFromOutside"', () => {
      it('pass value to model', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.model.changeMaxFromOutside = jest.fn();

        for (let i = 0; i <= 100; i += 1) {
          presenter.inform('viewChangeMaxFromOutside', i);
          expect(presenter.model.changeMaxFromOutside).toBeCalledWith(i);
        }
      });
    });

    describe('if eventType is "viewChangeStepFromOutside"', () => {
      it('pass value to model', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.model.setStep = jest.fn();

        for (let i = 0; i <= 100; i += 1) {
          presenter.inform('viewChangeStepFromOutside', i);
          expect(presenter.model.setStep).toBeCalledWith(i);
        }
      });
    });

    describe('if eventType is "viewChangeOrientationFromOutside"', () => {
      it('pass left value to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.view.setLeftValue = jest.fn();
        presenter.inform('viewChangeOrientationFromOutside', null);

        expect(presenter.view.setLeftValue).toBeCalled();
      });

      it('pass right value to view if slider is range', () => {
        const slider = document.createElement('div');
        const model = new Model({ ...defaultModelOptions, range: true });
        const view = new View(slider, { range: true });
        const presenter = new Presenter(model, view);
        presenter.view.setRightValue = jest.fn();
        presenter.inform('viewChangeOrientationFromOutside', null);

        expect(presenter.view.setRightValue).toBeCalled();
      });

      it('add scale to view if view has scale', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, { scale: true });
        const presenter = new Presenter(model, view);
        presenter.view.addScale = jest.fn();
        presenter.inform('viewChangeOrientationFromOutside', null);

        expect(presenter.view.addScale).toBeCalled();
      });

      describe('fix labels container width or height if view has labels', () => {
        it('if view is horizontal', () => {
          const slider = document.createElement('div');
          const model = new Model(defaultModelOptions);
          const view = new View(slider, {
            valueLabels: true,
            vertical: false,
          });
          const presenter = new Presenter(model, view);
          presenter.view.fixLabelsContainerHeightForHorizontal = jest.fn();
          presenter.inform('viewChangeOrientationFromOutside', null);

          expect(presenter.view.fixLabelsContainerHeightForHorizontal).toBeCalled();
        });

        it('if view is vertical', () => {
          const slider = document.createElement('div');
          const model = new Model(defaultModelOptions);
          const view = new View(slider, {
            valueLabels: true,
            vertical: true,
          });
          const presenter = new Presenter(model, view);
          presenter.view.fixLabelsContainerWidthForVertical = jest.fn();
          presenter.inform('viewChangeOrientationFromOutside', null);

          expect(presenter.view.fixLabelsContainerWidthForVertical).toBeCalled();
        });
      });
    });

    describe('if eventType is "viewToggleRangeFromOutside"', () => {
      it('say model that it should toggle range', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.model.toggleRange = jest.fn();
        presenter.inform('viewToggleRangeFromOutside', null);

        expect(presenter.model.toggleRange).toBeCalled();
      });
    });

    describe('if eventType is "viewToggleScaleFromOutside"', () => {
      describe('if view now has scale', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, { scale: true });
        const presenter = new Presenter(model, view);
        presenter.view.addScale = jest.fn();
        presenter.view.updatePanelScaleIntervals = jest.fn();
        presenter.inform('viewToggleScaleFromOutside', null);

        it('add scale to view', () => {
          expect(presenter.view.addScale).toBeCalled();
        });

        it('say view that it should update scaleIntervals field in panel if it has it', () => {
          expect(presenter.view.updatePanelScaleIntervals).toBeCalled();
        });
      });

      describe('if view now has no scale', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, { scale: false });
        const presenter = new Presenter(model, view);
        presenter.view.removeScale = jest.fn();
        presenter.view.updatePanelScaleIntervals = jest.fn();
        presenter.inform('viewToggleScaleFromOutside', null);

        it('remove scale from view', () => {
          expect(presenter.view.removeScale).toBeCalled();
        });

        it('say view that it should update scaleIntervals field in panel if it has it', () => {
          expect(presenter.view.updatePanelScaleIntervals).toBeCalled();
        });
      });
    });

    describe('if eventType is "viewChangeScaleIntervals"', () => {
      it('add scale to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, { scale: true });
        const presenter = new Presenter(model, view);
        presenter.view.addScale = jest.fn();
        presenter.inform('viewChangeScaleIntervals', null);

        expect(presenter.view.addScale).toBeCalled();
      });
    });

    describe('if eventType is "viewAddValueLabels"', () => {
      it('pass left value to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.view.setLeftValue = jest.fn();
        presenter.inform('viewAddValueLabels', null);

        expect(presenter.view.setLeftValue).toBeCalled();
      });

      it('pass right value to view if slider is range', () => {
        const slider = document.createElement('div');
        const model = new Model({ ...defaultModelOptions, range: true });
        const view = new View(slider, { range: true });
        const presenter = new Presenter(model, view);
        presenter.view.setRightValue = jest.fn();
        presenter.inform('viewAddValueLabels', null);

        expect(presenter.view.setRightValue).toBeCalled();
      });
    });

    describe('if eventType is "viewAddMinMaxLabels"', () => {
      const slider = document.createElement('div');
      const model = new Model(defaultModelOptions);
      const view = new View(slider);
      const presenter = new Presenter(model, view);
      presenter.view.setMinValue = jest.fn();
      presenter.view.setMaxValue = jest.fn();
      presenter.inform('viewAddMinMaxLabels', null);

      it('pass min value from model to view', () => {
        expect(presenter.view.setMinValue).toBeCalledWith(presenter.model.min);
      });

      it('pass max value from model to view', () => {
        expect(presenter.view.setMaxValue).toBeCalledWith(presenter.model.max);
      });
    });

    describe('if eventType is "modelLeftSet"', () => {
      describe('convert value to px and pass it to view', () => {
        describe('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const model = new Model(defaultModelOptions);
          const view = new View(slider, {
            vertical: false,
          });
          const presenter = new Presenter(model, view);
          presenter.view.setLeftValue = jest.fn();

          it('px match value if track length is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.leftValue = i;
              presenter.inform('modelLeftSet', null);
              expect(presenter.view.setLeftValue).toBeCalledWith(i, i);
            }
          });

          it('px match value / 2 if track length is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.leftValue = i;
              presenter.inform('modelLeftSet', null);
              expect(presenter.view.setLeftValue).toBeCalledWith(i, Math.round(i / 2));
            }
          });

          it('px match value * 2 if track length is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.leftValue = i;
              presenter.inform('modelLeftSet', null);
              expect(presenter.view.setLeftValue).toBeCalledWith(i, i * 2);
            }
          });

          it('px match value / x if track length is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.leftValue = i;
                presenter.inform('modelLeftSet', null);
                expect(presenter.view.setLeftValue).toBeCalledWith(i, Math.round(i / x));
              }
            }
          });

          it('px match value * x if track length is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.leftValue = i;
                presenter.inform('modelLeftSet', null);
                expect(presenter.view.setLeftValue).toBeCalledWith(i, i * x);
              }
            }
          });
        });

        describe('if slider is vertical', () => {
          const slider = document.createElement('div');
          const model = new Model(defaultModelOptions);
          const view = new View(slider, {
            vertical: true,
          });
          const presenter = new Presenter(model, view);
          presenter.view.setLeftValue = jest.fn();

          it('px match value if track height is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.leftValue = i;
              presenter.inform('modelLeftSet', null);
              expect(presenter.view.setLeftValue).toBeCalledWith(i, i);
            }
          });

          it('px match value / 2 if track height is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.leftValue = i;
              presenter.inform('modelLeftSet', null);
              expect(presenter.view.setLeftValue).toBeCalledWith(i, Math.round(i / 2));
            }
          });

          it('px match value * 2 if track height is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.leftValue = i;
              presenter.inform('modelLeftSet', null);
              expect(presenter.view.setLeftValue).toBeCalledWith(i, i * 2);
            }
          });

          it('px match value / x if track height is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.leftValue = i;
                presenter.inform('modelLeftSet', null);
                expect(presenter.view.setLeftValue).toBeCalledWith(i, Math.round(i / x));
              }
            }
          });

          it('px match value * x if track height is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.leftValue = i;
                presenter.inform('modelLeftSet', null);
                expect(presenter.view.setLeftValue).toBeCalledWith(i, i * x);
              }
            }
          });
        });
      });

      it('say view that it should update panel field if view has panel', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, {
          panel: true,
        });
        const presenter = new Presenter(model, view);
        presenter.view.updatePanelFrom = jest.fn();
        presenter.inform('modelLeftSet', null);

        expect(presenter.view.updatePanelFrom).toBeCalled();
      });
    });

    describe('if eventType is "modelRightSet"', () => {
      describe('convert value to px and pass it to view', () => {
        describe('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const model = new Model(defaultModelOptions);
          const view = new View(slider, {
            vertical: false,
            range: true,
          });
          const presenter = new Presenter(model, view);
          presenter.view.setRightValue = jest.fn();

          it('px match value if track length is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.rightValue = i;
              presenter.inform('modelRightSet', null);
              expect(presenter.view.setRightValue).toBeCalledWith(i, i);
            }
          });

          it('px match value / 2 if track length is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.rightValue = i;
              presenter.inform('modelRightSet', null);
              expect(presenter.view.setRightValue).toBeCalledWith(i, Math.round(i / 2));
            }
          });

          it('px match value * 2 if track length is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.rightValue = i;
              presenter.inform('modelRightSet', null);
              expect(presenter.view.setRightValue).toBeCalledWith(i, i * 2);
            }
          });

          it('px match value / x if track length is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetWidth = jest.fn();
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.rightValue = i;
                presenter.inform('modelRightSet', null);
                expect(presenter.view.setRightValue).toBeCalledWith(i, Math.round(i / x));
              }
            }
          });

          it('px match value * x if track length is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetWidth = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetWidth as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.rightValue = i;
                presenter.inform('modelRightSet', null);
                expect(presenter.view.setRightValue).toBeCalledWith(i, i * x);
              }
            }
          });
        });

        describe('if slider is vertical', () => {
          const slider = document.createElement('div');
          const model = new Model(defaultModelOptions);
          const view = new View(slider, {
            vertical: true,
            range: true,
          });
          const presenter = new Presenter(model, view);
          presenter.view.setRightValue = jest.fn();

          it('px match value if track height is 100 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.rightValue = i;
              presenter.inform('modelRightSet', null);
              expect(presenter.view.setRightValue).toBeCalledWith(i, i);
            }
          });

          it('px match value / 2 if track height is 100 and min = 0 and max = 200', () => {
            model.min = 0;
            model.max = 200;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.rightValue = i;
              presenter.inform('modelRightSet', null);
              expect(presenter.view.setRightValue).toBeCalledWith(i, Math.round(i / 2));
            }
          });

          it('px match value * 2 if track height is 200 and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(200);

            for (let i = 0; i <= 100; i += 1) {
              presenter.model.rightValue = i;
              presenter.inform('modelRightSet', null);
              expect(presenter.view.setRightValue).toBeCalledWith(i, i * 2);
            }
          });

          it('px match value / x if track height is 100 and min = 0 and max = 100 * x', () => {
            model.min = 0;
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100);

            for (let x = 1; x <= 10; x += 1) {
              model.max = 100 * x;
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.rightValue = i;
                presenter.inform('modelRightSet', null);
                expect(presenter.view.setRightValue).toBeCalledWith(i, Math.round(i / x));
              }
            }
          });

          it('px match value * x if track height is 100 * x and min = 0 and max = 100', () => {
            model.min = 0;
            model.max = 100;
            view.track.getOffsetHeight = jest.fn();

            for (let x = 1; x <= 10; x += 1) {
              (view.track.getOffsetHeight as jest.Mock).mockReturnValue(100 * x);
              for (let i = 0; i <= 100; i += 1) {
                presenter.model.rightValue = i;
                presenter.inform('modelRightSet', null);
                expect(presenter.view.setRightValue).toBeCalledWith(i, i * x);
              }
            }
          });
        });
      });

      it('say view that it should update panel field if view has panel', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, {
          panel: true,
        });
        const presenter = new Presenter(model, view);
        presenter.view.updatePanelTo = jest.fn();
        presenter.inform('modelRightSet', null);

        expect(presenter.view.updatePanelTo).toBeCalled();
      });
    });

    describe('if eventType is "modelChangeMin"', () => {
      it('pass min value from model to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.view.setMinValue = jest.fn();
        presenter.inform('modelChangeMin', null);

        expect(presenter.view.setMinValue).toBeCalledWith(presenter.model.min);
      });

      it('pass left value from model to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.view.setLeftValue = jest.fn();
        presenter.inform('modelChangeMin', null);

        expect(presenter.view.setLeftValue)
          .toBeCalledWith(presenter.model.leftValue, expect.any(Number));
      });

      it('pass right value from model to view if slider is range', () => {
        const slider = document.createElement('div');
        const model = new Model({ ...defaultModelOptions, range: true });
        const view = new View(slider, {
          range: true,
        });
        const presenter = new Presenter(model, view);
        presenter.view.setRightValue = jest.fn();
        presenter.inform('modelChangeMin', null);

        expect(presenter.view.setRightValue)
          .toBeCalledWith(presenter.model.rightValue, expect.any(Number));
      });

      it('rerender scale if view has scale', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, {
          scale: true,
        });
        const presenter = new Presenter(model, view);
        presenter.view.removeScale = jest.fn();
        presenter.view.addScale = jest.fn();
        presenter.inform('modelChangeMin', null);

        expect(presenter.view.removeScale).toBeCalled();
        expect(presenter.view.addScale).toBeCalled();
      });
    });

    describe('if eventType is "modelChangeMax"', () => {
      it('pass max value from model to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.view.setMaxValue = jest.fn();
        presenter.inform('modelChangeMax', null);

        expect(presenter.view.setMaxValue).toBeCalledWith(presenter.model.max);
      });

      it('pass left value from model to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.view.setLeftValue = jest.fn();
        presenter.inform('modelChangeMax', null);

        expect(presenter.view.setLeftValue)
          .toBeCalledWith(presenter.model.leftValue, expect.any(Number));
      });

      it('pass right value from model to view if slider is range', () => {
        const slider = document.createElement('div');
        const model = new Model({ ...defaultModelOptions, range: true });
        const view = new View(slider, {
          range: true,
        });
        const presenter = new Presenter(model, view);
        presenter.view.setRightValue = jest.fn();
        presenter.inform('modelChangeMax', null);

        expect(presenter.view.setRightValue)
          .toBeCalledWith(presenter.model.rightValue, expect.any(Number));
      });

      it('rerender scale if view has scale', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider, {
          scale: true,
        });
        const presenter = new Presenter(model, view);
        presenter.view.removeScale = jest.fn();
        presenter.view.addScale = jest.fn();
        presenter.inform('modelChangeMax', null);

        expect(presenter.view.removeScale).toBeCalled();
        expect(presenter.view.addScale).toBeCalled();
      });
    });

    describe('if eventType is "modelRangeToggle"', () => {
      it('pass left value from model to view', () => {
        const slider = document.createElement('div');
        const model = new Model(defaultModelOptions);
        const view = new View(slider);
        const presenter = new Presenter(model, view);
        presenter.view.setLeftValue = jest.fn();
        presenter.inform('modelRangeToggle', null);

        expect(presenter.view.setLeftValue)
          .toBeCalledWith(presenter.model.leftValue, expect.any(Number));
      });

      describe('if model is range now', () => {
        it('say model to set right value', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, range: true });
          const view = new View(slider);
          const presenter = new Presenter(model, view);
          presenter.model.setRightValue = jest.fn();
          presenter.inform('modelRangeToggle', null);

          expect(presenter.model.setRightValue).toBeCalled();
        });
      });

      describe('if model is not range now', () => {
        it('say model to remove right value', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, range: false });
          const view = new View(slider);
          const presenter = new Presenter(model, view);
          presenter.model.removeRightValue = jest.fn();
          presenter.inform('modelRangeToggle', null);

          expect(presenter.model.removeRightValue).toBeCalled();
        });
      });

      describe('say view to update panel field if view has panel', () => {
        it('if slider is range', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, range: true });
          const view = new View(slider, {
            panel: true,
            range: true,
          });
          const presenter = new Presenter(model, view);
          presenter.view.updatePanelTo = jest.fn();
          presenter.inform('modelRangeToggle', null);

          expect(presenter.view.updatePanelTo).toBeCalled();
        });

        it('if slider is not range', () => {
          const slider = document.createElement('div');
          const model = new Model({ ...defaultModelOptions, range: false });
          const view = new View(slider, {
            panel: true,
            range: false,
          });
          const presenter = new Presenter(model, view);
          presenter.view.updatePanelTo = jest.fn();
          presenter.inform('modelRangeToggle', null);

          expect(presenter.view.updatePanelTo).toBeCalled();
        });
      });
    });
  });
});
