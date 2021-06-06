import './style.scss';
import {Model} from './model.js';
import {View} from './view.js';
import {Presenter} from './presenter';

let sliders = document.querySelectorAll('.js-range-slider');
for (let slider of sliders) {
  let model = new Model({
    min: 0,
    max: 150
  });
  
  let view = new View(slider, {
    minMaxLabels: true,
    valueLabel: true,
    vertical: false
  });
  
  let presenter = new Presenter(model, view);
  
  view.registerWith(presenter);
}