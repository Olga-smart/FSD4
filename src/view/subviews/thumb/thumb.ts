import createElement from '../../helpers/createElement';

class Thumb {
  type: 'left' | 'right';

  component: HTMLElement;

  view: any;

  constructor(type: 'left' | 'right' = 'left') {
    this.view = null;
    this.type = type;
    this.component = createElement('div', `range-slider__thumb range-slider__thumb_${type}`);

    this.attachEventHandlers();
  }

  registerWith(view: any): void {
    this.view = view;
  }

  setLeftIndentInPx(px: number): void {
    this.component.style.left = `${px}px`;
  }

  setTopIndentInPx(px: number): void {
    this.component.style.top = `${px}px`;
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

  getBoundingClientRect(): DOMRect {
    return this.component.getBoundingClientRect();
  }

  private static handlePointerOver(event: PointerEvent): void {
    (event.currentTarget as Element).classList.add('range-slider__thumb_hover');
  }

  private static handlePointerOut(event: PointerEvent): void {
    (event.currentTarget as Element).classList.remove('range-slider__thumb_hover');
  }

  private handlePointerDown(event: PointerEvent): void {
    (event.currentTarget as Element).classList.add('range-slider__thumb_active');

    (event.currentTarget as Element).setPointerCapture(event.pointerId);
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    const shiftX: number = event.clientX
                         - (event.currentTarget as Element).getBoundingClientRect().left;
    const shiftY: number = event.clientY
                         - (event.currentTarget as Element).getBoundingClientRect().top;

    const handlePointerMove = (newEvent: PointerEvent) => {
      if (this.type === 'left') {
        this.view?.handleLeftInput(newEvent.clientX, newEvent.clientY, shiftX, shiftY);
      }
      if (this.type === 'right') {
        this.view?.handleRightInput(newEvent.clientX, newEvent.clientY, shiftX, shiftY);
      }
    };

    const handlePointerUp = () => {
      this.component.removeEventListener('pointermove', handlePointerMove);
      this.component.removeEventListener('pointerup', handlePointerUp);
    };

    this.component.addEventListener('pointermove', handlePointerMove);
    this.component.addEventListener('pointerup', handlePointerUp);
  }

  private static handlePointerUp(event: PointerEvent): void {
    (event.currentTarget as Element).classList.remove('range-slider__thumb_active');
  }

  private static handleDragStart(): false {
    return false;
  }

  private attachEventHandlers() {
    this.component.addEventListener('pointerover', Thumb.handlePointerOver);
    this.component.addEventListener('pointerout', Thumb.handlePointerOut);
    this.component.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.component.addEventListener('pointerup', Thumb.handlePointerUp);
    this.component.addEventListener('dragstart', Thumb.handleDragStart);
  }
}

export default Thumb;
