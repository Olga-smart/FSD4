import View from './View';

describe('View', () => {
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
    const slider = document.createElement('div');
    const view = new View(slider);

    it('set up component property', () => {
      expect(view.getComponent()).toBe(slider);
    });

    describe('validate options', () => {
      it('if scaleIntervals < 1, scaleIntervals = 1', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          scaleIntervals: -1,
        });

        expect(newView).toHaveProperty('scaleIntervals', 1);
      });

      it('if scaleIntervals is float, scaleIntervals = Math.floor(scaleIntervals)', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          scaleIntervals: 4.5,
        });

        expect(newView).toHaveProperty('scaleIntervals', 4);
      });
    });

    describe('render', () => {
      const track: HTMLElement | null = view.getComponent().querySelector('.range-slider__track');
      const sliderElement: HTMLElement | null = view.getComponent().querySelector('.range-slider__slider');
      const range: HTMLElement | null = view.getComponent().querySelector('.range-slider__range');

      it('append range component to track component', () => {
        expect(track?.children).toContain(range);
      });

      it('append track component to slider component', () => {
        expect(sliderElement?.children).toContain(track);
      });

      it('append thumbLeft component to slider component', () => {
        const thumbLeft: HTMLElement | null = view.getComponent().querySelector('.range-slider__thumb_left');
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

      describe('append minLabel and maxLabel components to labelsContainer, if necessary', () => {
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

      describe('append labels components to labelsContainer, if necessary', () => {
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

      it('append labelsContainer component to view component, if necessary', () => {
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
    });
  });

  describe('inform(eventType, data)', () => {
    describe('if eventType is "scaleClick"', () => {
      describe('if !slider.isRange', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: false,
          scale: true,
          valueLabels: true,
        });

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        const range = view.getComponent().querySelector('.range-slider__range');
        const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');
        const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

        view.inform('scaleClick', [100, 100]);

        describe('add smooth transition', () => {
          it('add necessary class to thumb', () => {
            expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
          });

          it('add necessary class to range', () => {
            expect(range?.classList).toContain('range-slider__range_smooth-transition');
          });

          it('add necessary class to label', () => {
            expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
          });
        });

        describe('say subscribers that view wants to change left value and pass this value', () => {
          it('if slider is horizontal', () => {
            expect(subscriber.inform).toBeCalledWith('viewInputLeft', 100);
          });

          it('if slider is vertical', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              scale: true,
              valueLabels: true,
              vertical: true,
            });

            const newSubscriber = {
              inform() {},
            };
            newSubscriber.inform = jest.fn();
            newView.subscribe(newSubscriber);

            newView.getTrackLength = jest.fn(() => 500);

            newView.inform('scaleClick', [100, 100]);

            expect(newSubscriber.inform).toBeCalledWith('viewInputLeft', 500 - 100);
          });
        });

        describe('remove smooth transition', () => {
          beforeAll(() => {
            jest.useFakeTimers();
            view.inform('scaleClick', [100, 100]);
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

            const track: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__track');

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 0,
              }));
            }

            const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 10,
                width: 16,
              }));
            }

            const thumbRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 40,
                width: 16,
              }));
            }

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            view.inform('scaleClick', [30, 0]);

            describe('add smooth transition', () => {
              it('add necessary class to thumb', () => {
                expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
              });

              it('add necessary class to range', () => {
                expect(range?.classList).toContain('range-slider__range_smooth-transition');
              });

              it('add necessary class to label', () => {
                expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
              });
            });

            it('say subscribers that view wants to change left value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputLeft', 30);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('scaleClick', [30, 0]);
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

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 0,
              }));
            }

            view.getTrackLength = jest.fn(() => 500);

            const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 40,
                height: 16,
              }));
            }

            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 10,
                height: 16,
              }));
            }

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            view.inform('scaleClick', [0, 38]);

            describe('add smooth transition', () => {
              it('add necessary class to thumb', () => {
                expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
              });

              it('add necessary class to range', () => {
                expect(range?.classList).toContain('range-slider__range_smooth-transition');
              });

              it('add necessary class to label', () => {
                expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
              });
            });

            it('say subscribers that view wants to change left value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputLeft', 500 - 38);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('scaleClick', [0, 38]);
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

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 0,
              }));
            }

            const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 10,
                width: 16,
              }));
            }

            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 40,
                width: 16,
              }));
            }

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            view.inform('scaleClick', [38, 0]);

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

            it('say subscribers that view wants to change right value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputRight', 38);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('scaleClick', [38, 0]);
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

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 0,
              }));
            }

            view.getTrackLength = jest.fn(() => 500);

            const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 40,
                height: 16,
              }));
            }

            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 10,
                height: 16,
              }));
            }

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');

            view.inform('scaleClick', [0, 30]);

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

            it('say subscribers that view wants to change right value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputRight', 500 - 30);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('scaleClick', [0, 30]);
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

    describe('if eventType is "trackClick"', () => {
      describe('if !slider.isRange', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: false,
          scale: true,
          valueLabels: true,
        });

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        const range = view.getComponent().querySelector('.range-slider__range');
        const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');
        const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

        view.inform('trackClick', [100, 100]);

        describe('add smooth transition', () => {
          it('add necessary class to thumb', () => {
            expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
          });

          it('add necessary class to range', () => {
            expect(range?.classList).toContain('range-slider__range_smooth-transition');
          });

          it('add necessary class to label', () => {
            expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
          });
        });

        describe('say subscribers that view wants to change left value and pass this value', () => {
          it('if slider is horizontal', () => {
            expect(subscriber.inform).toBeCalledWith('viewInputLeft', 100);
          });

          it('if slider is vertical', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              scale: true,
              valueLabels: true,
              vertical: true,
            });

            const newSubscriber = {
              inform() {},
            };
            newSubscriber.inform = jest.fn();
            newView.subscribe(newSubscriber);

            newView.getTrackLength = jest.fn(() => 500);

            newView.inform('trackClick', [100, 100]);

            expect(newSubscriber.inform).toBeCalledWith('viewInputLeft', 500 - 100);
          });
        });

        describe('remove smooth transition', () => {
          beforeAll(() => {
            jest.useFakeTimers();
            view.inform('trackClick', [100, 100]);
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

            const track: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__track');

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 0,
              }));
            }

            const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 10,
                width: 16,
              }));
            }

            const thumbRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 40,
                width: 16,
              }));
            }

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            view.inform('trackClick', [30, 0]);

            describe('add smooth transition', () => {
              it('add necessary class to thumb', () => {
                expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
              });

              it('add necessary class to range', () => {
                expect(range?.classList).toContain('range-slider__range_smooth-transition');
              });

              it('add necessary class to label', () => {
                expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
              });
            });

            it('say subscribers that view wants to change left value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputLeft', 30);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('trackClick', [30, 0]);
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

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 0,
              }));
            }

            view.getTrackLength = jest.fn(() => 500);

            const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 40,
                height: 16,
              }));
            }

            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 10,
                height: 16,
              }));
            }

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelLeft = view.getComponent().querySelector('.range-slider__value-label_left');

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            view.inform('trackClick', [0, 38]);

            describe('add smooth transition', () => {
              it('add necessary class to thumb', () => {
                expect(thumbLeft?.classList).toContain('range-slider__thumb_smooth-transition');
              });

              it('add necessary class to range', () => {
                expect(range?.classList).toContain('range-slider__range_smooth-transition');
              });

              it('add necessary class to label', () => {
                expect(valueLabelLeft?.classList).toContain('range-slider__value-label_smooth-transition');
              });
            });

            it('say subscribers that view wants to change left value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputLeft', 500 - 38);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('trackClick', [0, 38]);
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

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 0,
              }));
            }

            const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 10,
                width: 16,
              }));
            }

            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                left: 40,
                width: 16,
              }));
            }

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            view.inform('trackClick', [38, 0]);

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

            it('say subscribers that view wants to change right value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputRight', 38);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('trackClick', [38, 0]);
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

            if (track) {
              track.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 0,
              }));
            }

            view.getTrackLength = jest.fn(() => 500);

            const thumbLeft = view.getComponent().querySelector('.range-slider__thumb_left');

            if (thumbLeft) {
              thumbLeft.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 40,
                height: 16,
              }));
            }

            const thumbRight = view.getComponent().querySelector('.range-slider__thumb_right');

            if (thumbRight) {
              thumbRight.getBoundingClientRect = jest.fn(() => ({
                ...defaultDomRect,
                top: 10,
                height: 16,
              }));
            }

            const subscriber = {
              inform() {},
            };
            subscriber.inform = jest.fn();
            view.subscribe(subscriber);

            const range = view.getComponent().querySelector('.range-slider__range');
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');

            view.inform('trackClick', [0, 30]);

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

            it('say subscribers that view wants to change right value and pass this value', () => {
              expect(subscriber.inform).toBeCalledWith('viewInputRight', 500 - 30);
            });

            describe('remove smooth transition', () => {
              beforeAll(() => {
                jest.useFakeTimers();
                view.inform('trackClick', [0, 30]);
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

    describe('if eventType is "leftThumbChangePosition"', () => {
      it('calc new left indent, if slider is horizontal, and notify subscribers', () => {
        const slider = document.createElement('div');
        const view = new View(slider);
        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        const track: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__track');

        if (track) {
          const trackShift = 200;

          track.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            left: trackShift,
          }));

          for (let i = 100; i < 800; i += 10) {
            view.inform('leftThumbChangePosition', [i, 200]);
            expect(subscriber.inform).toBeCalledWith('viewInputLeft', i - trackShift);
          }
        }
      });

      it('calc new bottom indent, if slider is vertical, and notify subscribers', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
        });
        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        const track: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__track');

        if (track) {
          const trackShift = 200;
          const trackLength = 500;

          track.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            top: trackShift,
          }));

          view.getTrackLength = jest.fn(() => trackLength);

          for (let i = 100; i < 800; i += 10) {
            view.inform('leftThumbChangePosition', [200, i]);
            expect(subscriber.inform).toBeCalledWith('viewInputLeft', trackLength - (i - trackShift));
          }
        }
      });
    });

    describe('if eventType is "rightThumbChangePosition"', () => {
      it('calc new left indent, if slider is horizontal, and notify subscribers', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: true,
        });
        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        const track: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__track');

        if (track) {
          const trackShift = 200;

          track.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            left: trackShift,
          }));

          for (let i = 100; i < 800; i += 10) {
            view.inform('rightThumbChangePosition', [i, 200]);
            expect(subscriber.inform).toBeCalledWith('viewInputRight', i - trackShift);
          }
        }
      });

      it('calc new bottom indent, if slider is vertical, and notify subscribers', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
        });
        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        const track: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__track');

        if (track) {
          const trackShift = 200;
          const trackLength = 500;

          track.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            top: trackShift,
          }));

          view.getTrackLength = jest.fn(() => trackLength);

          for (let i = 100; i < 800; i += 10) {
            view.inform('rightThumbChangePosition', [200, i]);
            expect(subscriber.inform).toBeCalledWith('viewInputRight', trackLength - (i - trackShift));
          }
        }
      });
    });
  });

  describe('setMinValue(value)', () => {
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

  describe('setMaxValue(value)', () => {
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
        it('change left indent, if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(thumbLeft?.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(thumbLeft?.style.top).toBe(`${100 - i}%`);
          }
        });
      });

      describe('make z-index of left thumb higher when it is at maximum', () => {
        it('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');

          view.setLeftValue(200, 100);

          expect(thumbLeft?.style.zIndex).toBe('100');
        });

        it('if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');

          view.setLeftValue(200, 100);
          expect(thumbLeft?.style.zIndex).toBe('100');
        });
      });
    });

    describe('do necessary actions with range', () => {
      describe('if slider is horizontal', () => {
        it('set up range width if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: false,
          });
          const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(range?.style.width).toBe(`${i}%`);
          }
        });

        it('set up range left indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
          });
          const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(range?.style.left).toBe(`${i}%`);
          }
        });
      });

      describe('if slider is vertical', () => {
        it('set up range height if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            range: false,
          });
          const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(range?.style.height).toBe(`${i}%`);
          }
        });

        it('set up range bottom indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            range: true,
          });
          const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(range?.style.bottom).toBe(`${i}%`);
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
          const valueLabelCommon: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_common');
          const rightValue = 200;
          const valueLabelRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');

          if (valueLabelRight) {
            valueLabelRight.textContent = `${rightValue}`;
          }

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
          const valueLabelLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(valueLabelLeft?.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            valueLabels: true,
          });
          const valueLabelLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(valueLabelLeft?.style.top).toBe(`${100 - i}%`);
          }
        });
      });
    });

    it('notify subscribers', () => {
      const slider = document.createElement('div');
      const view = new View(slider);

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

      view.setLeftValue(50, 50);

      expect(subscriber.inform).toBeCalledWith('viewSetLeft', null);
    });
  });

  describe('setRightValue(value, percent)', () => {
    describe('do necessary actions with thumb', () => {
      describe('set up right thumb position', () => {
        it('change left indent, if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
          });
          const thumbRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_right');

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(thumbRight?.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
          });
          const thumbRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_right');

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(thumbRight?.style.top).toBe(`${100 - i}%`);
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
        const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

        for (let i = 0; i <= 100; i += 1) {
          view.setRightValue(50, i);
          expect(range?.style.right).toBe(`${100 - i}%`);
        }
      });

      it('set up range top indent, if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
        });
        const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

        for (let i = 0; i <= 100; i += 1) {
          view.setRightValue(50, i);
          expect(range?.style.top).toBe(`${100 - i}%`);
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

          if (valueLabelLeft) {
            valueLabelLeft.textContent = `${leftValue}`;
          }

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
          const valueLabelRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(valueLabelRight?.style.left).toBe(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
            valueLabels: true,
          });
          const valueLabelRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(valueLabelRight?.style.top).toBe(`${100 - i}%`);
          }
        });
      });
    });

    it('notify subscribers', () => {
      const slider = document.createElement('div');
      const view = new View(slider);

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

      view.setRightValue(50, 50);

      expect(subscriber.inform).toBeCalledWith('viewSetRight', null);
    });
  });

  describe('updateInput(value1, value2)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    const input: HTMLInputElement | null = view.getComponent().querySelector('.range-slider__input');

    view.updateInput(1, 2);

    it('pass call to input with received values', () => {
      expect(input?.value).toBe('1 - 2');
    });

    it('if second value is not received, pass null instead of it', () => {
      view.updateInput(1);
      expect(input?.value).toBe('1');
    });
  });

  describe('addScale(min, max)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.addScale(0, 150);

    it('set up scale property', () => {
      expect(view).toHaveProperty('scale');
    });

    it('append scale component to this view component', () => {
      const scale = view.getComponent().querySelector('.range-slider__scale');
      expect(view.getComponent().children).toContain(scale);
    });

    describe('all of above is also true for vertical slider', () => {
      const newSlider = document.createElement('div');
      const newView = new View(newSlider, {
        vertical: true,
      });
      newView.addScale(0, 150);

      it('set up scale property', () => {
        expect(newView).toHaveProperty('scale');
      });

      it('append scale component to this view component', () => {
        const scale = newView.getComponent().querySelector('.range-slider__scale');
        expect(newView.getComponent().children).toContain(scale);
      });
    });
  });

  describe('removeScale()', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.addScale(0, 150);
    view.removeScale();

    it('remove scale component from DOM', () => {
      const scale = view.getComponent().querySelector('.range-slider__scale');
      expect(scale).toBe(null);
    });

    it('set scale property to undefined', () => {
      expect(view).toHaveProperty('scale', undefined);
    });
  });

  describe('setScaleIntervals(value)', () => {
    describe('if passed value > 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

      view.setScaleIntervals(5);

      it('set scaleIntervals property to value', () => {
        expect(view.getScaleIntervals()).toBe(5);
      });

      it('say subscribers that scaleIntervals was changed', () => {
        expect(subscriber.inform).toBeCalledWith('viewSetScaleIntervals', null);
      });

      it('if value is float, scaleIntervals = Math.floor(value)', () => {
        view.setScaleIntervals(6.2);
        expect(view.getScaleIntervals()).toBe(6);
      });
    });

    describe('if passed value is 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

      view.setScaleIntervals(0);

      it('scaleIntervals will not be changed', () => {
        expect(view.getScaleIntervals()).toBe(3);
      });

      it('subscribers will not be informed', () => {
        expect(subscriber.inform).not.toBeCalled();
      });
    });

    describe('if passed value < 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

      view.setScaleIntervals(-2);

      it('scaleIntervals will not be changed', () => {
        expect(view.getScaleIntervals()).toBe(3);
      });

      it('subscribers will not be informed', () => {
        expect(subscriber.inform).not.toBeCalled();
      });
    });
  });

  describe('getScaleIntervals()', () => {
    it('return number of scale intervals', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      expect(view.getScaleIntervals()).toBe(3);
    });
  });

  describe('toggleOrientation()', () => {
    describe('if slider was horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: false,
        range: true,
        valueLabels: true,
        scale: true,
      });
      view.addScale(0, 100);

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

      const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');
      const thumbRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_right');

      view.toggleOrientation();

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
        const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

        it('set left indent to 0', () => {
          expect(range?.style.left).toBe(`${0}%`);
        });

        it('set right indent to 0', () => {
          expect(range?.style.right).toBe(`${0}%`);
        });

        it('reset top indent', () => {
          expect(range?.style.top).toBe('');
        });

        it('reset width', () => {
          expect(range?.style.width).toBe('');
        });
      });

      describe('reset labels indents', () => {
        it('for left label', () => {
          const valueLabelLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');
          expect(valueLabelLeft?.style.left).toBe('');
        });

        it('for right label', () => {
          const valueLabelRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');
          expect(valueLabelRight?.style.left).toBe('');
        });

        it('for common label', () => {
          const valueLabelCommon: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_common');
          expect(valueLabelCommon?.style.left).toBe('');
        });
      });

      it('say subscribers that orientation was changed', () => {
        expect(subscriber.inform).toBeCalledWith('viewToggleOrientation', null);
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

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

      const thumbLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_left');
      const thumbRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__thumb_right');

      view.toggleOrientation();

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
        const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');

        it('set bottom indent to 0', () => {
          expect(range?.style.bottom).toBe(`${0}%`);
        });

        it('set top indent to 0', () => {
          expect(range?.style.top).toBe(`${0}%`);
        });

        it('reset height', () => {
          expect(range?.style.height).toBe('');
        });
      });

      describe('reset labels indents', () => {
        it('for left label', () => {
          const valueLabelLeft: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');
          expect(valueLabelLeft?.style.top).toBe('');
        });

        it('for right label', () => {
          const valueLabelRight: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');
          expect(valueLabelRight?.style.top).toBe('');
        });

        it('for common label', () => {
          const valueLabelCommon: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_common');
          expect(valueLabelCommon?.style.top).toBe('');
        });
      });

      it('say subscribers that orientation was changed', () => {
        expect(subscriber.inform).toBeCalledWith('viewToggleOrientation', null);
      });
    });
  });

  describe('toggleRange()', () => {
    describe('if slider becomes range', () => {
      describe('if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: false,
          range: false,
          valueLabels: true,
        });

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        view.toggleRange();

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

        describe('add second value label, if necessary', () => {
          it('right', () => {
            const valueLabelRight = view.getComponent().querySelector('.range-slider__value-label_right');
            expect(valueLabelRight).toBeDefined();
          });

          it('common', () => {
            const valueLabelCommon = view.getComponent().querySelector('.range-slider__value-label_common');
            expect(valueLabelCommon).toBeDefined();
          });
        });

        describe('do not add second value label, if not necessary', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            vertical: false,
            range: false,
            valueLabels: false,
          });

          newView.toggleRange();

          it('right', () => {
            const valueLabelRight = newView.getComponent().querySelector('.range-slider__value-label_right');
            expect(valueLabelRight).toBeFalsy();
          });

          it('common', () => {
            const valueLabelCommon = newView.getComponent().querySelector('.range-slider__value-label_common');
            expect(valueLabelCommon).toBeFalsy();
          });
        });

        it('reset range width', () => {
          const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');
          expect(range?.style.width).toBe('');
        });

        it('say subscribers that range was changed', () => {
          expect(subscriber.inform).toBeCalledWith('viewToggleRange', null);
        });
      });

      describe('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: false,
          valueLabels: true,
        });

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        view.toggleRange();

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
          const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');
          expect(range?.style.height).toBe('');
        });

        it('say subscribers that range was changed', () => {
          expect(subscriber.inform).toBeCalledWith('viewToggleRange', null);
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

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        view.toggleRange();

        describe('remove right thumb', () => {
          it('reset property', () => {
            expect(view).toHaveProperty('rightThumb', undefined);
          });

          it('remove from DOM', () => {
            expect(view.getComponent().querySelector('.range-slider__thumb_right')).toBeFalsy();
          });
        });

        describe('remove right value label', () => {
          it('reset property', () => {
            expect(view).toHaveProperty('valueLabelRight', undefined);
          });

          it('remove from DOM', () => {
            expect(view.getComponent().querySelector('.range-slider__value-label_right')).toBeFalsy();
          });
        });

        describe('remove common value label', () => {
          it('reset property', () => {
            expect(view).toHaveProperty('valueLabelCommon', undefined);
          });

          it('remove from DOM', () => {
            expect(view.getComponent().querySelector('.range-slider__value-label_common')).toBeFalsy();
          });
        });

        it('say subscribers that range was changed', () => {
          expect(subscriber.inform).toBeCalledWith('viewToggleRange', null);
        });
      });

      describe('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
          valueLabels: true,
        });

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        view.subscribe(subscriber);

        view.toggleRange();

        describe('remove right thumb', () => {
          it('reset property', () => {
            expect(view).toHaveProperty('rightThumb', undefined);
          });

          it('remove from DOM', () => {
            expect(view.getComponent().querySelector('.range-slider__thumb_right')).toBeFalsy();
          });
        });

        describe('remove right value label', () => {
          it('reset property', () => {
            expect(view).toHaveProperty('valueLabelRight', undefined);
          });

          it('remove from DOM', () => {
            expect(view.getComponent().querySelector('.range-slider__value-label_right')).toBeFalsy();
          });
        });

        describe('remove common value label', () => {
          it('reset property', () => {
            expect(view).toHaveProperty('valueLabelCommon', undefined);
          });

          it('remove from DOM', () => {
            expect(view.getComponent().querySelector('.range-slider__value-label_common')).toBeFalsy();
          });
        });

        it('reset range top indent', () => {
          const range: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__range');
          expect(range?.style.top).toBe('');
        });

        it('say subscribers that range was changed', () => {
          expect(subscriber.inform).toBeCalledWith('viewToggleRange', null);
        });
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

      describe('remove value labels', () => {
        describe('reset properties', () => {
          it('left', () => {
            expect(view).toHaveProperty('valueLabelLeft', undefined);
          });

          it('right', () => {
            expect(view).toHaveProperty('valueLabelRight', undefined);
          });

          it('common', () => {
            expect(view).toHaveProperty('valueLabelCommon', undefined);
          });
        });

        describe('remove from DOM', () => {
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
      });

      describe('remove labels container, if slider had no min-max labels', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
          valueLabels: true,
          minMaxLabels: false,
        });

        newView.toggleValueLabels();

        it('reset property', () => {
          expect(newView).toHaveProperty('labelsContainer', undefined);
        });

        it('remove from DOM', () => {
          const labelsContainer = newView.getComponent().querySelector('.range-slider__labels-container');
          expect(labelsContainer).toBeFalsy();
        });
      });

      describe('if slider had min-max labels', () => {
        it('fix labels container height, if slider is horizontal', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true,
            vertical: false,
          });

          newView.fixLabelsContainerHeightForHorizontal = jest.fn();

          newView.toggleValueLabels();

          expect(newView.fixLabelsContainerHeightForHorizontal).toBeCalled();
        });

        it('fix labels container width, if slider is vertical', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true,
            vertical: true,
          });

          newView.fixLabelsContainerWidthForVertical = jest.fn();

          newView.toggleValueLabels();

          expect(newView.fixLabelsContainerWidthForVertical).toBeCalled();
        });
      });
    });

    describe('if slider had no value labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
        valueLabels: false,
        minMaxLabels: false,
        vertical: false,
      });

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

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

        describe('do not set up right and common value labels, if not necessary', () => {
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

      describe('add labels container, if necessary, and append labels to it', () => {
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
        expect(subscriber.inform).toBeCalledWith('viewAddValueLabels', null);
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
        minMaxLabels: true,
      });

      view.fixLabelsContainerHeightForHorizontal = jest.fn();

      view.toggleMinMaxLabels();

      describe('remove min-max labels', () => {
        describe('reset properties', () => {
          it('min', () => {
            expect(view).toHaveProperty('min', undefined);
          });

          it('max', () => {
            expect(view).toHaveProperty('max', undefined);
          });
        });

        describe('remove from DOM', () => {
          it('min', () => {
            const minLabel = view.getComponent().querySelector('.range-slider__min-max-label_left');
            expect(minLabel).toBeFalsy();
          });

          it('max', () => {
            const maxLabel = view.getComponent().querySelector('.range-slider__min-max-label_right');
            expect(maxLabel).toBeFalsy();
          });
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
        minMaxLabels: false,
        valueLabels: false,
      });

      const subscriber = {
        inform() {},
      };
      subscriber.inform = jest.fn();
      view.subscribe(subscriber);

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
        expect(subscriber.inform).toBeCalledWith('viewAddMinMaxLabels', null);
      });

      it('fix labels container height, if slider is horizontal', () => {
        expect(view.fixLabelsContainerHeightForHorizontal).toBeCalled();
      });

      it('fix labels container width, if slider is vertical', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          minMaxLabels: false,
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
          valueLabels: false,
        });

        expect(view.hasLabels()).toBe(true);
      });

      it('only left value label', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: false,
          valueLabels: true,
          minMaxLabels: false,
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

  describe('hasScale()', () => {
    it('return true, if slider has scale', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
      });

      expect(view.hasScale()).toBe(true);
    });

    it('return false, if slider has no scale', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: false,
      });

      expect(view.hasScale()).toBe(false);
    });
  });

  describe('hasMinMaxLabels()', () => {
    it('return true, if slider has min&max labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });

      expect(view.hasMinMaxLabels()).toBe(true);
    });

    it('return false, if slider has no min&max labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: false,
      });

      expect(view.hasMinMaxLabels()).toBe(false);
    });
  });

  describe('hasValueLabels()', () => {
    it('return true, if slider has value labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
      });

      expect(view.hasValueLabels()).toBe(true);
    });

    it('return false, if slider has no value labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: false,
      });

      expect(view.hasValueLabels()).toBe(false);
    });
  });

  describe('isRange()', () => {
    it('return true, if slider is range', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
      });

      expect(view.isRange()).toBe(true);
    });

    it('return false, if slider is not range', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: false,
      });

      expect(view.isRange()).toBe(false);
    });
  });

  describe('isVertical()', () => {
    it('return true, if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
      });

      expect(view.isVertical()).toBe(true);
    });

    it('return false, if slider is not vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: false,
      });

      expect(view.isVertical()).toBe(false);
    });
  });

  describe('getTrackLength()', () => {
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        value: 200,
      });

      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        value: 200,
      });
    });

    afterAll(() => {
      if (originalOffsetWidth) {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
      }

      if (originalOffsetHeight) {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetHeight);
      }
    });

    it('return track width in px, if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider);

      expect(view.getTrackLength()).toBe(200);
    });

    it('return track height in px, if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
      });

      expect(view.getTrackLength()).toBe(200);
    });
  });

  describe('getOptions()', () => {
    describe('return object with view options', () => {
      const slider = document.createElement('div');
      const passedOptions = {
        minMaxLabels: true,
        valueLabels: true,
        vertical: true,
        range: true,
        scale: true,
        scaleIntervals: 5,
      };
      const view = new View(slider, passedOptions);
      const options = view.getOptions();

      it('minMaxLabels', () => {
        expect(options.minMaxLabels).toBe(passedOptions.minMaxLabels);
      });

      it('valueLabels', () => {
        expect(options.valueLabels).toBe(passedOptions.valueLabels);
      });

      it('vertical', () => {
        expect(options.vertical).toBe(passedOptions.vertical);
      });

      it('range', () => {
        expect(options.range).toBe(passedOptions.range);
      });

      it('scale', () => {
        expect(options.scale).toBe(passedOptions.scale);
      });

      it('scaleIntervals', () => {
        expect(options.scaleIntervals).toBe(passedOptions.scaleIntervals);
      });
    });
  });

  describe('mergeLabels()', () => {
    const slider = document.createElement('div');
    const view = new View(slider);

    view.mergeLabels();

    const leftLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__value-label_left');
    const rightLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__value-label_right');
    const commonLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__value-label_common');

    it('make left label invisible', () => {
      expect(leftLabel?.style.opacity).toBe('0');
    });

    it('make right label invisible', () => {
      expect(rightLabel?.style.opacity).toBe('0');
    });

    it('make common label visible', () => {
      expect(commonLabel?.style.opacity).toBe('1');
    });

    describe('set indent for common label', () => {
      it('if slider is horizontal', () => {
        if (rightLabel?.style.left && leftLabel?.style.left) {
          const distanceBetweenThumbs = parseInt(rightLabel?.style.left, 10)
                                      - parseInt(leftLabel?.style.left, 10);
          expect(commonLabel?.style.left).toBe(`${parseInt(leftLabel?.style.left, 10) + distanceBetweenThumbs / 2}%`);
        }
      });

      it('if slider is vertical', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          vertical: true,
        });

        newView.mergeLabels();

        const newLeftLabel: HTMLElement | null = newView.getComponent().querySelector('.range-slider__value-label_left');
        const newRightLabel: HTMLElement | null = newView.getComponent().querySelector('.range-slider__value-label_right');
        const newCommonLabel: HTMLElement | null = newView.getComponent().querySelector('.range-slider__value-label_common');

        if (newRightLabel?.style.left && newLeftLabel?.style.left) {
          const distanceBetweenThumbs = parseInt(newLeftLabel?.style.top, 10)
                                      - parseInt(newRightLabel?.style.top, 10);
          expect(newCommonLabel?.style.top).toBe(`${parseInt(newLeftLabel?.style.top, 10) - distanceBetweenThumbs / 2}%`);
        }
      });
    });
  });

  describe('splitLabels()', () => {
    const slider = document.createElement('div');
    const view = new View(slider);

    view.splitLabels();

    const leftLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__value-label_left');
    const rightLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__value-label_right');
    const commonLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__value-label_common');

    it('make left label visible', () => {
      expect(leftLabel?.style.opacity).toBe('1');
    });

    it('make right label visible', () => {
      expect(rightLabel?.style.opacity).toBe('1');
    });

    it('make common label invisible', () => {
      expect(commonLabel?.style.opacity).toBe('0');
    });
  });

  describe('hideMinLabel()', () => {
    it('make min label invisible', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });

      view.hideMinLabel();

      const minLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__min-max-label_left');

      expect(minLabel?.style.opacity).toBe('0');
    });
  });

  describe('showMinLabel()', () => {
    it('make min label visible', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });

      view.hideMinLabel();
      view.showMinLabel();

      const minLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__min-max-label_left');

      expect(minLabel?.style.opacity).toBe('1');
    });
  });

  describe('hideMaxLabel()', () => {
    it('make max label invisible', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });

      view.hideMaxLabel();

      const maxLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__min-max-label_right');

      expect(maxLabel?.style.opacity).toBe('0');
    });
  });

  describe('showMaxLabel()', () => {
    it('make max label visible', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });

      view.hideMaxLabel();
      view.showMaxLabel();

      const maxLabel: HTMLElement | null = view.getComponent().querySelector('.range-slider__min-max-label_right');

      expect(maxLabel?.style.opacity).toBe('1');
    });
  });

  describe('getDistanceBetweenValueLabels()', () => {
    describe('return distance between value labels in px, if slider has labels', () => {
      it('if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: false,
          valueLabels: true,
        });

        const leftLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

        if (leftLabel) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            right: 10,
          }));
        }

        const rightLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');

        if (rightLabel) {
          rightLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            left: 40,
          }));
        }

        expect(view.getDistanceBetweenValueLabels()).toBe(30);
      });

      it('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          valueLabels: true,
        });

        const leftLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

        if (leftLabel) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            top: 40,
          }));
        }

        const rightLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');

        if (rightLabel) {
          rightLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            bottom: 10,
          }));
        }

        expect(view.getDistanceBetweenValueLabels()).toBe(30);
      });
    });

    describe('return undefined, if slider has no labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: false,
      });

      expect(view.getDistanceBetweenValueLabels()).toBe(undefined);
    });
  });

  describe('getDistanceBetweenLeftValueLabelAndMinLabel()', () => {
    describe('return distance between left value label and min label in px, if slider has these labels', () => {
      it('if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: false,
          valueLabels: true,
          minMaxLabels: true,
        });

        const leftLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

        if (leftLabel) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            left: 40,
          }));
        }

        const minLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__min-max-label_left');

        if (minLabel) {
          minLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            right: 10,
          }));
        }

        expect(view.getDistanceBetweenLeftValueLabelAndMinLabel()).toBe(30);
      });

      it('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          valueLabels: true,
          minMaxLabels: true,
        });

        const leftLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

        if (leftLabel) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            bottom: 10,
          }));
        }

        const minLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__min-max-label_left');

        if (minLabel) {
          minLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            top: 40,
          }));
        }

        expect(view.getDistanceBetweenLeftValueLabelAndMinLabel()).toBe(30);
      });
    });

    describe('return undefined, if slider has no these labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: false,
        minMaxLabels: false,
      });

      expect(view.getDistanceBetweenLeftValueLabelAndMinLabel()).toBe(undefined);
    });
  });

  describe('getDistanceBetweenLeftValueLabelAndMaxLabel()', () => {
    describe('return distance between left value label and max label in px, if slider has these labels', () => {
      it('if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: false,
          valueLabels: true,
          minMaxLabels: true,
        });

        const leftLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

        if (leftLabel) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            right: 10,
          }));
        }

        const maxLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__min-max-label_right');

        if (maxLabel) {
          maxLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            left: 40,
          }));
        }

        expect(view.getDistanceBetweenLeftValueLabelAndMaxLabel()).toBe(30);
      });

      it('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          valueLabels: true,
          minMaxLabels: true,
        });

        const leftLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_left');

        if (leftLabel) {
          leftLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            top: 40,
          }));
        }

        const maxLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__min-max-label_right');

        if (maxLabel) {
          maxLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            bottom: 10,
          }));
        }

        expect(view.getDistanceBetweenLeftValueLabelAndMaxLabel()).toBe(30);
      });
    });

    describe('return undefined, if slider has no these labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: false,
        minMaxLabels: false,
      });

      expect(view.getDistanceBetweenLeftValueLabelAndMaxLabel()).toBe(undefined);
    });
  });

  describe('getDistanceBetweenRightValueLabelAndMaxLabel()', () => {
    describe('return distance between left value label and max label in px, if slider has these labels', () => {
      it('if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: false,
          valueLabels: true,
          minMaxLabels: true,
        });

        const rightLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');

        if (rightLabel) {
          rightLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            right: 10,
          }));
        }

        const maxLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__min-max-label_right');

        if (maxLabel) {
          maxLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            left: 40,
          }));
        }

        expect(view.getDistanceBetweenRightValueLabelAndMaxLabel()).toBe(30);
      });

      it('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          valueLabels: true,
          minMaxLabels: true,
        });

        const rightLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__value-label_right');

        if (rightLabel) {
          rightLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            top: 40,
          }));
        }

        const maxLabel: HTMLDivElement | null = view.getComponent().querySelector('.range-slider__min-max-label_right');

        if (maxLabel) {
          maxLabel.getBoundingClientRect = jest.fn(() => ({
            ...defaultDomRect,
            bottom: 10,
          }));
        }

        expect(view.getDistanceBetweenRightValueLabelAndMaxLabel()).toBe(30);
      });
    });

    describe('return undefined, if slider has no these labels', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: false,
        minMaxLabels: false,
      });

      expect(view.getDistanceBetweenRightValueLabelAndMaxLabel()).toBe(undefined);
    });
  });
});
