import BaseElement from '../../BaseElement/BaseElement';

class Label extends BaseElement {
  protected type: 'left' | 'right' | 'common';

  constructor(type: 'left' | 'right' | 'common' = 'left', className?: string) {
    super('div', className);
    this.type = type;
  }

  setOpacity(value: number): void {
    this.component.style.opacity = `${value}`;
  }

  setValue(value: number | string): void {
    this.component.textContent = `${value}`;
  }

  getValue(): number {
    return Number(this.component.textContent);
  }
}

export default Label;
