import createElement from '../../helpers/createElement';

class Track {
  private view: any;

  private component: HTMLElement;

  constructor() {
    this.view = null;
    this.component = createElement('div', 'range-slider__track');
    this.attachEventHandlers();
  }

  registerWith(view: any) {
    this.view = view;
  }

  getOffsetWidth(): number {
    return this.component.offsetWidth;
  }

  getOffsetHeight(): number {
    return this.component.offsetHeight;
  }

  getBoundingClientRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }

  append(...elements: HTMLElement[]): void {
    this.component.append(...elements);
  }

  getComponent(): HTMLElement {
    return this.component;
  }

  private handleClick(event: MouseEvent): void {
    const x: number = event.clientX - (event.currentTarget as Element).getBoundingClientRect().left;
    const y: number = event.clientY - (event.currentTarget as Element).getBoundingClientRect().top;
    this.view?.handleScaleOrTrackClick(x, y);
  }

  private attachEventHandlers(): void {
    this.component.addEventListener('click', this.handleClick.bind(this));
  }
}

export default Track;
