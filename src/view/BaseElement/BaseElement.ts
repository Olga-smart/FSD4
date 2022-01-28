class BaseElement {
  protected component: HTMLElement;

  constructor(tag?: string, className?: string) {
    this.component = BaseElement.createComponent(tag, className);
  }

  protected static createComponent(tag: string = 'div', className?: string): HTMLElement {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    return element;
  }

  getComponent(): HTMLElement {
    return this.component;
  }

  getBoundingClientRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }

  getWidth(): number {
    return this.component.offsetWidth;
  }

  getHeight(): number {
    return this.component.offsetHeight;
  }

  setIndent(side: 'top' | 'right' | 'bottom' | 'left' = 'left', indent: number | string): void {
    if (typeof indent === 'number') {
      this.component.style[side] = `${indent}%`;
    }

    if (typeof indent === 'string') {
      this.component.style[side] = indent;
    }
  }

  remove(): void {
    this.component.remove();
  }
}

export default BaseElement;
