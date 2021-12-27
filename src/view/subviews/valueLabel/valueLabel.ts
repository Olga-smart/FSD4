import Label from '../Label/Label';
import createElement from '../../helpers/createElement';

class ValueLabel extends Label {
  component: HTMLElement;

  constructor(type: 'left' | 'right' | 'common' = 'left') {
    super(type);
    this.component = createElement('div', `range-slider__value-label range-slider__value-label_${type}`);
  }

  setLeftIndent(value: string): void {
    this.component.style.left = value;
  }

  getLeftIndent(): string {
    return this.component.style.left;
  }

  setTopIndent(value: string): void {
    this.component.style.top = value;
  }

  getTopIndent(): string {
    return this.component.style.top;
  }
}

export default ValueLabel;
