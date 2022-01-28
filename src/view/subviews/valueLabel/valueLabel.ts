import Label from '../Label/Label';

class ValueLabel extends Label {
  constructor(type: 'left' | 'right' | 'common' = 'left') {
    super(type, `range-slider__value-label range-slider__value-label_${type}`);
  }

  getLeftIndent(): string {
    return this.component.style.left;
  }

  getTopIndent(): string {
    return this.component.style.top;
  }
}

export default ValueLabel;
