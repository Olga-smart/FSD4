import View from './view';
import Slider from './subviews/slider/slider';
import Track from './subviews/track/track';
import Range from './subviews/range/range';
import Thumb from './subviews/thumb/thumb';
import LabelsContainer from './subviews/labelsContainer/labelsContainer';
import MinMaxLabel from './subviews/minMaxLabel/minMaxLabel';
import ValueLabel from './subviews/valueLabel/valueLabel';
import Scale from './subviews/scale/scale';

describe('View', () => {
  describe('constructor()', () => {
    const slider = document.createElement('div');
    const view = new View(slider);

    describe('set up necessary properties', () => {
      it('set up component property', () => {
        expect(view.component).toBe(slider);
      });

      describe('slider property', () => {
        it('set up slider property', () => {
          expect(view).toHaveProperty('slider');
        });

        it('slider property is instance of Slider', () => {
          expect(view.slider).toBeInstanceOf(Slider);
        });
      });

      describe('track property', () => {
        it('set up track property', () => {
          expect(view).toHaveProperty('track');
        });

        it('track property is instance of Track', () => {
          expect(view.track).toBeInstanceOf(Track);
        });
      });

      describe('range property', () => {
        it('set up range property', () => {
          expect(view).toHaveProperty('range');
        });

        it('range property is instance of Range', () => {
          expect(view.range).toBeInstanceOf(Range);
        });
      });

      describe('properties for thumbs', () => {
        it('set up left thumb', () => {
          expect(view).toHaveProperty('thumbLeft');
        });

        it('thumbLeft property is instance of Thumb', () => {
          expect(view.thumbLeft).toBeInstanceOf(Thumb);
        });

        it('set up right thumb if necessary', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: true,
          });

          expect(newView).toHaveProperty('thumbRight');
        });

        it('thumbRight property is instance of Thumb', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: true,
          });

          expect(newView.thumbRight).toBeInstanceOf(Thumb);
        });
      });

      describe('set up isRange property', () => {
        it('true if options.range is true', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: true,
          });

          expect(newView.isRange).toBe(true);
        });

        it('false if options.range is false', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: false,
          });

          expect(newView.isRange).toBe(false);
        });

        it('false by default', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider);

          expect(newView.isRange).toBe(false);
        });
      });

      describe('set up hasScale property', () => {
        it('true if options.scale is true', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            scale: true,
          });

          expect(newView.hasScale).toBe(true);
        });

        it('false if options.scale is false', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            scale: false,
          });

          expect(newView.hasScale).toBe(false);
        });

        it('false by default', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider);

          expect(newView.hasScale).toBe(false);
        });
      });

      describe('set up labelsContainer property if necessary', () => {
        it('if options.minMaxLabels is true', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            minMaxLabels: true,
          });

          expect(newView.labelsContainer).toBeInstanceOf(LabelsContainer);
        });

        it('if options.valueLabel is true', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            valueLabels: true,
          });

          expect(newView.labelsContainer).toBeInstanceOf(LabelsContainer);
        });

        it('do not set up if options.minMaxLabels and options.valueLabel are false', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            minMaxLabels: false,
            valueLabels: false,
          });

          expect(newView).not.toHaveProperty('labelsContainer');
        });

        it('do not set up by default', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider);

          expect(newView).not.toHaveProperty('labelsContainer');
        });
      });

      describe('set up scaleIntervals property if options.scale is true', () => {
        it('4 by default', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            scale: true,
          });

          expect(newView.scaleIntervals).toBe(4);
        });

        it('certain number if options.scaleIntervals is set', () => {
          const newSlider = document.createElement('div');

          for (let i = 1; i < 25; i += 1) {
            const newView = new View(newSlider, {
              scale: true,
              scaleIntervals: i,
            });

            expect(newView.scaleIntervals).toBe(i);
          }
        });
      });

      describe('min and max properties', () => {
        it('set up properties for min and max labels if options.minMaxLabels is true', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            minMaxLabels: true,
          });

          expect(newView).toHaveProperty('minLabel');
          expect(newView).toHaveProperty('maxLabel');
        });

        it('min and max properties are instancies of MinMaxLabel', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            minMaxLabels: true,
          });

          expect(newView.minLabel).toBeInstanceOf(MinMaxLabel);
          expect(newView.maxLabel).toBeInstanceOf(MinMaxLabel);
        });

        it('do not set up properties for min and max labels if options.minMaxLabels is false', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            minMaxLabels: false,
          });

          expect(newView).not.toHaveProperty('minLabel');
          expect(newView).not.toHaveProperty('maxLabel');
        });

        it('do not set up properties for min and max labels by default', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider);

          expect(newView).not.toHaveProperty('minLabel');
          expect(newView).not.toHaveProperty('maxLabel');
        });
      });

      describe('properties for value labels', () => {
        describe('set up properties for value labels if options.valueLabel is true', () => {
          it('set up left value label', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              valueLabels: true,
            });

            expect(newView).toHaveProperty('valueLabelLeft');
          });

          it('set up right and common value labels if necessary', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              valueLabels: true,
              range: true,
            });

            expect(newView).toHaveProperty('valueLabelRight');
            expect(newView).toHaveProperty('valueLabelCommon');
          });

          it('properties for value labels are instancies of ValueLabel', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              valueLabels: true,
              range: true,
            });

            expect(newView.valueLabelLeft).toBeInstanceOf(ValueLabel);
            expect(newView.valueLabelRight).toBeInstanceOf(ValueLabel);
            expect(newView.valueLabelCommon).toBeInstanceOf(ValueLabel);
          });
        });

        it('do not set up properties for value labels if options.valueLabel is false', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            valueLabels: false,
          });

          expect(newView).not.toHaveProperty('valueLabelLeft');
          expect(newView).not.toHaveProperty('valueLabelRight');
          expect(newView).not.toHaveProperty('valueLabelCommon');
        });

        it('do not set up properties for value labels by default', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider);

          expect(newView).not.toHaveProperty('valueLabelLeft');
          expect(newView).not.toHaveProperty('valueLabelRight');
          expect(newView).not.toHaveProperty('valueLabelCommon');
        });
      });

      describe('vertical property', () => {
        it('set up vertical property if options.vertical is true', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            vertical: true,
          });

          expect(newView.vertical).toBe(true);
        });

        it('do not set up vertical property if options.vertical is false', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            vertical: false,
          });

          expect(newView).not.toHaveProperty('vertical');
        });

        it('do not set up vertical property by default', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider);

          expect(newView).not.toHaveProperty('vertical');
        });
      });
    });

    describe('render', () => {
      it('append range component to track component', () => {
        expect(view.track.component.children).toContain(view.range.component);
      });

      it('append track component to slider component', () => {
        expect(view.slider.component.children).toContain(view.track.component);
      });

      it('append thumbLeft component to slider component', () => {
        expect(view.slider.component.children).toContain(view.thumbLeft.component);
      });

      it('append slider component to view component', () => {
        expect(view.component.children).toContain(view.slider.component);
      });

      it('append thumbRight component to slider component if view.isRange', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
        });

        expect(newView.slider.component.children).toContain(newView.thumbRight!.component);
      });

      describe('set initial indent for range component', () => {
        afterAll(() => {
          jest.restoreAllMocks();
        });

        it('set left indent = 0 if slider is horizontal or by default', () => {
          const newSlider = document.createElement('div');
          jest.spyOn(Range.prototype, 'setLeftIndent');
          const newView = new View(newSlider);

          expect(newView.range.setLeftIndent).toBeCalledWith(0);
        });

        it('set bottom indent = 0 if slider is vertical', () => {
          const newSlider = document.createElement('div');
          jest.spyOn(Range.prototype, 'setBottomIndent');
          const newView = new View(newSlider, {
            vertical: true,
          });

          expect(newView.range.setBottomIndent).toBeCalledWith(0);
        });
      });

      describe('append minLabel and maxLabel components to labelsContainer if necessary', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          minMaxLabels: true,
        });

        it('append minLabel', () => {
          expect(newView.labelsContainer!.component.children)
            .toContain(newView.minLabel!.component);
        });

        it('append maxLabel', () => {
          expect(newView.labelsContainer!.component.children)
            .toContain(newView.maxLabel!.component);
        });
      });

      describe('append labels components to labelsContainer if necessary', () => {
        it('append valueLabelLeft component', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            valueLabels: true,
          });

          expect(newView.labelsContainer!.component.children)
            .toContain(newView.valueLabelLeft!.component);
        });

        it('append valueLabelRight component', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            valueLabels: true,
            range: true,
          });

          expect(newView.labelsContainer!.component.children)
            .toContain(newView.valueLabelRight!.component);
        });

        it('append valueLabelCommon component', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            valueLabels: true,
            range: true,
          });

          expect(newView.labelsContainer!.component.children)
            .toContain(newView.valueLabelCommon!.component);
        });
      });

      it('append labelsContainer component to view component if necessary', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          minMaxLabels: true,
          valueLabels: true,
        });

        expect(newView.component.children).toContain(newView.labelsContainer!.component);
      });

      it('add necessary class to view component if slider is vertical', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          vertical: true,
        });

        expect(newView.component.classList).toContain('range-slider_vertical');
      });

      it('append panel component to view component if necessary', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          panel: true,
        });

        expect(newView.component.children).toContain(newView.panel!.component);
      });
    });
  });

  describe('setMinValue(min)', () => {
    it('if view has min label, set up its value', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });
      view.minLabel!.setValue = jest.fn();

      for (let i = -100; i <= 100; i += 1) {
        view.setMinValue(i);
        expect(view.minLabel!.setValue).toBeCalledWith(i);
      }
    });

    it('if view has no min label, nothing happens', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: false,
      });

      view.setMinValue(1);

      expect(view.minLabel).toBeUndefined();
    });
  });

  describe('setMaxValue(max)', () => {
    it('if view has maxLabel, set up its value', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: true,
      });
      view.maxLabel!.setValue = jest.fn();

      for (let i = -100; i <= 100; i += 1) {
        view.setMaxValue(i);
        expect(view.maxLabel!.setValue).toBeCalledWith(i);
      }
    });

    it('if view has no max label, nothing happens', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        minMaxLabels: false,
      });

      view.setMaxValue(100);

      expect(view.maxLabel).toBeUndefined();
    });
  });

  describe('setLeftValue(value, percent)', () => {
    describe('do necessary actions with thumb', () => {
      describe('set up left thumb position', () => {
        it('change left indent if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          view.thumbLeft.setLeftIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.thumbLeft.setLeftIndent).toBeCalledWith(i);
          }
        });

        it('change top indent if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          view.thumbLeft.setTopIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.thumbLeft.setTopIndent).toBeCalledWith(100 - i);
          }
        });
      });

      describe('make z-index of left thumb higher when it is at maximum', () => {
        it('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);

          view.thumbLeft.getLeftIndent = jest.fn();
          (view.thumbLeft.getLeftIndent as jest.Mock).mockReturnValue('100%');
          view.thumbLeft.setZIndex = jest.fn();

          view.setLeftValue(200, 100);

          expect(view.thumbLeft.setZIndex).toBeCalledWith(100);
        });

        it('if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          view.thumbLeft.getTopIndent = jest.fn();
          (view.thumbLeft.getTopIndent as jest.Mock).mockReturnValue('0%');
          view.thumbLeft.setZIndex = jest.fn();

          view.setLeftValue(200, 0);
          expect(view.thumbLeft.setZIndex).toBeCalledWith(100);
        });
      });
    });

    describe('do necessary actions with range', () => {
      describe('if slider is horizontal', () => {
        it('set up range width if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          view.range.setWidth = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.range.setWidth).toBeCalledWith(i);
          }
        });

        it('set up range left indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
          });
          view.range.setLeftIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.range.setLeftIndent).toBeCalledWith(i);
          }
        });
      });

      describe('if slider is vertical', () => {
        it('set up range height if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          view.range.setHeight = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.range.setHeight).toBeCalledWith(i);
          }
        });

        it('set up range bottom indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            range: true,
          });
          view.range.setBottomIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.range.setBottomIndent).toBeCalledWith(i);
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
          view.valueLabelLeft!.setValue = jest.fn();

          for (let value = -100; value <= 100; value += 1) {
            view.setLeftValue(value, 100);
            expect(view.valueLabelLeft!.setValue).toBeCalledWith(value);
          }
        });

        it('set up common label value, if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            range: true,
          });
          view.valueLabelCommon!.setValue = jest.fn();
          const rightValue = 200;
          view.valueLabelRight!.getValue = jest.fn();
          (view.valueLabelRight!.getValue as jest.Mock).mockReturnValue(rightValue);

          for (let value = -100; value <= 100; value += 1) {
            view.setLeftValue(value, 100);
            expect(view.valueLabelCommon!.setValue).toBeCalledWith(`${value} - ${rightValue}`);
          }
        });
      });

      describe('set up left value label position', () => {
        it('change left indent, if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
          });
          view.valueLabelLeft!.setLeftIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.valueLabelLeft!.setLeftIndent).toBeCalledWith(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            valueLabels: true,
          });
          view.valueLabelLeft!.setTopIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setLeftValue(50, i);
            expect(view.valueLabelLeft!.setTopIndent).toBeCalledWith(`${100 - i}%`);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 52,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            it('make left value label transparent', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(0);
            });

            it('make right value label transparent', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(0);
            });

            it('make common value label opaque', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(1);
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 52,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            it('make left value label transparent', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(0);
            });

            it('make right value label transparent', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(0);
            });

            it('make common value label opaque', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(1);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 55,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            it('make common value label transparent', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(0);
            });

            it('make left value label opaque', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(1);
            });

            it('make right value label opaque', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(1);
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 55,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            it('make common value label transparent', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(0);
            });

            it('make left value label opaque', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(1);
            });

            it('make right value label opaque', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(1);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.minLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 52,
            });
            (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            view.minLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.minLabel?.setOpacity).toBeCalledWith(0);
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.minLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 52,
            });
            view.minLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.minLabel?.setOpacity).toBeCalledWith(0);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.minLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 55,
            });
            (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            view.minLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.minLabel?.setOpacity).toBeCalledWith(1);
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.minLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 55,
            });
            view.minLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.minLabel?.setOpacity).toBeCalledWith(1);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 52,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 52,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 55,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(1);
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 55,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(1);
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
          view.thumbRight!.setLeftIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(view.thumbRight!.setLeftIndent).toBeCalledWith(i);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
          });
          view.thumbRight!.setTopIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(view.thumbRight!.setTopIndent).toBeCalledWith(100 - i);
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
        view.range.setRightIndent = jest.fn();

        for (let i = 0; i <= 100; i += 1) {
          view.setRightValue(50, i);
          expect(view.range.setRightIndent).toBeCalledWith(100 - i);
        }
      });

      it('set up range top indent, if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
        });
        view.range.setTopIndent = jest.fn();

        for (let i = 0; i <= 100; i += 1) {
          view.setRightValue(50, i);
          expect(view.range.setTopIndent).toBeCalledWith(100 - i);
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
          view.valueLabelRight!.setValue = jest.fn();

          for (let value = -100; value <= 100; value += 1) {
            view.setRightValue(value, 100);
            expect(view.valueLabelRight!.setValue).toBeCalledWith(value);
          }
        });

        it('set up common label value', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            range: true,
          });
          view.valueLabelCommon!.setValue = jest.fn();
          const leftValue = -200;
          view.valueLabelLeft!.getValue = jest.fn();
          (view.valueLabelLeft!.getValue as jest.Mock).mockReturnValue(leftValue);

          for (let value = -100; value <= 100; value += 1) {
            view.setRightValue(value, 100);
            expect(view.valueLabelCommon!.setValue).toBeCalledWith(`${leftValue} - ${value}`);
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
          view.valueLabelRight!.setLeftIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(view.valueLabelRight!.setLeftIndent).toBeCalledWith(`${i}%`);
          }
        });

        it('change top indent, if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
            valueLabels: true,
          });
          view.valueLabelRight!.setTopIndent = jest.fn();

          for (let i = 0; i <= 100; i += 1) {
            view.setRightValue(50, i);
            expect(view.valueLabelRight!.setTopIndent).toBeCalledWith(`${100 - i}%`);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 52,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setRightValue(100, 100);

            it('make left value label transparent', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(0);
            });

            it('make right value label transparent', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(0);
            });

            it('make common value label opaque', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(1);
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 52,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setRightValue(100, 100);

            it('make left value label transparent', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(0);
            });

            it('make right value label transparent', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(0);
            });

            it('make common value label opaque', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(1);
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
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 55,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setLeftValue(100, 100);

            it('make common value label transparent', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(0);
            });

            it('make left value label opaque', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(1);
            });

            it('make right value label opaque', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(1);
            });
          });

          describe('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              vertical: true,
              range: true,
            });
            view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 55,
            });
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.valueLabelLeft!.setOpacity = jest.fn();
            view.valueLabelRight!.setOpacity = jest.fn();
            view.valueLabelCommon!.setOpacity = jest.fn();
            view.setRightValue(100, 100);

            it('make common value label transparent', () => {
              expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(0);
            });

            it('make left value label opaque', () => {
              expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(1);
            });

            it('make right value label opaque', () => {
              expect(view.valueLabelRight!.setOpacity).toBeCalledWith(1);
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
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 52,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setRightValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
              range: true,
            });
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 52,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setRightValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
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
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              right: 50,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              left: 55,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setRightValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(1);
          });

          it('if slider is vertical', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              valueLabels: true,
              minMaxLabels: true,
              vertical: true,
              range: true,
            });
            view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
            view.maxLabel!.component.getBoundingClientRect = jest.fn();
            (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              top: 55,
            });
            (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
              bottom: 50,
            });
            view.maxLabel!.setOpacity = jest.fn();
            view.setRightValue(100, 100);

            expect(view.maxLabel?.setOpacity).toBeCalledWith(1);
          });
        });
      });
    });
  });

  describe('updateInput(value1, value2)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.input.setValue = jest.fn();
    view.updateInput(1, 2);

    it('pass call to input with received values', () => {
      expect(view.input.setValue).toBeCalledWith(1, 2);
    });

    it('if second value is not received, pass null instead of it', () => {
      view.updateInput(1);
      expect(view.input.setValue).toBeCalledWith(1, null);
    });
  });

  describe('handleLeftInput(clientX, clientY, shiftX, shiftY)', () => {
    describe('calc new left indent, if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider);
      view.eventManager.notify = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200,
      });
      view.track.getOffsetWidth = jest.fn();
      (view.track.getOffsetWidth as jest.Mock).mockReturnValue(500);

      it('if cursor is off left edge of track, new left indent is 0', () => {
        view.handleLeftInput(100, 200);
        expect(view.eventManager.notify).toBeCalledWith('viewLeftInput', 0);
      });

      it('if cursor is off right edge of track, new left indent = track width', () => {
        view.handleLeftInput(800, 200);
        expect(view.eventManager.notify).toBeCalledWith('viewLeftInput', 500);
      });

      it('if cursor is off right thumb position, new left indent = right thumb indent', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          range: true,
        });
        newView.eventManager.notify = jest.fn();

        newView.track.getBoundingClientRect = jest.fn();
        (newView.track.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 200,
        });

        newView.thumbRight!.getBoundingClientRect = jest.fn();
        (newView.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 400,
        });
        newView.thumbRight!.getWidth = jest.fn();
        (newView.thumbRight!.getWidth as jest.Mock).mockReturnValue(16);
        newView.handleLeftInput(409, 200);

        expect(newView.eventManager.notify).toBeCalledWith('viewLeftInput', 208);
      });
    });

    describe('calc new bottom indent, if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
      });
      view.eventManager.notify = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200,
      });
      const trackHeight = 500;
      view.track.getOffsetHeight = jest.fn();
      (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

      it('if cursor is off bottom edge of track, new bottom indent is 0', () => {
        view.handleLeftInput(100, 800);
        expect(view.eventManager.notify).toBeCalledWith('viewLeftInput', 0);
      });

      it('if cursor is off top edge of track, new bottom indent = track height', () => {
        view.handleLeftInput(100, 100);
        expect(view.eventManager.notify).toBeCalledWith('viewLeftInput', trackHeight);
      });

      it('if cursor is off right thumb position, new bottom indent = right thumb indent', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          vertical: true,
          range: true,
        });
        newView.eventManager.notify = jest.fn();

        newView.track.getBoundingClientRect = jest.fn();
        (newView.track.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 200,
        });

        const newTrackHeight = 500;
        newView.track.getOffsetHeight = jest.fn();
        (newView.track.getOffsetHeight as jest.Mock).mockReturnValue(newTrackHeight);

        newView.thumbRight!.getBoundingClientRect = jest.fn();
        (newView.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 300,
        });
        newView.thumbRight!.getHeight = jest.fn();
        (newView.thumbRight!.getHeight as jest.Mock).mockReturnValue(16);

        newView.handleLeftInput(100, 307);

        expect(newView.eventManager.notify).toBeCalledWith('viewLeftInput', newTrackHeight - 108);
      });
    });
  });

  describe('handleRightInput(clientX, clientY, shiftX, shiftY)', () => {
    describe('calc new left indent, if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
      });
      view.eventManager.notify = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200,
      });

      const trackWidth = 500;
      view.track.getOffsetWidth = jest.fn();
      (view.track.getOffsetWidth as jest.Mock).mockReturnValue(trackWidth);

      it('if cursor is off left thumb position, new left indent = left thumb indent', () => {
        view.thumbLeft.getBoundingClientRect = jest.fn();
        (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 300,
        });
        view.thumbLeft.getWidth = jest.fn();
        (view.thumbLeft.getWidth as jest.Mock).mockReturnValue(16);
        view.handleRightInput(307, 100);

        expect(view.eventManager.notify).toBeCalledWith('viewRightInput', 108);
      });

      it('if cursor is off right edge of track, new left indent = track width', () => {
        view.handleRightInput(800, 200);
        expect(view.eventManager.notify).toBeCalledWith('viewRightInput', trackWidth);
      });
    });

    describe('calc new bottom indent, if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
        range: true,
      });
      view.eventManager.notify = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200,
      });
      const trackHeight = 500;
      view.track.getOffsetHeight = jest.fn();
      (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

      it('if cursor is off left thumb position, new bottom indent = left thumb indent', () => {
        view.thumbLeft.getBoundingClientRect = jest.fn();
        (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 500,
        });
        view.thumbLeft.getHeight = jest.fn();
        (view.thumbLeft.getHeight as jest.Mock).mockReturnValue(16);

        view.handleRightInput(100, 509);

        expect(view.eventManager.notify).toBeCalledWith('viewRightInput', trackHeight - 308);
      });

      it('if cursor is off top edge of track, new bottom indent = track height', () => {
        view.handleRightInput(100, 100);
        expect(view.eventManager.notify).toBeCalledWith('viewRightInput', trackHeight);
      });
    });
  });

  describe('addScale(min, max, intervalsNumber)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      scale: true,
    });
    view.addScale(0, 150, 4);

    it('set up scale property', () => {
      expect(view).toHaveProperty('scale');
    });

    it('scale property is instance of Scale', () => {
      expect(view.scale).toBeInstanceOf(Scale);
    });

    it('append scale component to this view component', () => {
      expect(view.component.children).toContain(view.scale?.component);
    });

    describe('all of above is also true for vertical slider', () => {
      const newSlider = document.createElement('div');
      const newView = new View(newSlider, {
        scale: true,
        vertical: true,
      });
      newView.addScale(0, 150, 4);

      it('set up scale property', () => {
        expect(newView).toHaveProperty('scale');
      });

      it('scale property is instance of Scale', () => {
        expect(newView.scale).toBeInstanceOf(Scale);
      });

      it('append scale component to this view component', () => {
        expect(newView.component.children).toContain(newView.scale?.component);
      });
    });
  });

  describe('removeScale()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      scale: true,
    });
    view.addScale(0, 150, 4);
    view.removeScale();

    it('remove scale component from DOM', () => {
      expect(view.component.children).not.toContain(view.scale?.component);
    });

    it('set hasScale property to false', () => {
      expect(view.hasScale).toBe(false);
    });
  });

  describe('handleScaleOrTrackClick(x, y)', () => {
    describe('if !slider.isRange', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        valueLabels: true,
      });
      view.eventManager.notify = jest.fn();
      view.handleScaleOrTrackClick(100, 100);

      describe('add smooth transition', () => {
        it('add necessary class to thumb', () => {
          expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
        });

        it('add necessary class range', () => {
          expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
        });

        it('add necessary class to label', () => {
          expect(view.valueLabelLeft!.component.classList).toContain('range-slider__value-label_smooth-transition');
        });
      });

      describe('say subscribers that view wants to change left value and pass this value', () => {
        it('if slider is horizontal', () => {
          expect(view.eventManager.notify).toBeCalledWith('viewLeftInput', 100);
        });

        it('if slider is vertical', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            scale: true,
            valueLabels: true,
            vertical: true,
          });
          newView.eventManager.notify = jest.fn();
          newView.track.getOffsetHeight = jest.fn();
          (newView.track.getOffsetHeight as jest.Mock).mockReturnValue(500);
          newView.handleScaleOrTrackClick(100, 100);

          expect(newView.eventManager.notify).toBeCalledWith('viewLeftInput', 500 - 100);
        });
      });

      describe('remove smooth transition', () => {
        beforeAll(() => {
          jest.useFakeTimers();
          view.handleScaleOrTrackClick(100, 100);
          jest.runAllTimers();
        });

        it('remove necessary class from thumb', () => {
          expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
        });

        it('remove necessary class from range', () => {
          expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
        });

        it('remove necessary class from label', () => {
          expect(view.valueLabelLeft!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
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

          view.track.getBoundingClientRect = jest.fn();
          (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 0,
          });

          view.thumbLeft.getBoundingClientRect = jest.fn();
          (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 10,
            width: 16,
          });

          view.thumbRight!.getBoundingClientRect = jest.fn();
          (view.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 40,
            width: 16,
          });

          view.eventManager.notify = jest.fn();

          view.handleScaleOrTrackClick(30, 0);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class range', () => {
              expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(view.valueLabelLeft!.component.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.eventManager.notify).toBeCalledWith('viewLeftInput', 30);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(30, 0);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(view.valueLabelLeft!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
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

          view.track.getBoundingClientRect = jest.fn();
          (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 0,
          });

          view.thumbLeft.getBoundingClientRect = jest.fn();
          (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 40,
            height: 16,
          });

          view.thumbRight!.getBoundingClientRect = jest.fn();
          (view.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 10,
            height: 16,
          });

          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(500);

          view.eventManager.notify = jest.fn();

          view.handleScaleOrTrackClick(0, 38);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class range', () => {
              expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(view.valueLabelLeft!.component.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.eventManager.notify).toBeCalledWith('viewLeftInput', 500 - 38);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(0, 38);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(view.valueLabelLeft!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
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

          view.track.getBoundingClientRect = jest.fn();
          (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 0,
          });

          view.thumbLeft.getBoundingClientRect = jest.fn();
          (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 10,
            width: 16,
          });

          view.thumbRight!.getBoundingClientRect = jest.fn();
          (view.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            left: 40,
            width: 16,
          });

          view.eventManager.notify = jest.fn();

          view.handleScaleOrTrackClick(38, 0);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(view.thumbRight!.component.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class to range', () => {
              expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(view.valueLabelRight!.component.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.eventManager.notify).toBeCalledWith('viewRightInput', 38);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(38, 0);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(view.thumbRight!.component.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(view.valueLabelRight!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
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

          view.track.getBoundingClientRect = jest.fn();
          (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 0,
          });

          view.thumbLeft.getBoundingClientRect = jest.fn();
          (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 40,
            height: 16,
          });

          view.thumbRight!.getBoundingClientRect = jest.fn();
          (view.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
            top: 10,
            height: 16,
          });

          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(500);

          view.eventManager.notify = jest.fn();

          view.handleScaleOrTrackClick(0, 30);

          describe('add smooth transition', () => {
            it('add necessary class to thumb', () => {
              expect(view.thumbRight!.component.classList).toContain('range-slider__thumb_smooth-transition');
            });

            it('add necessary class to range', () => {
              expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
            });

            it('add necessary class to label', () => {
              expect(view.valueLabelRight!.component.classList).toContain('range-slider__value-label_smooth-transition');
            });
          });

          it('say subscribers that view wants to change left value and pass this value', () => {
            expect(view.eventManager.notify).toBeCalledWith('viewRightInput', 470);
          });

          describe('remove smooth transition', () => {
            beforeAll(() => {
              jest.useFakeTimers();
              view.handleScaleOrTrackClick(0, 30);
              jest.runAllTimers();
            });

            it('remove necessary class from thumb', () => {
              expect(view.thumbRight!.component.classList).not.toContain('range-slider__thumb_smooth-transition');
            });

            it('remove necessary class from range', () => {
              expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
            });

            it('remove necessary class from label', () => {
              expect(view.valueLabelRight!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
            });

            afterAll(() => {
              jest.useRealTimers();
            });
          });
        });
      });
    });
  });

  describe('fixLabelsContainerWidthForVertical()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      vertical: true,
      valueLabels: true,
      minMaxLabels: true,
      range: true,
    });
    view.labelsContainer!.fixWidthForVertical = jest.fn();
    view.fixLabelsContainerWidthForVertical();

    it('collect labels and pass them to function for fixing container width', () => {
      expect(view.labelsContainer!.fixWidthForVertical).toBeCalledWith(expect.arrayContaining([
        view.minLabel,
        view.maxLabel,
        view.valueLabelLeft,
        view.valueLabelRight,
      ]));
    });
  });

  describe('fixLabelsContainerHeightForHorizontal()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      valueLabels: true,
      minMaxLabels: true,
      range: true,
    });
    view.labelsContainer!.fixHeightForHorizontal = jest.fn();
    view.fixLabelsContainerHeightForHorizontal();

    it('collect labels and pass them to function for fixing container height', () => {
      expect(view.labelsContainer!.fixHeightForHorizontal).toBeCalledWith(expect.arrayContaining([
        view.minLabel,
        view.maxLabel,
        view.valueLabelLeft,
        view.valueLabelRight,
      ]));
    });
  });

  describe('setPanelValues(options)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });
    view.panel!.setValues = jest.fn();
    const options = {
      min: 0,
      max: 100,
      step: 5,
      from: 25,
      to: 75,
      vertical: false,
      range: true,
      scale: true,
      scaleIntervals: 4,
      valueLabels: false,
      minMaxLabels: false,
    };
    view.setPanelValues(options);

    it('pass call to panel with received options', () => {
      expect(view.panel?.setValues).toBeCalledWith(options);
    });
  });

  describe('updatePanelFrom(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });
    view.panel!.updateFrom = jest.fn();

    it('pass call to panel with received value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.updatePanelFrom(i);
        expect(view.panel?.updateFrom).toBeCalledWith(i);
      }
    });
  });

  describe('updatePanelTo(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });
    view.panel!.updateTo = jest.fn();

    it('pass call to panel with received value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.updatePanelTo(i);
        expect(view.panel?.updateTo).toBeCalledWith(i);
      }
    });
  });

  describe('updatePanelScaleIntervals(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      panel: true,
    });
    view.panel!.updateScaleIntervals = jest.fn();

    it('pass call to panel with received value', () => {
      for (let i = 0; i <= 10; i += 1) {
        view.updatePanelScaleIntervals(i);
        expect(view.panel?.updateScaleIntervals).toBeCalledWith(i);
      }
    });
  });

  describe('changeLeftValueFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.eventManager.notify = jest.fn();

    it('say subscribers that view wants to change left value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeLeftValueFromOutside(i);
        expect(view.eventManager.notify).toBeCalledWith('viewChangeLeftValueFromOutside', i);
      }
    });
  });

  describe('changeRightValueFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.eventManager.notify = jest.fn();

    it('say subscribers that view wants to change right value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeRightValueFromOutside(i);
        expect(view.eventManager.notify).toBeCalledWith('viewChangeRightValueFromOutside', i);
      }
    });
  });

  describe('changeMinFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.eventManager.notify = jest.fn();

    it('say subscribers that view wants to change min value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeMinFromOutside(i);
        expect(view.eventManager.notify).toBeCalledWith('viewChangeMinFromOutside', i);
      }
    });
  });

  describe('changeMaxFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.eventManager.notify = jest.fn();

    it('say subscribers that view wants to change maz value and pass this value', () => {
      for (let i = 0; i <= 100; i += 1) {
        view.changeMaxFromOutside(i);
        expect(view.eventManager.notify).toBeCalledWith('viewChangeMaxFromOutside', i);
      }
    });
  });

  describe('changeStepFromOutside(value)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    view.eventManager.notify = jest.fn();

    it('say subscribers that view wants to change maz value and pass this value', () => {
      for (let i = 0; i <= 10; i += 0.1) {
        view.changeStepFromOutside(i);
        expect(view.eventManager.notify).toBeCalledWith('viewChangeStepFromOutside', i);
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
      });

      view.thumbLeft.setLeftIndent = jest.fn();
      view.thumbRight!.setLeftIndent = jest.fn();
      view.range.setLeftIndent = jest.fn();
      view.range.setRightIndent = jest.fn();
      view.range.resetTopIndent = jest.fn();
      view.range.resetWidth = jest.fn();
      view.valueLabelLeft!.setLeftIndent = jest.fn();
      view.valueLabelRight!.setLeftIndent = jest.fn();
      view.valueLabelCommon!.setLeftIndent = jest.fn();
      view.eventManager.notify = jest.fn();

      view.changeOrientationFromOutside();

      it('set property vertical to true', () => {
        expect(view.vertical).toBe(true);
      });

      describe('set thumbs left indents to 0', () => {
        it('for left thumb', () => {
          expect(view.thumbLeft.setLeftIndent).toBeCalledWith(0);
        });

        it('for right thumb', () => {
          expect(view.thumbRight?.setLeftIndent).toBeCalledWith(0);
        });
      });

      describe('make necessary transformations with range', () => {
        it('set left indent to 0', () => {
          expect(view.range.setLeftIndent).toBeCalledWith(0);
        });

        it('set right indent to 0', () => {
          expect(view.range.setRightIndent).toBeCalledWith(0);
        });

        it('reset top indent', () => {
          expect(view.range.resetTopIndent).toBeCalled();
        });

        it('reset width', () => {
          expect(view.range.resetWidth).toBeCalled();
        });
      });

      describe('reset labels indents', () => {
        it('for left label', () => {
          expect(view.valueLabelLeft?.setLeftIndent).toBeCalledWith('unset');
        });

        it('for right label', () => {
          expect(view.valueLabelLeft?.setLeftIndent).toBeCalledWith('unset');
        });

        it('for common label', () => {
          expect(view.valueLabelLeft?.setLeftIndent).toBeCalledWith('unset');
        });
      });

      it('say subscribers that orientation was changed', () => {
        expect(view.eventManager.notify).toBeCalledWith('viewChangeOrientationFromOutside');
      });
    });

    describe('if slider was vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
        range: true,
        valueLabels: true,
      });

      view.thumbLeft.setTopIndent = jest.fn();
      view.thumbRight!.setTopIndent = jest.fn();
      view.range.setBottomIndent = jest.fn();
      view.range.setTopIndent = jest.fn();
      view.range.resetHeight = jest.fn();
      view.valueLabelLeft!.setTopIndent = jest.fn();
      view.valueLabelRight!.setTopIndent = jest.fn();
      view.valueLabelCommon!.setTopIndent = jest.fn();
      view.eventManager.notify = jest.fn();

      view.changeOrientationFromOutside();

      it('set property vertical to false', () => {
        expect(view.vertical).toBe(false);
      });

      describe('set thumbs top indents to 0', () => {
        it('for left thumb', () => {
          expect(view.thumbLeft.setTopIndent).toBeCalledWith(0);
        });

        it('for right thumb', () => {
          expect(view.thumbRight?.setTopIndent).toBeCalledWith(0);
        });
      });

      describe('make necessary transformations with range', () => {
        it('set bottom indent to 0', () => {
          expect(view.range.setBottomIndent).toBeCalledWith(0);
        });

        it('set top indent to 0', () => {
          expect(view.range.setTopIndent).toBeCalledWith(0);
        });

        it('reset height', () => {
          expect(view.range.resetHeight).toBeCalled();
        });
      });

      describe('reset labels indents', () => {
        it('for left label', () => {
          expect(view.valueLabelLeft?.setTopIndent).toBeCalledWith('unset');
        });

        it('for right label', () => {
          expect(view.valueLabelLeft?.setTopIndent).toBeCalledWith('unset');
        });

        it('for common label', () => {
          expect(view.valueLabelLeft?.setTopIndent).toBeCalledWith('unset');
        });
      });

      it('say subscribers that orientation was changed', () => {
        expect(view.eventManager.notify).toBeCalledWith('viewChangeOrientationFromOutside');
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

        view.range.resetWidth = jest.fn();
        view.eventManager.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('set property isRange to true', () => {
          expect(view.isRange).toBe(true);
        });

        describe('add second thumb', () => {
          it('set thumbRight property', () => {
            expect(view).toHaveProperty('thumbRight');
          });

          it('thumbRight property is instance of Thumb', () => {
            expect(view.thumbRight).toBeInstanceOf(Thumb);
          });
        });

        describe('add second value label if necessary', () => {
          it('set valueLabelRight property', () => {
            expect(view).toHaveProperty('valueLabelRight');
          });

          it('valueLabelRight property is instance of ValueLabel', () => {
            expect(view.valueLabelRight).toBeInstanceOf(ValueLabel);
          });

          it('set valueLabelCommon property', () => {
            expect(view).toHaveProperty('valueLabelCommon');
          });

          it('valueLabelCommon property is instance of ValueLabel', () => {
            expect(view.valueLabelCommon).toBeInstanceOf(ValueLabel);
          });
        });

        it('reset range width', () => {
          expect(view.range.resetWidth).toBeCalled();
        });

        it('say subscribers that range was changed', () => {
          expect(view.eventManager.notify).toBeCalledWith('viewToggleRangeFromOutside');
        });
      });

      describe('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: false,
          valueLabels: true,
        });

        view.range.resetHeight = jest.fn();
        view.eventManager.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('set property isRange to true', () => {
          expect(view.isRange).toBe(true);
        });

        describe('add second thumb', () => {
          it('set thumbRight property', () => {
            expect(view).toHaveProperty('thumbRight');
          });

          it('thumbRight property is instance of Thumb', () => {
            expect(view.thumbRight).toBeInstanceOf(Thumb);
          });
        });

        describe('add second value label if necessary', () => {
          it('set valueLabelRight property', () => {
            expect(view).toHaveProperty('valueLabelRight');
          });

          it('valueLabelRight property is instance of ValueLabel', () => {
            expect(view.valueLabelRight).toBeInstanceOf(ValueLabel);
          });

          it('set valueLabelCommon property', () => {
            expect(view).toHaveProperty('valueLabelCommon');
          });

          it('valueLabelCommon property is instance of ValueLabel', () => {
            expect(view.valueLabelCommon).toBeInstanceOf(ValueLabel);
          });
        });

        it('reset range height', () => {
          expect(view.range.resetHeight).toBeCalled();
        });

        it('say subscribers that range was changed', () => {
          expect(view.eventManager.notify).toBeCalledWith('viewToggleRangeFromOutside');
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

        view.eventManager.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('set property isRange to false', () => {
          expect(view.isRange).toBe(false);
        });

        it('say subscribers that range was changed', () => {
          expect(view.eventManager.notify).toBeCalledWith('viewToggleRangeFromOutside');
        });
      });

      describe('if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
          valueLabels: true,
        });

        view.range.resetTopIndent = jest.fn();
        view.eventManager.notify = jest.fn();

        view.toggleRangeFromOutside();

        it('set property isRange to false', () => {
          expect(view.isRange).toBe(false);
        });

        it('reset range top indent', () => {
          expect(view.range.resetTopIndent).toBeCalled();
        });

        it('say subscribers that range was changed', () => {
          expect(view.eventManager.notify).toBeCalledWith('viewToggleRangeFromOutside');
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

      view.eventManager.notify = jest.fn();
      view.toggleScaleFromOutside();

      it('set hasScale property to true', () => {
        expect(view.hasScale).toBe(true);
      });

      it('say subscribers that scale was toggled', () => {
        expect(view.eventManager.notify).toBeCalledWith('viewToggleScaleFromOutside');
      });
    });

    describe('if slider had scale', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
      });

      view.eventManager.notify = jest.fn();
      view.toggleScaleFromOutside();

      it('set hasScale property to false', () => {
        expect(view.hasScale).toBe(false);
      });

      it('say subscribers that scale was toggled', () => {
        expect(view.eventManager.notify).toBeCalledWith('viewToggleScaleFromOutside');
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
      view.eventManager.notify = jest.fn();

      view.changeScaleIntervals(5);

      it('set scaleIntervals property to value', () => {
        expect(view.scaleIntervals).toBe(5);
      });

      it('remove scale', () => {
        expect(view.removeScale).toBeCalled();
      });

      it('say subscribers that scaleIntervals was changed', () => {
        expect(view.eventManager.notify).toBeCalledWith('viewChangeScaleIntervals');
      });
    });

    describe('if passed value is 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      view.removeScale = jest.fn();
      view.eventManager.notify = jest.fn();

      view.changeScaleIntervals(0);

      it('scaleIntervals is not changed', () => {
        expect(view.scaleIntervals).toBe(3);
      });

      it('scale was not removed', () => {
        expect(view.removeScale).not.toBeCalled();
      });

      it('subscribers was not informed', () => {
        expect(view.eventManager.notify).not.toBeCalled();
      });
    });

    describe('if passed value < 0', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        scaleIntervals: 3,
      });

      view.removeScale = jest.fn();
      view.eventManager.notify = jest.fn();

      view.changeScaleIntervals(-2);

      it('scaleIntervals is not changed', () => {
        expect(view.scaleIntervals).toBe(3);
      });

      it('scale was not removed', () => {
        expect(view.removeScale).not.toBeCalled();
      });

      it('subscribers was not informed', () => {
        expect(view.eventManager.notify).not.toBeCalled();
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
          expect(view.valueLabelLeft?.component).toBeUndefined();
        });

        it('right', () => {
          expect(view.valueLabelRight?.component).toBeUndefined();
        });

        it('common', () => {
          expect(view.valueLabelCommon?.component).toBeUndefined();
        });
      });

      describe('set value labels properties to undefined', () => {
        it('left', () => {
          expect(view.valueLabelLeft).toBeUndefined();
        });

        it('right', () => {
          expect(view.valueLabelRight).toBeUndefined();
        });

        it('common', () => {
          expect(view.valueLabelCommon).toBeUndefined();
        });
      });

      describe('if slider had no min-max labels', () => {
        it('remove labels container from DOM', () => {
          expect(view.labelsContainer?.component).toBeUndefined();
        });

        it('set labelsContainer property to undefined', () => {
          expect(view.labelsContainer).toBeUndefined();
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

      view.eventManager.notify = jest.fn();
      view.fixLabelsContainerHeightForHorizontal = jest.fn();

      view.toggleValueLabels();

      describe('add value labels', () => {
        it('set up left value label', () => {
          expect(view).toHaveProperty('valueLabelLeft');
        });

        it('set up right and common value labels if necessary', () => {
          expect(view).toHaveProperty('valueLabelRight');
          expect(view).toHaveProperty('valueLabelCommon');
        });

        it('do not set up right and common value labels if not necessary', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            range: false,
            valueLabels: false,
          });

          newView.toggleValueLabels();

          expect(newView).not.toHaveProperty('valueLabelRight');
          expect(newView).not.toHaveProperty('valueLabelCommon');
        });

        it('properties for value labels are instancies of ValueLabel', () => {
          expect(view.valueLabelLeft).toBeInstanceOf(ValueLabel);
          expect(view.valueLabelRight).toBeInstanceOf(ValueLabel);
          expect(view.valueLabelCommon).toBeInstanceOf(ValueLabel);
        });
      });

      describe('add labels container if necessary and append labels to it', () => {
        it('labelsContainer property is instance of LabelsContainer', () => {
          expect(view.labelsContainer).toBeInstanceOf(LabelsContainer);
        });

        it('labels container was appended to slider', () => {
          expect(view.component.children).toContain(view.labelsContainer?.component);
        });

        it('labels was appended to labels container', () => {
          const labelsContainerChildren = view.labelsContainer?.component.children;

          expect(labelsContainerChildren).toContain(view.valueLabelLeft?.component);
          expect(labelsContainerChildren).toContain(view.valueLabelRight?.component);
          expect(labelsContainerChildren).toContain(view.valueLabelCommon?.component);
        });
      });

      it('say subscribers that value labels were added', () => {
        expect(view.eventManager.notify).toBeCalledWith('viewAddValueLabels');
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
          expect(view.minLabel?.component).toBeUndefined();
        });

        it('max', () => {
          expect(view.maxLabel?.component).toBeUndefined();
        });
      });

      describe('set min-max labels properties to undefined', () => {
        it('min', () => {
          expect(view.minLabel).toBeUndefined();
        });

        it('max', () => {
          expect(view.maxLabel).toBeUndefined();
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
          expect(newView.labelsContainer?.component).toBeUndefined();
        });

        it('set labelsContainer property to undefined', () => {
          expect(newView.labelsContainer).toBeUndefined();
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

      view.eventManager.notify = jest.fn();
      view.fixLabelsContainerHeightForHorizontal = jest.fn();

      view.toggleMinMaxLabels();

      describe('add min-max labels', () => {
        it('min', () => {
          expect(view).toHaveProperty('minLabel');
        });

        it('max', () => {
          expect(view).toHaveProperty('maxLabel');
        });

        it('properties for min-max labels are instancies of MinMaxLabel', () => {
          expect(view.minLabel).toBeInstanceOf(MinMaxLabel);
          expect(view.maxLabel).toBeInstanceOf(MinMaxLabel);
        });
      });

      describe('add labels container if necessary and append labels to it', () => {
        it('labelsContainer property is instance of LabelsContainer', () => {
          expect(view.labelsContainer).toBeInstanceOf(LabelsContainer);
        });

        it('labels container was appended to slider', () => {
          expect(view.component.children).toContain(view.labelsContainer?.component);
        });

        it('labels was appended to labels container', () => {
          const labelsContainerChildren = view.labelsContainer?.component.children;

          expect(labelsContainerChildren).toContain(view.minLabel?.component);
          expect(labelsContainerChildren).toContain(view.maxLabel?.component);
        });
      });

      it('say subscribers that min-max labels were added', () => {
        expect(view.eventManager.notify).toBeCalledWith('viewAddMinMaxLabels');
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
});
