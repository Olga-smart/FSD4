import './style.scss';
import {Slider} from './slider.js';

let sliders = document.querySelectorAll('.js-range-slider');
for (let slider of sliders) {
  new Slider(slider, {
    minMaxLabels: true,
    valueLabel: true,
    leftValue: 10000,
    rightValue: 14000,
    min: 0,
    max: 15000,
    vertical: true
  });
}