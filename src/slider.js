const getTemplate = (options) => {
  let result = `
    <input 
      class="range-slider__input range-slider__input_left js-range-slider__input_left"
      type="range" 
      min="${options.min || 0}" 
      max="${options.max || 100}" 
      value="${options.leftValue || 25}" 
      step="${options.step || 1}"
    >

    <input 
      class="range-slider__input range-slider__input_right js-range-slider__input_right"
      type="range" 
      min="${options.min || 0}" 
      max="${options.max || 100}" 
      value="${options.rightValue || 75}" 
      step="${options.step || 1}"
    >
    <div class="range-slider__slider">
      <div class="range-slider__track"></div>
      <div class="range-slider__range js-range-slider__range"></div>
      <div class="range-slider__thumb range-slider__thumb_left js-range-slider__thumb_left"></div><div class="range-slider__thumb range-slider__thumb_right js-range-slider__thumb_right"></div>
    </div>
  `
  if (options.minMaxLabels) {
    result += `
      <div class="range-slider__min-max-label range-slider__min-max-label_left js-range-slider__min-max-label_left">
        ${options.min || 0}
      </div>
      <div class="range-slider__min-max-label range-slider__min-max-label_right js-range-slider__min-max-label_right">
        ${options.max || 100}
      </div>
    ` 
  }
  
  if (options.valueLabel) {
    result += `
      <div class="range-slider__value-label range-slider__value-label_left js-range-slider__value-label js-range-slider__value-label_left"></div>

      <div class="range-slider__value-label range-slider__value-label_right js-range-slider__value-label js-range-slider__value-label_right"></div>
      
      <div class="range-slider__value-label range-slider__value-label_common js-range-slider__value-label_common"></div>
    `
  }
  
  return result;
}

export class Slider {
  
  constructor(component, options = {}) {
    this.component = component;
    this.options = options;
    this._render(options);
    
    this._inputLeft = component.querySelector('.js-range-slider__input_left');
    this._inputRight = component.querySelector('.js-range-slider__input_right');

    this._thumbLeft = component.querySelector('.js-range-slider__thumb_left'); 
    this._thumbRight = component.querySelector('.js-range-slider__thumb_right');
    this._range = component.querySelector('.js-range-slider__range');
    
    this.setLeftValue();
    this.setRightValue();
    
    if (options.minMaxLabels) {
      this.minLabel = component.querySelector('.js-range-slider__min-max-label_left');
      this.maxLabel = component.querySelector('.js-range-slider__min-max-label_right');
    }
    
    if (options.valueLabel) {
      this.valueLabelLeft = component.querySelector('.js-range-slider__value-label_left');
      this.valueLabelRight = component.querySelector('.js-range-slider__value-label_right');
      this.valueLabelCommon = component.querySelector('.js-range-slider__value-label_common');
      
      this.setLabelLeftValue();
      this.setLabelRightValue();
      this.setLabelCommonValue();
      
      this.setValueLabelLeftPosition();
      this.setValueLabelRightPosition();
      
      setTimeout(() => {
        if ( this.isTwoValueLabelsClose() ) {
          this.mergeLabels();
        }
      });
      
      
    } 
    
    if (options.minMaxLabels && options.valueLabel) {
      setTimeout(() => {
        if ( this.isLeftValueLabelCloseToMinLabel() ) {
          this.minLabel.style.opacity = 0;
        }
        if ( this.isRightValueLabelCloseToMaxLabel() ) {
          this.maxLabel.style.opacity = 0;
        }
      });
    }
    
    if (options.vertical) {
      component.classList.add('range-slider_vertical');
      
      if (options.minMaxLabels) {
        this._fixMinMaxLabelsPositionForVertical();
      }  
      
      if (options.valueLabel) {
        this._fixValueLabelPositionForVertical();
      }
    }
    
    this._attachEventHandlers();
    
    console.log('Label: ' + this.valueLabelLeft.style.left);
    console.log('Thumb: ' + this._thumbLeft.style.left);
  }
  
