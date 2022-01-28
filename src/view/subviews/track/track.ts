import BaseElement from '../../BaseElement/BaseElement';

class Track extends BaseElement {
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
    const x: number = event.clientX - (event.currentTarget as Element).getBoundingClientRect().left;
    const y: number = event.clientY - (event.currentTarget as Element).getBoundingClientRect().top;
    this.view?.handleScaleOrTrackClick(x, y);
  }

  private attachEventHandlers(): void {
    this.component.addEventListener('click', this.handleClick.bind(this));
  }
}

export default Track;
