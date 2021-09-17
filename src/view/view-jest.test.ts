import {View} from './view';
import {Presenter} from '../presenter/presenter';
import {Slider} from './subviews/slider/slider';
import {Track} from './subviews/track/track';
import {Range} from './subviews/range/range';
import {Thumb} from './subviews/thumb/thumb';
import {LabelsContainer} from './subviews/labelsContainer/labelsContainer';
import {MinMaxLabel} from './subviews/minMaxLabel/minMaxLabel';
import {ValueLabel} from './subviews/valueLabel/valueLabel';
import {Scale} from './subviews/scale/scale';

describe('View', function() {
  
  describe('constructor()', function() {
    
    let slider = document.createElement('div');
    let view = new View(slider);
    
    it('set up presenter property', function() {
      expect(view).toHaveProperty('presenter');
    });
    
    it('set up component property', function() {
      expect(view.component).toBe(slider);
    });

    describe('slider property', function() {

      it('set up slider property', function() {
        expect(view).toHaveProperty('slider');
      });
  
      it('slider property is instance of Slider', function() {
        expect(view.slider).toBeInstanceOf(Slider);
      });

    });
    
    describe('track property', function() {

      it('set up track property', function() {
        expect(view).toHaveProperty('track');
      });
  
      it('track property is instance of Track', function() {
        expect(view.track).toBeInstanceOf(Track);
      });

    });
    
    describe('range property', function() {

      it('set up range property', function() {
        expect(view).toHaveProperty('range');
      });
  
      it('range property is instance of Range', function() {
        expect(view.range).toBeInstanceOf(Range);
      });

    });
    
    describe('properties for thumbs', function() {

      it('set up left thumb', function() {
        expect(view).toHaveProperty('thumbLeft');
      });

      it('thumbLeft property is instance of Thumb', function() {
        expect(view.thumbLeft).toBeInstanceOf(Thumb);
      });

      it('set up right thumb if necessary', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true
        });

        expect(view).toHaveProperty('thumbRight');
      }); 

      it('thumbRight property is instance of Thumb', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true
        });

        expect(view.thumbRight).toBeInstanceOf(Thumb);
      });

    });

    describe('set up isRange property', function() {

      it('true if options.range is true', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true
        });

        expect(view.isRange).toBe(true);
      }); 

      it('false if options.range is false', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: false
        });

        expect(view.isRange).toBe(false);
      }); 

      it('false by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider);

        expect(view.isRange).toBe(false);
      }); 

    });

    describe('set up hasScale property', function() {

      it('true if options.scale is true', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          scale: true
        });

        expect(view.hasScale).toBe(true);
      }); 

      it('false if options.scale is false', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          scale: false
        });

        expect(view.hasScale).toBe(false);
      }); 

      it('false by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider);

        expect(view.hasScale).toBe(false);
      }); 

    });

    describe('set up labelsContainer property if necessary', function() {

      it('if options.minMaxLabels is true', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          minMaxLabels: true
        });

        expect(view.labelsContainer).toBeInstanceOf(LabelsContainer);
      });

      it('if options.valueLabel is true', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          valueLabels: true
        });

        expect(view.labelsContainer).toBeInstanceOf(LabelsContainer);
      });

      it('do not set up if options.minMaxLabels and options.valueLabel are false', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          minMaxLabels: false,
          valueLabels: false
        });

        expect(view).not.toHaveProperty('labelsContainer');
      });

      it('do not set up by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider);

        expect(view).not.toHaveProperty('labelsContainer');
      });

    });

    describe('set up scaleIntervals property if options.scale is true', function() {

      it('4 by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          scale: true
        });

        expect(view.scaleIntervals).toBe(4);
      });

      it('certain number if options.scaleIntervals is set', function() {
        let slider = document.createElement('div');

        for (let i = 1; i < 25; i++) {
          let view = new View(slider, {
            scale: true,
            scaleIntervals: i
          });
  
          expect(view.scaleIntervals).toBe(i);
        }
      });
      
    });

    describe('min and max properties', function() {

      it('set up properties for min and max labels if options.minMaxLabels is true', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          minMaxLabels: true
        });
        
        expect(view).toHaveProperty('minLabel');
        expect(view).toHaveProperty('maxLabel');
      });
  
      it('min and max properties are instancies of MinMaxLabel', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          minMaxLabels: true
        });
        
        expect(view.minLabel).toBeInstanceOf(MinMaxLabel);
        expect(view.maxLabel).toBeInstanceOf(MinMaxLabel);
      });
  
      it('do not set up properties for min and max labels if options.minMaxLabels is false', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          minMaxLabels: false
        });
        
        expect(view).not.toHaveProperty('minLabel');
        expect(view).not.toHaveProperty('maxLabel');
      });
  
      it('do not set up properties for min and max labels by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider);
        
        expect(view).not.toHaveProperty('minLabel');
        expect(view).not.toHaveProperty('maxLabel');
      });

    });

    describe('properties for value labels', function() {

      describe('set up properties for value labels if options.valueLabel is true', function() {
        
        it('set up left value label', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true
          });

          expect(view).toHaveProperty('valueLabelLeft');
        });
  
        it('set up right and common value labels if necessary', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            range: true
          });
  
          expect(view).toHaveProperty('valueLabelRight');
          expect(view).toHaveProperty('valueLabelCommon');
        });   

        it('properties for value labels are instancies of ValueLabel', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            range: true
          });
  
          expect(view.valueLabelLeft).toBeInstanceOf(ValueLabel);
          expect(view.valueLabelRight).toBeInstanceOf(ValueLabel);
          expect(view.valueLabelCommon).toBeInstanceOf(ValueLabel);
        });
  
      });
      
      it('do not set up properties for value labels if options.valueLabel is false', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          valueLabels: false
        });
        
        expect(view).not.toHaveProperty('valueLabelLeft');
        expect(view).not.toHaveProperty('valueLabelRight');
        expect(view).not.toHaveProperty('valueLabelCommon');
      });

      it('do not set up properties for value labels by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider);
        
        expect(view).not.toHaveProperty('valueLabelLeft');
        expect(view).not.toHaveProperty('valueLabelRight');
        expect(view).not.toHaveProperty('valueLabelCommon');
      });

    });
    
    describe('vertical property', function() {

      it('set up vertical property if options.vertical is true', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          vertical: true
        });
        
        expect(view.vertical).toBe(true);
      });
      
      it('do not set up vertical property if options.vertical is false', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          vertical: false
        });
        
        expect(view).not.toHaveProperty('vertical');
      });

      it('do not set up vertical property by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider);
        
        expect(view).not.toHaveProperty('vertical');
      });

    });
    
    it('call render() method', function() {
      let spy = jest.spyOn(View.prototype, 'render');
      let slider = document.createElement('div');
      new View(slider);

      expect(spy).toBeCalled();

      spy.mockClear();
    });
    
  });
  
  describe('registerWith(presenter)', function() {
      
    let slider = document.createElement('div');
    let view = new View(slider);
    let presenter: any = {};
    view.registerWith(presenter);

    it('set up presenter', function() {
      expect(view.presenter).toBe(presenter);
    });

  });

  describe('render()', function() {

    let slider = document.createElement('div');
    let view = new View(slider);

    it('append range component to track component', function() {
      expect(view.track.component.children).toContain(view.range.component);
    });

    it('append track component to slider component', function() {
      expect(view.slider.component.children).toContain(view.track.component);
    });

    it('append thumbLeft component to slider component', function() {
      expect(view.slider.component.children).toContain(view.thumbLeft.component);
    });

    it('append slider component to view component', function() {
      expect(view.component.children).toContain(view.slider.component);
    });

    it('append thumbRight component to slider component if view.isRange', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true
      });

      expect(view.slider.component.children).toContain(view.thumbRight!.component);
    });
    
    describe('set initial indent for range component if !view.isRange or by default', function() {

      it('set left indent = 0 if slider is horizontal or by default', function() {
        let slider = document.createElement('div');
        let view = new View(slider);
        view.range.setLeftIndentInPx = jest.fn();
        view.render();

        expect(view.range.setLeftIndentInPx).toBeCalledWith(0);
      });

      it('set bottom indent = 0 if slider is vertical', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          vertical: true
        });
        view.range.setBottomIndentInPx = jest.fn();
        view.render();

        expect(view.range.setBottomIndentInPx).toBeCalledWith(0);
      });

    });

    describe('append minLabel and maxLabel components to labelsContainer if necessary', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true
      });

      it('append minLabel', function() {
        expect(view.labelsContainer!.component.children).toContain(view.minLabel!.component);
      });

      it('append maxLabel', function() {
        expect(view.labelsContainer!.component.children).toContain(view.maxLabel!.component);
      });

    });

    describe('append labels components to labelsContainer if necessary', function() {

      it('append valueLabelLeft component', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          valueLabels: true
        });

        expect(view.labelsContainer!.component.children).toContain(view.valueLabelLeft!.component);
      });

      it('append valueLabelRight component', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          valueLabels: true,
          range: true
        });

        expect(view.labelsContainer!.component.children).toContain(view.valueLabelRight!.component);
      });

      it('append valueLabelCommon component', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          valueLabels: true,
          range: true
        });

        expect(view.labelsContainer!.component.children).toContain(view.valueLabelCommon!.component);
      });

    });

    it('append labelsContainer component to slider component if necessary', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true,
        valueLabels: true
      });

      expect(view.component.children).toContain(view.labelsContainer!.component);
    });

    it('add necessary class to view component if slider is vertical', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        vertical: true
      });

      expect(view.component.classList).toContain('range-slider_vertical');
    });

  });

  describe('setMinValue(min)', function() {   
    
    it('if view has minLabel, set up its value', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true
      });
      view.minLabel!.setValue = jest.fn();
      
      for(let i = -100; i <= 100; i++) {
        view.setMinValue(i);
        expect(view.minLabel!.setValue).toBeCalledWith(i);
      }
    });

  });
  
  describe('setMaxValue(max)', function() {
    
    it('if view has maxLabel, set up its value', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        minMaxLabels: true
      });
      view.maxLabel!.setValue = jest.fn(); 

      for (let i = -100; i <= 100; i++) {
        view.setMaxValue(i);      
        expect(view.maxLabel!.setValue).toBeCalledWith(i);
      }
    });

  });

  describe('setLeftValue(value, px)', function() {

    describe('do necessary actions with thumb', function() {

      describe('set up left thumb position', function() {

        it('change left indent if slider is horizontal', function() {
          let slider = document.createElement('div');
          let view = new View(slider);
          view.thumbLeft.setLeftIndentInPx = jest.fn();

          for(let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.thumbLeft.setLeftIndentInPx).toBeCalledWith(px);
          }
        });

        it('change top indent if slider is vertical', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            vertical: true
          });
          view.thumbLeft.setTopIndentInPx = jest.fn();
          let trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

          for(let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.thumbLeft.setTopIndentInPx).toBeCalledWith(trackHeight - px);
          }
        });

      });

      describe('make z-index of left thumb higher when it is at maximum', function() {

        it('if slider is horizontal', function() {
          let slider = document.createElement('div');
          let view = new View(slider);
          view.thumbLeft.getLeftIndent = jest.fn();
          view.track.getOffsetWidth = jest.fn();
          view.thumbLeft.setZIndex = jest.fn();
  
          for (let px = 50; px <= 100; px++) {
            (view.thumbLeft.getLeftIndent as jest.Mock).mockReturnValue(px);
            (view.track.getOffsetWidth as jest.Mock).mockReturnValue(px);
            view.setLeftValue(200, px);
  
            expect(view.thumbLeft.setZIndex).toBeCalledWith(100); 
          }       
        });

        it('if slider is vertical', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            vertical: true
          });
          view.thumbLeft.getTopIndent = jest.fn();
          (view.thumbLeft.getTopIndent as jest.Mock).mockReturnValue(0);
          view.thumbLeft.setZIndex = jest.fn();
  
          view.setLeftValue(200, 200);
          expect(view.thumbLeft.setZIndex).toBeCalledWith(100);      
        });

      });

    });

    describe('do necessary actions with range', function() {

      describe('if slider is horizontal', function() {

        it('set up range width if !view.isRange', function() {
          let slider = document.createElement('div');
          let view = new View(slider);
          view.range.setWidthInPx = jest.fn();

          for (let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.range.setWidthInPx).toBeCalledWith(px);
          }          
        });

        it('set up range left indent if view.isRange', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true
          });
          view.range.setLeftIndentInPx = jest.fn();

          for (let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.range.setLeftIndentInPx).toBeCalledWith(px);
          }          
        });

      });

      describe('if slider is vertical', function() {

        it('set up range height if !view.isRange', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            vertical: true
          });
          view.range.setHeightInPx = jest.fn();

          for (let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.range.setHeightInPx).toBeCalledWith(px);
          }          
        });

        it('set up range bottom indent if view.isRange', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            vertical: true,
            range: true
          });
          view.range.setBottomIndentInPx = jest.fn();

          for (let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.range.setBottomIndentInPx).toBeCalledWith(px);
          }          
        });

      });

    });

    describe('do necessary actions with labels if slider has labels', function() {

      describe('set up labels value', function() {

        it('set up left label value', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true
          });
          view.valueLabelLeft!.setValue = jest.fn();

          for (let value = -100; value <= 100; value++) {
            view.setLeftValue(value, 100);
            expect(view.valueLabelLeft!.setValue).toBeCalledWith(value);
          }
        });
        
        it('set up common label value is view.isRange', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            range: true
          });
          view.valueLabelCommon!.setValue = jest.fn();
          let rightValue = 200;
          view.valueLabelRight!.getValue = jest.fn();
          (view.valueLabelRight!.getValue as jest.Mock).mockReturnValue(rightValue);

          for (let value = -100; value <= 100; value++) {
            view.setLeftValue(value, 100);
            expect(view.valueLabelCommon!.setValue).toBeCalledWith(`${value} - ${rightValue}`);
          }
        });

      });

      describe('set up left value label position', function() {

        it('change left indent if slider is horizontal', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true
          });
          view.valueLabelLeft!.setLeftIndent = jest.fn();
  
          for (let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.valueLabelLeft!.setLeftIndent).toBeCalledWith(`${px}px`);
          }
        });

        it('change top indent if slider is vertical', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            vertical: true,
            valueLabels: true
          });
          view.valueLabelLeft!.setTopIndent = jest.fn();
          let trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);
  
          for (let px = 0; px <= 100; px++) {
            view.setLeftValue(50, px);
            expect(view.valueLabelLeft!.setTopIndent).toBeCalledWith(`${trackHeight - px}px`);
          }
        });

      });

      describe('check if 2 value labels close to each other if view.isRange', function() {

        it('call function to check every time when setLeftValue(value, px) is called', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.isTwoValueLabelsClose = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.isTwoValueLabelsClose).toBeCalled();
        });

        it('merge labels if 2 value labels is close to each other', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
          view.mergeLabels = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.mergeLabels).toBeCalled();
        });

        it('split labels if 2 value labels is not close to each other', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
          view.splitLabels = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.splitLabels).toBeCalled();
        });

        describe('all of above is also true for vertical slider', function() {

          it('call function to check every time when setLeftValue(value, px) is called', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true
            });
            view.isTwoValueLabelsClose = jest.fn();
            view.setLeftValue(100, 100);
  
            expect(view.isTwoValueLabelsClose).toBeCalled();
          });
  
          it('merge labels if 2 value labels is close to each other', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
            view.mergeLabels = jest.fn();
            view.setLeftValue(100, 100);
  
            expect(view.mergeLabels).toBeCalled();
          });
  
          it('split labels if 2 value labels is close to each other', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
            view.splitLabels = jest.fn();
            view.setLeftValue(100, 100);
  
            expect(view.splitLabels).toBeCalled();
          });

        });

      });

      describe('check if left value label close to min label if slider has min and max labels', function() {

        it('call function to check every time when setLeftValue(value, px) is called', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true
          });
          view.isLeftValueLabelCloseToMinLabel = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.isLeftValueLabelCloseToMinLabel).toBeCalled();
        });

        it('make min label transparent if left value label is close to it', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true
          });
          view.isLeftValueLabelCloseToMinLabel = jest.fn();
          (view.isLeftValueLabelCloseToMinLabel as jest.Mock).mockReturnValue(true);
          view.minLabel!.setOpacity = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.minLabel?.setOpacity).toBeCalledWith(0);
        });

        it('make min label not transparent if left value label is not close to it', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true
          });
          view.isLeftValueLabelCloseToMinLabel = jest.fn();
          (view.isLeftValueLabelCloseToMinLabel as jest.Mock).mockReturnValue(false);
          view.minLabel!.setOpacity = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.minLabel?.setOpacity).toBeCalledWith(1);
        });

      });
      
      describe('check if left value label close to max label if slider has min and max labels and !view.isRange', function() {

        it('call function to check every time when setLeftValue(value, px) is called', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true
          });
          view.isLeftValueLabelCloseToMaxLabel = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.isLeftValueLabelCloseToMaxLabel).toBeCalled();
        });

        it('make max label transparent if left value label is close to it', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true
          });
          view.isLeftValueLabelCloseToMaxLabel = jest.fn();
          (view.isLeftValueLabelCloseToMaxLabel as jest.Mock).mockReturnValue(true);
          view.maxLabel!.setOpacity = jest.fn();
          view.setLeftValue(100, 100);

          expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
        });

        it('make max label not transparent if left value label is not close to it', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            minMaxLabels: true
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

  describe('setRightValue(value, px)', function() {

    describe('do necessary actions with thumb', function() {

      describe('set up left thumb position', function() {

        it('change left indent if slider is horizontal', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true
          });
          view.thumbRight!.setLeftIndentInPx = jest.fn();

          for(let px = 0; px <= 100; px++) {
            view.setRightValue(50, px);
            expect(view.thumbRight!.setLeftIndentInPx).toBeCalledWith(px);
          }
        });

        it('change top indent if slider is vertical', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            vertical: true
          });
          view.thumbRight!.setTopIndentInPx = jest.fn();
          let trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

          for(let px = 0; px <= 100; px++) {
            view.setRightValue(50, px);
            expect(view.thumbRight!.setTopIndentInPx).toBeCalledWith(trackHeight - px);
          }
        });

      });

    });

    describe('do necessary actions with range', function() {

      it('set up range right indent if slider is horizontal', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true
        });
        view.range.setRightIndentInPx = jest.fn();
        let trackHeight = 500;
        view.track.getOffsetWidth = jest.fn();
        (view.track.getOffsetWidth as jest.Mock).mockReturnValue(trackHeight);

        for (let px = 0; px <= 100; px++) {
          view.setRightValue(50, px);
          expect(view.range.setRightIndentInPx).toBeCalledWith(trackHeight - px);
        }          
      });

      it('set up range top indent if slider is vertical', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          vertical: true,
          range: true
        });
        view.range.setTopIndentInPx = jest.fn();
        let trackHeight = 500;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

        for (let px = 0; px <= 100; px++) {
          view.setRightValue(50, px);
          expect(view.range.setTopIndentInPx).toBeCalledWith(trackHeight - px);
        }          
      });

    });

    describe('do necessary actions with labels if slider has labels', function() {

      describe('set up labels value', function() {

        it('set up right label value', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.valueLabelRight!.setValue = jest.fn();

          for (let value = -100; value <= 100; value++) {
            view.setRightValue(value, 100);
            expect(view.valueLabelRight!.setValue).toBeCalledWith(value);
          }
        });
        
        it('set up common label value', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            valueLabels: true,
            range: true
          });
          view.valueLabelCommon!.setValue = jest.fn();
          let leftValue = -200;
          view.valueLabelLeft!.getValue = jest.fn();
          (view.valueLabelLeft!.getValue as jest.Mock).mockReturnValue(leftValue);

          for (let value = -100; value <= 100; value++) {
            view.setRightValue(value, 100);
            expect(view.valueLabelCommon!.setValue).toBeCalledWith(`${leftValue} - ${value}`);
          }
        });

      });

      describe('set up right value label position', function() {

        it('change left indent if slider is horizontal', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.valueLabelRight!.setLeftIndent = jest.fn();
  
          for (let px = 0; px <= 100; px++) {
            view.setRightValue(50, px);
            expect(view.valueLabelRight!.setLeftIndent).toBeCalledWith(`${px}px`);
          }
        });

        it('change top indent if slider is vertical', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            vertical: true,
            valueLabels: true
          });
          view.valueLabelRight!.setTopIndent = jest.fn();
          let trackHeight = 500;
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);
  
          for (let px = 0; px <= 100; px++) {
            view.setRightValue(50, px);
            expect(view.valueLabelRight!.setTopIndent).toBeCalledWith(`${trackHeight - px}px`);
          }
        });

      });

      describe('check if 2 value labels close to each other', function() {

        it('call function to check every time when setRightValue(value, px) is called', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.isTwoValueLabelsClose = jest.fn();
          view.setRightValue(100, 100);

          expect(view.isTwoValueLabelsClose).toBeCalled();
        });

        it('merge labels if 2 value labels is close to each other', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
          view.mergeLabels = jest.fn();
          view.setRightValue(100, 100);

          expect(view.mergeLabels).toBeCalled();
        });

        it('split labels if 2 value labels is not close to each other', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true
          });
          view.isTwoValueLabelsClose = jest.fn();
          (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
          view.splitLabels = jest.fn();
          view.setRightValue(100, 100);

          expect(view.splitLabels).toBeCalled();
        });

        describe('all of above is also true for vertical slider', function() {

          it('call function to check every time when setRightValue(value, px) is called', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true
            });
            view.isTwoValueLabelsClose = jest.fn();
            view.setRightValue(100, 100);
  
            expect(view.isTwoValueLabelsClose).toBeCalled();
          });
  
          it('merge labels if 2 value labels is close to each other', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(true);
            view.mergeLabels = jest.fn();
            view.setRightValue(100, 100);
  
            expect(view.mergeLabels).toBeCalled();
          });
  
          it('split labels if 2 value labels is close to each other', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              range: true,
              valueLabels: true,
              vertical: true
            });
            view.isTwoValueLabelsClose = jest.fn();
            (view.isTwoValueLabelsClose as jest.Mock).mockReturnValue(false);
            view.splitLabels = jest.fn();
            view.setRightValue(100, 100);
  
            expect(view.splitLabels).toBeCalled();
          });

        });

      });

      describe('check if right value label close to max label if slider has min and max labels', function() {

        it('call function to check every time when setRightValue(value, px) is called', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true
          });
          view.isRightValueLabelCloseToMaxLabel = jest.fn();
          view.setRightValue(100, 100);

          expect(view.isRightValueLabelCloseToMaxLabel).toBeCalled();
        });

        it('make max label transparent if right value label is close to it', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true
          });
          view.isRightValueLabelCloseToMaxLabel = jest.fn();
          (view.isRightValueLabelCloseToMaxLabel as jest.Mock).mockReturnValue(true);
          view.maxLabel!.setOpacity = jest.fn();
          view.setRightValue(100, 100);

          expect(view.maxLabel?.setOpacity).toBeCalledWith(0);
        });

        it('make max label not transparent if right value label is not close to it', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            range: true,
            valueLabels: true,
            minMaxLabels: true
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
  
  describe('mergeLabels()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabels: true,
      range: true
    });

    view.valueLabelLeft!.setOpacity = jest.fn();
    view.valueLabelRight!.setOpacity = jest.fn();
    view.valueLabelCommon!.setOpacity = jest.fn();

    beforeEach(() => {
      view.mergeLabels();
    }); 

    it('make left value label transparent', function() {
      expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(0);
    }); 

    it('make right value label transparent', function() {
      expect(view.valueLabelRight!.setOpacity).toBeCalledWith(0);
    }); 

    it('make common value label opaque', function() {
      expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(1);
    });

  });

  describe('splitLabels()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabels: true,
      range: true
    });

    view.valueLabelLeft!.setOpacity = jest.fn();
    view.valueLabelRight!.setOpacity = jest.fn();
    view.valueLabelCommon!.setOpacity = jest.fn();

    beforeEach(() => {
      view.splitLabels();
    });    

    it('make common value label transparent', function() {
      expect(view.valueLabelCommon!.setOpacity).toBeCalledWith(0);
    });

    it('make left value label opaque', function() {
      expect(view.valueLabelLeft!.setOpacity).toBeCalledWith(1);
    });

    it('make right value label opaque', function() {
      expect(view.valueLabelRight!.setOpacity).toBeCalledWith(1);
    });

  });

  describe('isTwoValueLabelsClose()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        vertical: false,
        range: true
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.valueLabelRight!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });        
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52
        });

        expect(view.isTwoValueLabelsClose()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });        
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55
        });

        expect(view.isTwoValueLabelsClose()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        vertical: true,
        range: true
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.valueLabelRight!.component.getBoundingClientRect = jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52
        });        
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });

        expect(view.isTwoValueLabelsClose()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55
        });        
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });

        expect(view.isTwoValueLabelsClose()).toBe(false);
      });

    });

  });

  describe('isLeftValueLabelCloseToMinLabel()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: false
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.minLabel!.component.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: true
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.minLabel!.component.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });
        (view.minLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55
        });

        expect(view.isLeftValueLabelCloseToMinLabel()).toBe(false);
      });

    });

  });

  describe('isLeftValueLabelCloseToMaxLabel()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: false
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: true
      });
      view.valueLabelLeft!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelLeft!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });

        expect(view.isLeftValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

  });

  describe('isRightValueLabelCloseToMaxLabel()', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: false,
        range: true
      });
      view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 52
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          right: 50
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 55
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        vertical: true,
        range: true
      });
      view.valueLabelRight!.component.getBoundingClientRect = jest.fn();
      view.maxLabel!.component.getBoundingClientRect= jest.fn();

      it('return true if distance between 2 labels is < than 3 px', function() {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 52
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(true);
      });

      it('return false if distance between 2 labels is >= than 3 px', function() {
        (view.valueLabelRight!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 55
        });
        (view.maxLabel!.component.getBoundingClientRect as jest.Mock).mockReturnValue({
          bottom: 50
        });

        expect(view.isRightValueLabelCloseToMaxLabel()).toBe(false);
      });

    });

  });

  describe('handleLeftInput(clientX, clientY, shiftX, shiftY)', function() {

    describe('calc new left indent if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider);
      let presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleLeftInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200
      });
      view.track.getOffsetWidth = jest.fn();
      (view.track.getOffsetWidth as jest.Mock).mockReturnValue(500);

      it('if cursor is off left edge of track new left indent is 0', function() {
        view.handleLeftInput(100, 200);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(0);
      });

      it('if cursor is off right edge of track new left indent = track width', function() {
        view.handleLeftInput(800, 200);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(500);
      });

      it('if cursor is off right thumb position new left indent = right thumb indent', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          range: true
        });
        let presenter: any = {};
        view.registerWith(presenter);
        view.presenter!.handleLeftInput = jest.fn();

        view.track.getBoundingClientRect = jest.fn();
        (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
          left: 200
        });

        view.thumbRight!.getLeftIndent = jest.fn();
        (view.thumbRight!.getLeftIndent as jest.Mock).mockReturnValue(200);
        view.handleLeftInput(500, 200);

        expect(view.presenter!.handleLeftInput).toBeCalledWith(200);
      });

    });

    describe('calc new bottom indent if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        vertical: true
      });
      let presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleLeftInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200
      });
      let trackHeight = 500;
      view.track.getOffsetHeight = jest.fn();
      (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

      it('if cursor is off bottom edge of track new bottom indent is 0', function() {
        view.handleLeftInput(100, 800);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(0);
      });

      it('if cursor is off top edge of track new bottom indent = track height', function() {
        view.handleLeftInput(100, 100);
        expect(view.presenter!.handleLeftInput).toBeCalledWith(trackHeight);
      });

      it('if cursor is off right thumb position new bottom indent = right thumb indent', function() {
        let slider = document.createElement('div');
        let view = new View(slider, {
          vertical: true,
          range: true
        });
        let presenter: any = {};
        view.registerWith(presenter);
        view.presenter!.handleLeftInput = jest.fn();

        view.track.getBoundingClientRect = jest.fn();
        (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
          top: 200
        });

        let trackHeight = 500;
        view.track.getOffsetHeight = jest.fn();
        (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

        view.thumbRight!.getTopIndent = jest.fn();
        (view.thumbRight!.getTopIndent as jest.Mock).mockReturnValue(200);
        view.handleLeftInput(100, 300);

        expect(view.presenter!.handleLeftInput).toBeCalledWith(trackHeight - 200);
      });

    }); 

  });

  describe('handleRightInput(clientX, clientY, shiftX, shiftY)', function() {

    describe('calc new left indent if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true
      });
      let presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleRightInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 200
      });

      let trackWidth = 500;
      view.track.getOffsetWidth = jest.fn();
      (view.track.getOffsetWidth as jest.Mock).mockReturnValue(trackWidth);

      it('if cursor is off left thumb position new left indent = left thumb indent', function() {
        view.thumbLeft.getLeftIndent = jest.fn();
        (view.thumbLeft.getLeftIndent as jest.Mock).mockReturnValue(100);
        view.handleRightInput(250, 200);

        expect(view.presenter!.handleRightInput).toBeCalledWith(100);
      });

      it('if cursor is off right edge of track new left indent = track width', function() {
        view.handleRightInput(800, 200);
        expect(view.presenter!.handleRightInput).toBeCalledWith(trackWidth);
      });

    });

    describe('calc new bottom indent if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        vertical: true,
        range: true
      });
      let presenter: any = {};
      view.registerWith(presenter);
      view.presenter!.handleRightInput = jest.fn();

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 200
      });
      let trackHeight = 500;
      view.track.getOffsetHeight = jest.fn();
      (view.track.getOffsetHeight as jest.Mock).mockReturnValue(trackHeight);

      it('if cursor is off left thumb position new bottom indent = left thumb indent', function() {
        view.thumbLeft.getTopIndent = jest.fn();
        (view.thumbLeft.getTopIndent as jest.Mock).mockReturnValue(400);
        view.handleRightInput(100, 800);
        expect(view.presenter!.handleRightInput).toBeCalledWith(trackHeight - 400);
      });

      it('if cursor is off top edge of track new bottom indent = track height', function() {
        view.handleRightInput(100, 100);
        expect(view.presenter!.handleRightInput).toBeCalledWith(trackHeight);
      });

    }); 

  });

  describe('addScale(min, max, intervalsNumber)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      scale: true
    });
    view.addScale(0, 150, 4);

    it('set up scale property', function() {
      expect(view).toHaveProperty('scale');
    });   
    
    it('scale property is instance of Scale', function() {
      expect(view.scale).toBeInstanceOf(Scale);
    });

    it('append scale component to this view component', function() {
      expect(view.component.children).toContain(view.scale?.component);
    });

    describe('all of above is also true for vertical slider', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        scale: true,
        vertical: true
      });
      view.addScale(0, 150, 4);
  
      it('set up scale property', function() {
        expect(view).toHaveProperty('scale');
      });   
      
      it('scale property is instance of Scale', function() {
        expect(view.scale).toBeInstanceOf(Scale);
      });
  
      it('append scale component to this view component', function() {
        expect(view.component.children).toContain(view.scale?.component);
      });

    });

  });

  describe('handleScaleOrTrackClick(x, y)', function() {

    describe('if !slider.isRange', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        scale: true,
        valueLabels: true
      });
      let presenter = {};
      view.registerWith(presenter as Presenter);
      (view.presenter as Presenter).handleLeftInput = jest.fn();
      view.addSmoothTransition = jest.fn();
      view.removeSmoothTransition = jest.fn();
      view.handleScaleOrTrackClick(100, 100);

      it('call function to add smooth transition', function() {
        expect(view.addSmoothTransition).toBeCalledWith('left');
      });

      describe('call function to handle left input with proper argument', function() {

        it('if slider is horizontal', function() {
          expect((view.presenter as Presenter).handleLeftInput).toBeCalledWith(100);
        });

        it('if slider is vertical', function() {
          let slider = document.createElement('div');
          let view = new View(slider, {
            scale: true,
            valueLabels: true,
            vertical: true
          });
          let presenter = {};
          view.registerWith(presenter as Presenter);
          (view.presenter as Presenter).handleLeftInput = jest.fn();
          view.track.getOffsetHeight = jest.fn();
          (view.track.getOffsetHeight as jest.Mock).mockReturnValue(500);
          view.handleScaleOrTrackClick(100, 100);

          expect((view.presenter as Presenter).handleLeftInput).toBeCalledWith(500 - 100);
        });

      });

      it('call function to remove smooth transition', function() {
        jest.useFakeTimers();
        view.handleScaleOrTrackClick(100, 100);
        jest.runAllTimers();

        expect(view.removeSmoothTransition).toBeCalledWith('left');

        jest.useRealTimers();
      });

    });

    describe('if slider.isRange', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        scale: true,
        valueLabels: true,
        range: true
      });
      let presenter = {};
      view.registerWith(presenter as Presenter);
      (view.presenter as Presenter).handleLeftInput = jest.fn();
      (view.presenter as Presenter).handleRightInput = jest.fn();
      view.addSmoothTransition = jest.fn();
      view.removeSmoothTransition = jest.fn();
      view.whichThumbIsNearer = jest.fn();
      view.handleScaleOrTrackClick(100, 100);

      it('call function to check which thumb is nearer', function() {
        expect(view.whichThumbIsNearer).toBeCalledWith(100, 100);
      });

      describe('if left thumb is nearer', function() {

        (view.whichThumbIsNearer as jest.Mock).mockReturnValue('left');
        view.handleScaleOrTrackClick(100, 100);

        it('call function to add smooth transition with proper argument', function() {
          expect(view.addSmoothTransition).toBeCalledWith('left');
        });

        describe('call function to handle left input with proper argument', function() {

          it('if slider is horizontal', function() {
            expect((view.presenter as Presenter).handleLeftInput).toBeCalledWith(100);
          });

          it('if slider is vertical', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              scale: true,
              valueLabels: true,
              range: true,
              vertical: true
            });
            let presenter = {};
            view.registerWith(presenter as Presenter);
            (view.presenter as Presenter).handleLeftInput = jest.fn();
            view.whichThumbIsNearer = jest.fn();
            (view.whichThumbIsNearer as jest.Mock).mockReturnValue('left');
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(500);
            view.handleScaleOrTrackClick(100, 100);

            expect((view.presenter as Presenter).handleLeftInput).toBeCalledWith(400);
          });
          
        });

        it('call function to remove smooth transition', function() {
          jest.useFakeTimers();
          (view.whichThumbIsNearer as jest.Mock).mockReturnValue('left');
          view.handleScaleOrTrackClick(100, 100);
          jest.runAllTimers();
  
          expect(view.removeSmoothTransition).toBeCalledWith('left');
  
          jest.useRealTimers();
        });

      });

      describe('if right thumb is nearer', function() {

        view.whichThumbIsNearer = jest.fn();
        (view.whichThumbIsNearer as jest.Mock).mockReturnValue('right');
        view.handleScaleOrTrackClick(100, 100);

        it('call function to add smooth transition with proper argument', function() {
          expect(view.addSmoothTransition).toBeCalledWith('right');
        });

        describe('call function to handle right input with proper argument', function() {

          it('if slider is horizontal', function() {
            expect((view.presenter as Presenter).handleRightInput).toBeCalledWith(100);
          });

          it('if slider is vertical', function() {
            let slider = document.createElement('div');
            let view = new View(slider, {
              scale: true,
              valueLabels: true,
              range: true,
              vertical: true
            });
            let presenter = {};
            view.registerWith(presenter as Presenter);
            (view.presenter as Presenter).handleRightInput = jest.fn();
            view.whichThumbIsNearer = jest.fn();
            (view.whichThumbIsNearer as jest.Mock).mockReturnValue('right');
            view.track.getOffsetHeight = jest.fn();
            (view.track.getOffsetHeight as jest.Mock).mockReturnValue(500);
            view.handleScaleOrTrackClick(100, 100);

            expect((view.presenter as Presenter).handleRightInput).toBeCalledWith(400);
          });
          
        });

        it('call function to remove smooth transition', function() {
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

  describe('whichThumbIsNearer(x, y)', function() {

    describe('if slider is horizontal', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true
      });

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 0
      });

      view.thumbLeft.getBoundingClientRect = jest.fn();
      (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 10,
        width: 16
      });

      view.thumbRight!.getBoundingClientRect = jest.fn();
      (view.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
        left: 40, 
        width: 16
      });

      it('if distance from both thumbs is equal return "left"', function() {
        expect(view.whichThumbIsNearer(33, 0)).toBe('left'); 
      });

      it('if distance from left thumb is less return "left"', function() {
        expect(view.whichThumbIsNearer(30, 0)).toBe('left'); 
      });

      it('if distance from right thumb is less return "right"', function() {
        expect(view.whichThumbIsNearer(38, 0)).toBe('right'); 
      });

    });

    describe('if slider is vertical', function() {

      let slider = document.createElement('div');
      let view = new View(slider, {
        range: true,
        vertical: true
      });

      view.track.getBoundingClientRect = jest.fn();
      (view.track.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 0
      });

      view.thumbLeft.getBoundingClientRect = jest.fn();
      (view.thumbLeft.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 40,
        height: 16
      });

      view.thumbRight!.getBoundingClientRect = jest.fn();
      (view.thumbRight!.getBoundingClientRect as jest.Mock).mockReturnValue({
        top: 10,
        height: 16
      });

      it('if distance from both thumbs is equal return "left"', function() {
        expect(view.whichThumbIsNearer(0, 33)).toBe('left'); 
      });

      it('if distance from left thumb is less return "left"', function() {
        expect(view.whichThumbIsNearer(0, 38)).toBe('left'); 
      });

      it('if distance from right thumb is less return "right"', function() {
        expect(view.whichThumbIsNearer(0, 30)).toBe('right'); 
      });

    });

  });

  describe('addSmoothTransition(side)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true,
      valueLabels: true
    });

    it('add necessary classes to thumb, range and label if side = left', function() {
      view.addSmoothTransition('left');

      expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

    it('add necessary classes to thumb, range and label if side = right', function() {
      view.addSmoothTransition('right');

      expect(view.thumbRight!.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelRight!.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

    it('add necessary classes to thumb, range and label by default', function() {
      view.addSmoothTransition();

      expect(view.thumbLeft.component.classList).toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).toContain('range-slider__value-label_smooth-transition');
    });

  });

  describe('removeSmoothTransition(side)', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      range: true,
      valueLabels: true
    });

    it('remove necessary classes from thumb, range and label if side = left', function() {
      view.addSmoothTransition('left');
      view.removeSmoothTransition('left');

      expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

    it('remove necessary classes from thumb, range and label if side = right', function() {
      view.addSmoothTransition('right');
      view.removeSmoothTransition('right');

      expect(view.thumbRight!.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelRight!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

    it('remove necessary classes from thumb, range and label by default', function() {
      view.addSmoothTransition();
      view.removeSmoothTransition();

      expect(view.thumbLeft.component.classList).not.toContain('range-slider__thumb_smooth-transition');
      expect(view.range.component.classList).not.toContain('range-slider__range_smooth-transition');
      expect(view.valueLabelLeft!.component.classList).not.toContain('range-slider__value-label_smooth-transition');
    });

  });

  describe('fixLabelsContainerWidthForVertical()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      vertical: true,
      valueLabels: true,
      minMaxLabels: true
    });
    view.collectLabels = jest.fn();
    view.labelsContainer!.fixWidthForVertical = jest.fn();
    view.fixLabelsContainerWidthForVertical();

    it('collect labels and pass them to function for fixing container width', function() {
      expect(view.labelsContainer!.fixWidthForVertical).toBeCalledWith(view.collectLabels());
    });

  });

  describe('fixLabelsContainerHeightForHorizontal()', function() {

    let slider = document.createElement('div');
    let view = new View(slider, {
      valueLabels: true,
      minMaxLabels: true
    });
    view.collectLabels = jest.fn();
    view.labelsContainer!.fixHeightForHorizontal = jest.fn();
    view.fixLabelsContainerHeightForHorizontal();

    it('collect labels and pass them to function for fixing container height', function() {
      expect(view.labelsContainer!.fixHeightForHorizontal).toBeCalledWith(view.collectLabels());
    });

  });

  describe('collectLabels()', function() {

    it('return array of labels except common label', function() {
      let slider = document.createElement('div');
      let view = new View(slider, {
        valueLabels: true,
        minMaxLabels: true,
        range: true
      });
      let labels = view.collectLabels();

      expect(labels).toContain(view.minLabel);
      expect(labels).toContain(view.maxLabel);
      expect(labels).toContain(view.valueLabelLeft);
      expect(labels).toContain(view.valueLabelRight);
    });

  });

});