  _render(options) {
    this.component.innerHTML = getTemplate(options);
  }
  
  setLeftValue(value) {
    let min = parseInt(this._inputLeft.min);
    let max = parseInt(this._inputLeft.max);

    this._inputLeft.value = Math.min(parseInt(value || this._inputLeft.value), parseInt(this._inputRight.value));

    let percent = ((this._inputLeft.value - min) / (max - min)) * 100;

    this._thumbLeft.style.left = percent + '%';
    this._range.style.left = percent + '%';
  }
  
  setRightValue(value) {
    let min = parseInt(this._inputRight.min);
    let max = parseInt(this._inputRight.max);

    this._inputRight.value = Math.max(parseInt(value || this._inputRight.value), parseInt(this._inputLeft.value));

    let percent = ((this._inputRight.value - min) / (max - min)) * 100;

    this._thumbRight.style.right = (100 - percent) + '%';
    this._range.style.right = (100 - percent) + '%';
  }
  
  setLabelLeftValue() {
    this.valueLabelLeft.textContent = this._inputLeft.value;
  }
  
  setLabelRightValue() {
    this.valueLabelRight.textContent = this._inputRight.value;
  }
  
  setLabelCommonValue() {
    this.valueLabelCommon.textContent = this._inputLeft.value + ' - ' + this._inputRight.value;
  }
  
  setValueLabelLeftPosition() {
    this.valueLabelLeft.style.left = this._thumbLeft.style.left;
  }
  
  setValueLabelRightPosition() {
    this.valueLabelRight.style.right = this._thumbRight.style.right;
  }
  
  mergeLabels() {
    this.valueLabelLeft.style.opacity = 0;
    this.valueLabelRight.style.opacity = 0;
    
    this.setLabelCommonValue();
    this.valueLabelCommon.style.opacity = 1;
    
    let distanceBetweenTwoThumbs = this._thumbRight.getBoundingClientRect().left - this._thumbLeft.getBoundingClientRect().right;
    
    let distanceBetweenTwoThumbsInPercents = 100 - parseInt(this._thumbRight.style.right) - parseInt(this._thumbLeft.style.left);
    this.valueLabelCommon.style.left = parseInt(this.valueLabelLeft.style.left) + distanceBetweenTwoThumbsInPercents / 2 + '%';
    
  }
  
  splitLabels() {
    this.valueLabelCommon.style.opacity = 0;
    this.valueLabelLeft.style.opacity = 1;
    this.valueLabelRight.style.opacity = 1;
  }
  
  isTwoValueLabelsClose() {
    if (!this.options.vertical) {
      let leftLabelEdge = this.valueLabelLeft.getBoundingClientRect().right;
      let rightLabelEdge = this.valueLabelRight.getBoundingClientRect().left;

      return ( (rightLabelEdge - leftLabelEdge) < 3 ); 
    }
    
    if (this.options.vertical) {
      let bottomLabelEdge = this.valueLabelLeft.getBoundingClientRect().top;
      let topLabelEdge = this.valueLabelRight.getBoundingClientRect().bottom;
      
      return ( (bottomLabelEdge - topLabelEdge) < 3 ); 
    }
  }
  
  isLeftValueLabelCloseToMinLabel() {
    let leftLabelEdge = this.valueLabelLeft.getBoundingClientRect().left;
    let minLabelEdge = this.minLabel.getBoundingClientRect().right;
    
    return ( (leftLabelEdge - minLabelEdge) < 3 );
  }
  
  isRightValueLabelCloseToMaxLabel() {
    let rightLabelEdge = this.valueLabelRight.getBoundingClientRect().right;
    let maxLabelEdge = this.maxLabel.getBoundingClientRect().left;
    
    return ( (maxLabelEdge - rightLabelEdge) < 3 );
  }
  
