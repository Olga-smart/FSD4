import './style.scss';

let inputLeft = document.querySelector('.js-range-slider__input_left');
let inputRight = document.querySelector('.js-range-slider__input_right');

let thumbLeft = document.querySelector('.js-range-slider__thumb_left'); 
let thumbRight = document.querySelector('.js-range-slider__thumb_right');
let range = document.querySelector('.js-range-slider__range');

function setLeftValue() {
  let min = parseInt(inputLeft.min);
  let max = parseInt(inputLeft.max);
  
  inputLeft.value = Math.min(parseInt(inputLeft.value), parseInt(inputRight.value));
  
  let percent = ((inputLeft.value - min) / (max - min)) * 100;
  
  thumbLeft.style.left = percent + '%';
  range.style.left = percent + '%';
}
setLeftValue();

function setRightValue() {
  let min = parseInt(inputRight.min);
  let max = parseInt(inputRight.max);
  
  inputRight.value = Math.max(parseInt(inputRight.value), parseInt(inputLeft.value));
  
  let percent = ((inputRight.value - min) / (max - min)) * 100;
  
  thumbRight.style.right = (100 - percent) + '%';
  range.style.right = (100 - percent) + '%';
}
setRightValue();

inputLeft.addEventListener('input', setLeftValue);
inputRight.addEventListener('input', setRightValue);

inputLeft.addEventListener('mouseover', function() {
  thumbLeft.classList.add('range-slider__thumb_hover');
});
inputLeft.addEventListener('mouseout', function() {
  thumbLeft.classList.remove('range-slider__thumb_hover');
});

inputLeft.addEventListener('mousedown', function() {
  thumbLeft.classList.add('range-slider__thumb_active');
});
inputLeft.addEventListener('mouseup', function() {
  thumbLeft.classList.remove('range-slider__thumb_active');
});

inputRight.addEventListener('mouseover', function() {
  thumbRight.classList.add('range-slider__thumb_hover');
});
inputRight.addEventListener('mouseout', function() {
  thumbRight.classList.remove('range-slider__thumb_hover');
});

inputRight.addEventListener('mousedown', function() {
  thumbRight.classList.add('range-slider__thumb_active');
});
inputRight.addEventListener('mouseup', function() {
  thumbRight.classList.remove('range-slider__thumb_active');
});