/* eslint-disable no-new */
import Presenter from './Presenter';

describe('Presenter', () => {
  const defaultSliderOptions = {
    min: 0,
    max: 100,
    leftValue: 25,
    rightValue: 75,
    range: true,
    step: 1,
    minMaxLabels: true,
    valueLabels: true,
    vertical: false,
    scale: true,
    scaleIntervals: 4,
  };

  describe('constructor()', () => {
    const slider = document.createElement('div');

    it('set min value for view', () => {
      new Presenter(slider, defaultSliderOptions);

      expect(slider.querySelector('.range-slider__min-max-label_left')?.textContent).toBe('0');
    });

    it('set max value for view', () => {
      new Presenter(slider, defaultSliderOptions);

      expect(slider.querySelector('.range-slider__min-max-label_right')?.textContent).toBe('100');
    });

    it('set left value for view', () => {
      new Presenter(slider, defaultSliderOptions);

      expect(slider.querySelector('.range-slider__value-label_left')?.textContent).toBe('25');
    });

    it('set right value for view if range', () => {
      new Presenter(slider, defaultSliderOptions);

      expect(slider.querySelector('.range-slider__value-label_right')?.textContent).toBe('75');
    });

    it('add scale for view if it has scale', () => {
      new Presenter(slider, defaultSliderOptions);

      expect(slider.querySelector('.range-slider__scale')).toBeTruthy();
    });
  });

  describe('inform(eventType, data)', () => {
    // describe('if eventType is "viewInputLeft"', () => {
    //   describe('convert px to value and pass it to model', () => {
    //     describe('if slider is horizontal', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, step: 1 });
    //       const view = new View(slider);
    //       const presenter = new Presenter(model, view);
    //       model.setLeftValue = jest.fn();

    //       it('value match px if track length is 100 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputLeft', i);
    //           expect(model.setLeftValue).toBeCalledWith(i);
    //         }
    //       });

    //       it('value match px * 2 if track length is 100 and min = 0 and max = 200', () => {
    //         model.setMin(0);
    //         model.setMax(200);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputLeft', i);
    //           expect(model.setLeftValue).toBeCalledWith(i * 2);
    //         }
    //       });

    //       it('value match px / 2 if track length is 200 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 200);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputLeft', i);
    //           expect(model.setLeftValue).toBeCalledWith(Math.round(i / 2));
    //         }
    //       });

    //       it('value match px * x if track length is 100 and min = 0 and max = 100 * x', () => {
    //         model.setMin(0);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           model.setMax(100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputLeft', i);
    //             expect(model.setLeftValue).toBeCalledWith(i * x);
    //           }
    //         }
    //       });

    //       it('value match px / x if track length is 100 * x and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           view.getTrackLength = jest.fn(() => 100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputLeft', i);
    //             expect(model.setLeftValue).toBeCalledWith(Math.round(i / x));
    //           }
    //         }
    //       });
    //     });

    //     describe('if slider is vertical', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, step: 1 });
    //       const view = new View(slider, {
    //         vertical: true,
    //       });
    //       const presenter = new Presenter(model, view);
    //       model.setLeftValue = jest.fn();

    //       it('value match px if track height is 100 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputLeft', i);
    //           expect(model.setLeftValue).toBeCalledWith(i);
    //         }
    //       });

    //       it('value match px * 2 if track height is 100 and min = 0 and max = 200', () => {
    //         model.setMin(0);
    //         model.setMax(200);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputLeft', i);
    //           expect(model.setLeftValue).toBeCalledWith(i * 2);
    //         }
    //       });

    //       it('value match px / 2 if track height is 200 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 200);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputLeft', i);
    //           expect(model.setLeftValue).toBeCalledWith(Math.round(i / 2));
    //         }
    //       });

    //       it('value match px * x if track height is 100 and min = 0 and max = 100 * x', () => {
    //         model.setMin(0);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           model.setMax(100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputLeft', i);
    //             expect(model.setLeftValue).toBeCalledWith(i * x);
    //           }
    //         }
    //       });

    //       it('value match px / x if track height is 100 * x and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           view.getTrackLength = jest.fn(() => 100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputLeft', i);
    //             expect(model.setLeftValue).toBeCalledWith(Math.round(i / x));
    //           }
    //         }
    //       });
    //     });
    //   });

    //   it('if data is not passed, nothing happens', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setLeftValue = jest.fn();

    //     presenter.inform('viewInputLeft');

    //     expect(model.setLeftValue).not.toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewInputRight"', () => {
    //   describe('convert px to value and pass it to model', () => {
    //     describe('if slider is horizontal', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, step: 1 });
    //       const view = new View(slider);
    //       const presenter = new Presenter(model, view);
    //       model.setRightValue = jest.fn();

    //       it('value match px if track length is 100 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputRight', i);
    //           expect(model.setRightValue).toBeCalledWith(i);
    //         }
    //       });

    //       it('value match px * 2 if track length is 100 and min = 0 and max = 200', () => {
    //         model.setMin(0);
    //         model.setMax(200);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputRight', i);
    //           expect(model.setRightValue).toBeCalledWith(i * 2);
    //         }
    //       });

    //       it('value match px / 2 if track length is 200 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 200);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputRight', i);
    //           expect(model.setRightValue).toBeCalledWith(Math.round(i / 2));
    //         }
    //       });

    //       it('value match px * x if track length is 100 and min = 0 and max = 100 * x', () => {
    //         model.setMin(0);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           model.setMax(100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputRight', i);
    //             expect(model.setRightValue).toBeCalledWith(i * x);
    //           }
    //         }
    //       });

    //       it('value match px / x if track length is 100 * x and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           view.getTrackLength = jest.fn(() => 100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputRight', i);
    //             expect(model.setRightValue).toBeCalledWith(Math.round(i / x));
    //           }
    //         }
    //       });
    //     });

    //     describe('if slider is vertical', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, step: 1 });
    //       const view = new View(slider, {
    //         vertical: true,
    //       });
    //       const presenter = new Presenter(model, view);
    //       model.setRightValue = jest.fn();

    //       it('value match px if track height is 100 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputRight', i);
    //           expect(model.setRightValue).toBeCalledWith(i);
    //         }
    //       });

    //       it('value match px * 2 if track height is 100 and min = 0 and max = 200', () => {
    //         model.setMin(0);
    //         model.setMax(200);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputRight', i);
    //           expect(model.setRightValue).toBeCalledWith(i * 2);
    //         }
    //       });

    //       it('value match px / 2 if track height is 200 and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);
    //         view.getTrackLength = jest.fn(() => 200);

    //         for (let i = 0; i <= 100; i += 1) {
    //           presenter.inform('viewInputRight', i);
    //           expect(model.setRightValue).toBeCalledWith(Math.round(i / 2));
    //         }
    //       });

    //       it('value match px * x if track height is 100 and min = 0 and max = 100 * x', () => {
    //         model.setMin(0);
    //         view.getTrackLength = jest.fn(() => 100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           model.setMax(100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputRight', i);
    //             expect(model.setRightValue).toBeCalledWith(i * x);
    //           }
    //         }
    //       });

    //       it('value match px / x if track height is 100 * x and min = 0 and max = 100', () => {
    //         model.setMin(0);
    //         model.setMax(100);

    //         for (let x = 1; x <= 10; x += 1) {
    //           view.getTrackLength = jest.fn(() => 100 * x);
    //           for (let i = 0; i <= 100; i += 1) {
    //             presenter.inform('viewInputRight', i);
    //             expect(model.setRightValue).toBeCalledWith(Math.round(i / x));
    //           }
    //         }
    //       });
    //     });
    //   });

    //   it('if data is not passed, nothing happens', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setRightValue = jest.fn();

    //     presenter.inform('viewInputRight');

    //     expect(model.setRightValue).not.toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewSetLeftFromOutside"', () => {
    //   it('pass value to model', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions, step: 1 });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setLeftValue = jest.fn();

    //     for (let i = 0; i <= 100; i += 1) {
    //       presenter.inform('viewSetLeftFromOutside', i);
    //       expect(model.setLeftValue).toBeCalledWith(i);
    //     }
    //   });

    //   it('if data is not passed, nothing happens', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setLeftValue = jest.fn();

    //     presenter.inform('viewSetLeftFromOutside');

    //     expect(model.setLeftValue).not.toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewSetRightFromOutside"', () => {
    //   it('pass value to model', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions, step: 1 });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setRightValue = jest.fn();

    //     for (let i = 0; i <= 100; i += 1) {
    //       presenter.inform('viewSetRightFromOutside', i);
    //       expect(model.setRightValue).toBeCalledWith(i);
    //     }
    //   });

    //   it('if data is not passed, nothing happens', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setRightValue = jest.fn();

    //     presenter.inform('viewSetRightFromOutside');

    //     expect(model.setRightValue).not.toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewSetMin"', () => {
    //   it('pass value to model', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setMin = jest.fn();

    //     for (let i = 0; i <= 100; i += 1) {
    //       presenter.inform('viewSetMin', i);
    //       expect(model.setMin).toBeCalledWith(i);
    //     }
    //   });

    //   it('if data is not passed, nothing happens', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setMin = jest.fn();

    //     presenter.inform('viewSetMin');

    //     expect(model.setMin).not.toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewSetMax"', () => {
    //   it('pass value to model', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setMax = jest.fn();

    //     for (let i = 0; i <= 100; i += 1) {
    //       presenter.inform('viewSetMax', i);
    //       expect(model.setMax).toBeCalledWith(i);
    //     }
    //   });

    //   it('if data is not passed, nothing happens', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setMax = jest.fn();

    //     presenter.inform('viewSetMax');

    //     expect(model.setMax).not.toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewSetStep"', () => {
    //   it('pass value to model', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setStep = jest.fn();

    //     for (let i = 0; i <= 100; i += 1) {
    //       presenter.inform('viewSetStep', i);
    //       expect(model.setStep).toBeCalledWith(i);
    //     }
    //   });

    //   it('if data is not passed, nothing happens', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions });
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.setStep = jest.fn();

    //     presenter.inform('viewSetStep');

    //     expect(model.setStep).not.toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewToggleOrientation"', () => {
    //   it('pass left value to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     view.setLeftValue = jest.fn();
    //     presenter.inform('viewToggleOrientation');

    //     expect(view.setLeftValue).toBeCalled();
    //   });

    //   it('pass right value to view if slider is range', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions, range: true });
    //     const view = new View(slider, { range: true });
    //     const presenter = new Presenter(model, view);
    //     view.setRightValue = jest.fn();
    //     presenter.inform('viewToggleOrientation');

    //     expect(view.setRightValue).toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewToggleRange"', () => {
    //   it('say model that it should toggle range', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     model.toggleRange = jest.fn();
    //     presenter.inform('viewToggleRange');

    //     expect(model.toggleRange).toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewToggleScale"', () => {
    //   describe('if view had no scale', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider, { scale: false, panel: true });
    //     const presenter = new Presenter(model, view);
    //     view.addScale = jest.fn();
    //     view.updatePanelScaleIntervals = jest.fn();
    //     presenter.inform('viewToggleScale');

    //     it('add scale to view', () => {
    //       expect(view.addScale).toBeCalled();
    //     });

    //     it('say view that it should update scaleIntervals field in panel if it has it', () => {
    //       expect(view.updatePanelScaleIntervals).toBeCalled();
    //     });
    //   });

    //   describe('if view had scale', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider, { scale: true, panel: true });
    //     const presenter = new Presenter(model, view);
    //     view.removeScale = jest.fn();
    //     view.updatePanelScaleIntervals = jest.fn();
    //     presenter.inform('viewToggleScale');

    //     it('remove scale from view', () => {
    //       expect(view.removeScale).toBeCalled();
    //     });

    //     it('say view that it should update scaleIntervals field in panel if it has it', () => {
    //       expect(view.updatePanelScaleIntervals).toBeCalled();
    //     });
    //   });
    // });

    // describe('if eventType is "viewSetScaleIntervals"', () => {
    //   it('add scale to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider, { scale: true });
    //     const presenter = new Presenter(model, view);
    //     view.addScale = jest.fn();
    //     presenter.inform('viewSetScaleIntervals');

    //     expect(view.addScale).toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewAddValueLabels"', () => {
    //   it('pass left value to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     view.setLeftValue = jest.fn();
    //     presenter.inform('viewAddValueLabels');

    //     expect(view.setLeftValue).toBeCalled();
    //   });

    //   it('pass right value to view if slider is range', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions, range: true });
    //     const view = new View(slider, { range: true });
    //     const presenter = new Presenter(model, view);
    //     view.setRightValue = jest.fn();
    //     presenter.inform('viewAddValueLabels');

    //     expect(view.setRightValue).toBeCalled();
    //   });
    // });

    // describe('if eventType is "viewAddMinMaxLabels"', () => {
    //   const slider = document.createElement('div');
    //   const model = new Model(defaultModelOptions);
    //   const view = new View(slider);
    //   const presenter = new Presenter(model, view);
    //   view.setMinValue = jest.fn();
    //   view.setMaxValue = jest.fn();
    //   presenter.inform('viewAddMinMaxLabels');

    //   it('pass min value from model to view', () => {
    //     expect(view.setMinValue).toBeCalledWith(model.getMin());
    //   });

    //   it('pass max value from model to view', () => {
    //     expect(view.setMaxValue).toBeCalledWith(model.getMax());
    //   });
    // });

    describe('if eventType is "modelSetLeft"', () => {
      it('call onChange method with left anf right values as parameters, if it is defined', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, defaultSliderOptions);
        slider.onChange = jest.fn();
        slider.inform('modelSetLeft', null);

        expect(slider.onChange).toBeCalledWith(25, 75);
      });

      // describe('convert value to percent and pass it to view', () => {
      //   describe('if slider is horizontal', () => {
      //     const slider = document.createElement('div');
      //     const model = new Model(defaultModelOptions);
      //     const view = new View(slider, {
      //       vertical: false,
      //     });
      //     const presenter = new Presenter(model, view);
      //     view.setLeftValue = jest.fn();

      //     it('percent match value, if min = 0 and max = 100', () => {
      //       model.setMin(0);
      //       model.setMax(100);
      //       model.setRightValue(100);
      //       view.getTrackLength = jest.fn(() => 100);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setLeftValue(i);
      //         presenter.inform('modelSetLeft');

      //         expect(view.setLeftValue).toBeCalledWith(i, i);
      //       }
      //     });

      //     it('percent match value / 2, if min = 0 and max = 200', () => {
      //       model.setMin(0);
      //       model.setMax(200);
      //       model.setRightValue(100);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setLeftValue(i);
      //         presenter.inform('modelSetLeft');

      //         expect(view.setLeftValue).toBeCalledWith(i, i / 2);
      //       }
      //     });

      //     it('percent match value / x, if min = 0 and max = 100 * x', () => {
      //       model.setMin(0);
      //       model.setRightValue(100);

      //       for (let x = 1; x <= 10; x += 1) {
      //         model.setMax(100 * x);
      //         for (let i = 0; i <= 100; i += 1) {
      //           model.setLeftValue(i);
      //           presenter.inform('modelSetLeft');
      //           expect(view.setLeftValue).toBeCalledWith(i, Number((i / x).toFixed(10)));
      //         }
      //       }
      //     });
      //   });

      //   describe('if slider is vertical', () => {
      //     const slider = document.createElement('div');
      //     const model = new Model(defaultModelOptions);
      //     const view = new View(slider, {
      //       vertical: true,
      //     });
      //     const presenter = new Presenter(model, view);
      //     view.setLeftValue = jest.fn();

      //     it('percent match value, if min = 0 and max = 100', () => {
      //       model.setMin(0);
      //       model.setMax(100);
      //       model.setRightValue(100);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setLeftValue(i);
      //         presenter.inform('modelSetLeft');

      //         expect(view.setLeftValue).toBeCalledWith(i, i);
      //       }
      //     });

      //     it('percent match value / 2, if min = 0 and max = 200', () => {
      //       model.setMin(0);
      //       model.setMax(200);
      //       model.setRightValue(200);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setLeftValue(i);
      //         presenter.inform('modelSetLeft');

      //         expect(view.setLeftValue).toBeCalledWith(i, i / 2);
      //       }
      //     });

      //     it('percent match value / x, if min = 0 and max = 100 * x', () => {
      //       model.setMin(0);

      //       for (let x = 1; x <= 10; x += 1) {
      //         model.setMax(100 * x);
      //         model.setRightValue(100 * x);
      //         for (let i = 0; i <= 100; i += 1) {
      //           model.setLeftValue(i);
      //           presenter.inform('modelSetLeft');

      //           expect(view.setLeftValue).toBeCalledWith(i, Number((i / x).toFixed(10)));
      //         }
      //       }
      //     });
      //   });
      // });

      // it('say view that it should update panel field if view has panel', () => {
      //   const slider = document.createElement('div');
      //   const model = new Model(defaultModelOptions);
      //   const view = new View(slider, {
      //     panel: true,
      //   });
      //   const presenter = new Presenter(model, view);
      //   view.updatePanelFrom = jest.fn();
      //   presenter.inform('modelSetLeft');

      //   expect(view.updatePanelFrom).toBeCalled();
      // });
    });

    describe('if eventType is "modelSetRight"', () => {
      it('call onChange method with left anf right values as parameters, if it is defined', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, defaultSliderOptions);
        slider.onChange = jest.fn();
        slider.inform('modelSetRight', null);

        expect(slider.onChange).toBeCalledWith(25, 75);
      });

      // describe('convert value to percent and pass it to view', () => {
      //   describe('if slider is horizontal', () => {
      //     const slider = document.createElement('div');
      //     const model = new Model(defaultModelOptions);
      //     const view = new View(slider, {
      //       vertical: false,
      //       range: true,
      //     });
      //     const presenter = new Presenter(model, view);
      //     view.setRightValue = jest.fn();

      //     it('percent match value, if min = 0 and max = 100', () => {
      //       model.setMin(0);
      //       model.setMax(100);
      //       model.setLeftValue(0);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setRightValue(i);
      //         presenter.inform('modelSetRight');

      //         expect(view.setRightValue).toBeCalledWith(i, i);
      //       }
      //     });

      //     it('percent match value / 2, if min = 0 and max = 200', () => {
      //       model.setMin(0);
      //       model.setMax(200);
      //       model.setLeftValue(0);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setRightValue(i);
      //         presenter.inform('modelSetRight');

      //         expect(view.setRightValue).toBeCalledWith(i, i / 2);
      //       }
      //     });

      //     it('percent match value / x, if min = 0 and max = 100 * x', () => {
      //       model.setMin(0);
      //       model.setLeftValue(0);

      //       for (let x = 1; x <= 10; x += 1) {
      //         model.setMax(100 * x);
      //         for (let i = 0; i <= 100; i += 1) {
      //           model.setRightValue(i);
      //           presenter.inform('modelSetRight');
      //           expect(view.setRightValue).toBeCalledWith(i, Number((i / x).toFixed(10)));
      //         }
      //       }
      //     });
      //   });

      //   describe('if slider is vertical', () => {
      //     const slider = document.createElement('div');
      //     const model = new Model(defaultModelOptions);
      //     const view = new View(slider, {
      //       vertical: true,
      //       range: true,
      //     });
      //     const presenter = new Presenter(model, view);
      //     view.setRightValue = jest.fn();

      //     it('percent match value, if min = 0 and max = 100', () => {
      //       model.setMin(0);
      //       model.setMax(100);
      //       model.setLeftValue(0);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setRightValue(i);
      //         presenter.inform('modelSetRight');

      //         expect(view.setRightValue).toBeCalledWith(i, i);
      //       }
      //     });

      //     it('percent match value / 2, if min = 0 and max = 200', () => {
      //       model.setMin(0);
      //       model.setMax(200);
      //       model.setLeftValue(0);

      //       for (let i = 0; i <= 100; i += 1) {
      //         model.setRightValue(i);
      //         presenter.inform('modelSetRight');

      //         expect(view.setRightValue).toBeCalledWith(i, i / 2);
      //       }
      //     });

      //     it('percent match value / x, if min = 0 and max = 100 * x', () => {
      //       model.setMin(0);
      //       model.setLeftValue(0);

      //       for (let x = 1; x <= 10; x += 1) {
      //         model.setMax(100 * x);
      //         for (let i = 0; i <= 100; i += 1) {
      //           model.setRightValue(i);
      //           presenter.inform('modelSetRight');

      //           expect(view.setRightValue).toBeCalledWith(i, Number((i / x).toFixed(10)));
      //         }
      //       }
      //     });
      //   });
      // });

      // it('say view that it should update panel field if view has panel', () => {
      //   const slider = document.createElement('div');
      //   const model = new Model(defaultModelOptions);
      //   const view = new View(slider, {
      //     panel: true,
      //   });
      //   const presenter = new Presenter(model, view);
      //   view.updatePanelTo = jest.fn();
      //   presenter.inform('modelSetRight');

      //   expect(view.updatePanelTo).toBeCalled();
      // });
    });

    // describe('if eventType is "modelSetMin"', () => {
    //   it('pass min value from model to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     view.setMinValue = jest.fn();
    //     presenter.inform('modelSetMin');

    //     expect(view.setMinValue).toBeCalledWith(model.getMin());
    //   });

    //   it('pass left value from model to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     view.setLeftValue = jest.fn();
    //     presenter.inform('modelSetMin');

    //     expect(view.setLeftValue)
    //       .toBeCalledWith(model.getLeftValue(), expect.any(Number));
    //   });

    //   it('pass right value from model to view if slider is range', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions, range: true });
    //     const view = new View(slider, {
    //       range: true,
    //     });
    //     const presenter = new Presenter(model, view);
    //     view.setRightValue = jest.fn();
    //     presenter.inform('modelSetMin');

    //     expect(view.setRightValue)
    //       .toBeCalledWith(model.getRightValue(), expect.any(Number));
    //   });

    //   it('rerender scale if view has scale', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider, {
    //       scale: true,
    //     });
    //     const presenter = new Presenter(model, view);
    //     view.removeScale = jest.fn();
    //     view.addScale = jest.fn();
    //     presenter.inform('modelSetMin');

    //     expect(view.removeScale).toBeCalled();
    //     expect(view.addScale).toBeCalled();
    //   });
    // });

    // describe('if eventType is "modelSetMax"', () => {
    //   it('pass max value from model to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     view.setMaxValue = jest.fn();
    //     presenter.inform('modelSetMax');

    //     expect(view.setMaxValue).toBeCalledWith(model.getMax());
    //   });

    //   it('pass left value from model to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     view.setLeftValue = jest.fn();
    //     presenter.inform('modelSetMax');

    //     expect(view.setLeftValue)
    //       .toBeCalledWith(model.getLeftValue(), expect.any(Number));
    //   });

    //   it('pass right value from model to view if slider is range', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model({ ...defaultModelOptions, range: true });
    //     const view = new View(slider, {
    //       range: true,
    //     });
    //     const presenter = new Presenter(model, view);
    //     view.setRightValue = jest.fn();
    //     presenter.inform('modelSetMax');

    //     expect(view.setRightValue)
    //       .toBeCalledWith(model.getRightValue(), expect.any(Number));
    //   });

    //   it('rerender scale if view has scale', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider, {
    //       scale: true,
    //     });
    //     const presenter = new Presenter(model, view);
    //     view.removeScale = jest.fn();
    //     view.addScale = jest.fn();
    //     presenter.inform('modelSetMax');

    //     expect(view.removeScale).toBeCalled();
    //     expect(view.addScale).toBeCalled();
    //   });
    // });

    // describe('if eventType is "modelToggleRange"', () => {
    //   it('pass left value from model to view', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider);
    //     const presenter = new Presenter(model, view);
    //     view.setLeftValue = jest.fn();
    //     presenter.inform('modelToggleRange');

    //     expect(view.setLeftValue)
    //       .toBeCalledWith(model.getLeftValue(), expect.any(Number));
    //   });

    //   describe('if model is range now', () => {
    //     it('say model to set right value', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, range: true });
    //       const view = new View(slider);
    //       const presenter = new Presenter(model, view);
    //       model.setRightValue = jest.fn();
    //       presenter.inform('modelToggleRange');

    //       expect(model.setRightValue).toBeCalled();
    //     });
    //   });

    //   describe('if model is not range now', () => {
    //     it('say model to remove right value', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, range: false });
    //       const view = new View(slider);
    //       const presenter = new Presenter(model, view);
    //       model.removeRightValue = jest.fn();
    //       presenter.inform('modelToggleRange');

    //       expect(model.removeRightValue).toBeCalled();
    //     });
    //   });

    //   describe('say view to update panel field if view has panel', () => {
    //     it('if slider is range', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, range: true });
    //       const view = new View(slider, {
    //         panel: true,
    //         range: true,
    //       });
    //       const presenter = new Presenter(model, view);
    //       view.updatePanelTo = jest.fn();
    //       presenter.inform('modelToggleRange');

    //       expect(view.updatePanelTo).toBeCalled();
    //     });

    //     it('if slider is not range', () => {
    //       const slider = document.createElement('div');
    //       const model = new Model({ ...defaultModelOptions, range: false });
    //       const view = new View(slider, {
    //         panel: true,
    //         range: false,
    //       });
    //       const presenter = new Presenter(model, view);
    //       view.updatePanelTo = jest.fn();
    //       presenter.inform('modelToggleRange');

    //       expect(view.updatePanelTo).toBeCalled();
    //     });
    //   });
    // });

    // describe('if eventType is "modelSetStep"', () => {
    //   it('pass value from model to view, if view has panel', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider, {
    //       panel: true,
    //     });
    //     const presenter = new Presenter(model, view);
    //     view.updatePanelStep = jest.fn();
    //     presenter.inform('modelSetStep');

    //     expect(view.updatePanelStep).toBeCalledWith(model.getStep());
    //   });

    //   it('nothing happens, if view has no panel', () => {
    //     const slider = document.createElement('div');
    //     const model = new Model(defaultModelOptions);
    //     const view = new View(slider, {
    //       panel: false,
    //     });
    //     const presenter = new Presenter(model, view);
    //     view.updatePanelStep = jest.fn();
    //     presenter.inform('modelSetStep');

    //     expect(view.updatePanelStep).not.toBeCalled();
    //   });
    // });
  });

  describe('setLeftValue(value)', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.setLeftValue(50);

    it('change left value', () => {
      const leftValueLabel = element.querySelector('.range-slider__value-label_left');
      expect(leftValueLabel?.textContent).toBe('50');
    });
  });

  describe('setRightValue(value)', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.setRightValue(50);

    it('change right value', () => {
      const rightValueLabel = element.querySelector('.range-slider__value-label_right');
      expect(rightValueLabel?.textContent).toBe('50');
    });
  });

  describe('setStep(value)', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.setStep(10);
    slider.setLeftValue(29);

    it('change step', () => {
      const lefttValueLabel = element.querySelector('.range-slider__value-label_left');
      expect(lefttValueLabel?.textContent).toBe('30');
    });
  });
});
