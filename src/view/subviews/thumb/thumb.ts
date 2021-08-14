import {createElement} from '../../helpers/createElement';
import { View } from '../../view';

export class Thumb {
  type: 'left' | 'right';
  component: HTMLElement;
  view!: View | null;

  constructor(type: 'left' | 'right' = 'left') {
    this.view = null;
    this.type = type;
    this.component = createElement('div', `range-slider__thumb range-slider__thumb_${type} js-range-slider__thumb_${type}`);

    this.attachEventHandlers();
  }

  registerWith(view: View): void {
    this.view = view;
  }

  // addHover(): void {
  //   this.component.classList.add('range-slider__thumb_hover');
  // }

  // removeHover(): void {
  //   this.component.classList.remove('range-slider__thumb_hover');
  // }

  // makeActive(): void {
  //   this.component.classList.add('range-slider__thumb_active');
  // }

  // makeInactive(): void {
  //   this.component.classList.remove('range-slider__thumb_active');
  // }

  setLeftIndent(percent: number): void {
    this.component.style.left = percent + '%';
  }

  setRightIndent(percent: number): void {
    this.component.style.right = percent + '%';
  }

  setLeftIndentInPx(px: number): void {
    this.component.style.left = `${px}px`;
  }

  setRightIndentInPx(px: number): void {
    this.component.style.right = `${px}px`;
  }

  getLeftIndent(): string {
    return this.component.style.left;
  }

  getRightIndent(): string {
    return this.component.style.right;
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
      
      let handlePointerMove = (event: PointerEvent) => {
        if (this.type == 'left') {
          this.view?.handleLeftInput(event.clientX, shiftX);
        }
        if (this.type == 'right') {
          this.view?.handleRightInput(event.clientX, shiftX);
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