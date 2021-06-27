import {Slider} from './subviews/slider/slider.js';
import {Track} from './subviews/track/track.js';
import {Range} from './subviews/range/range.js';
import {Input} from './subviews/input/input.js';
import {Thumb} from './subviews/thumb/thumb.js';
import {MinMaxLabel} from './subviews/minMaxLabel/minMaxLabel.js';
import {ValueLabel} from './subviews/valueLabel/valueLabel.js';
import {Scale} from './subviews/scale/scale.js';

export class View {
  constructor(component, options = {}) {
    this.presenter = null;
    
    this.component = component;
    
    this.inputLeft = new Input('left');
    this.inputLeft.registerWith(this);

    this.slider = new Slider();
    this.track = new Track();
    this.range = new Range();

    this.thumbLeft = new Thumb('left');
    
    this.slider.append(this.track.component, this.range.component, this.thumbLeft.component);
    this.component.append(this.slider.component, this.inputLeft.component);

    if (options.range) {
      this.inputRight = new Input('right');
      this.inputRight.registerWith(this);
      this.thumbRight = new Thumb('right');

      this.slider.append(this.thumbRight.component);
      this.component.append(this.inputRight.component);

      this.isRange = true;
    } else {
      this.isRange = false;
      this.range.setLeftIndent(0);
    }

    if (options.scale) {
      this.hasScale = true;
      this.scaleIntervals = options.scaleIntervals;

    } else {
      this.hasScale = false;
    }
    
    if (options.minMaxLabels) {
      this.minLabel = new MinMaxLabel('left');
      this.maxLabel = new MinMaxLabel('right');

      this.slider.append(this.minLabel.component, this.maxLabel.component);
    }
    
    if (options.valueLabel) {
      this.valueLabelLeft = new ValueLabel('left');
      
      this.slider.append(this.valueLabelLeft.component);

      if (options.range) {
        this.valueLabelRight = new ValueLabel('right');
        this.valueLabelCommon = new ValueLabel('common');

        this.slider.append(this.valueLabelRight.component, this.valueLabelCommon.component);

        // TODO: через раз срабатывает ошибочно
        setTimeout(() => {
          if ( this.isTwoValueLabelsClose() ) {
            this.mergeLabels();
          }
        });
      }
      
    }
    
    if (options.vertical) {
      this.component.classList.add('range-slider_vertical');
      this.vertical = true;
      
      if (options.minMaxLabels) {
        // TODO: Сделать так чтобы корректировка положения лейблов происходила после присвоения им значения, setTimeout непредсказуем
        setTimeout(() => {
          this.fixMinMaxLabelsPositionForVertical();
        });
        
      }  
      
      if (options.valueLabel) {
        // TODO: Сделать так чтобы корректировка положения лейблов происходила после присвоения им значения, setTimeout непредсказуем
        setTimeout(() => {
          this.fixValueLabelPositionForVertical();
        });
      }
    }
    
    if (options.minMaxLabels && options.valueLabel) {
      // TODO: Срабатывает через раз
      setTimeout(() => {
        if ( this.isLeftValueLabelCloseToMinLabel() ) {
          this.minLabel.setOpacity(0);
        }
      });

      if (options.range) {
        // TODO: Срабатывает через раз
        setTimeout(() => {
          if ( this.isRightValueLabelCloseToMaxLabel() ) {
            this.maxLabel.setOpacity(0);
          }
        });
      }
    }
  }
  
  registerWith(presenter){
    this.presenter = presenter;
  }
  
  setMinValue(min) {
    this.inputLeft.setMinValue(min);
    if (this.isRange) {
      this.inputRight.setMinValue(min);
    }    
    if (this.minLabel) {
      this.minLabel.setValue(min);
    }
  }
  
  setMaxValue(max) {
    this.inputLeft.setMaxValue(max);
    if (this.isRange) {
      this.inputRight.setMaxValue(max);
    }    
    if (this.maxLabel) {
      this.maxLabel.setValue(max);
    }
  }
  
