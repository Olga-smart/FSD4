import {Slider} from './subviews/slider/slider';
import {Track} from './subviews/track/track';
import {Range} from './subviews/range/range';
import {Thumb} from './subviews/thumb/thumb';
import {MinMaxLabel} from './subviews/minMaxLabel/minMaxLabel';
import {ValueLabel} from './subviews/valueLabel/valueLabel';
import {Scale} from './subviews/scale/scale';
import {LabelsContainer} from './subviews/labelsContainer/labelsContainer';
import {Presenter} from '../presenter/presenter';
import {Label} from './subviews/label/label';

type ViewOptions = {
  min?: number,
  max?: number,
  minMaxLabels?: boolean,
  valueLabel?: boolean,
  vertical?: boolean,
  range?: boolean,
  scale?: boolean,
  scaleIntervals?: number  
}

export class View {
  presenter: Presenter | null;
  component: Element;
  slider: Slider;
  track: Track;
  range: Range;
  thumbLeft: Thumb;
  thumbRight?: Thumb;
  isRange: boolean;
  hasScale: boolean;
  scaleIntervals?: number;
  minLabel?: MinMaxLabel;
  maxLabel?: MinMaxLabel;
  valueLabelLeft?: ValueLabel;
  valueLabelRight?: ValueLabel;
  valueLabelCommon?: ValueLabel;
  vertical?: boolean;
  scale?: Scale;
  labelsContainer?: LabelsContainer;

  constructor(component: Element, options: ViewOptions = {}) {
    this.presenter = null;
    
    this.component = component;

    this.slider = new Slider();
    this.track = new Track();
    this.track.registerWith(this);
    this.range = new Range();

    this.thumbLeft = new Thumb('left');
    this.thumbLeft.registerWith(this);
    
    this.track.append(this.range.component);
    this.slider.append(this.track.component, this.thumbLeft.component);
    this.component.append(this.slider.component);

    if (options.range) {
      this.thumbRight = new Thumb('right');
      this.thumbRight.registerWith(this);

      this.slider.append(this.thumbRight.component);

      this.isRange = true;
    } else {
      this.isRange = false;
      if (!options.vertical) {
        this.range.setLeftIndentInPx(0);
      }
      if (options.vertical) {
        this.range.setBottomIndentInPx(0);
      }
    }

    if (options.scale) {
      this.hasScale = true;
      this.scaleIntervals = options.scaleIntervals ?? 4;
    } else {
      this.hasScale = false;
    }

    if (options.minMaxLabels || options.valueLabel) {
      this.labelsContainer = new LabelsContainer();

      if (options.minMaxLabels) {
        this.minLabel = new MinMaxLabel('left');
        this.maxLabel = new MinMaxLabel('right');
        this.labelsContainer.append(this.minLabel.component, this.maxLabel.component);
      }

      if (options.valueLabel) {
        this.valueLabelLeft = new ValueLabel('left');
        this.labelsContainer.append(this.valueLabelLeft.component);

        if (options.range) {
          this.valueLabelRight = new ValueLabel('right');
          this.valueLabelCommon = new ValueLabel('common');
          this.labelsContainer.append(this.valueLabelRight.component, this.valueLabelCommon.component);
        }

      }

      this.slider.before(this.labelsContainer.component);
    }
    
    if (options.vertical) {
      this.component.classList.add('range-slider_vertical');
      this.vertical = true;
    }
  }
  
  registerWith(presenter: Presenter) {
    this.presenter = presenter;
  }
  
  setMinValue(min: number): void {   
    if (this.minLabel) {
      this.minLabel.setValue(min);
    }
  }
  
  setMaxValue(max: number): void {   
    if (this.maxLabel) {
      this.maxLabel.setValue(max);
    }
  }
    
