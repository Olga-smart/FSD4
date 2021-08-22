import {createElement} from '../../helpers/createElement';
import { View } from '../../view';

export class Thumb {
  type: 'left' | 'right';
  component: HTMLElement;
  view: View | null;

  constructor(type: 'left' | 'right' = 'left') {
    this.view = null;
    this.type = type;
    this.component = createElement('div', `range-slider__thumb range-slider__thumb_${type} js-range-slider__thumb_${type}`);

    this.attachEventHandlers();
  }

  registerWith(view: View): void {
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

  attachEventHandlers() {
    this.component.addEventListener('pointerover', () => {
      this.component.classList.add('range-slider__thumb_hover');
    });
    this.component.addEventListener('pointerout', () => {
      this.component.classList.remove('range-slider__thumb_hover');
    });

    this.component.addEventListener('pointerdown', () => {
      this.component.classList.add('range-slider__thumb_active');
    });
    this.component.addEventListener('pointerup', () => {
      this.component.classList.remove('range-slider__thumb_active');
    });

    this.component.addEventListener('pointerdown', (event) => {
      this.component.setPointerCapture(event.pointerId);
      event.preventDefault(); // предотвратить запуск выделения (действие браузера)

      let shiftX: number = event.clientX - this.getBoundingClientRect().left;
      let shiftY: number = event.clientY - this.getBoundingClientRect().top;
      
      let handlePointerMove = (event: PointerEvent) => {
        if (this.type == 'left') {
          this.view?.handleLeftInput(event.clientX, event.clientY, shiftX, shiftY);
        }
        if (this.type == 'right') {
          this.view?.handleRightInput(event.clientX, event.clientY, shiftX, shiftY);
        }
      };

      let handlePointerUp = () => {
        this.component.removeEventListener('pointermove', handlePointerMove);
        this.component.removeEventListener('pointerup', handlePointerUp);
      };

      this.component.addEventListener('pointermove', handlePointerMove);
      this.component.addEventListener('pointerup', handlePointerUp);
    });

    this.component.addEventListener('dragstart', () => {
      return false;
    });
  }
}