import './style.scss';
import {Slider} from './slider.js';

let sliders = document.querySelectorAll('.js-range-slider');
for (let slider of sliders) {
  new Slider(slider);
}