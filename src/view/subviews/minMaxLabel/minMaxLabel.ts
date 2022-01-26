import Label from '../Label/Label';
import createElement from '../../helpers/createElement';

class MinMaxLabel extends Label {
  constructor(type: 'left' | 'right' = 'left') {
    super(type);
    this.component = createElement('div', `range-slider__min-max-label range-slider__min-max-label_${type}`);
  }
}

export default MinMaxLabel;