  setLeftValue(value: number, px: number): void {
    if (!this.vertical) {
      this.thumbLeft.setLeftIndentInPx(px);

      if (!this.isRange) {
        this.range.setWidthInPx(px);
      }

      if (this.isRange) {
        this.range.setLeftIndentInPx(px);
      } 

      if (this.valueLabelLeft) {
        this.valueLabelLeft.setLeftIndent( this.thumbLeft.getLeftIndent() );
      }

      if ( parseInt(this.thumbLeft.getLeftIndent()) == this.track.getOffsetWidth() ) {
        this.thumbLeft.setZIndex(100);
      } else {
        this.thumbLeft.setZIndex(3);
      }
    }

    if (this.vertical) {
      let pxFromTop = this.track.getOffsetHeight() - px;
      this.thumbLeft.setTopIndentInPx(pxFromTop);

      if (!this.isRange) {
        this.range.setHeightInPx(px);
      }

      if (this.isRange) {
        this.range.setBottomIndentInPx(px);
      }

      if (this.valueLabelLeft) {
        this.valueLabelLeft.setTopIndent( this.thumbLeft.getTopIndent() );
      }

      if ( parseInt(this.thumbLeft.getTopIndent()) == 0 ) {
        this.thumbLeft.setZIndex(100);
      } else {
        this.thumbLeft.setZIndex(3);
      }
    }
    
    if (this.valueLabelLeft) {
      this.valueLabelLeft.setValue(value);
      
      if(this.isRange) {
        this.valueLabelCommon?.setValue( value + ' - ' + this.valueLabelRight!.getValue() );

        if ( this.isTwoValueLabelsClose() ) {
          this.mergeLabels();
        } else {
          this.splitLabels();
        }        
      }
    }

    if (this.valueLabelLeft && this.minLabel) {
      if ( this.isLeftValueLabelCloseToMinLabel() ) {
        this.minLabel.setOpacity(0);
      } else {
        this.minLabel.setOpacity(1);
      }

      if(!this.isRange) {
        if ( this.isLeftValueLabelCloseToMaxLabel() ) {
          this.maxLabel?.setOpacity(0);
        } else {
          this.maxLabel?.setOpacity(1);
        }
      }
    }    
  }
  
  setRightValue(value: number, px: number): void {
    if (!this.vertical) {
      this.thumbRight!.setLeftIndentInPx(px);
      this.range.setRightIndentInPx(this.track.getOffsetWidth() - px);

      if (this.valueLabelRight) {
        this.valueLabelRight.setLeftIndent( this.thumbRight!.getLeftIndent() );
      }
    }
    
    if (this.vertical) {
      let pxFromTop = this.track.getOffsetHeight() - px;
      this.thumbRight!.setTopIndentInPx(pxFromTop);
      this.range.setTopIndentInPx(pxFromTop);

      if (this.valueLabelRight) {
        this.valueLabelRight.setTopIndent( this.thumbRight!.getTopIndent() );
      }
    }
    
    if (this.valueLabelRight) {
      this.valueLabelRight.setValue(value);
      this.valueLabelCommon!.setValue(this.valueLabelLeft!.getValue() + ' - ' + value);
      
      if ( this.isTwoValueLabelsClose() ) {
        this.mergeLabels();
      } else {
        this.splitLabels();
      }
    } 

    if (this.valueLabelRight && this.maxLabel) {
      if ( this.isRightValueLabelCloseToMaxLabel() ) {
        this.maxLabel.setOpacity(0);
      } else {
        this.maxLabel.setOpacity(1);
      }
    }
  }
  
  mergeLabels(): void {
    this.valueLabelLeft?.setOpacity(0);
    this.valueLabelRight?.setOpacity(0);
    this.valueLabelCommon?.setOpacity(1);

    if (!this.vertical) {
      let distanceBetweenThumbsInPx = parseInt(this.thumbRight!.getLeftIndent()) - parseInt(this.thumbLeft.getLeftIndent());
      this.valueLabelCommon?.setLeftIndent( parseInt(this.valueLabelLeft!.getLeftIndent()) + distanceBetweenThumbsInPx / 2 + 'px' );
    }

    if (this.vertical) {
      let distanceBetweenThumbsInPx = parseInt(this.thumbRight!.getTopIndent()) - parseInt(this.thumbLeft.getTopIndent());
      this.valueLabelCommon?.setTopIndent( parseInt(this.valueLabelRight!.getTopIndent()) - distanceBetweenThumbsInPx / 2 + 'px' );
    }    
  }
  
  splitLabels(): void {
    this.valueLabelCommon?.setOpacity(0);
    this.valueLabelLeft?.setOpacity(1);
    this.valueLabelRight?.setOpacity(1);
  }
  
  isTwoValueLabelsClose(): boolean | undefined {
    if (!this.vertical) {
      let leftLabelEdge = this.valueLabelLeft!.getBoundingClientRect().right;
      let rightLabelEdge = this.valueLabelRight!.getBoundingClientRect().left;

      return ( (rightLabelEdge - leftLabelEdge) < 3 ); 
    }
    
    if (this.vertical) {
      let bottomLabelEdge = this.valueLabelLeft!.getBoundingClientRect().top;
      let topLabelEdge = this.valueLabelRight!.getBoundingClientRect().bottom;
      
      return ( (bottomLabelEdge - topLabelEdge) < 3 ); 
    }
  }
  