  setStep(step) {
    this.inputLeft.setStep(step);
    if (this.isRange) {
      this.inputRight.setStep(step);
    }
  }
    
  setLeftValue(value) {
    this.inputLeft.setValue(value);
    
    this.setThumbLeftPosition(value);
    
    if (this.valueLabelLeft) {
      this.valueLabelLeft.setValue(value);
      this.valueLabelLeft.setLeftIndent( this.thumbLeft.getLeftIndent() );

      if(this.isRange) {
        this.valueLabelCommon.setValue( value + ' - ' + this.inputRight.getValue() );

        if ( this.isTwoValueLabelsClose() ) {
          this.mergeLabels();
        } else {
          this.splitLabels();
        }
  
        if ( this.inputLeft.getValue() == this.inputLeft.getMax() ) {
          this.inputLeft.setZIndex(100);
        } else {
          this.inputLeft.setZIndex(2);
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
          this.maxLabel.setOpacity(0);
        } else {
          this.maxLabel.setOpacity(1);
        }
      }
    }
    
    if (this.valueLabelLeft && this.vertical) {
      this.fixValueLabelPositionForVertical();
    }
  }
  
  setRightValue(value) {
    this.inputRight.setValue(value);
    
    this.setThumbRightPosition(value);
    
    if (this.valueLabelRight) {
      this.valueLabelRight.setValue(value);
      this.valueLabelCommon.setValue(this.inputLeft.getValue() + ' - ' + value);
      this.valueLabelRight.setRightIndent( this.thumbRight.getRightIndent() );
      
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
    
    if (this.valueLabelRight && this.vertical) {
      this.fixValueLabelPositionForVertical();
    }
  }
  
  setThumbLeftPosition(value) {
    let min = parseInt(this.inputLeft.getMin());
    let max = parseInt(this.inputLeft.getMax());

    let percent = ((value - min) / (max - min)) * 100;

    this.thumbLeft.setLeftIndent(percent);

    if (!this.isRange) {
      this.range.setRightIndent(100 - percent);
    }

    if (this.isRange) {
      this.range.setLeftIndent(percent);
    }
  }
  
  setThumbRightPosition(value) {
    let min = parseInt(this.inputRight.getMin());
    let max = parseInt(this.inputRight.getMax());

    let percent = 100 - ((value - min) / (max - min)) * 100;

    this.thumbRight.setRightIndent(percent);
    this.range.setRightIndent(percent);
  }
  
  mergeLabels() {
    this.valueLabelLeft.setOpacity(0);
    this.valueLabelRight.setOpacity(0);
    this.valueLabelCommon.setOpacity(1);
    
    let distanceBetweenTwoThumbsInPercents = 100 - parseInt(this.thumbRight.getRightIndent()) - parseInt(this.thumbLeft.getLeftIndent());
    this.valueLabelCommon.setLeftIndent( parseInt(this.valueLabelLeft.getLeftIndent()) + distanceBetweenTwoThumbsInPercents / 2 + '%' );
  }
  
  splitLabels() {
    this.valueLabelCommon.setOpacity(0);
    this.valueLabelLeft.setOpacity(1);
    this.valueLabelRight.setOpacity(1);
  }
  
  isTwoValueLabelsClose() {
    if (!this.vertical) {
      let leftLabelEdge = this.valueLabelLeft.getBoundingClientRect().right;
      let rightLabelEdge = this.valueLabelRight.getBoundingClientRect().left;

      return ( (rightLabelEdge - leftLabelEdge) < 3 ); 
    }
    
    // TODO: срабатывает через раз
    if (this.vertical) {
      let bottomLabelEdge = this.valueLabelLeft.getBoundingClientRect().top;
      let topLabelEdge = this.valueLabelRight.getBoundingClientRect().bottom;
      
      return ( (bottomLabelEdge - topLabelEdge) < 3 ); 
    }
  }
  
  fixMinMaxLabelsPositionForVertical() {
    this.minLabel.fixPositionForVertical();
    this.maxLabel.fixPositionForVertical();
  }
  
  fixValueLabelPositionForVertical() {
    this.valueLabelLeft.fixPositionForVertical();
    if (this.isRange) {
      this.valueLabelRight.fixPositionForVertical();
      this.valueLabelCommon.fixPositionForVertical();
    }    
  }
  
  isLeftValueLabelCloseToMinLabel() {
    let leftLabelEdge;
    let minLabelEdge;
    
    if (!this.vertical) {
      leftLabelEdge = this.valueLabelLeft.getBoundingClientRect().left;
      minLabelEdge = this.minLabel.getBoundingClientRect().right;

      return ( (leftLabelEdge - minLabelEdge) < 3 );
    }
    
    if (this.vertical) {
      leftLabelEdge = this.valueLabelLeft.getBoundingClientRect().bottom;
      minLabelEdge = this.minLabel.getBoundingClientRect().top;
      
      return ( (minLabelEdge - leftLabelEdge) < 3 );
    }    
  }

  isLeftValueLabelCloseToMaxLabel() {
    let leftLabelEdge;
    let maxLabelEdge;

    if (!this.vertical) {
      leftLabelEdge = this.valueLabelLeft.getBoundingClientRect().right;
      maxLabelEdge = this.maxLabel.getBoundingClientRect().left;

      return ( (maxLabelEdge - leftLabelEdge) < 3 );
    }

    if (this.vertical) {
      leftLabelEdge = this.valueLabelLeft.getBoundingClientRect().top;
      maxLabelEdge = this.maxLabel.getBoundingClientRect().bottom;
      
      return ( (leftLabelEdge - maxLabelEdge) < 3 );
    } 
  }
  
  isRightValueLabelCloseToMaxLabel() {
    let rightLabelEdge;
    let maxLabelEdge;
    
    if (!this.vertical) {
      rightLabelEdge = this.valueLabelRight.getBoundingClientRect().right;
      maxLabelEdge = this.maxLabel.getBoundingClientRect().left;

      return ( (maxLabelEdge - rightLabelEdge) < 3 );
    }
    
    if (this.vertical) {
      rightLabelEdge = this.valueLabelRight.getBoundingClientRect().top;
      maxLabelEdge = this.maxLabel.getBoundingClientRect().bottom;

      return ( (rightLabelEdge - maxLabelEdge) < 3 );
    }    
  }

  handleLeftInput(value) {
    this.presenter.handleLeftInput(value);
  }

  handleRightInput(value) {
    this.presenter.handleRightInput(value);
  }

  handleInputMouseover(type = 'left') {
    if (type == 'left') {
      this.thumbLeft.addHover();
    }
    if (type == 'right') {
      this.thumbRight.addHover();
    }
  }

  handleInputMouseout(type = 'left') {
    if (type == 'left') {
      this.thumbLeft.removeHover();
    }
    if (type == 'right') {
      this.thumbRight.removeHover();
    }
  }

  handleInputMousedown(type = 'left') {
    if (type == 'left') {
      this.thumbLeft.makeActive();
    }
    if (type == 'right') {
      this.thumbRight.makeActive();
    }
  } 

  handleInputMouseup(type = 'left') {
    if (type == 'left') {
      this.thumbLeft.makeInactive();
    }
    if (type == 'right') {
      this.thumbRight.makeInactive();
    }
  } 

  handleScaleClick(x, y) {
    let trackCoords = this.track.component.getBoundingClientRect();
    let value;

    if (!this.vertical) {
      let leftOffsetInPx = x - trackCoords.left;
      let leftOffsetInPercents = leftOffsetInPx * 100 / trackCoords.width;
      value = Math.round(leftOffsetInPercents * (this.inputLeft.getMax() - this.inputLeft.getMin()) / 100 + +this.inputLeft.getMin());
    }

    if (this.vertical) {
      let topOffsetInPx = y - trackCoords.top;
      let topOffsetInPercents = topOffsetInPx * 100 / trackCoords.height;
      let bottomOffsetInPercents = 100 - topOffsetInPercents;
      value = Math.round(bottomOffsetInPercents * (this.inputLeft.getMax() - this.inputLeft.getMin()) / 100 + +this.inputLeft.getMin());
    }    

    if ( this.whichThumbIsNearer(x, y) == 'left' ) {
      this.addSmoothTransition('left');
      this.presenter.handleLeftInput(value);
      setTimeout(() => {
        this.removeSmoothTransition('left');
      }, 1000);
    } else {
      this.addSmoothTransition('right');
      this.presenter.handleRightInput(value);
      setTimeout(() => {
        this.removeSmoothTransition('right');
      }, 1000);
    }
  }

  whichThumbIsNearer(x, y) {
    let leftThumbCoords = this.thumbLeft.component.getBoundingClientRect();
    let rightThumbCoords = this.thumbRight.component.getBoundingClientRect();

    let distanceFromLeftThumb;
    let distanceFromRightThumb;

    if (!this.vertical) {
      distanceFromLeftThumb = Math.abs(x - leftThumbCoords.right);
      distanceFromRightThumb = Math.abs(x - rightThumbCoords.left);
    }

    if (this.vertical) {
      distanceFromLeftThumb = Math.abs(y - leftThumbCoords.top);
      distanceFromRightThumb = Math.abs(y - rightThumbCoords.bottom);
      console.log('From left: ' + distanceFromLeftThumb);
      console.log('From right: ' + distanceFromRightThumb)
    }

    if (distanceFromLeftThumb <= distanceFromRightThumb) {
      return 'left';
    } else {
      return 'right';
    }
  }

  // whichThumbIsNearer(value) {
  //   let leftValue = this.inputLeft.getValue();
  //   let rightValue = this.inputRight.getValue();

  //   let distanceFromLeftValue = Math.abs(value - leftValue);
  //   let distanceFromRightValue = Math.abs(value - rightValue);

  //   if (distanceFromLeftValue <= distanceFromRightValue) {
  //     return 'left';
  //   } else {
  //     return 'right';
  //   }
  // }

  addSmoothTransition(side = 'left') {
    if (side == 'left') {
      this.thumbLeft.component.classList.add('range-slider__thumb_smooth-transition');
      this.range.component.classList.add('range-slider__range_smooth-transition');
      if (this.valueLabelLeft) {
        this.valueLabelLeft.component.classList.add('range-slider__value-label_smooth-transition');
      }
    }

    if (side == 'right') {
      this.thumbRight.component.classList.add('range-slider__thumb_smooth-transition');
      this.range.component.classList.add('range-slider__range_smooth-transition');
      if (this.valueLabelRight) {
        this.valueLabelRight.component.classList.add('range-slider__value-label_smooth-transition');
      }
    }
  }

  removeSmoothTransition(side = 'left') {
    if (side == 'left') {
      this.thumbLeft.component.classList.remove('range-slider__thumb_smooth-transition');
      this.range.component.classList.remove('range-slider__range_smooth-transition');
      if (this.valueLabelLeft) {
        this.valueLabelLeft.component.classList.remove('range-slider__value-label_smooth-transition');
      }
    }

    if (side == 'right') {
      this.thumbRight.component.classList.remove('range-slider__thumb_smooth-transition');
      this.range.component.classList.remove('range-slider__range_smooth-transition');
      if (this.valueLabelRight) {
        this.valueLabelRight.component.classList.remove('range-slider__value-label_smooth-transition');
      }
    }
  }

  addScale(min, max, intervalsNumber) {
    this.scale = new Scale(min, max, intervalsNumber);
    this.scale.registerWith(this);
    this.component.append(this.scale.component);

    if (this.vertical) {
      this.scale.fixPositionForVertical();
    }
  }
}



  

  

  

  

  

  