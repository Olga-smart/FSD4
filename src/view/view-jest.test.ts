import View from './View';
import Range from './subviews/Range/Range';
import Scale from './subviews/Scale/Scale';

describe('View', () => {
  describe('constructor()', () => {
    const slider = document.createElement('div');
    const view = new View(slider);

    it('set up component property', () => {
      expect(view.getComponent()).toBe(slider);
    });

    describe('render', () => {
      const track = view.getComponent().querySelector('.range-slider__track');
      const sliderElement = view.getComponent().querySelector('.range-slider__slider');
      const range = view.getComponent().querySelector('.range-slider__range');

      it('append range component to track component', () => {
        expect(track?.children).toContain(range);
      });

      it('append track component to slider component', () => {
        expect(sliderElement?.children).toContain(track);
      });

      it('append thumbLeft component to slider component', () => {
        const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');
        expect(sliderElement?.children).toContain(thumbLeft);
      });

      it('append slider component to view component', () => {
        expect(view.getComponent().children).toContain(sliderElement);
      });

      it('append thumbRight component to slider component if view.isRange', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
        });
        const newSliderElement = newView.getComponent().querySelector('.range-slider__slider');

        const thumbRight = newView.getComponent().querySelector('.range-slider__thumb_right');
        expect(newSliderElement?.children).toContain(thumbRight);
      });

      describe('set initial indent for range component', () => {
        afterAll(() => {
          jest.restoreAllMocks();
        });

        it('set left indent = 0 if slider is horizontal or by default', () => {
          const newSlider = document.createElement('div');
          jest.spyOn(Range.prototype, 'setLeftIndent');
          // eslint-disable-next-line no-new
          new View(newSlider);

          expect(Range.prototype.setLeftIndent).toBeCalledWith(0);
        });

        it('set bottom indent = 0 if slider is vertical', () => {
          const newSlider = document.createElement('div');
          jest.spyOn(Range.prototype, 'setBottomIndent');
          // eslint-disable-next-line no-new
          new View(newSlider, {
            vertical: true,
          });

          expect(Range.prototype.setBottomIndent).toBeCalledWith(0);
        });
      });

      describe('append minLabel and maxLabel components to labelsContainer if necessary', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          minMaxLabels: true,
        });
        const labelsContainer = newView.getComponent().querySelector('.range-slider__labels-container');

        it('append minLabel', () => {
          const minLabel = newView.getComponent().querySelector('.range-slider__min-max-label_left');
          expect(labelsContainer?.children).toContain(minLabel);
        });

        it('append maxLabel', () => {
          const maxLabel = newView.getComponent().querySelector('.range-slider__min-max-label_right');
          expect(labelsContainer?.children).toContain(maxLabel);
        });
      });

      describe('append labels components to labelsContainer if necessary', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          valueLabels: true,
          range: true,
        });
        const labelsContainer = newView.getComponent().querySelector('.range-slider__labels-container');

        it('append valueLabelLeft component', () => {
          const valueLabelLeft = newView.getComponent().querySelector('.range-slider__value-label_left');
          expect(labelsContainer?.children).toContain(valueLabelLeft);
        });

        it('append valueLabelRight component', () => {
          const valueLabelRight = newView.getComponent().querySelector('.range-slider__value-label_right');
          expect(labelsContainer?.children).toContain(valueLabelRight);
        });

        it('append valueLabelCommon component', () => {
          const valueLabelCommon = newView.getComponent().querySelector('.range-slider__value-label_common');
          expect(labelsContainer?.children).toContain(valueLabelCommon);
        });
      });

      it('append labelsContainer component to view component if necessary', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          minMaxLabels: true,
          valueLabels: true,
        });
        const labelsContainer = newView.getComponent().querySelector('.range-slider__labels-container');

        expect(newView.getComponent().children).toContain(labelsContainer);
      });

      it('add necessary class to view component if slider is vertical', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          vertical: true,
        });

        expect(newView.getComponent().classList).toContain('range-slider_vertical');
      });

      it('append panel component to view component if necessary', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          panel: true,
        });
        const panel = newView.getComponent().querySelector('.range-slider__panel');

        expect(newView.getComponent().children).toContain(panel);
      });
    });
  });

  describe('setMinValue(min)', () => {
    it('if view has min label, set up its value', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });
      const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left');

      for (let i = -100; i <= 100; i += 1) {
        view.setMinValue(i);
        expect(minLabel?.textContent).toBe(`${i}`);
      }
    });
  });

  describe('setMaxValue(max)', () => {
    it('if view has maxLabel, set up its value', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });
      const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right');

      for (let i = -100; i <= 100; i += 1) {
        view.setMaxValue(i);
        expect(maxLabel?.textContent).toBe(`${i}`);
      }
    });
  });

  describe('setLeftValue(value, percent)', () => {
    describe('do necessary actions with thumb', () => {
      describe('set up left thumb position', () => {
        it('change left indent if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(thumbLeft.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(thumbLeft.style.top).toBe(`${100 - i}%`);
          }
        });
      });

      describe('make z-index of left thumb higher when it is at maximum', () => {
        it('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);

          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;
          thumbLeft.style.left = '100%';

          view.setLeftValue(200, 100);

          expect(thumbLeft.style.zIndex).toBe('100');
        });

        it('if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });

          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;
          thumbLeft.style.top = '0%';

          view.setLeftValue(200, 100);
          expect(thumbLeft.style.zIndex).toBe('100');
        });
      });
    });

    describe('do necessary actions with range', () => {
      describe('if slider is horizontal', () => {
        it('set up range width if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          const range = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect((range as HTMLElement).style.width).toBe(`${i}%`);
          }
        });

        it('set up range left indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
          });
          const range = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect((range as HTMLElement).style.left).toBe(`${i}%`);
          }
        });
      });

      describe('if slider is vertical', () => {
        it('set up range height if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          const range = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect((range as HTMLElement).style.height).toBe(`${i}%`);
          }
        });

        it('set up range bottom indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            range: true,
          });
          const range = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect((range as HTMLElement).style.bottom).toBe(`${i}%`);
          }
        });
      });
    });

    describe('do necessary actions with labels, if slider has labels', () => {
      describe('set up labels value', () => {
        it('set up left label value', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
          });
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

          for (let value = -100; value <= 100; value += 1) {
            view.setLeftValue(value, 100);
            expect(valueLabelLeft?.textContent).toBe(`${value}`);
          }
        });

        it('set up common label value, if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            range: true,
          });
          const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common');
          const rightValue = 200;
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
          valueLabelRight!.textContent = `${rightValue}`;

          for (let value = -100; value <= 100; value += 1) {
            view.setLeftValue(value, 100);
            expect(valueLabelCommon?.textContent).toBe(`${value} - ${rightValue}`);
          }
        });
      });

      describe('set up left value label position', () => {
        it('change left indent, if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
          });
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(valueLabelLeft!.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            valueLabels: true,
          });
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(valueLabelLeft!.style.top).toBe(`${100 - i}%`);
          }
        });
      });

      describe('check if 2 value labels close to each other, if view.isRange', () => {
        describe('merge labels, if 2 value labels is close to each other', () => {
          describe('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: false,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 52,
              });

            view.setLeftValue(100, 100);

            it('make left value label transparent', () => {
              expect(valueLabelLeft!.style.opacity).toBe('0');
            });

            it('make right value label transparent', () => {
              expect(valueLabelRight!.style.opacity).toBe('0');
            });

            it('make common value label opaque', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('1');
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 52,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setLeftValue(100, 100);

            it('make left value label transparent', () => {
              expect(valueLabelLeft!.style.opacity).toBe('0');
            });

            it('make right value label transparent', () => {
              expect(valueLabelRight!.style.opacity).toBe('0');
            });

            it('make common value label opaque', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('1');
            });
          });
        });

        describe('split labels, if 2 value labels is not close to each other', () => {
          describe('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: false,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 55,
              });

            view.setLeftValue(100, 100);

            it('make common value label transparent', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('0');
            });

            it('make left value label opaque', () => {
              expect(valueLabelLeft!.style.opacity).toBe('1');
            });

            it('make right value label opaque', () => {
              expect(valueLabelRight!.style.opacity).toBe('1');
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 55,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setLeftValue(100, 100);

            it('make common value label transparent', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('0');
            });

            it('make left value label opaque', () => {
              expect(valueLabelLeft!.style.opacity).toBe('1');
            });

            it('make right value label opaque', () => {
              expect(valueLabelRight!.style.opacity).toBe('1');
            });
          });
        });
      });

      describe('check if left value label close to min label, if slider has min and max labels', () => {
        describe('make min label transparent, if left value label is close to it', () => {
          it('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: false,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left') as HTMLElement;
            minLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 52,
              });
            (minLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });

            view.setLeftValue(100, 100);

            expect(minLabel?.style.opacity).toBe('0');
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left') as HTMLElement;
            minLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });
            (minLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 52,
              });

            view.setLeftValue(100, 100);

            expect(minLabel?.style.opacity).toBe('0');
          });
        });

        describe('make min label not transparent, if left value label is not close to it', () => {
          it('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: false,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left') as HTMLElement;
            minLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 55,
              });
            (minLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });

            view.setLeftValue(100, 100);

            expect(minLabel?.style.opacity).toBe('1');
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left') as HTMLElement;
            minLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });
            (minLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 55,
              });

            view.setLeftValue(100, 100);

            expect(minLabel?.style.opacity).toBe('1');
          });
        });
      });

      describe('check if left value label close to max label, if slider has min and max labels and !view.isRange', () => {
        describe('make max label transparent, if left value label is close to it', () => {
          it('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: false,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 52,
              });

            view.setLeftValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('0');
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 52,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setLeftValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('0');
          });
        });

        describe('make max label not transparent, if left value label is not close to it', () => {
          it('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: false,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 55,
              });

            view.setLeftValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('1');
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 55,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setLeftValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('1');
          });
        });
      });
    });
  });

  describe('setRightValue(value, percent)', () => {
    describe('do necessary actions with thumb', () => {
      describe('set up left thumb position', () => {
        it('change left indent, if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
          });
          const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(thumbRight!.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
          });
          const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(thumbRight!.style.top).toBe(`${100 - i}%`);
          }
        });
      });
    });

    describe('do necessary actions with range', () => {
      it('set up range right indent, if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: true,
        });
        const range = view.getComponent().querySelector('.range-slider__range');

        for (let i = 0; i <= 100; i += 1) {
          view.setRightValue(50, i);
          expect((range as HTMLElement).style.right).toBe(`${100 - i}%`);
        }
      });

      it('set up range top indent, if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
        });
        const range = view.getComponent().querySelector('.range-slider__range');

        for (let i = 0; i <= 100; i += 1) {
          view.setRightValue(50, i);
          expect((range as HTMLElement).style.top).toBe(`${100 - i}%`);
        }
      });
    });

    describe('do necessary actions with labels, if slider has labels', () => {
      describe('set up labels value', () => {
        it('set up right label value', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');

          for (let value = -100; value <= 100; value += 1) {
            view.setRightValue(value, 100);
            expect(valueLabelRight?.textContent).toBe(`${value}`);
          }
        });

        it('set up common label value', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            range: true,
          });
          const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common');
          const leftValue = -200;
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
          valueLabelLeft!.textContent = `${leftValue}`;

          for (let value = -100; value <= 100; value += 1) {
            view.setRightValue(value, 100);
            expect(valueLabelCommon?.textContent).toBe(`${leftValue} - ${value}`);
          }
        });
      });

      describe('set up right value label position', () => {
        it('change left indent, if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(valueLabelRight!.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
            valueLabels: true,
          });
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(valueLabelRight!.style.top).toBe(`${100 - i}%`);
          }
        });
      });

      describe('check if 2 value labels close to each other', () => {
        describe('merge labels, if 2 value labels is close to each other', () => {
          describe('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: false,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 52,
              });

            view.setRightValue(100, 100);

            it('make left value label transparent', () => {
              expect(valueLabelLeft!.style.opacity).toBe('0');
            });

            it('make right value label transparent', () => {
              expect(valueLabelRight!.style.opacity).toBe('0');
            });

            it('make common value label opaque', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('1');
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 52,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setRightValue(100, 100);

            it('make left value label transparent', () => {
              expect(valueLabelLeft!.style.opacity).toBe('0');
            });

            it('make right value label transparent', () => {
              expect(valueLabelRight!.style.opacity).toBe('0');
            });

            it('make common value label opaque', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('1');
            });
          });
        });

        describe('split labels, if 2 value labels is not close to each other', () => {
          describe('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: false,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 55,
              });

            view.setLeftValue(100, 100);

            it('make common value label transparent', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('0');
            });

            it('make left value label opaque', () => {
              expect(valueLabelLeft!.style.opacity).toBe('1');
            });

            it('make right value label opaque', () => {
              expect(valueLabelRight!.style.opacity).toBe('1');
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
            valueLabelLeft!.getBoundingClientRect = jest.fn();
            valueLabelRight!.getBoundingClientRect = jest.fn();
            (valueLabelLeft!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 55,
              });
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setRightValue(100, 100);

            it('make common value label transparent', () => {
              const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
              expect(valueLabelCommon!.style.opacity).toBe('0');
            });

            it('make left value label opaque', () => {
              expect(valueLabelLeft!.style.opacity).toBe('1');
            });

            it('make right value label opaque', () => {
              expect(valueLabelRight!.style.opacity).toBe('1');
            });
          });
        });
      });

      describe('check if right value label close to max label, if slider has min and max labels', () => {
        describe('make max label transparent, if right value label is close to it', () => {
          it('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: false,
              range: true,
            });
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
            valueLabelRight!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 52,
              });

            view.setRightValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('0');
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
              range: true,
            });
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
            valueLabelRight!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 52,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setRightValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('0');
          });
        });

        describe('make max label not transparent, if right value label is not close to it', () => {
          it('if slider is horizontal', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: false,
              range: true,
            });
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
            valueLabelRight!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                right: 50,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                left: 55,
              });

            view.setRightValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('1');
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
              range: true,
            });
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
            valueLabelRight!.getBoundingClientRect = jest.fn();
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right') as HTMLElement;
            maxLabel!.getBoundingClientRect = jest.fn();
            (valueLabelRight!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                top: 55,
              });
            (maxLabel!.getBoundingClientRect as jest.Mock)
              .mockReturnValue({
                bottom: 50,
              });

            view.setRightValue(100, 100);

            expect(maxLabel?.style.opacity).toBe('1');
          });
        });
      });
    });
  });

  describe('updateInput(value1, value2)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    const input = view.getComponent().querySelector('.range-slider__input') as HTMLInputElement;
    view.updateInput(1, 2);

    it('pass call to input with received values', () => {
      expect(input.value).toBe('1 - 2');
    });

    it('if second value is not received, pass null instead of it', () => {
      view.updateInput(1);
      expect(input.value).toBe('1');
    });
  });

  describe('handleLeftInput(clientX, clientY, shiftX, shiftY)', () => {
    describe('calc new left indent, if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider);
      view.notify = jest.fn();

      const track = view.getComponent().querySelector('.range-slider__track');
      track!.getBoundingClientRect = jest.fn();
      (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200,
      });
      view.getTrackWidth = jest.fn();
      (view.getTrackWidth as jest.Mock).mockReturnValue(500);

      it('if cursor is off left edge of track, new left indent is 0', () => {
        view.handleLeftInput(100, 200);
        expect(view.notify).toBeCalledWith('viewLeftInput', 0);
      });

      it('if cursor is off right edge of track, new left indent = track width', () => {
        view.handleLeftInput(800, 200);
        expect(view.notify).toBeCalledWith('viewLeftInput', 500);
      });

      it('if cursor is off right thumb position, new left indent = right thumb indent', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
        });
        newView.notify = jest.fn();

        const newTrack = newView.getComponent().querySelector('.range-slider__track');
        newTrack!.getBoundingClientRect = jest.fn();
        (newTrack!.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 200,
        });

        const thumbRight = newView.getComponent().querySelector('.range-slider__thumb_right') as HTMLElement;
        thumbRight!.getBoundingClientRect = jest.fn();
        (thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 400,
        });

        newView.handleLeftInput(500, 200);

        expect(newView.notify).toBeCalledWith('viewLeftInput', 200);
      });
    });

    describe('calc new bottom indent, if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
      });
      view.notify = jest.fn();

      const track = view.getComponent().querySelector('.range-slider__track');
      track!.getBoundingClientRect = jest.fn();
      (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200,
      });
      view.getTrackHeight = jest.fn();
      (view.getTrackHeight as jest.Mock).mockReturnValue(500);

      it('if cursor is off bottom edge of track, new bottom indent is 0', () => {
        view.handleLeftInput(100, 800);
        expect(view.notify).toBeCalledWith('viewLeftInput', 0);
      });

      it('if cursor is off top edge of track, new bottom indent = track height', () => {
        view.handleLeftInput(100, 100);
        expect(view.notify).toBeCalledWith('viewLeftInput', 500);
      });

      it('if cursor is off right thumb position, new bottom indent = right thumb indent', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          vertical: true,
          range: true,
        });
        newView.notify = jest.fn();

        const newTrack = newView.getComponent().querySelector('.range-slider__track');
        newTrack!.getBoundingClientRect = jest.fn();
        (newTrack!.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 200,
        });
        newView.getTrackHeight = jest.fn();
        (newView.getTrackHeight as jest.Mock).mockReturnValue(500);

        const thumbRight = newView.getComponent().querySelector('.range-slider__thumb_right') as HTMLElement;
        thumbRight!.getBoundingClientRect = jest.fn();
        (thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 400,
        });

        newView.handleLeftInput(100, 300);

        expect(newView.notify).toBeCalledWith('viewLeftInput', 500 - 200);
      });
    });
  });

  describe('handleRightInput(clientX, clientY, shiftX, shiftY)', () => {
    describe('calc new left indent, if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
      });
      view.notify = jest.fn();

      const track = view.getComponent().querySelector('.range-slider__track');
      track!.getBoundingClientRect = jest.fn();
      (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200,
      });
      view.getTrackWidth = jest.fn();
      (view.getTrackWidth as jest.Mock).mockReturnValue(500);

      it('if cursor is off left thumb position, new left indent = left thumb indent', () => {
        const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;
        thumbLeft.getBoundingClientRect = jest.fn();
        (thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 400,
        });
        view.handleRightInput(300, 100);

        expect(view.notify).toBeCalledWith('viewRightInput', 200);
      });

      it('if cursor is off right edge of track, new left indent = track width', () => {
        view.handleRightInput(800, 200);
        expect(view.notify).toBeCalledWith('viewRightInput', 500);
      });
    });

    describe('calc new bottom indent, if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
        range: true,
      });
      view.notify = jest.fn();

      const track = view.getComponent().querySelector('.range-slider__track');
      track!.getBoundingClientRect = jest.fn();
      (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200,
      });
      view.getTrackHeight = jest.fn();
      (view.getTrackHeight as jest.Mock).mockReturnValue(500);

      it('if cursor is off left thumb position, new bottom indent = left thumb indent', () => {
        const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;
        thumbLeft.getBoundingClientRect = jest.fn();
        (thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 400,
        });

        view.handleRightInput(100, 500);

        expect(view.notify).toBeCalledWith('viewRightInput', 500 - 200);
      });

      it('if cursor is off top edge of track, new bottom indent = track height', () => {
        view.handleRightInput(100, 100);
        expect(view.notify).toBeCalledWith('viewRightInput', 500);
      });
    });
  });

  describe('addScale(min, max)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      scale: true,
    });
    view.addScale(0, 150);

    it('set up scale property', () => {
      expect(view).toHaveProperty('scale');
    });

    it('scale property is instance of Scale', () => {
      expect(view.getScale()).toBeInstanceOf(Scale);
    });

    it('append scale component to this view component', () => {
      expect(view.getComponent().children).toContain(view.getScale()?.getComponent());
    });

    describe('all of above is also true for vertical slider', () => {
      const newSlider = document.createElement('div');
      const newView = new View(newSlider, {
        scale: true,
        vertical: true,
      });
      newView.addScale(0, 150);

      it('set up scale property', () => {
        expect(newView).toHaveProperty('scale');
      });

      it('scale property is instance of Scale', () => {
        expect(newView.getScale()).toBeInstanceOf(Scale);
      });

      it('append scale component to this view component', () => {
        expect(newView.getComponent().children).toContain(newView.getScale()?.getComponent());
      });
    });
  });

  describe('removeScale()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      scale: true,
    });
    view.addScale(0, 150);
    view.removeScale();

    it('remove scale component from DOM', () => {
      expect(view.getComponent().children).not.toContain(view.getScale()?.getComponent());
    });
  });

  describe('handleScaleOrTrackClick(x, y)', () => {
    describe('if !slider.isRange', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        valueLabels: true,
      });
      view.notify = jest.fn();
      const range = view.getComponent().querySelector('.range-slider__range');
      const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');
      const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

      view.handleScaleOrTrackClick(100, 100);

      describe('add smooth transition', () => {
        it('add necessary class to thumb', () => {
          expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
        });

        it('add necessary class range', () => {
          expect(range?.classList).toContain('range-slider__range_smooth-transition');
        });

        it('add necessary class to label', () => {
          expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
        });
      });

      describe('say subscribers that view wants to change left value and pass this value', () => {
        it('if slider is horizontal', () => {
          expect(view.notify).toBeCalledWith('viewLeftInput', 100);
        });

        it('if slider is vertical', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            scale: true,
            valueLabels: true,
            vertical: true,
          });
          newView.notify = jest.fn();
          newView.getTrackHeight = jest.fn();
          (newView.getTrackHeight as jest.Mock).mockReturnValue(500);

          newView.handleScaleOrTrackClick(100, 100);

          expect(newView.notify).toBeCalledWith('viewLeftInput', 500 - 100);
        });
      });

      describe('remove smooth transition', () => {
        beforeAll(() => {
          jest.useFakeTimers();
          view.handleScaleOrTrackClick(100, 100);
          jest.runAllTimers();
        });

        it('remove necessary class from thumb', () => {
          expect(thumbLeft?.classList).not.toContain('range-slider__thumb_smooth-transition');
        });

        it('remove necessary class from range', () => {
          expect(range?.classList).not.toContain('range-slider__range_smooth-transition');
        });

        it('remove necessary class from label', () => {
          expect(valueLabelLeft?.classList).not.toContain('range-slider__value-label_smooth-transition');
        });

        afterAll(() => {
          jest.useRealTimers();
        });
      });
    });

    describe('if slider.isRange', () => {
      describe('if left thumb is nearer', () => {
        describe('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            scale: true,
            valueLabels: true,
            range: true,
          });

          const track = view.getComponent().querySelector('.range-slider__track');
          track!.getBoundingClientRect = jest.fn();
          (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 0,
          });

          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');
          thumbLeft!.getBoundingClientRect = jest.fn();
          (thumbLeft!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 10,
            width: 16,
          });

          const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');
          thumbRight!.getBoundingClientRect = jest.fn();
          (thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 40,
            width: 16,
          });

          const range = view.getComponent().querySelector('.range-slider__range');
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

          view.notify = jest.fn();

          view.handleScaleOrTrackClick(30, 0);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class range', () => {
              expect(range?.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.notify).toBeCalledWith('viewLeftInput', 30);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(30, 0);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(thumbLeft?.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(range?.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(valueLabelLeft?.classList).not.toContain('range-slider__value-label_smooth-transition');
            });

            afterAll(() => {
              jest.useRealTimers();
            });
          });
        });

        describe('if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
            valueLabels: true,
          });

          const track = view.getComponent().querySelector('.range-slider__track');
          track!.getBoundingClientRect = jest.fn();
          (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 0,
          });
          view.getTrackHeight = jest.fn();
          (view.getTrackHeight as jest.Mock).mockReturnValue(500);

          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');
          thumbLeft!.getBoundingClientRect = jest.fn();
          (thumbLeft!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 40,
            height: 16,
          });

          const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');
          thumbRight!.getBoundingClientRect = jest.fn();
          (thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 10,
            height: 16,
          });

          const range = view.getComponent().querySelector('.range-slider__range');
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

          view.notify = jest.fn();

          view.handleScaleOrTrackClick(0, 38);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class range', () => {
              expect(range?.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.notify).toBeCalledWith('viewLeftInput', 500 - 38);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(0, 38);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(thumbLeft?.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(range?.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(valueLabelLeft?.classList).not.toContain('range-slider__value-label_smooth-transition');
            });

            afterAll(() => {
              jest.useRealTimers();
            });
          });
        });
      });

      describe('if right thumb is nearer', () => {
        describe('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });

          const track = view.getComponent().querySelector('.range-slider__track');
          track!.getBoundingClientRect = jest.fn();
          (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 0,
          });

          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;
          thumbLeft!.getBoundingClientRect = jest.fn();
          (thumbLeft!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 10,
            width: 16,
          });

          const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');
          thumbRight!.getBoundingClientRect = jest.fn();
          (thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 40,
            width: 16,
          });

          const range = view.getComponent().querySelector('.range-slider__range');
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');

          view.notify = jest.fn();

          view.handleScaleOrTrackClick(38, 0);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(thumbRight?.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class to range', () => {
              expect(range?.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(valueLabelRight?.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.notify).toBeCalledWith('viewRightInput', 38);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(38, 0);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(thumbRight?.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(range?.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(valueLabelRight?.classList).not.toContain('range-slider__value-label_smooth-transition');
            });

            afterAll(() => {
              jest.useRealTimers();
            });
          });
        });

        describe('if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
            valueLabels: true,
          });

          const track = view.getComponent().querySelector('.range-slider__track');
          track!.getBoundingClientRect = jest.fn();
          (track!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 0,
          });
          view.getTrackHeight = jest.fn();
          (view.getTrackHeight as jest.Mock).mockReturnValue(500);

          const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');
          thumbLeft!.getBoundingClientRect = jest.fn();
          (thumbLeft!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 40,
            height: 16,
          });

          const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');
          thumbRight!.getBoundingClientRect = jest.fn();
          (thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 10,
            height: 16,
          });

          view.notify = jest.fn();

          const range = view.getComponent().querySelector('.range-slider__range');
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');

          view.handleScaleOrTrackClick(0, 30);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(thumbRight?.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class to range', () => {
              expect(range?.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(valueLabelRight?.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.notify).toBeCalledWith('viewRightInput', 470);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(0, 30);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(thumbRight?.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(range?.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(valueLabelRight?.classList).not.toContain('range-slider__value-label_smooth-transition');
            });

            afterAll(() => {
              jest.useRealTimers();
            });
          });
        });
      });
    });
  });

  describe('updatePanelFrom(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });

    it('update from field with passed value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.updatePanelFrom(i);
        const panel = view.getComponent().querySelector('.range-slider__panel');
        const from = panel?.querySelector('.panel__from') as HTMLInputElement;
        expect(from.value).toBe(`${i}`);
      }
    });
  });

  describe('updatePanelTo(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });

    it('update to field with passed value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.updatePanelTo(i);
        const panel = view.getComponent().querySelector('.range-slider__panel');
        const to = panel?.querySelector('.panel__to') as HTMLInputElement;
        expect(to.value).toBe(`${i}`);
      }
    });
  });

  describe('updatePanelScaleIntervals(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });

    it('update scaleIntervals field with passed value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.updatePanelScaleIntervals(i);
        const panel = view.getComponent().querySelector('.range-slider__panel');
        const scaleIntervals = panel?.querySelector('.panel__scale-intervals') as HTMLInputElement;
        expect(scaleIntervals.value).toBe(`${i}`);
      }
    });
  });

  describe('updatePanelStep(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });

    it('update step field with passed value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.updatePanelStep(i);
        const panel = view.getComponent().querySelector('.range-slider__panel');
        const step = panel?.querySelector('.panel__step') as HTMLInputElement;
        expect(step.value).toBe(`${i}`);
      }
    });
  });

  describe('changeLeftValueFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.notify = jest.fn();

    it('say subscribers that view wants to change left value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeLeftValueFromOutside(i);
        expect(view.notify).toBeCalledWith('viewChangeLeftValueFromOutside', i);
      }
    });
  });

  describe('changeRightValueFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.notify = jest.fn();

    it('say subscribers that view wants to change right value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeRightValueFromOutside(i);
        expect(view.notify).toBeCalledWith('viewChangeRightValueFromOutside', i);
      }
    });
  });

  describe('changeMinFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.notify = jest.fn();

    it('say subscribers that view wants to change min value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeMinFromOutside(i);
        expect(view.notify).toBeCalledWith('viewChangeMinFromOutside', i);
      }
    });
  });

  describe('changeMaxFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.notify = jest.fn();

    it('say subscribers that view wants to change maz value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeMaxFromOutside(i);
        expect(view.notify).toBeCalledWith('viewChangeMaxFromOutside', i);
      }
    });
  });

  describe('changeStepFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.notify = jest.fn();

    it('say subscribers that view wants to change maz value and pass this value', () => {
      for (let i = 0; i <= 10; i += 0.1) {
        view.changeStepFromOutside(i);
        expect(view.notify).toBeCalledWith('viewChangeStepFromOutside', i);
      }
    });
  });

  describe('changeOrientationFromOutside()', () => {
    describe('if slider was horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: false,
        range: true,
        valueLabels: true,
        scale: true,
      });
      view.addScale(0, 100);

      view.getScale()!.handleSwitchFromHorizontalToVertical = jest.fn();
      view.notify = jest.fn();
      const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;
      const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right') as HTMLElement;

      view.changeOrientationFromOutside();

      it('set property vertical to true', () => {
        expect(view.isVertical()).toBe(true);
      });

      describe('set thumbs left indents to 0', () => {
        it('for left thumb', () => {
          expect(thumbLeft?.style.left).toBe(`${0}%`);
        });

        it('for right thumb', () => {
          expect(thumbRight?.style.left).toBe(`${0}%`);
        });
      });

      describe('make necessary transformations with range', () => {
        const range = view.getComponent().querySelector('.range-slider__range');

        it('set left indent to 0', () => {
          expect((range as HTMLElement).style.left).toBe(`${0}%`);
        });

        it('set right indent to 0', () => {
          expect((range as HTMLElement).style.right).toBe(`${0}%`);
        });

        it('reset top indent', () => {
          expect((range as HTMLElement).style.top).toBe('');
        });

        it('reset width', () => {
          expect((range as HTMLElement).style.width).toBe('');
        });
      });

      describe('reset labels indents', () => {
        it('for left label', () => {
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
          expect(valueLabelLeft!.style.left).toBe('');
        });

        it('for right label', () => {
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
          expect(valueLabelRight!.style.left).toBe('');
        });

        it('for common label', () => {
          const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
          expect(valueLabelCommon!.style.left).toBe('');
        });
      });

      it('fit scale to vertical view', () => {
        expect(view.getScale()?.handleSwitchFromHorizontalToVertical).toBeCalled();
      });

      it('say subscribers that orientation was changed', () => {
        expect(view.notify).toBeCalledWith('viewChangeOrientationFromOutside');
      });
    });

    describe('if slider was vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
        range: true,
        valueLabels: true,
        scale: true,
      });
      view.addScale(0, 100);

      view.getScale()!.handleSwitchFromVerticalToHorizontal = jest.fn();
      view.notify = jest.fn();
      const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left') as HTMLElement;
      const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right') as HTMLElement;

      view.changeOrientationFromOutside();

      it('set property vertical to false', () => {
        expect(view.isVertical()).toBe(false);
      });

      describe('set thumbs top indents to 0', () => {
        it('for left thumb', () => {
          expect(thumbLeft?.style.top).toBe(`${0}%`);
        });

        it('for right thumb', () => {
          expect(thumbRight?.style.top).toBe(`${0}%`);
        });
      });

      describe('make necessary transformations with range', () => {
        const range = view.getComponent().querySelector('.range-slider__range') as HTMLElement;

        it('set bottom indent to 0', () => {
          expect(range.style.bottom).toBe(`${0}%`);
        });

        it('set top indent to 0', () => {
          expect(range.style.top).toBe(`${0}%`);
        });

        it('reset height', () => {
          expect(range.style.height).toBe('');
        });
      });

      describe('reset labels indents', () => {
        it('for left label', () => {
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left') as HTMLElement;
          expect(valueLabelLeft?.style.top).toBe('');
        });

        it('for right label', () => {
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right') as HTMLElement;
          expect(valueLabelRight!.style.top).toBe('');
        });

        it('for common label', () => {
          const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common') as HTMLElement;
          expect(valueLabelCommon!.style.top).toBe('');
        });
      });

      it('fit scale to horizontal view', () => {
        expect(view.getScale()?.handleSwitchFromVerticalToHorizontal).toBeCalled();
      });

      it('say subscribers that orientation was changed', () => {
        expect(view.notify).toBeCalledWith('viewChangeOrientationFromOutside');
      });
    });
  });

  describe('toggleRangeFromOutside()', () => {
    describe('if slider becomes range', () => {
      describe('if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: false,
          range: false,
          valueLabels: true,
        });

        view.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('set property isRange to true', () => {
          expect(view.isRange()).toBe(true);
        });

        describe('add second thumb', () => {
          it('set thumbRight property', () => {
            expect(view).toHaveProperty('thumbRight');
          });

          it('add right thumb element to DOM', () => {
            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');
            expect(thumbRight).toBeInstanceOf(HTMLElement);
          });
        });

        describe('add second value label if necessary', () => {
          it('right', () => {
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
            expect(valueLabelRight).toBeDefined();
          });

          it('common', () => {
            const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common');
            expect(valueLabelCommon).toBeDefined();
          });
        });

        it('reset range width', () => {
          const range = view.getComponent().querySelector('.range-slider__range') as HTMLElement;
          expect(range.style.width).toBe('');
        });

        it('say subscribers that range was changed', () => {
          expect(view.notify).toBeCalledWith('viewToggleRangeFromOutside');
        });
      });

      describe('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: false,
          valueLabels: true,
        });

        view.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('set property isRange to true', () => {
          expect(view.isRange()).toBe(true);
        });

        describe('add second thumb', () => {
          it('set thumbRight property', () => {
            expect(view).toHaveProperty('thumbRight');
          });

          it('add right thumb element to DOM', () => {
            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');
            expect(thumbRight).toBeInstanceOf(HTMLElement);
          });
        });

        describe('add second value label if necessary', () => {
          it('right', () => {
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
            expect(valueLabelRight).toBeDefined();
          });

          it('common', () => {
            const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common');
            expect(valueLabelCommon).toBeDefined();
          });
        });

        it('reset range height', () => {
          const range = view.getComponent().querySelector('.range-slider__range') as HTMLElement;
          expect(range.style.height).toBe('');
        });

        it('say subscribers that range was changed', () => {
          expect(view.notify).toBeCalledWith('viewToggleRangeFromOutside');
        });
      });
    });

    describe('if slider becomes not range', () => {
      describe('if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: false,
          range: true,
          valueLabels: true,
        });

        view.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('say subscribers that range was changed', () => {
          expect(view.notify).toBeCalledWith('viewToggleRangeFromOutside');
        });
      });

      describe('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
          valueLabels: true,
        });

        view.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('reset range top indent', () => {
          const range = view.getComponent().querySelector('.range-slider__range') as HTMLElement;
          expect(range.style.top).toBe('');
        });

        it('say subscribers that range was changed', () => {
          expect(view.notify).toBeCalledWith('viewToggleRangeFromOutside');
        });
      });
    });
  });

  describe('toggleScaleFromOutside()', () => {
    describe('if slider had no scale', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: false,
      });

      view.notify = jest.fn();
      view.toggleScaleFromOutside();

      it('say subscribers that scale was toggled', () => {
        expect(view.notify).toBeCalledWith('viewToggleScaleFromOutside');
      });
    });

    describe('if slider had scale', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
      });

      view.notify = jest.fn();
      view.toggleScaleFromOutside();

      it('say subscribers that scale was toggled', () => {
        expect(view.notify).toBeCalledWith('viewToggleScaleFromOutside');
      });
    });
  });

  describe('changeScaleIntervals(value)', () => {
    describe('if passed value > 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      view.removeScale = jest.fn();
      view.notify = jest.fn();

      view.changeScaleIntervals(5);

      it('set scaleIntervals property to value', () => {
        expect(view.getScaleIntervals()).toBe(5);
      });

      it('remove scale', () => {
        expect(view.removeScale).toBeCalled();
      });

      it('say subscribers that scaleIntervals was changed', () => {
        expect(view.notify).toBeCalledWith('viewChangeScaleIntervals');
      });
    });

    describe('if passed value is 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      view.removeScale = jest.fn();
      view.notify = jest.fn();

      view.changeScaleIntervals(0);

      it('scaleIntervals is not changed', () => {
        expect(view.getScaleIntervals()).toBe(3);
      });

      it('scale was not removed', () => {
        expect(view.removeScale).not.toBeCalled();
      });

      it('subscribers was not informed', () => {
        expect(view.notify).not.toBeCalled();
      });
    });

    describe('if passed value < 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      view.removeScale = jest.fn();
      view.notify = jest.fn();

      view.changeScaleIntervals(-2);

      it('scaleIntervals is not changed', () => {
        expect(view.getScaleIntervals()).toBe(3);
      });

      it('scale was not removed', () => {
        expect(view.removeScale).not.toBeCalled();
      });

      it('subscribers was not informed', () => {
        expect(view.notify).not.toBeCalled();
      });
    });
  });

  describe('toggleValueLabels()', () => {
    describe('if slider had value labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
        valueLabels: true,
      });

      view.toggleValueLabels();

      describe('remove value labels from DOM', () => {
        it('left', () => {
          const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
          expect(valueLabelLeft).toBeFalsy();
        });

        it('right', () => {
          const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
          expect(valueLabelRight).toBeFalsy();
        });

        it('common', () => {
          const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common');
          expect(valueLabelCommon).toBeFalsy();
        });
      });

      describe('if slider had no min-max labels', () => {
        it('remove labels container from DOM', () => {
          const labelsContainer = view.getComponent().querySelector('.range-slider__labels-container');
          expect(labelsContainer).toBeFalsy();
        });
      });

      describe('if slider had min-max labels', () => {
        describe('if slider is horizontal', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true,
            vertical: false,
          });

          newView.fixLabelsContainerHeightForHorizontal = jest.fn();

          newView.toggleValueLabels();

          it('fix labels container height', () => {
            expect(newView.fixLabelsContainerHeightForHorizontal).toBeCalled();
          });
        });

        describe('if slider is vertical', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true,
            vertical: true,
          });

          newView.fixLabelsContainerWidthForVertical = jest.fn();

          newView.toggleValueLabels();

          it('fix labels container width', () => {
            expect(newView.fixLabelsContainerWidthForVertical).toBeCalled();
          });
        });
      });
    });

    describe('if slider had no value labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
        valueLabels: false,
        vertical: false,
      });

      view.notify = jest.fn();
      view.fixLabelsContainerHeightForHorizontal = jest.fn();

      view.toggleValueLabels();

      const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');
      const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
      const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common');

      describe('add value labels', () => {
        it('left', () => {
          expect(valueLabelLeft).toBeDefined();
        });

        it('right if necessary', () => {
          expect(valueLabelRight).toBeDefined();
        });

        it('common if necessary', () => {
          expect(valueLabelCommon).toBeDefined();
        });

        describe('do not set up right and common value labels if not necessary', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: false,
            valueLabels: false,
          });

          newView.toggleValueLabels();

          it('right', () => {
            const newValueLabelRight = newView.getComponent().querySelector('.range-slider__value-label_right');
            expect(newValueLabelRight).toBeFalsy();
          });

          it('common', () => {
            const newValueLabelCommon = newView.getComponent().querySelector('.range-slider__value-label_common');
            expect(newValueLabelCommon).toBeFalsy();
          });
        });
      });

      describe('add labels container if necessary and append labels to it', () => {
        const labelsContainer = view.getComponent().querySelector('.range-slider__labels-container');
        it('labels container was appended to slider', () => {
          expect(view.getComponent().children).toContain(labelsContainer);
        });

        it('labels was appended to labels container', () => {
          expect(labelsContainer?.children).toContain(valueLabelLeft);
          expect(labelsContainer?.children).toContain(valueLabelRight);
          expect(labelsContainer?.children).toContain(valueLabelCommon);
        });
      });

      it('say subscribers that value labels were added', () => {
        expect(view.notify).toBeCalledWith('viewAddValueLabels');
      });

      it('fix labels container height if slider is horizontal', () => {
        expect(view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });

      it('fix labels container width if slider is vertical', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
          valueLabels: false,
          vertical: true,
        });

        newView.fixLabelsContainerWidthForVertical = jest.fn();

        newView.toggleValueLabels();

        expect(newView.fixLabelsContainerWidthForVertical).toBeCalled();
      });
    });
  });

  describe('toggleMinMaxLabels()', () => {
    describe('if slider had min-max labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
        minMaxLabels: true,
        valueLabels: true,
        vertical: false,
      });

      view.fixLabelsContainerHeightForHorizontal = jest.fn();

      view.toggleMinMaxLabels();

      describe('remove min-max labels from DOM', () => {
        it('min', () => {
          const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left');
          expect(minLabel).toBeFalsy();
        });

        it('max', () => {
          const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right');
          expect(maxLabel).toBeFalsy();
        });
      });

      describe('if slider had value labels', () => {
        describe('if slider is horizontal', () => {
          it('fix labels container height', () => {
            expect(view.fixLabelsContainerHeightForHorizontal).toBeCalled();
          });
        });

        describe('if slider is vertical', () => {
          it('fix labels container width', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              range: true,
              minMaxLabels: true,
              valueLabels: true,
              vertical: true,
            });

            newView.fixLabelsContainerWidthForVertical = jest.fn();

            newView.toggleMinMaxLabels();

            expect(newView.fixLabelsContainerWidthForVertical).toBeCalled();
          });
        });
      });

      describe('if slider had no value labels', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
          minMaxLabels: true,
          valueLabels: false,
          vertical: false,
        });

        newView.toggleMinMaxLabels();

        it('remove labels container from DOM', () => {
          const labelsContainer = newView.getComponent().querySelector('.range-slider__labels-container');
          expect(labelsContainer).toBeFalsy();
        });
      });
    });

    describe('if slider had no min-max labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
        minMaxLabels: false,
        vertical: false,
      });

      view.notify = jest.fn();
      view.fixLabelsContainerHeightForHorizontal = jest.fn();

      view.toggleMinMaxLabels();

      describe('add min-max labels', () => {
        it('min', () => {
          const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left');
          expect(minLabel).toBeDefined();
        });

        it('max', () => {
          const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right');
          expect(maxLabel).toBeDefined();
        });
      });

      describe('add labels container if necessary and append labels to it', () => {
        const labelsContainer = view.getComponent().querySelector('.range-slider__labels-container');

        it('labels container was appended to slider', () => {
          expect(view.getComponent().children).toContain(labelsContainer);
        });

        it('labels was appended to labels container', () => {
          const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left');
          const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right');

          expect(labelsContainer?.children).toContain(minLabel);
          expect(labelsContainer?.children).toContain(maxLabel);
        });
      });

      it('say subscribers that min-max labels were added', () => {
        expect(view.notify).toBeCalledWith('viewAddMinMaxLabels');
      });

      it('fix labels container height if slider is horizontal', () => {
        expect(view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });

      it('fix labels container width if slider is vertical', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
          valueLabels: false,
          vertical: true,
        });

        newView.fixLabelsContainerWidthForVertical = jest.fn();

        newView.toggleMinMaxLabels();

        expect(newView.fixLabelsContainerWidthForVertical).toBeCalled();
      });
    });
  });

  describe('hasLabels()', () => {
    describe('return true, if slider has any labels', () => {
      it('only min-max labels', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          minMaxLabels: true,
        });

        expect(view.hasLabels()).toBe(true);
      });

      it('only left value label', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: false,
          valueLabels: true,
        });

        expect(view.hasLabels()).toBe(true);
      });

      it('all possible labels', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: true,
          valueLabels: true,
          minMaxLabels: true,
        });

        expect(view.hasLabels()).toBe(true);
      });
    });

    it('return false, if slider has no labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: false,
        valueLabels: false,
      });

      expect(view.hasLabels()).toBe(false);
    });
  });

  describe('getTrackWidth()', () => {
    it('return track width in px', () => {
      const slider = document.createElement('div');
      const view = new View(slider);
      view.getTrackWidth = jest.fn();
      (view.getTrackWidth as jest.Mock).mockReturnValue(100);

      expect(view.getTrackWidth()).toBe(100);
    });
  });

  describe('getTrackHeight()', () => {
    it('return track height in px', () => {
      const slider = document.createElement('div');
      const view = new View(slider);
      view.getTrackHeight = jest.fn();
      (view.getTrackHeight as jest.Mock).mockReturnValue(100);

      expect(view.getTrackHeight()).toBe(100);
    });
  });
});
