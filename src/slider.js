export class Model {
  constructor(options = {}) {
    this.min = options.min || 0;
    this.max = options.max || 150;
    this.leftValue = options.leftValue || 25;
    this.rightValue = options.rightValue || 75;
    this.step = options.step || 1;  
  }
  
  setLeftValue(value) {
    if (value < this.min) {
      this.leftValue = this.min;
    } else {
      this.leftValue = Math.min(value, this.rightValue);
    }
  }
  
  setRightValue(value) {
    if (value > this.max) {
      this.rightValue = this.max;
    } else {
      this.rightValue = Math.max(value, this.leftValue);
    }    
  }
}

export class View {
  constructor(component, options = {}) {
    this.presenter = null;
    
    this.component = component;
    
    this.inputLeft = this.createElement('input', 'range-slider__input range-slider__input_left js-range-slider__input_left');
    this.inputLeft.type = 'range';

    this.inputRight = this.createElement('input', 'range-slider__input range-slider__input_right js-range-slider__input_right');
    this.inputRight.type = 'range';
    
    this.slider = this.createElement('div', 'range-slider__slider');
    this.track = this.createElement('div', 'range-slider__track');
    this.range = this.createElement('div', 'range-slider__range js-range-slider__range');
    this.thumbLeft = this.createElement('div', 'range-slider__thumb range-slider__thumb_left js-range-slider__thumb_left');
    this.thumbRight = this.createElement('div', 'range-slider__thumb range-slider__thumb_right js-range-slider__thumb_right');
    
    this.slider.append(this.track, this.range, this.thumbLeft, this.thumbRight);
    this.component.append(this.inputLeft, this.inputRight, this.slider);
    
    if (options.minMaxLabels) {
      this.minLabel = this.createElement('div', 'range-slider__min-max-label range-slider__min-max-label_left js-range-slider__min-max-label_left');
      this.maxLabel = this.createElement('div', 'range-slider__min-max-label range-slider__min-max-label_right js-range-slider__min-max-label_right');
      
      this.component.append(this.minLabel, this.maxLabel);
    }
    
    if (options.valueLabel) {
      this.valueLabelLeft = this.createElement('div', 'range-slider__value-label range-slider__value-label_left js-range-slider__value-label_left');
      this.valueLabelRight = this.createElement('div', 'range-slider__value-label range-slider__value-label_right js-range-slider__value-label_right');
      this.valueLabelCommon = this.createElement('div', 'range-slider__value-label range-slider__value-label_common js-range-slider__value-label_common');
      
      this.component.append(this.valueLabelLeft, this.valueLabelRight, this.valueLabelCommon);
      
      setTimeout(() => {
        if ( this.isTwoValueLabelsClose() ) {
          this.mergeLabels();
        }
      });
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
          this.minLabel.style.opacity = 0;
        }
        if ( this.isRightValueLabelCloseToMaxLabel() ) {
          this.maxLabel.style.opacity = 0;
        }
      });
    }
    
    this.attachEventHandlers();
  }
  
  registerWith(presenter){
    this.presenter = presenter;
  }
  
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.className = className; 
    }

    return element;
  }
  
  setMinValue(min) {
    this.inputLeft.setAttribute('min', min);
    this.inputRight.setAttribute('min', min);
    if (this.minLabel) {
      this.minLabel.textContent = min;
    }
  }
  
  setMaxValue(max) {
    this.inputLeft.setAttribute('max', max);
    this.inputRight.setAttribute('max', max);
    if (this.maxLabel) {
      this.maxLabel.textContent = max;
    }
  }
  
  setStep(step) {
    this.inputLeft.setAttribute('step', step);
    this.inputRight.setAttribute('step', step);
  }
    
  setLeftValue(value) {
    this.inputLeft.setAttribute('value', value);
    
    this.setThumbLeftPosition(value);
    
    if (this.valueLabelLeft) {
      this.valueLabelLeft.textContent = value;
      this.valueLabelCommon.textContent = value + ' - ' + this.inputRight.value;
      this.setValueLabelLeftPosition();
      
      if ( this.isTwoValueLabelsClose() ) {
        this.mergeLabels();
      } else {
        this.splitLabels();
      }
      
      if (this.valueLabelLeft && this.minLabel) {
        if ( this.isLeftValueLabelCloseToMinLabel() ) {
          this.minLabel.style.opacity = 0;
        } else {
          this.minLabel.style.opacity = 1;
        }
      }
      
      if (this.valueLabelLeft && this.vertical) {
        this.fixValueLabelPositionForVertical();
      }
    }
  }
  
  setRightValue(value) {
    this.inputRight.setAttribute('value', value);
    
    this.setThumbRightPosition(value);
    
    if (this.valueLabelRight) {
      this.valueLabelRight.textContent = value;
      this.valueLabelCommon.textContent = this.inputLeft.value + ' - ' + value;
      this.setValueLabelRightPosition();
      
      if ( this.isTwoValueLabelsClose() ) {
        this.mergeLabels();
      } else {
        this.splitLabels();
      }
      
      if ( this.inputLeft.value == this.inputLeft.max ) {
        this.inputLeft.style.zIndex = 100;
      } else {
        this.inputLeft.style.zIndex = 2;
      }
      
      if (this.valueLabelRight && this.maxLabel) {
        if ( this.isRightValueLabelCloseToMaxLabel() ) {
          this.maxLabel.style.opacity = 0;
        } else {
          this.maxLabel.style.opacity = 1;
        }
      }
      
      if (this.valueLabelRight && this.vertical) {
        this.fixValueLabelPositionForVertical();
      }
    } 
  }
  
  setThumbLeftPosition(value) {
    let min = parseInt(this.inputLeft.min);
    let max = parseInt(this.inputLeft.max);

    let percent = ((value - min) / (max - min)) * 100;

    this.thumbLeft.style.left = percent + '%';
    this.range.style.left = percent + '%';
  }
  
  setThumbRightPosition(value) {
    let min = parseInt(this.inputRight.min);
    let max = parseInt(this.inputRight.max);

    let percent = ((value - min) / (max - min)) * 100;

    this.thumbRight.style.right = (100 - percent) + '%';
    this.range.style.right = (100 - percent) + '%';
  }
  
  setValueLabelLeftPosition() {
    this.valueLabelLeft.style.left = this.thumbLeft.style.left;
  }
  
  setValueLabelRightPosition() {
    this.valueLabelRight.style.right = this.thumbRight.style.right;
  }
  
  mergeLabels() {
    this.valueLabelLeft.style.opacity = 0;
    this.valueLabelRight.style.opacity = 0;
    this.valueLabelCommon.style.opacity = 1;
    
    let distanceBetweenTwoThumbs = this.thumbRight.getBoundingClientRect().left - this.thumbLeft.getBoundingClientRect().right;
    
    let distanceBetweenTwoThumbsInPercents = 100 - parseInt(this.thumbRight.style.right) - parseInt(this.thumbLeft.style.left);
    this.valueLabelCommon.style.left = parseInt(this.valueLabelLeft.style.left) + distanceBetweenTwoThumbsInPercents / 2 + '%';
  }
  
  splitLabels() {
    this.valueLabelCommon.style.opacity = 0;
    this.valueLabelLeft.style.opacity = 1;
    this.valueLabelRight.style.opacity = 1;
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
    this.maxLabel.style.transform = `rotate(90deg) translateX(${this.maxLabel.offsetHeight}px)`;
    
    this.minLabel.style.transform = `rotate(90deg) translateX(-${this.minLabel.offsetWidth}px)`;
  }
  
  fixValueLabelPositionForVertical() {
    this.valueLabelLeft.style.transform = `rotate(90deg) translateX(${this.valueLabelLeft.offsetHeight}px) translateY(${this.valueLabelLeft.offsetWidth}px) translateY(-50%)`;
    
    this.valueLabelRight.style.transform = `rotate(90deg) translateX(${this.valueLabelRight.offsetHeight}px) translateY(-50%)`;
    
    this.valueLabelCommon.style.transform = `rotate(90deg) translateX(${this.valueLabelCommon.offsetHeight}px) translateY(${this.valueLabelCommon.offsetWidth}px) translateY(-50%)`;    
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
  
  attachEventHandlers() {
    this.inputLeft.addEventListener('input', () => {
      let value = this.inputLeft.value;
      this.presenter.handleLeftInput(value);
    });
    
    this.inputRight.addEventListener('input', () => {
      let value = this.inputRight.value;
      this.presenter.handleRightInput(value);
    });
    
    this.inputLeft.addEventListener('mouseover', () => {
      this.thumbLeft.classList.add('range-slider__thumb_hover');
    });
    this.inputLeft.addEventListener('mouseout', () => {
      this.thumbLeft.classList.remove('range-slider__thumb_hover');
    });

    this.inputLeft.addEventListener('mousedown', () => {
      this.thumbLeft.classList.add('range-slider__thumb_active');
    });
    this.inputLeft.addEventListener('mouseup', () => {
      this.thumbLeft.classList.remove('range-slider__thumb_active');
    });

    this.inputRight.addEventListener('mouseover', () => {
      this.thumbRight.classList.add('range-slider__thumb_hover');
    });
    this.inputRight.addEventListener('mouseout', () => {
      this.thumbRight.classList.remove('range-slider__thumb_hover');
    });

    this.inputRight.addEventListener('mousedown', () => {
      this.thumbRight.classList.add('range-slider__thumb_active');
    });
    this.inputRight.addEventListener('mouseup', () => {
      this.thumbRight.classList.remove('range-slider__thumb_active');
    });
  }
}

export class Presenter {
  constructor(model, view) {  
    this.model = model;
    this.view = view;
    
    view.setMinValue(model.min);
    view.setMaxValue(model.max);
    view.setLeftValue(model.leftValue);
    view.setRightValue(model.rightValue);
    view.setStep(model.step);
  }
  
  handleLeftInput(value) {
    this.model.setLeftValue(value);
    this.view.setLeftValue(this.model.leftValue);
  }
  
  handleRightInput(value) {
    this.model.setRightValue(value);
    this.view.setRightValue(this.model.rightValue);
  }
  
}