  isLeftValueLabelCloseToMinLabel(): boolean | undefined {
    let leftLabelEdge;
    let minLabelEdge;
    
    if (!this.vertical) {
      leftLabelEdge = this.valueLabelLeft!.getBoundingClientRect().left;
      minLabelEdge = this.minLabel!.getBoundingClientRect().right;

      return ( (leftLabelEdge - minLabelEdge) < 3 );
    }
    
    if (this.vertical) {
      leftLabelEdge = this.valueLabelLeft!.getBoundingClientRect().bottom;
      minLabelEdge = this.minLabel!.getBoundingClientRect().top;
      
      return ( (minLabelEdge - leftLabelEdge) < 3 );
    }    
  }

  isLeftValueLabelCloseToMaxLabel(): boolean | undefined {
    let leftLabelEdge;
    let maxLabelEdge;

    if (!this.vertical) {
      leftLabelEdge = this.valueLabelLeft!.getBoundingClientRect().right;
      maxLabelEdge = this.maxLabel!.getBoundingClientRect().left;

      return ( (maxLabelEdge - leftLabelEdge) < 3 );
    }

    if (this.vertical) {
      leftLabelEdge = this.valueLabelLeft!.getBoundingClientRect().top;
      maxLabelEdge = this.maxLabel!.getBoundingClientRect().bottom;
      
      return ( (leftLabelEdge - maxLabelEdge) < 3 );
    } 
  }
  
  isRightValueLabelCloseToMaxLabel(): boolean | undefined {
    let rightLabelEdge;
    let maxLabelEdge;
    
    if (!this.vertical) {
      rightLabelEdge = this.valueLabelRight!.getBoundingClientRect().right;
      maxLabelEdge = this.maxLabel!.getBoundingClientRect().left;

      return ( (maxLabelEdge - rightLabelEdge) < 3 );
    }
    
    if (this.vertical) {
      rightLabelEdge = this.valueLabelRight!.getBoundingClientRect().top;
      maxLabelEdge = this.maxLabel!.getBoundingClientRect().bottom;

      return ( (rightLabelEdge - maxLabelEdge) < 3 );
    }    
  }

  handleLeftInput(clientX: number, clientY: number, shiftX: number = 0, shiftY: number = 0): void {
    if (!this.vertical) {
      let newLeft = clientX - shiftX - this.track.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }
  
      if (!this.isRange) {
        if (newLeft > this.track.getOffsetWidth()) {
          newLeft = this.track.getOffsetWidth();
        }
      }
  
      if (this.isRange) {
        let rightThumbPosition = parseInt(this.thumbRight!.component.style.left);
        if (newLeft > rightThumbPosition) {
          newLeft = rightThumbPosition;
        }
      }
      
      this.presenter?.handleLeftInput(newLeft);
    }

