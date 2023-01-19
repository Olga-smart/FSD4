import BaseElement from '../../BaseElement/BaseElement';
import { EventManager, IEventListener } from '../../../EventManager/EventManager';

class Thumb extends BaseElement<'div'> {
  private type: 'left' | 'right';

  private eventManager: EventManager = new EventManager();

  constructor(type: 'left' | 'right' = 'left') {
    super('div', `range-slider__thumb range-slider__thumb_${type}`);
    this.type = type;
    this.attachEventHandlers();
  }

  subscribe(listener: IEventListener): void {
    this.eventManager.subscribe(listener);
  }

  getLeftIndent(): string {
    return this.component.style.left;
  }

  getTopIndent(): string {
    return this.component.style.top;
  }

  setZIndex(value: number): void {
    this.component.style.zIndex = `${value}`;
  }

  private static handlePointerOver(event: PointerEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.classList.add('range-slider__thumb_hover');
    }
  }

  private static handlePointerOut(event: PointerEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.classList.remove('range-slider__thumb_hover');
    }
  }

  private static handlePointerUp(event: PointerEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.classList.remove('range-slider__thumb_active');
    }
  }

  private static handleDragStart(): false {
    return false;
  }

  private handlePointerDown(event: PointerEvent): void {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.classList.add('range-slider__thumb_active');

      event.currentTarget.setPointerCapture(event.pointerId);

      // prevent selection (browser action)
      event.preventDefault();

      const shiftX: number = event.clientX - event.currentTarget.getBoundingClientRect().left;
      const shiftY: number = event.clientY - event.currentTarget.getBoundingClientRect().top;

      const handlePointerMove = (newEvent: PointerEvent) => {
        const x = newEvent.clientX - shiftX;
        const y = newEvent.clientY - shiftY;

        if (this.type === 'left') {
          this.eventManager.notify('leftThumbChangePosition', [x, y]);
        }

        if (this.type === 'right') {
          this.eventManager.notify('rightThumbChangePosition', [x, y]);
        }
      };

      const handlePointerUp = () => {
        this.component.removeEventListener('pointermove', handlePointerMove);
        this.component.removeEventListener('pointerup', handlePointerUp);
      };

      this.component.addEventListener('pointermove', handlePointerMove);
      this.component.addEventListener('pointerup', handlePointerUp);
    }
  }

  private attachEventHandlers(): void {
    this.component.addEventListener('pointerover', Thumb.handlePointerOver);
    this.component.addEventListener('pointerout', Thumb.handlePointerOut);
    this.component.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.component.addEventListener('pointerup', Thumb.handlePointerUp);
    this.component.addEventListener('dragstart', Thumb.handleDragStart);
  }
}

export default Thumb;
