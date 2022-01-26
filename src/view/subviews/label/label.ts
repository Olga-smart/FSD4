class Label {
  protected type: 'left' | 'right' | 'common';

  protected component: HTMLElement;

  constructor(type: 'left' | 'right' | 'common' = 'left') {
    this.type = type;
    this.component = document.createElement('div');
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

  getBoundingClientRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }

  getOffsetWidth() {
    return this.component.offsetWidth;
  }

  getOffsetHeight() {
    return this.component.offsetHeight;
  }

  getComponent(): HTMLElement {
    return this.component;
  }

  remove(): void {
    this.component.remove();
  }
}

export default Label;
