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

  const defaultDomRect = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    toJSON() { return undefined; },
  };

  describe('constructor()', () => {
    const element = document.createElement('div');
    new Presenter(element, defaultSliderOptions);

    it('set min value for view', () => {
      expect(element.querySelector('.range-slider__min-max-label_left')?.textContent).toBe(`${defaultSliderOptions.min}`);
    });

    it('set max value for view', () => {
      expect(element.querySelector('.range-slider__min-max-label_right')?.textContent).toBe(`${defaultSliderOptions.max}`);
    });

    it('set left value for view', () => {
      expect(element.querySelector('.range-slider__value-label_left')?.textContent).toBe(`${defaultSliderOptions.leftValue}`);
    });

    it('set right value for view if range', () => {
      expect(element.querySelector('.range-slider__value-label_right')?.textContent).toBe(`${defaultSliderOptions.rightValue}`);
    });

    describe('set value to hidden input', () => {
      it('if slider is range', () => {
        const input: HTMLInputElement | null = element.querySelector('.range-slider__input');
        expect(input?.value)
          .toBe(`${defaultSliderOptions.leftValue} - ${defaultSliderOptions.rightValue}`);
      });

      it('if slider is not range', () => {
        const newElement = document.createElement('div');
        new Presenter(newElement, {
          range: false,
        });
        const input: HTMLInputElement | null = newElement.querySelector('.range-slider__input');
        expect(input?.value).toBe(`${defaultSliderOptions.leftValue}`);
      });
    });

    it('add scale for view if it has scale', () => {
      expect(element.querySelector('.range-slider__scale')).toBeTruthy();
    });

    it('do not add scale for view if it has no scale', () => {
      const newElement = document.createElement('div');
      new Presenter(newElement, {
        scale: false,
      });
      expect(newElement.querySelector('.range-slider__scale')).toBeFalsy();
    });
  });

  describe('inform(eventType, data)', () => {
    describe('if eventType is "viewInputLeft"', () => {
      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);
      const track: HTMLElement | null = element.querySelector('.range-slider__track');
      if (track !== null) {
        jest.spyOn(track, 'offsetWidth', 'get').mockImplementation(() => 500);
      }

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('left value for model will be updated', () => {
        const newLeftShift = 250;
        const oldValue = slider.getValues().leftValue;
        slider.inform('viewInputLeft', newLeftShift);
        expect(slider.getValues().leftValue).not.toBe(oldValue);
      });
    });

    describe('if eventType is "viewInputRight"', () => {
      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);
      const track: HTMLElement | null = element.querySelector('.range-slider__track');
      if (track !== null) {
        jest.spyOn(track, 'offsetWidth', 'get').mockImplementation(() => 500);
      }

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('right value for model will be updated', () => {
        const newLeftShift = 250;
        const oldValue = slider.getValues().rightValue;
        slider.inform('viewInputRight', newLeftShift);
        expect(slider.getValues().rightValue).not.toBe(oldValue);
      });
    });

    describe('if eventType is "viewSetLeft"', () => {
      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      afterAll(() => {
        jest.restoreAllMocks();
      });

      describe('if slider has value labels', () => {
        const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
        const rightLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_right');
        const commonLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_common');

        if (leftLabel !== null) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            right: 50,
          }));
        }

        it('merge labels, if distance between them is small', () => {
          if (rightLabel !== null) {
            rightLabel.getBoundingClientRect = jest.fn(() => ({
              ...defaultDomRect,
              left: 52,
            }));
          }

          slider.inform('viewSetLeft', null);

          expect(commonLabel?.style.opacity).toBe('1');
          expect(leftLabel?.style.opacity).toBe('0');
          expect(rightLabel?.style.opacity).toBe('0');
        });

        it('split labels, if distance between them is big', () => {
          if (rightLabel !== null) {
            rightLabel.getBoundingClientRect = jest.fn(() => ({
              ...defaultDomRect,
              left: 100,
            }));
          }

          slider.inform('viewSetLeft', null);

          expect(commonLabel?.style.opacity).toBe('0');
          expect(leftLabel?.style.opacity).toBe('1');
          expect(rightLabel?.style.opacity).toBe('1');
        });

        describe('if slider has min-max labels', () => {
          const minLabel: HTMLDivElement | null = element.querySelector('.range-slider__min-max-label_left');

          if (minLabel !== null) {
            minLabel.getBoundingClientRect = jest.fn(() => ({
              ...defaultDomRect,
              right: 10,
            }));
          }

          it('hide min label, if distance between it and left value label is small', () => {
            if (leftLabel !== null) {
              leftLabel.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 12,
              }));
            }

            slider.inform('viewSetLeft', null);

            expect(minLabel?.style.opacity).toBe('0');
          });

          it('show min label, if distance between it and left value label is big', () => {
            if (leftLabel !== null) {
              leftLabel.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 50,
              }));
            }

            slider.inform('viewSetLeft', null);

            expect(minLabel?.style.opacity).toBe('1');
          });

          describe('if slider is not range', () => {
            const newElement = document.createElement('div');
            const newSlider = new Presenter(newElement, {
              ...defaultSliderOptions,
              range: false,
            });

            const newLeftLabel: HTMLDivElement | null = newElement.querySelector('.range-slider__value-label_left');
            const maxLabel: HTMLDivElement | null = newElement.querySelector('.range-slider__min-max-label_right');

            if (maxLabel !== null) {
              maxLabel.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 100,
              }));
            }

            it('hide max label, if distance between it and left value label is small', () => {
              if (newLeftLabel !== null) {
                newLeftLabel.getBoundingClientRect = jest.fn(() => ({
                  ...defaultDomRect,
                  right: 98,
                }));
              }

              newSlider.inform('viewSetLeft', null);

              expect(maxLabel?.style.opacity).toBe('0');
            });

            it('show max label, if distance between it and left value label is small', () => {
              if (newLeftLabel !== null) {
                newLeftLabel.getBoundingClientRect = jest.fn(() => ({
                  ...defaultDomRect,
                  right: 50,
                }));
              }

              newSlider.inform('viewSetLeft', null);

              expect(maxLabel?.style.opacity).toBe('1');
            });
          });
        });
      });
    });

    describe('if eventType is "viewSetRight"', () => {
      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      afterAll(() => {
        jest.restoreAllMocks();
      });

      describe('if slider has value labels', () => {
        const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
        const rightLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_right');
        const commonLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_common');

        if (leftLabel !== null) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            right: 50,
          }));
        }

        it('merge labels, if distance between them is small', () => {
          if (rightLabel !== null) {
            rightLabel.getBoundingClientRect = jest.fn(() => ({
              ...defaultDomRect,
              left: 52,
            }));
          }

          slider.inform('viewSetRight', null);

          expect(commonLabel?.style.opacity).toBe('1');
          expect(leftLabel?.style.opacity).toBe('0');
          expect(rightLabel?.style.opacity).toBe('0');
        });

        it('split labels, if distance between them is big', () => {
          if (rightLabel !== null) {
            rightLabel.getBoundingClientRect = jest.fn(() => ({
              ...defaultDomRect,
              left: 100,
            }));
          }

          slider.inform('viewSetRight', null);

          expect(commonLabel?.style.opacity).toBe('0');
          expect(leftLabel?.style.opacity).toBe('1');
          expect(rightLabel?.style.opacity).toBe('1');
        });

        describe('if slider has min-max labels', () => {
          const maxLabel: HTMLDivElement | null = element.querySelector('.range-slider__min-max-label_right');

          if (maxLabel !== null) {
            maxLabel.getBoundingClientRect = jest.fn(() => ({
              ...defaultDomRect,
              left: 100,
            }));
          }

          it('hide max label, if distance between it and right value label is small', () => {
            if (rightLabel !== null) {
              rightLabel.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                right: 98,
              }));

              slider.inform('viewSetRight', null);

              expect(maxLabel?.style.opacity).toBe('0');
            }
          });

          it('show max label, if distance between it and right value label is big', () => {
            if (rightLabel !== null) {
              rightLabel.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                right: 50,
              }));

              slider.inform('viewSetRight', null);

              expect(maxLabel?.style.opacity).toBe('1');
            }
          });
        });
      });
    });

    describe('if eventType is "viewToggleOrientation"', () => {
      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
      const rightLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_right');
      if (leftLabel !== null) {
        leftLabel.textContent = '';
      }
      if (rightLabel !== null) {
        rightLabel.textContent = '';
      }

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      slider.subscribe(subscriber);

      slider.inform('viewToggleOrientation', null);

      it('set left value for view', () => {
        expect(leftLabel?.textContent).toBe(`${defaultSliderOptions.leftValue}`);
      });

      it('set right value for view', () => {
        expect(rightLabel?.textContent).toBe(`${defaultSliderOptions.rightValue}`);
      });

      it('notify subscribers', () => {
        expect(subscriber.inform).toBeCalledWith('sliderToggleOrientation', null);
      });
    });

    describe('if eventType is "viewToggleRange"', () => {
      describe('if slider became range', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, defaultSliderOptions);

        const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
        const rightLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_right');
        const input: HTMLInputElement | null = element.querySelector('.range-slider__input');
        if (leftLabel !== null) {
          leftLabel.textContent = '';
        }
        if (rightLabel !== null) {
          rightLabel.textContent = '';
        }
        if (input !== null) {
          input.value = '';
        }

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        slider.subscribe(subscriber);

        slider.inform('viewToggleRange', null);

        it('set left value for view', () => {
          expect(leftLabel?.textContent).toBe(`${defaultSliderOptions.leftValue}`);
        });

        it('set right value for view (= max)', () => {
          expect(rightLabel?.textContent).toBe(`${defaultSliderOptions.max}`);
        });

        it('set value for hidden input', () => {
          expect(input?.value).toBe(`${defaultSliderOptions.leftValue} - ${defaultSliderOptions.max}`);
        });

        it('notify subscribers', () => {
          expect(subscriber.inform).toBeCalledWith('sliderToggleRange', null);
        });
      });

      describe('if slider became not range', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, {
          ...defaultSliderOptions,
          range: false,
        });

        const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
        const input: HTMLInputElement | null = element.querySelector('.range-slider__input');
        if (leftLabel !== null) {
          leftLabel.textContent = '';
        }
        if (input !== null) {
          input.value = '';
        }

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        slider.subscribe(subscriber);

        slider.inform('viewToggleRange', null);

        it('set left value for view', () => {
          expect(leftLabel?.textContent).toBe(`${defaultSliderOptions.leftValue}`);
        });

        it('right value becomes undefined', () => {
          expect(slider.getValues().rightValue).toBeUndefined();
        });

        it('set value for hidden input', () => {
          expect(input?.value).toBe(`${defaultSliderOptions.leftValue}`);
        });

        it('notify subscribers', () => {
          expect(subscriber.inform).toBeCalledWith('sliderToggleRange', null);
        });
      });
    });

    describe('if eventType is "viewSetScaleIntervals"', () => {
      describe('if slider has scale', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, defaultSliderOptions);

        const scale: HTMLDivElement | null = element.querySelector('.range-slider__scale');
        scale?.remove();

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        slider.subscribe(subscriber);

        slider.inform('viewSetScaleIntervals', null);

        it('render scale', () => {
          expect(scale).toBeTruthy();
        });

        it('with right number of intervals', () => {
          expect(element.querySelectorAll('.range-slider__scale-interval')).toHaveLength(defaultSliderOptions.scaleIntervals);
        });

        it('notify subscribers', () => {
          expect(subscriber.inform).toBeCalledWith('sliderSetScaleIntervals', defaultSliderOptions.scaleIntervals);
        });
      });

      describe('if slider has no scale', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, {
          ...defaultSliderOptions,
          scale: false,
        });

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        slider.subscribe(subscriber);

        slider.inform('viewSetScaleIntervals', null);

        it('do not render scale', () => {
          expect(element.querySelector('.range-slider__scale')).toBeFalsy();
        });

        it('notify subscribers', () => {
          expect(subscriber.inform).toBeCalledWith('sliderSetScaleIntervals', defaultSliderOptions.scaleIntervals);
        });
      });
    });

    describe('if eventType is "viewAddValueLabels"', () => {
      describe('if slider is range', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, defaultSliderOptions);

        const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
        const rightLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_right');
        const commonLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_common');
        if (leftLabel !== null) {
          leftLabel.textContent = '';
        }
        if (rightLabel !== null) {
          rightLabel.textContent = '';
        }
        if (commonLabel !== null) {
          commonLabel.textContent = '';
        }

        slider.inform('viewAddValueLabels', null);

        it('set value for left label', () => {
          expect(leftLabel?.textContent).toBe(`${defaultSliderOptions.leftValue}`);
        });

        it('set value for right label', () => {
          expect(rightLabel?.textContent).toBe(`${defaultSliderOptions.rightValue}`);
        });

        it('set value for common label', () => {
          expect(commonLabel?.textContent).toBe(`${defaultSliderOptions.leftValue} - ${defaultSliderOptions.rightValue}`);
        });
      });

      describe('if slider is not range', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, {
          ...defaultSliderOptions,
          range: false,
        });

        const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
        if (leftLabel !== null) {
          leftLabel.textContent = '';
        }

        slider.inform('viewAddValueLabels', null);

        it('set value for left label', () => {
          expect(leftLabel?.textContent).toBe(`${defaultSliderOptions.leftValue}`);
        });
      });
    });

    describe('if eventType is "viewAddMinMaxLabels"', () => {
      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      const minLabel: HTMLDivElement | null = element.querySelector('.range-slider__min-max-label_left');
      const maxLabel: HTMLDivElement | null = element.querySelector('.range-slider__min-max-label_right');
      if (minLabel !== null) {
        minLabel.textContent = '';
      }
      if (maxLabel !== null) {
        maxLabel.textContent = '';
      }

      slider.inform('viewAddMinMaxLabels', null);

      it('set value for min label', () => {
        expect(minLabel?.textContent).toBe(`${defaultSliderOptions.min}`);
      });

      it('set value for max label', () => {
        expect(maxLabel?.textContent).toBe(`${defaultSliderOptions.max}`);
      });
    });

    describe('if eventType is "modelSetLeft"', () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      const leftLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_left');
      if (leftLabel !== null) {
        leftLabel.textContent = '';
      }
      const leftThumb: HTMLDivElement | null = element.querySelector('.range-slider__thumb_left');
      if (leftThumb !== null) {
        leftThumb.style.left = '';
      }

      const track: HTMLElement | null = element.querySelector('.range-slider__track');
      if (track !== null) {
        jest.spyOn(track, 'offsetWidth', 'get').mockImplementation(() => 100);
      }

      const input: HTMLInputElement | null = element.querySelector('.range-slider__input');
      if (input !== null) {
        input.value = '';
      }

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      slider.subscribe(subscriber);

      slider.inform('modelSetLeft', null);

      describe('set left value for view', () => {
        it('set value for value label', () => {
          expect(leftLabel?.textContent).toBe(`${defaultSliderOptions.leftValue}`);
        });

        it('set indent for thumb', () => {
          expect(leftThumb?.style.left).toBe(`${defaultSliderOptions.leftValue}%`);
        });

        it('update value for hidden input', () => {
          expect(input?.value).toBe(`${defaultSliderOptions.leftValue} - ${defaultSliderOptions.rightValue}`);
        });
      });

      it('call onChange method with left anf right values as parameters, if it is defined', () => {
        const newElement = document.createElement('div');
        const newSlider = new Presenter(newElement, defaultSliderOptions);
        newSlider.onChange = jest.fn();
        newSlider.inform('modelSetLeft', null);

        expect(newSlider.onChange)
          .toBeCalledWith(defaultSliderOptions.leftValue, defaultSliderOptions.rightValue);
      });

      it('notify subscribers', () => {
        expect(subscriber.inform).toBeCalledWith('sliderSetLeft', defaultSliderOptions.leftValue);
      });
    });

    describe('if eventType is "modelSetRight"', () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      const rightLabel: HTMLDivElement | null = element.querySelector('.range-slider__value-label_right');
      if (rightLabel !== null) {
        rightLabel.textContent = '';
      }
      const rightThumb: HTMLDivElement | null = element.querySelector('.range-slider__thumb_right');
      if (rightThumb !== null) {
        rightThumb.style.left = '';
      }

      const track: HTMLElement | null = element.querySelector('.range-slider__track');
      if (track !== null) {
        jest.spyOn(track, 'offsetWidth', 'get').mockImplementation(() => 100);
      }

      const input: HTMLInputElement | null = element.querySelector('.range-slider__input');
      if (input !== null) {
        input.value = '';
      }

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      slider.subscribe(subscriber);

      slider.inform('modelSetRight', null);

      describe('set right value for view', () => {
        it('set value for value label', () => {
          expect(rightLabel?.textContent).toBe(`${defaultSliderOptions.rightValue}`);
        });

        it('set indent for thumb', () => {
          expect(rightThumb?.style.left).toBe(`${defaultSliderOptions.rightValue}%`);
        });

        it('update value for hidden input', () => {
          expect(input?.value).toBe(`${defaultSliderOptions.leftValue} - ${defaultSliderOptions.rightValue}`);
        });
      });

      it('call onChange method with left anf right values as parameters, if it is defined', () => {
        const newElement = document.createElement('div');
        const newSlider = new Presenter(newElement, defaultSliderOptions);
        newSlider.onChange = jest.fn();
        newSlider.inform('modelSetRight', null);

        expect(newSlider.onChange)
          .toBeCalledWith(defaultSliderOptions.leftValue, defaultSliderOptions.rightValue);
      });

      it('notify subscribers', () => {
        expect(subscriber.inform).toBeCalledWith('sliderSetRight', defaultSliderOptions.rightValue);
      });
    });

    describe('if eventType is "modelSetMin"', () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      const minLabel: HTMLDivElement | null = element.querySelector('.range-slider__min-max-label_left');
      if (minLabel !== null) {
        minLabel.textContent = '';
      }

      const leftThumb: HTMLDivElement | null = element.querySelector('.range-slider__thumb_left');
      if (leftThumb !== null) {
        leftThumb.style.left = '';
      }

      const rightThumb: HTMLDivElement | null = element.querySelector('.range-slider__thumb_right');
      if (rightThumb !== null) {
        rightThumb.style.left = '';
      }

      const track: HTMLElement | null = element.querySelector('.range-slider__track');
      if (track !== null) {
        jest.spyOn(track, 'offsetWidth', 'get').mockImplementation(() => 100);
      }

      const scale: HTMLDivElement | null = element.querySelector('.range-slider__scale');
      scale?.remove();

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      slider.subscribe(subscriber);

      slider.inform('modelSetMin', null);

      it('set min value for view', () => {
        expect(minLabel?.textContent).toBe(`${defaultSliderOptions.min}`);
      });

      it('update indent for left thumb', () => {
        expect(leftThumb?.style.left).toBe(`${defaultSliderOptions.leftValue}%`);
      });

      it('update indent for right thumb', () => {
        expect(rightThumb?.style.left).toBe(`${defaultSliderOptions.rightValue}%`);
      });

      it('re-render scale, if slider has scale', () => {
        expect(scale).toBeTruthy();
      });

      it('notify subscribers', () => {
        expect(subscriber.inform).toBeCalledWith('sliderSetMin', defaultSliderOptions.min);
      });
    });

    describe('if eventType is "modelSetMax"', () => {
      afterAll(() => {
        jest.restoreAllMocks();
      });

      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);

      const maxLabel: HTMLDivElement | null = element.querySelector('.range-slider__min-max-label_right');
      if (maxLabel !== null) {
        maxLabel.textContent = '';
      }

      const leftThumb: HTMLDivElement | null = element.querySelector('.range-slider__thumb_left');
      if (leftThumb !== null) {
        leftThumb.style.left = '';
      }

      const rightThumb: HTMLDivElement | null = element.querySelector('.range-slider__thumb_right');
      if (rightThumb !== null) {
        rightThumb.style.left = '';
      }

      const track: HTMLElement | null = element.querySelector('.range-slider__track');
      if (track !== null) {
        jest.spyOn(track, 'offsetWidth', 'get').mockImplementation(() => 100);
      }

      const scale: HTMLDivElement | null = element.querySelector('.range-slider__scale');
      scale?.remove();

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      slider.subscribe(subscriber);

      slider.inform('modelSetMax', null);

      it('set max value for view', () => {
        expect(maxLabel?.textContent).toBe(`${defaultSliderOptions.max}`);
      });

      it('update indent for left thumb', () => {
        expect(leftThumb?.style.left).toBe(`${defaultSliderOptions.leftValue}%`);
      });

      it('update indent for right thumb', () => {
        expect(rightThumb?.style.left).toBe(`${defaultSliderOptions.rightValue}%`);
      });

      it('re-render scale, if slider has scale', () => {
        expect(scale).toBeTruthy();
      });

      it('notify subscribers', () => {
        expect(subscriber.inform).toBeCalledWith('sliderSetMax', defaultSliderOptions.max);
      });
    });

    describe('if eventType is "modelToggleRange"', () => {
      describe('if slider became range', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, {
          ...defaultSliderOptions,
          range: false,
        });

        slider.inform('modelToggleRange', null);

        it('add right thumb', () => {
          const rightThumb = element.querySelector('.range-slider__thumb_right');
          expect(rightThumb).toBeTruthy();
        });

        it('add right value label, if slider has value labels', () => {
          const rightLabel = element.querySelector('.range-slider__value-label_right');
          expect(rightLabel).toBeTruthy();
        });

        it('add common value label, if slider has value labels', () => {
          const commonLabel = element.querySelector('.range-slider__value-label_common');
          expect(commonLabel).toBeTruthy();
        });
      });

      describe('if slider became not range', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, defaultSliderOptions);

        slider.inform('modelToggleRange', null);

        it('remove right thumb', () => {
          const rightThumb = element.querySelector('.range-slider__thumb_right');
          expect(rightThumb).toBeFalsy();
        });

        it('remove right value label, if slider has value labels', () => {
          const rightLabel = element.querySelector('.range-slider__value-label_right');
          expect(rightLabel).toBeFalsy();
        });

        it('remove common value label, if slider has value labels', () => {
          const commonLabel = element.querySelector('.range-slider__value-label_common');
          expect(commonLabel).toBeFalsy();
        });
      });
    });

    describe('if eventType is "modelSetStep"', () => {
      it('notify subscribers', () => {
        const element = document.createElement('div');
        const slider = new Presenter(element, defaultSliderOptions);

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        slider.subscribe(subscriber);

        slider.inform('modelSetStep', null);

        expect(subscriber.inform).toBeCalledWith('sliderSetStep', defaultSliderOptions.step);
      });
    });
  });

  describe('setLeftValue(value)', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.setLeftValue(50);

    it('change left value', () => {
      const leftValueLabel = element.querySelector('.range-slider__value-label_left');
      expect(leftValueLabel?.textContent).toBe('50');
    });

    it('return slider instance', () => {
      expect(slider.setLeftValue(50)).toBe(slider);
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

    it('return slider instance', () => {
      expect(slider.setRightValue(50)).toBe(slider);
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

    it('return slider instance', () => {
      expect(slider.setStep(10)).toBe(slider);
    });
  });

  describe('setMin(value', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.setMin(10);

    it('change left value', () => {
      const minLabel = element.querySelector('.range-slider__min-max-label_left');
      expect(minLabel?.textContent).toBe('10');
    });

    it('return slider instance', () => {
      expect(slider.setMin(10)).toBe(slider);
    });
  });

  describe('setMax(value', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.setMax(200);

    it('change left value', () => {
      const maxLabel = element.querySelector('.range-slider__min-max-label_right');
      expect(maxLabel?.textContent).toBe('200');
    });

    it('return slider instance', () => {
      expect(slider.setMax(200)).toBe(slider);
    });
  });

  describe('toggleOrientation()', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.toggleOrientation();

    it('if slider was horizontal, make it vertical', () => {
      expect(element.classList).toContain('range-slider_vertical');
    });

    it('if slider was vertical, make it horizontal', () => {
      const newElement = document.createElement('div');
      const newSlider = new Presenter(newElement, {
        ...defaultSliderOptions,
        vertical: true,
      });
      newSlider.toggleOrientation();

      expect(newElement.classList).not.toContain('range-slider_vertical');
    });

    it('return slider instance', () => {
      expect(slider.toggleOrientation()).toBe(slider);
    });
  });

  describe('toggleRange()', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);
    slider.toggleRange();

    it('if slider was range, make it not range', () => {
      expect(element.querySelector('.range-slider__thumb_right')).toBeFalsy();
    });

    it('if slider was not range, make it range', () => {
      const newElement = document.createElement('div');
      const newSlider = new Presenter(newElement, {
        ...defaultSliderOptions,
        range: false,
      });
      newSlider.toggleRange();

      expect(newElement.querySelector('.range-slider__thumb_right')).toBeTruthy();
    });

    it('return slider instance', () => {
      expect(slider.toggleRange()).toBe(slider);
    });
  });

  describe('toggleValueLabels()', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);

    const subscriber = {
      inform() {},
    };
    subscriber.inform = jest.fn();
    slider.subscribe(subscriber);

    slider.toggleValueLabels();

    it('if slider had value labels, remove them', () => {
      expect(element.querySelector('.range-slider__value-label_left')).toBeFalsy();
    });

    it('if slider had no value labels, add them', () => {
      const newElement = document.createElement('div');
      const newSlider = new Presenter(newElement, {
        ...defaultSliderOptions,
        valueLabels: false,
      });
      newSlider.toggleValueLabels();

      expect(newElement.querySelector('.range-slider__value-label_left')).toBeTruthy();
    });

    it('notify subscribers', () => {
      expect(subscriber.inform).toBeCalledWith('sliderToggleValueLabels', null);
    });

    it('return slider instance', () => {
      expect(slider.toggleValueLabels()).toBe(slider);
    });
  });

  describe('toggleMinMaxLabels()', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);

    const subscriber = {
      inform() {},
    };
    subscriber.inform = jest.fn();
    slider.subscribe(subscriber);

    slider.toggleMinMaxLabels();

    it('if slider had min-max labels, remove them', () => {
      expect(element.querySelector('.range-slider__min-max-label_left')).toBeFalsy();
    });

    it('if slider had no min-max labels, add them', () => {
      const newElement = document.createElement('div');
      const newSlider = new Presenter(newElement, {
        ...defaultSliderOptions,
        minMaxLabels: false,
      });
      newSlider.toggleMinMaxLabels();

      expect(newElement.querySelector('.range-slider__min-max-label_left')).toBeTruthy();
    });

    it('notify subscribers', () => {
      expect(subscriber.inform).toBeCalledWith('sliderToggleMinMaxLabels', null);
    });

    it('return slider instance', () => {
      expect(slider.toggleMinMaxLabels()).toBe(slider);
    });
  });

  describe('toggleScale()', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);

    const subscriber = {
      inform() {},
    };
    subscriber.inform = jest.fn();
    slider.subscribe(subscriber);

    slider.toggleScale();

    it('if slider had scale, remove it', () => {
      expect(element.querySelector('.range-slider__scale')).toBeFalsy();
    });

    it('if slider had no scale, add it', () => {
      const newElement = document.createElement('div');
      const newSlider = new Presenter(newElement, {
        ...defaultSliderOptions,
        scale: false,
      });
      newSlider.toggleScale();

      expect(newElement.querySelector('.range-slider__scale')).toBeTruthy();
    });

    it('notify subscribers', () => {
      expect(subscriber.inform).toBeCalledWith('sliderToggleScale', null);
    });

    it('return slider instance', () => {
      expect(slider.toggleScale()).toBe(slider);
    });
  });

  describe('setScaleIntervals(value)', () => {
    const element = document.createElement('div');
    const slider = new Presenter(element, defaultSliderOptions);

    describe('if value is valid', () => {
      it('set scale intervals', () => {
        for (let i = 1; i <= 10; i += 1) {
          slider.setScaleIntervals(i);
          expect(element.querySelectorAll('.range-slider__scale-interval')).toHaveLength(i);
        }
      });
    });

    describe('if value is not valid', () => {
      it('nothing changes, if value = 0', () => {
        slider.setScaleIntervals(5);
        slider.setScaleIntervals(0);
        expect(element.querySelectorAll('.range-slider__scale-interval')).toHaveLength(5);
      });

      it('nothing changes, if value < 0', () => {
        slider.setScaleIntervals(5);
        slider.setScaleIntervals(-5);
        expect(element.querySelectorAll('.range-slider__scale-interval')).toHaveLength(5);
      });
    });

    it('return slider instance', () => {
      expect(slider.setScaleIntervals(5)).toBe(slider);
    });
  });

  describe('getValues()', () => {
    describe('return object with slider options', () => {
      const element = document.createElement('div');
      const slider = new Presenter(element, defaultSliderOptions);
      const options = slider.getValues();

      it('min', () => {
        expect(options.min).toBe(defaultSliderOptions.min);
      });

      it('max', () => {
        expect(options.max).toBe(defaultSliderOptions.max);
      });

      it('leftValue', () => {
        expect(options.leftValue).toBe(defaultSliderOptions.leftValue);
      });

      it('rightValue', () => {
        expect(options.rightValue).toBe(defaultSliderOptions.rightValue);
      });

      it('range', () => {
        expect(options.range).toBe(defaultSliderOptions.range);
      });

      it('step', () => {
        expect(options.step).toBe(defaultSliderOptions.step);
      });

      it('minMaxLabels', () => {
        expect(options.minMaxLabels).toBe(defaultSliderOptions.minMaxLabels);
      });

      it('valueLabels', () => {
        expect(options.valueLabels).toBe(defaultSliderOptions.valueLabels);
      });

      it('vertical', () => {
        expect(options.vertical).toBe(defaultSliderOptions.vertical);
      });

      it('scale', () => {
        expect(options.scale).toBe(defaultSliderOptions.scale);
      });

      it('scaleIntervals', () => {
        expect(options.scaleIntervals).toBe(defaultSliderOptions.scaleIntervals);
      });
    });
  });
});
