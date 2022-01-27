import Label from '../Label/Label';

class MinMaxLabel extends Label {
  constructor(type: 'left' | 'right' = 'left') {
    super(type, `range-slider__min-max-label range-slider__min-max-label_${type}`);
  }
}

export default MinMaxLabel;
