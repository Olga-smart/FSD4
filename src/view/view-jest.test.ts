import View from './view';
import Presenter from '../presenter/presenter';
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

    it('set up presenter property', () => {
      expect(view).toHaveProperty('presenter');
    });

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

    it('call render() method', () => {
      const spy = jest.spyOn(View.prototype, 'render');
      const newSlider = document.createElement('div');
      const newView = new View(newSlider);

      expect(newView.render).toBeCalled();

      spy.mockClear();
    });
  });

  describe('registerWith(presenter)', () => {
    const slider = document.createElement('div');
    const view = new View(slider);
    const presenter: any = {};
    view.registerWith(presenter);

    it('set up presenter', () => {
      expect(view.presenter).toBe(presenter);
    });
  });

  describe('render()', () => {
    const slider = document.createElement('div');
    const view = new View(slider);

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

    describe('set initial indent for range component if !view.isRange or by default', () => {
      it('set left indent = 0 if slider is horizontal or by default', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider);
        newView.range.setLeftIndentInPx = jest.fn();
        newView.render();

        expect(newView.range.setLeftIndentInPx).toBeCalledWith(0);
      });

      it('set bottom indent = 0 if slider is vertical', () => {
        const newSlider = document.createElement('div');
        const newView = new View(newSlider, {
          vertical: true,
        });
        newView.range.setBottomIndentInPx = jest.fn();
        newView.render();

        expect(newView.range.setBottomIndentInPx).toBeCalledWith(0);
      });
    });

    describe('append minLabel and maxLabel components to labelsContainer if necessary', () => {
      const newSlider = document.createElement('div');
      const newView = new View(newSlider, {
        minMaxLabels: true,
      });

      it('append minLabel', () => {
        expect(newView.labelsContainer!.component.children).toContain(newView.minLabel!.component);
      });

      it('append maxLabel', () => {
        expect(newView.labelsContainer!.component.children).toContain(newView.maxLabel!.component);
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

    it('append labelsContainer component to slider component if necessary', () => {
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
  });

  describe('setMinValue(min)', () => {
    it('if view has minLabel, set up its value', () => {
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
  });

  describe('setLeftValue(value, px)', () => {
    describe('do necessary actions with thumb', () => {
      describe('set up left thumb position', () => {
        it('change left indent if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          view.thumbLeft.setLeftIndentInPx = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.thumbLeft.setLeftIndentInPx).toBeCalledWith(px);
          }
        });

        it('change top indent if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          view.thumbLeft.setTopIndentInPx = jest.fn();
          const trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.thumbLeft.setTopIndentInPx).toBeCalledWith(trackHeight - px);
          }
        });
      });

      describe('make z-index of left thumb higher when it is at maximum', () => {
        it('if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          view.thumbLeft.getLeftIndent = jest.fn();
          view.track.getOffsetWidth = jest.fn();
          view.thumbLeft.setZIndex = jest.fn();

          for (let px = 50; px <= 100; px += 1) {
            (view.thumbLeft.getLeftIndent as jest.Mock).mockReturnValue(px);
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(px);
            view.setLeftValue(200, px);

            expect(view.thumbLeft.setZIndex).toBeCalledWith(100);
          }
        });

        it('if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          view.thumbLeft.getTopIndent = jest.fn();
          (view.thumbLeft.getTopIndent as jest.Mock).mockReturnValue(0);
          view.thumbLeft.setZIndex = jest.fn();

          view.setLeftValue(200, 200);
          expect(view.thumbLeft.setZIndex).toBeCalledWith(100);
        });
      });
    });

    describe('do necessary actions with range', () => {
      describe('if slider is horizontal', () => {
        it('set up range width if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider);
          view.range.setWidthInPx = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.range.setWidthInPx).toBeCalledWith(px);
          }
        });

        it('set up range left indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
          });
          view.range.setLeftIndentInPx = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.range.setLeftIndentInPx).toBeCalledWith(px);
          }
        });
      });

      describe('if slider is vertical', () => {
        it('set up range height if !view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
          });
          view.range.setHeightInPx = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.range.setHeightInPx).toBeCalledWith(px);
          }
        });

        it('set up range bottom indent if view.isRange', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            range: true,
          });
          view.range.setBottomIndentInPx = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.range.setBottomIndentInPx).toBeCalledWith(px);
          }
        });
      });
    });

    describe('do necessary actions with labels if slider has labels', () => {
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

        it('set up common label value is view.isRange', () => {
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
        it('change left indent if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
          });
          view.valueLabelLeft!.setLeftIndent = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.valueLabelLeft!.setLeftIndent).toBeCalledWith(`${px}px`);
          }
        });

        it('change top indent if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            vertical: true,
            valueLabels: true,
          });
          view.valueLabelLeft!.setTopIndent = jest.fn();
          const trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

          for (let px = 0; px <= 100; px += 1) {
            view.setLeftValue(50, px);
            expect(view.valueLabelLeft!.setTopIndent).toBeCalledWith(`${trackHeight - px}px`);
          }
        });
      });

      describe('check if 2 value labels close to each other if view.isRange', () => {
        it('call function to check every time when setLeftValue(value, px) is called', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          view.isTwoValueLabelsClose = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.isTwoValueLabelsClose).toBeCalled();
        });

        it('merge labels if 2 value labels is close to each other', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
          view.mergeLabels = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.mergeLabels).toBeCalled();
        });

        it('split labels if 2 value labels is not close to each other', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
          view.splitLabels = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.splitLabels).toBeCalled();
        });

        describe('all of above is also true for vertical slider', () => {
          it('call function to check every time when setLeftValue(value, px) is called', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true,
            });
            view.isTwoValueLabelsClose = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.isTwoValueLabelsClose).toBeCalled();
          });

          it('merge labels if 2 value labels is close to each other', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true,
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
            view.mergeLabels = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.mergeLabels).toBeCalled();
          });

          it('split labels if 2 value labels is close to each other', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true,
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
            view.splitLabels = jest.fn();
            view.setLeftValue(100, 100);

            expect(view.splitLabels).toBeCalled();
          });
        });
      });

      describe('check if left value label close to min label if slider has min and max labels', () => {
        it('call function to check every time when setLeftValue(value, px) is called', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isLeftValueLabelCloseToMinLabel = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.isLeftValueLabelCloseToMinLabel).toBeCalled();
        });

        it('make min label transparent if left value label is close to it', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isLeftValueLabelCloseToMinLabel = jest.fn();
          (view.isLeftValueLabelCloseToMinLabel as jest.Mock).mockReturnValue(true);
          view.minLabel!.setOpacity = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.minLabel?.setOpacity).toBeCalledWith(0);
        });

        it('make min label not transparent if left value label is not close to it', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isLeftValueLabelCloseToMinLabel = jest.fn();
          (view.isLeftValueLabelCloseToMinLabel as jest.Mock).mockReturnValue(false);
          view.minLabel!.setOpacity = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.minLabel?.setOpacity).toBeCalledWith(1);
        });
      });

      describe('check if left value label close to max label if slider has min and max labels and !view.isRange', () => {
        it('call function to check every time when setLeftValue(value, px) is called', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isLeftValueLabelCloseToMaxLabel = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.isLeftValueLabelCloseToMaxLabel).toBeCalled();
        });

        it('make max label transparent if left value label is close to it', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isLeftValueLabelCloseToMaxLabel = jest.fn();
          (view.isLeftValueLabelCloseToMaxLabel as jest.Mock).mockReturnValue(true);
          view.maxLabel!.setOpacity = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
        });

        it('make max label not transparent if left value label is not close to it', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isLeftValueLabelCloseToMaxLabel = jest.fn();
          (view.isLeftValueLabelCloseToMaxLabel as jest.Mock).mockReturnValue(false);
          view.maxLabel!.setOpacity = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.maxLabel?.setOpacity).toBeCalledWith(1);
        });
      });
    });
  });

  describe('setRightValue(value, px)', () => {
    describe('do necessary actions with thumb', () => {
      describe('set up left thumb position', () => {
        it('change left indent if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
          });
          view.thumbRight!.setLeftIndentInPx = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setRightValue(50, px);
            expect(view.thumbRight!.setLeftIndentInPx).toBeCalledWith(px);
          }
        });

        it('change top indent if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
          });
          view.thumbRight!.setTopIndentInPx = jest.fn();
          const trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

          for (let px = 0; px <= 100; px += 1) {
            view.setRightValue(50, px);
            expect(view.thumbRight!.setTopIndentInPx).toBeCalledWith(trackHeight - px);
          }
        });
      });
    });

    describe('do necessary actions with range', () => {
      it('set up range right indent if slider is horizontal', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          range: true,
        });
        view.range.setRightIndentInPx = jest.fn();
        const trackHeight = 500;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(trackHeight);

        for (let px = 0; px <= 100; px += 1) {
          view.setRightValue(50, px);
          expect(view.range.setRightIndentInPx).toBeCalledWith(trackHeight - px);
        }
      });

      it('set up range top indent if slider is vertical', () => {
        const slider = document.createElement('div');
        const view = new View(slider, {
          vertical: true,
          range: true,
        });
        view.range.setTopIndentInPx = jest.fn();
        const trackHeight = 500;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

        for (let px = 0; px <= 100; px += 1) {
          view.setRightValue(50, px);
          expect(view.range.setTopIndentInPx).toBeCalledWith(trackHeight - px);
        }
      });
    });

    describe('do necessary actions with labels if slider has labels', () => {
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
        it('change left indent if slider is horizontal', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          view.valueLabelRight!.setLeftIndent = jest.fn();

          for (let px = 0; px <= 100; px += 1) {
            view.setRightValue(50, px);
            expect(view.valueLabelRight!.setLeftIndent).toBeCalledWith(`${px}px`);
          }
        });

        it('change top indent if slider is vertical', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            vertical: true,
            valueLabels: true,
          });
          view.valueLabelRight!.setTopIndent = jest.fn();
          const trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

          for (let px = 0; px <= 100; px += 1) {
            view.setRightValue(50, px);
            expect(view.valueLabelRight!.setTopIndent).toBeCalledWith(`${trackHeight - px}px`);
          }
        });
      });

      describe('check if 2 value labels close to each other', () => {
        it('call function to check every time when setRightValue(value, px) is called', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          view.isTwoValueLabelsClose = jest.fn();
          view.setRightValue(100, 100);

          expect(view.isTwoValueLabelsClose).toBeCalled();
        });

        it('merge labels if 2 value labels is close to each other', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
          view.mergeLabels = jest.fn();
          view.setRightValue(100, 100);

          expect(view.mergeLabels).toBeCalled();
        });

        it('split labels if 2 value labels is not close to each other', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
          view.splitLabels = jest.fn();
          view.setRightValue(100, 100);

          expect(view.splitLabels).toBeCalled();
        });

        describe('all of above is also true for vertical slider', () => {
          it('call function to check every time when setRightValue(value, px) is called', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true,
            });
            view.isTwoValueLabelsClose = jest.fn();
            view.setRightValue(100, 100);

            expect(view.isTwoValueLabelsClose).toBeCalled();
          });

          it('merge labels if 2 value labels is close to each other', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true,
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
            view.mergeLabels = jest.fn();
            view.setRightValue(100, 100);

            expect(view.mergeLabels).toBeCalled();
          });

          it('split labels if 2 value labels is close to each other', () => {
            const slider = document.createElement('div');
            const view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true,
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
            view.splitLabels = jest.fn();
            view.setRightValue(100, 100);

            expect(view.splitLabels).toBeCalled();
          });
        });
      });

      describe('check if right value label close to max label if slider has min and max labels', () => {
        it('call function to check every time when setRightValue(value, px) is called', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isRightValueLabelCloseToMaxLabel = jest.fn();
          view.setRightValue(100, 100);

          expect(view.isRightValueLabelCloseToMaxLabel).toBeCalled();
        });

        it('make max label transparent if right value label is close to it', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isRightValueLabelCloseToMaxLabel = jest.fn();
          (view.isRightValueLabelCloseToMaxLabel as jest.Mock).mockReturnValue(true);
          view.maxLabel!.setOpacity = jest.fn();
          view.setRightValue(100, 100);

          expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
        });

        it('make max label not transparent if right value label is not close to it', () => {
          const slider = document.createElement('div');
          const view = new View(slider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true,
          });
          view.isRightValueLabelCloseToMaxLabel = jest.fn();
          (view.isRightValueLabelCloseToMaxLabel as jest.Mock).mockReturnValue(false);
          view.maxLabel!.setOpacity = jest.fn();
          view.setRightValue(100, 100);

          expect(view.maxLabel?.setOpacity).toBeCalledWith(1);
        });
      });
    });
  });

  describe('mergeLabels()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      valueLabels: true,
      range: true,
    });

    view.valueLabelLeft!.setOpacity = jest.fn();
    view.valueLabelRight!.setOpacity = jest.fn();
    view.valueLabelCommon!.setOpacity = jest.fn();

    beforeEach(() => {
      view.mergeLabels();
    });

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

  describe('splitLabels()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      valueLabels: true,
      range: true,
    });

    view.valueLabelLeft!.setOpacity = jest.fn();
    view.valueLabelRight!.setOpacity = jest.fn();
    view.valueLabelCommon!.setOpacity = jest.fn();

    beforeEach(() => {
      view.splitLabels();
    });

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

  describe('isTwoValueLabelsClose()', () => {
    describe('if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        vertical: false,
        range: true,
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.valueLabelRight!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52,
        });

        expect(view.isTwoValueLabelsClose()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55,
        });

        expect(view.isTwoValueLabelsClose()).toBe(false);
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

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52,
        });
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });

        expect(view.isTwoValueLabelsClose()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55,
        });
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });

        expect(view.isTwoValueLabelsClose()).toBe(false);
      });
    });
  });

  describe('isLeftValueLabelCloseToMinLabel()', () => {
    describe('if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: false,
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.minLabel!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52,
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55,
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(false);
      });
    });

    describe('if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: true,
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.minLabel!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52,
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55,
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(false);
      });
    });
  });

  describe('isLeftValueLabelCloseToMaxLabel()', () => {
    describe('if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: false,
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52,
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55,
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(false);
      });
    });

    describe('if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: true,
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(false);
      });
    });
  });

  describe('isRightValueLabelCloseToMaxLabel()', () => {
    describe('if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: false,
        range: true,
      });
      view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52,
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55,
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(false);
      });
    });

    describe('if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: true,
        range: true,
      });
      view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', () => {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', () => {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55,
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50,
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(false);
      });
    });
  });

  describe('handleLeftInput(clientX, clientY, shiftX, shiftY)', () => {
    describe('calc new left indent if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider);
      const presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleLeftInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200,
      });
      view.track.getOffsetWidth = jest.fn();
      (view.track.getOffsetWidth as jest.Mock).mockReturnValue(500);

      it('if cursor is off left edge of track new left indent is 0', () => {
        view.handleLeftInput(100, 200);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(0);
      });

      it('if cursor is off right edge of track new left indent = track width', () => {
        view.handleLeftInput(800, 200);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(500);
      });

      it('if cursor is off right thumb position new left indent = right thumb indent', () => {
        const rangeSlider = document.createElement('div');
        const rangeView = new View(rangeSlider, {
          range: true,
        });
        const rangePresenter: any = {};
        rangeView.registerWith(rangePresenter);
        rangeView.presenter!.handleLeftInput = jest.fn();

        rangeView.track.getBoundingClientRect = jest.fn();
        (rangeView.track.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 200,
        });

        rangeView.thumbRight!.getLeftIndent = jest.fn();
        (rangeView.thumbRight!.getLeftIndent as jest.Mock).mockReturnValue(200);
        rangeView.handleLeftInput(500, 200);

        expect(rangeView.presenter!.handleLeftInput).toBeCalledWith(200);
      });
    });

    describe('calc new bottom indent if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
      });
      const presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleLeftInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200,
      });
      const trackHeight = 500;
      view.track.getOffsetHeight = jest.fn();
      (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

      it('if cursor is off bottom edge of track new bottom indent is 0', () => {
        view.handleLeftInput(100, 800);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(0);
      });

      it('if cursor is off top edge of track new bottom indent = track height', () => {
        view.handleLeftInput(100, 100);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(trackHeight);
      });

      it('if cursor is off right thumb position new bottom indent = right thumb indent', () => {
        const rangeSlider = document.createElement('div');
        const rangeView = new View(rangeSlider, {
          vertical: true,
          range: true,
        });
        const rangePresenter: any = {};
        rangeView.registerWith(rangePresenter);
        rangeView.presenter!.handleLeftInput = jest.fn();

        rangeView.track.getBoundingClientRect = jest.fn();
        (rangeView.track.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 200,
        });

        const rangeTrackHeight = 500;
        rangeView.track.getOffsetHeight = jest.fn();
        (rangeView.track.getOffsetHeight as jest.Mock).mockReturnValue(rangeTrackHeight);

        rangeView.thumbRight!.getTopIndent = jest.fn();
        (rangeView.thumbRight!.getTopIndent as jest.Mock).mockReturnValue(200);
        rangeView.handleLeftInput(100, 300);

        expect(rangeView.presenter!.handleLeftInput).toBeCalledWith(rangeTrackHeight - 200);
      });
    });
  });

  describe('handleRightInput(clientX, clientY, shiftX, shiftY)', () => {
    describe('calc new left indent if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
      });
      const presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleRightInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200,
      });

      const trackWidth = 500;
      view.track.getOffsetWidth = jest.fn();
      (view.track.getOffsetWidth as jest.Mock).mockReturnValue(trackWidth);

      it('if cursor is off left thumb position new left indent = left thumb indent', () => {
        view.thumbLeft.getLeftIndent = jest.fn();
        (view.thumbLeft.getLeftIndent as jest.Mock).mockReturnValue(100);
        view.handleRightInput(250, 200);

        expect(view.presenter!.handleRightInput).toBeCalledWith(100);
      });

      it('if cursor is off right edge of track new left indent = track width', () => {
        view.handleRightInput(800, 200);
        expect(view.presenter!.handleRightInput).toBeCalledWith(trackWidth);
      });
    });

    describe('calc new bottom indent if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        vertical: true,
        range: true,
      });
      const presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleRightInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200,
      });
      const trackHeight = 500;
      view.track.getOffsetHeight = jest.fn();
      (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

      it('if cursor is off left thumb position new bottom indent = left thumb indent', () => {
        view.thumbLeft.getTopIndent = jest.fn();
        (view.thumbLeft.getTopIndent as jest.Mock).mockReturnValue(400);
        view.handleRightInput(100, 800);
        expect(view.presenter!.handleRightInput).toBeCalledWith(trackHeight - 400);
      });

      it('if cursor is off top edge of track new bottom indent = track height', () => {
        view.handleRightInput(100, 100);
        expect(view.presenter!.handleRightInput).toBeCalledWith(trackHeight);
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

  describe('handleScaleOrTrackClick(x, y)', () => {
    describe('if !slider.isRange', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        valueLabels: true,
      });
      const presenter = {};
      view.registerWith(presenter as Presenter);
      (view.presenter as Presenter).handleLeftInput = jest.fn();
      view.addSmoothTransition = jest.fn();
      view.removeSmoothTransition = jest.fn();
      view.handleScaleOrTrackClick(100, 100);

      it('call function to add smooth transition', () => {
        expect(view.addSmoothTransition).toBeCalledWith('left');
      });

      describe('call function to handle left input with proper argument', () => {
        it('if slider is horizontal', () => {
          expect((view.presenter as Presenter).handleLeftInput).toBeCalledWith(100);
        });

        it('if slider is vertical', () => {
          const newSlider = document.createElement('div');
          const newView = new View(newSlider, {
            scale: true,
            valueLabels: true,
            vertical: true,
          });
          const newPresenter = {};
          newView.registerWith(newPresenter as Presenter);
          (newView.presenter as Presenter).handleLeftInput = jest.fn();
          newView.track.getOffsetHeight = jest.fn();
          (newView.track.getOffsetHeight as jest.Mock).mockReturnValue(500);
          newView.handleScaleOrTrackClick(100, 100);

          expect((newView.presenter as Presenter).handleLeftInput).toBeCalledWith(500 - 100);
        });
      });

      it('call function to remove smooth transition', () => {
        jest.useFakeTimers();
        view.handleScaleOrTrackClick(100, 100);
        jest.runAllTimers();

        expect(view.removeSmoothTransition).toBeCalledWith('left');

        jest.useRealTimers();
      });
    });

    describe('if slider.isRange', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        scale: true,
        valueLabels: true,
        range: true,
      });
      const presenter = {};
      view.registerWith(presenter as Presenter);
      (view.presenter as Presenter).handleLeftInput = jest.fn();
      (view.presenter as Presenter).handleRightInput = jest.fn();
      view.addSmoothTransition = jest.fn();
      view.removeSmoothTransition = jest.fn();
      view.whichThumbIsNearer = jest.fn();
      view.handleScaleOrTrackClick(100, 100);

      it('call function to check which thumb is nearer', () => {
        expect(view.whichThumbIsNearer).toBeCalledWith(100, 100);
      });

      describe('if left thumb is nearer', () => {
        (view.whichThumbIsNearer as jest.Mock).mockReturnValue('left');
        view.handleScaleOrTrackClick(100, 100);

        it('call function to add smooth transition with proper argument', () => {
          expect(view.addSmoothTransition).toBeCalledWith('left');
        });

        describe('call function to handle left input with proper argument', () => {
          it('if slider is horizontal', () => {
            expect((view.presenter as Presenter).handleLeftInput).toBeCalledWith(100);
          });

          it('if slider is vertical', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              scale: true,
              valueLabels: true,
              range: true,
              vertical: true,
            });
            const newPresenter = {};
            newView.registerWith(newPresenter as Presenter);
            (newView.presenter as Presenter).handleLeftInput = jest.fn();
            newView.whichThumbIsNearer = jest.fn();
            (newView.whichThumbIsNearer as jest.Mock).mockReturnValue('left');
            newView.track.getOffsetHeight = jest.fn();
            (newView.track.getOffsetHeight as jest.Mock).mockReturnValue(500);
            newView.handleScaleOrTrackClick(100, 100);

            expect((newView.presenter as Presenter).handleLeftInput).toBeCalledWith(400);
          });
        });

        it('call function to remove smooth transition', () => {
          jest.useFakeTimers();
          (view.whichThumbIsNearer as jest.Mock).mockReturnValue('left');
          view.handleScaleOrTrackClick(100, 100);
          jest.runAllTimers();

          expect(view.removeSmoothTransition).toBeCalledWith('left');

          jest.useRealTimers();
        });
      });

      describe('if right thumb is nearer', () => {
        view.whichThumbIsNearer = jest.fn();
        (view.whichThumbIsNearer as jest.Mock).mockReturnValue('right');
        view.handleScaleOrTrackClick(100, 100);

        it('call function to add smooth transition with proper argument', () => {
          expect(view.addSmoothTransition).toBeCalledWith('right');
        });

        describe('call function to handle right input with proper argument', () => {
          it('if slider is horizontal', () => {
            expect((view.presenter as Presenter).handleRightInput).toBeCalledWith(100);
          });

          it('if slider is vertical', () => {
            const newSlider = document.createElement('div');
            const newView = new View(newSlider, {
              scale: true,
              valueLabels: true,
              range: true,
              vertical: true,
            });
            const newPresenter = {};
            newView.registerWith(newPresenter as Presenter);
            (newView.presenter as Presenter).handleRightInput = jest.fn();
            newView.whichThumbIsNearer = jest.fn();
            (newView.whichThumbIsNearer as jest.Mock).mockReturnValue('right');
            newView.track.getOffsetHeight = jest.fn();
            (newView.track.getOffsetHeight as jest.Mock).mockReturnValue(500);
            newView.handleScaleOrTrackClick(100, 100);

            expect((newView.presenter as Presenter).handleRightInput).toBeCalledWith(400);
          });
        });

        it('call function to remove smooth transition', () => {
          jest.useFakeTimers();
          (view.whichThumbIsNearer as jest.Mock).mockReturnValue('right');
          view.handleScaleOrTrackClick(100, 100);
          jest.runAllTimers();

          expect(view.removeSmoothTransition).toBeCalledWith('right');

          jest.useRealTimers();
        });
      });
    });
  });

  describe('whichThumbIsNearer(x, y)', () => {
    describe('if slider is horizontal', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
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

      it('if distance from both thumbs is equal return "left"', () => {
        expect(view.whichThumbIsNearer(33, 0)).toBe('left');
      });

      it('if distance from left thumb is less return "left"', () => {
        expect(view.whichThumbIsNearer(30, 0)).toBe('left');
      });

      it('if distance from right thumb is less return "right"', () => {
        expect(view.whichThumbIsNearer(38, 0)).toBe('right');
      });
    });

    describe('if slider is vertical', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        range: true,
        vertical: true,
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

      it('if distance from both thumbs is equal return "left"', () => {
        expect(view.whichThumbIsNearer(0, 33)).toBe('left');
      });

      it('if distance from left thumb is less return "left"', () => {
        expect(view.whichThumbIsNearer(0, 38)).toBe('left');
      });

      it('if distance from right thumb is less return "right"', () => {
        expect(view.whichThumbIsNearer(0, 30)).toBe('right');
      });
    });
  });

  describe('addSmoothTransition(side)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      range: true,
      valueLabels: true,
    });

    it('add necessary classes to thumb, range and label if side = left', () => {
      view.addSmoothTransition('left');

      expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

    it('add necessary classes to thumb, range and label if side = right', () => {
      view.addSmoothTransition('right');

      expect(view.thumbRight!.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelRight!.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

    it('add necessary classes to thumb, range and label by default', () => {
      view.addSmoothTransition();

      expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).toContain('range-slider__value-label_smooth-transition');
    });
  });

  describe('removeSmoothTransition(side)', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      range: true,
      valueLabels: true,
    });

    it('remove necessary classes from thumb, range and label if side = left', () => {
      view.addSmoothTransition('left');
      view.removeSmoothTransition('left');

      expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

    it('remove necessary classes from thumb, range and label if side = right', () => {
      view.addSmoothTransition('right');
      view.removeSmoothTransition('right');

      expect(view.thumbRight!.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelRight!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

    it('remove necessary classes from thumb, range and label by default', () => {
      view.addSmoothTransition();
      view.removeSmoothTransition();

      expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });
  });

  describe('fixLabelsContainerWidthForVertical()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      vertical: true,
      valueLabels: true,
      minMaxLabels: true,
    });
    view.collectLabels = jest.fn();
    view.labelsContainer!.fixWidthForVertical = jest.fn();
    view.fixLabelsContainerWidthForVertical();

    it('collect labels and pass them to function for fixing container width', () => {
      expect(view.labelsContainer!.fixWidthForVertical).toBeCalledWith(view.collectLabels());
    });
  });

  describe('fixLabelsContainerHeightForHorizontal()', () => {
    const slider = document.createElement('div');
    const view = new View(slider, {
      valueLabels: true,
      minMaxLabels: true,
    });
    view.collectLabels = jest.fn();
    view.labelsContainer!.fixHeightForHorizontal = jest.fn();
    view.fixLabelsContainerHeightForHorizontal();

    it('collect labels and pass them to function for fixing container height', () => {
      expect(view.labelsContainer!.fixHeightForHorizontal).toBeCalledWith(view.collectLabels());
    });
  });

  describe('collectLabels()', () => {
    it('return array of labels except common label', () => {
      const slider = document.createElement('div');
      const view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        range: true,
      });
      const labels = view.collectLabels();

      expect(labels).toContain(view.minLabel);
      expect(labels).toContain(view.maxLabel);
      expect(labels).toContain(view.valueLabelLeft);
      expect(labels).toContain(view.valueLabelRight);
    });
  });
});
