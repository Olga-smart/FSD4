class BaseElement {
  protected component: HTMLElement;

  constructor(tag?: string, className?: string) {
    this.component = BaseElement.createComponent(tag, className);
  }

  private static createComponent(tag: string = 'div', className?: string): HTMLElement {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    return element;
  }

  getComponent(): HTMLElement {
    return this.component;
  }

  remove(): void {
    this.component.remove();
  }
}

export default BaseElement;