  _attachEventHandlers() {
    this._inputLeft.addEventListener('input', () => {
      this.setLeftValue();
      
      console.log('Label: ' + this.valueLabelLeft.style.left);
      console.log('Thumb: ' + this._thumbLeft.style.left);
      
      if (this.options.valueLabel) {
        this.setLabelLeftValue();
        this.setValueLabelLeftPosition();
        
        if ( this.isTwoValueLabelsClose() ) {
          this.mergeLabels();
        } else {
          this.splitLabels();
        }
      }
      
      if ( this._inputLeft.value == this._inputLeft.max ) {
        this._inputLeft.style.zIndex = 100;
      } else {
        this._inputLeft.style.zIndex = 2;
      }
      
      if (this.options.valueLabel && this.options.minMaxLabels) {
        if ( this.isLeftValueLabelCloseToMinLabel() ) {
          this.minLabel.style.opacity = 0;
        } else {
          this.minLabel.style.opacity = 1;
        }
      }
      
      if (this.options.valueLabel && this.options.vertical) {
        this._fixValueLabelPositionForVertical();
      }
      
    });
    this._inputRight.addEventListener('input', () => {
      this.setRightValue();
      
      if (this.options.valueLabel) {
        this.setLabelRightValue();
        this.setValueLabelRightPosition();
        
        if ( this.isTwoValueLabelsClose() ) {
          this.mergeLabels();
        } else {
          this.splitLabels();
        }
      }
      
      if (this.options.valueLabel && this.options.minMaxLabels) {
        if ( this.isRightValueLabelCloseToMaxLabel() ) {
          this.maxLabel.style.opacity = 0;
        } else {
          this.maxLabel.style.opacity = 1;
        }
      }
      
      if (this.options.valueLabel && this.options.vertical) {
        this._fixValueLabelPositionForVertical();
      }
    });

    this._inputLeft.addEventListener('mouseover', () => {
      this._thumbLeft.classList.add('range-slider__thumb_hover');
    });
    this._inputLeft.addEventListener('mouseout', () => {
      this._thumbLeft.classList.remove('range-slider__thumb_hover');
    });

    this._inputLeft.addEventListener('mousedown', () => {
      this._thumbLeft.classList.add('range-slider__thumb_active');
    });
    this._inputLeft.addEventListener('mouseup', () => {
      this._thumbLeft.classList.remove('range-slider__thumb_active');
    });

    this._inputRight.addEventListener('mouseover', () => {
      this._thumbRight.classList.add('range-slider__thumb_hover');
    });
    this._inputRight.addEventListener('mouseout', () => {
      this._thumbRight.classList.remove('range-slider__thumb_hover');
    });

    this._inputRight.addEventListener('mousedown', () => {
      this._thumbRight.classList.add('range-slider__thumb_active');
    });
    this._inputRight.addEventListener('mouseup', () => {
      this._thumbRight.classList.remove('range-slider__thumb_active');
    });
  }
  
  destroy() {
    this.component.outerHTML = '';
  }
  
  _fixMinMaxLabelsPositionForVertical() {
    this.maxLabel.style.transform = `rotate(90deg) translateX(${this.maxLabel.offsetHeight}px)`;
    
    this.minLabel.style.transform = `rotate(90deg) translateX(-${this.minLabel.offsetWidth}px)`;
  }
  
  _fixValueLabelPositionForVertical() {
    this.valueLabelLeft.style.transform = `rotate(90deg) translateX(${this.valueLabelLeft.offsetHeight}px) translateY(${this.valueLabelLeft.offsetWidth}px) translateY(-50%)`;
    
    this.valueLabelRight.style.transform = `rotate(90deg) translateX(${this.valueLabelRight.offsetHeight}px) translateY(-50%)`;
    
    this.valueLabelCommon.style.transform = `rotate(90deg) translateX(${this.valueLabelCommon.offsetHeight}px) translateY(${this.valueLabelCommon.offsetWidth}px) translateY(-50%)`;
    
  }
  
}