    if (this.vertical) {
      let newTop = clientY - shiftY - this.track.getBoundingClientRect().top;

      if (newTop > this.track.getOffsetHeight()) {
        newTop = this.track.getOffsetHeight();
      }
  
      if (!this.isRange) {
        if (newTop < 0) {
          newTop = 0;
        }
      }
  
      if (this.isRange) {
        let rightThumbPosition = parseInt(this.thumbRight!.component.style.top);
        if (newTop < rightThumbPosition) {
          newTop = rightThumbPosition;
        }
      }

      let newBottom = this.track.getOffsetHeight() - newTop;
      
      this.presenter?.handleLeftInput(newBottom);
    }
  }

  handleRightInput(clientX: number, clientY: number, shiftX: number = 0, shiftY: number = 0): void {
    if (!this.vertical) {
      let newLeft = clientX - shiftX - this.track.getBoundingClientRect().left;

      let leftThumbPosition = parseInt(this.thumbLeft.component.style.left);
  
      if (newLeft < leftThumbPosition) {
        newLeft = leftThumbPosition;
      }
  
      if (newLeft > this.track.getOffsetWidth()) {
        newLeft = this.track.getOffsetWidth();
      }
  
      this.presenter?.handleRightInput(newLeft);
    }

    if (this.vertical) {
      let newTop = clientY - shiftY - this.track.getBoundingClientRect().top;

      let leftThumbPosition = parseInt(this.thumbLeft.component.style.top);

      if (newTop < 0) {
        newTop = 0;
      }

      if (newTop > leftThumbPosition) {
        newTop = leftThumbPosition;
      }

      let newBottom = this.track.getOffsetHeight() - newTop;

      this.presenter?.handleRightInput(newBottom);
    }    
  }

  addScale(min: number, max: number, intervalsNumber: number): void {
    this.scale = new Scale(min, max, intervalsNumber);
    this.scale.registerWith(this);
    this.component.append(this.scale.component);

    if (!this.vertical) {
      this.scale.fitHeightForHorizontal();
    } 

    if (this.vertical) {
      this.scale.fitWidthForVertical();
    }    
  }

  handleScaleOrTrackClick(x: number, y: number): void {
    if (!this.isRange) {
      this.addSmoothTransition('left');

      if (!this.vertical) {
        this.presenter?.handleLeftInput(x);
      } else {
        this.presenter?.handleLeftInput(this.track.getOffsetHeight() - y);
      }
      
      setTimeout(() => {
        this.removeSmoothTransition('left');
      }, 1000);
    }

    if (this.isRange) {
      if ( this.whichThumbIsNearer(x, y) == 'left' ) {
        this.addSmoothTransition('left');
        
        if (!this.vertical) {
          this.presenter?.handleLeftInput(x);
        } else {
          this.presenter?.handleLeftInput(this.track.getOffsetHeight() - y);
        }

        setTimeout(() => {
          this.removeSmoothTransition('left');
        }, 1000);
      } else {
        this.addSmoothTransition('right');

        if (!this.vertical) {
          this.presenter?.handleRightInput(x);
        } else {
          this.presenter?.handleRightInput(this.track.getOffsetHeight() - y);
        }

        setTimeout(() => {
          this.removeSmoothTransition('right');
        }, 1000);
      }
    }
  }

  whichThumbIsNearer(x: number, y: number): 'left' | 'right' {
    let leftThumbCoords = this.thumbLeft.getBoundingClientRect();
    let rightThumbCoords = this.thumbRight!.getBoundingClientRect();
    let trackCoords = this.track.getBoundingClientRect();

    let distanceFromLeftThumbCenter: number = 0;
    let distanceFromRightThumbCenter: number = 0;

    if (!this.vertical) {
      let leftThumbCenter = leftThumbCoords.left + leftThumbCoords.width/2 - trackCoords.left;
      let rightThumbCenter = rightThumbCoords.left + rightThumbCoords.width/2 - trackCoords.left;

      distanceFromLeftThumbCenter = Math.abs(x - leftThumbCenter);
      distanceFromRightThumbCenter = Math.abs(x - rightThumbCenter);
    }

    if (this.vertical) {
      let leftThumbCenter = leftThumbCoords.top + leftThumbCoords.height/2 - trackCoords.top;
      let rightThumbCenter = rightThumbCoords.top + rightThumbCoords.height/2 - trackCoords.top;

      distanceFromLeftThumbCenter = Math.abs(y - leftThumbCenter);
      distanceFromRightThumbCenter = Math.abs(y - rightThumbCenter);
    }

    if (distanceFromLeftThumbCenter <= distanceFromRightThumbCenter) {
      return 'left';
    } else {
      return 'right';
    }
  }

  addSmoothTransition(side: 'left' | 'right' = 'left'): void {
    if (side == 'left') {
      this.thumbLeft.component.classList.add('range-slider__thumb_smooth-transition');
      this.range.component.classList.add('range-slider__range_smooth-transition');
      if (this.valueLabelLeft) {
        this.valueLabelLeft.component.classList.add('range-slider__value-label_smooth-transition');
      }
    }

    if (side == 'right') {
      this.thumbRight!.component.classList.add('range-slider__thumb_smooth-transition');
      this.range.component.classList.add('range-slider__range_smooth-transition');
      if (this.valueLabelRight) {
        this.valueLabelRight.component.classList.add('range-slider__value-label_smooth-transition');
      }
    }
  }

  removeSmoothTransition(side: 'left' | 'right' = 'left'): void {
    if (side == 'left') {
      this.thumbLeft.component.classList.remove('range-slider__thumb_smooth-transition');
      this.range.component.classList.remove('range-slider__range_smooth-transition');
      if (this.valueLabelLeft) {
        this.valueLabelLeft.component.classList.remove('range-slider__value-label_smooth-transition');
      }
    }

    if (side == 'right') {
      this.thumbRight!.component.classList.remove('range-slider__thumb_smooth-transition');
      this.range.component.classList.remove('range-slider__range_smooth-transition');
      if (this.valueLabelRight) {
        this.valueLabelRight.component.classList.remove('range-slider__value-label_smooth-transition');
      }
    }
  }

  fixLabelsContainerWidthForVertical(): void {
    let labels: Label[] = this.collectLabels();
    this.labelsContainer?.fixWidthForVertical(labels);    
  }

  fixLabelsContainerHeightForHorizontal(): void {
    let labels: Label[] = this.collectLabels();
    this.labelsContainer?.fixHeightForHorizontal(labels);
  }

  collectLabels(): Label[] {
    let labels: Label[] = [];

    if (this.minLabel && this.maxLabel) {
      labels.push(this.minLabel);
      labels.push(this.maxLabel);
    }

    if (this.valueLabelLeft) {
      labels.push(this.valueLabelLeft);
    }

    if (this.valueLabelRight) {
      labels.push(this.valueLabelRight);
    }

    return labels;
  }

}



  

  

  

  

  

  