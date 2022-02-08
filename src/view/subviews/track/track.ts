import BaseElement from '../../BaseElement/BaseElement';

class Track extends BaseElement<'div'> {
  private view: any;

  constructor() {
    super('div', 'range-slider__track');

    this.view = null;

    this.attachEventHandlers();
  }

  registerWith(view: any) {
    this.view = view;
  }

  append(...elements: HTMLElement[]): void {
    this.component.append(...elements);
  }

  private handleClick(event: MouseEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      const x: number = event.clientX - event.currentTarget.getBoundingClientRect().left;
      const y: number = event.clientY - event.currentTarget.getBoundingClientRect().top;

      this.view?.handleScaleOrTrackClick(x, y);
    }
  }

  private attachEventHandlers(): void {
    this.component.addEventListener('click', this.handleClick.bind(this));
  }
}

export default Track;
