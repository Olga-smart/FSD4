import './style.scss';
import {Slider} from './slider.js';
import {Model} from './slider.js';
import {View} from './slider.js';
import {Controller} from './slider.js';

let sliders = document.querySelectorAll('.js-range-slider');
for (let slider of sliders) {
//  new Slider(slider, {
//    minMaxLabels: true,
//    valueLabel: true,
//    min: 0,
//    max: 150,
//    vertical: true
//  });
  
  new Controller(new Model({
    min: 0,
    max: 150
  }), new View(slider, {
    minMaxLabels: true,
    valueLabel: true,
//    vertical: true
  }));
}