import createElement from '../../helpers/createElement';

class Thumb {
  type: 'left' | 'right';

  component: HTMLElement;

  view: any;

  constructor(type: 'left' | 'right' = 'left') {
    this.view = null;
    this.type = type;
    this.component = createElement('div', `range-slider__thumb range-slider__thumb_${type} js-range-slider__thumb_${type}`);

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

  handlePointerOver(): void {
    this.component.classList.add('range-slider__thumb_hover');
  }

  handlePointerOut(): void {
    this.component.classList.remove('range-slider__thumb_hover');
  }

  handlePointerDown(event: PointerEvent): void {
    this.component.classList.add('range-slider__thumb_active');

    this.component.setPointerCapture(event.pointerId);
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    const shiftX: number = event.clientX - this.getBoundingClientRect().left;
    const shiftY: number = event.clientY - this.getBoundingClientRect().top;

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

  handlePointerUp(): void {
    this.component.classList.remove('range-slider__thumb_active');
  }

  static handleDragStart(): false {
    return false;
  }

  attachEventHandlers() {
    this.component.addEventListener('pointerover', this.handlePointerOver.bind(this));
    this.component.addEventListener('pointerout', this.handlePointerOut.bind(this));
    this.component.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.component.addEventListener('pointerup', this.handlePointerUp.bind(this));
    this.component.addEventListener('dragstart', Thumb.handleDragStart);
  }
}

export default Thumb;
