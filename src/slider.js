const getTemplate = (options) => {
  return `
    <input class="range-slider__input range-slider__input_left js-range-slider__input_left" type="range" min="${options.min || 0}" max="${options.max || 100}" value="${options.leftValue || 25}">
    <input class="range-slider__input range-slider__input_right js-range-slider__input_right" type="range" min="${options.min || 0}" max="${options.max || 100}" value="${options.rightValue || 75}">
    <div class="range-slider__slider">
      <div class="range-slider__track"></div>
      <div class="range-slider__range js-range-slider__range"></div>
      <div class="range-slider__thumb range-slider__thumb_left js-range-slider__thumb_left"></div><div class="range-slider__thumb range-slider__thumb_right js-range-slider__thumb_right"></div>
    </div>
  `
}

export class Slider {
  
  constructor(component, options = {}) {
    this._component = component;
    this._render(options);
    
    this._inputLeft = component.querySelector('.js-range-slider__input_left');
    this._inputRight = component.querySelector('.js-range-slider__input_right');

    this._thumbLeft = component.querySelector('.js-range-slider__thumb_left'); 
    this._thumbRight = component.querySelector('.js-range-slider__thumb_right');
    this._range = component.querySelector('.js-range-slider__range');
    
    this.setLeftValue();
    this.setRightValue();
    
    this._attachEventHandlers();
  }
  
  _render(options) {
    this._component.innerHTML = getTemplate(options);
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
  
  _attachEventHandlers() {
    this._inputLeft.addEventListener('input', () => {
      this.setLeftValue();
    });
    this._inputRight.addEventListener('input', () => {
      this.setRightValue();
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
    this._component.outerHTML = '';
  }
  
}