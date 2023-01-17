import BaseElement from '../../BaseElement/BaseElement';
import { EventManager, IEventListener } from '../../../EventManager/EventManager';

class Track extends BaseElement<'div'> {
  private eventManager: EventManager;

  constructor() {
    super('div', 'range-slider__track');

    this.eventManager = new EventManager();

    this.attachEventHandlers();
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
  }

  append(...elements: HTMLElement[]): void {
    this.component.append(...elements);
  }

  private handleClick(event: MouseEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      const x: number = event.clientX - event.currentTarget.getBoundingClientRect().left;
      const y: number = event.clientY - event.currentTarget.getBoundingClientRect().top;

      this.eventManager.notify('trackClick', [x, y]);
    }
  }

  private attachEventHandlers(): void {
    this.component.addEventListener('click', this.handleClick.bind(this));
  }
}

export default Track;
