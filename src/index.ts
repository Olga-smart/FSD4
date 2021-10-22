import 'airbnb-browser-shims';
import './style.scss';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

function initSliders(): void {
  const sliders = document.querySelectorAll('.js-range-slider');

  sliders.forEach((slider) => {
    const model: Model = new Model({
      // min: 10,
      // max: 200,
      // leftValue: 125,
      // rightValue: 175,
      range: true,
      // step: 5
    });

    const view = new View(slider, {
      minMaxLabels: true,
      valueLabels: true,
      // vertical: true,
      range: true,
      scale: true,
      scaleIntervals: 5,
      panel: true,
    });

    const presenter = new Presenter(model, view);
    presenter.view.eventManager.subscribe(presenter);
    presenter.model.eventManager.subscribe(presenter);
  });
}

window.addEventListener('load', initSliders);
