import './style.scss';
import {Model} from './model/model';
import {View} from './view/view';
import {Presenter} from './presenter/presenter';

window.addEventListener('load', () => {

    let sliders = document.querySelectorAll('.js-range-slider');
    for (let slider of sliders) {
      let model: Model = new Model({
        // min: 10,
        // max: 200,
        // leftValue: 125,
        // rightValue: 175,
        range: true,
        step: 0.6
      });
      
      let view = new View(slider, {
        minMaxLabels: true,
        valueLabel: true,
        // vertical: true,
        range: true,
        scale: true,
        scaleIntervals: 5
      });
      
      let presenter = new Presenter(model, view);
      
      view.registerWith(presenter);

      console.log(presenter.fitToStep(7));
      console.log(presenter.removeCalcInaccuracy(presenter.fitToStep(7)));
      console.log(presenter.fitToStep(6) % 0.6);
    }
});


