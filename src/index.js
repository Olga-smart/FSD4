import './style.scss';
import {Model} from './model/model.js';
import {View} from './view/view.js';
import {Presenter} from './presenter/presenter.js';

let sliders = document.querySelectorAll('.js-range-slider');
for (let slider of sliders) {
  let model = new Model({
    min: 0,
    max: 150,
    range: true
  });
  
  let view = new View(slider, {
    minMaxLabels: true,
    valueLabel: true,
    vertical: false,
    range: true
  });
  
  let presenter = new Presenter(model, view);
  
  view.registerWith(presenter);
}