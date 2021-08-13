// import {createElement} from '../../helpers/createElement';
// import { View } from '../../view';

// export class Input {
//   view!: View | null;
//   type: 'left' | 'right';
//   component: HTMLElement;

//   constructor(type: 'left' | 'right' = 'left') {
//     this.view = null;
//     this.type = type;
//     this.component = createElement('input', `range-slider__input range-slider__input_${type} js-range-slider__input_${type}`);
//     (this.component as HTMLInputElement).type = 'range';
    
//     this.attachEventHandlers();
//   }

//   registerWith(view: View): void {
//     this.view = view;
//   }

//   setMinValue(min: number): void {
//     this.component.setAttribute('min', `${min}`);
//   }

//   setMaxValue(max: number): void {
//     this.component.setAttribute('max', `${max}`);
//   }

//   setStep(step: number): void {
//     this.component.setAttribute('step', `${step}`);
//   }

//   setValue(value: number): void {
//     this.component.setAttribute('value', `${value}`);
//   }

//   setZIndex(value: number): void {
//     this.component.style.zIndex = `${value}`;
//   }

//   getValue(): string {
//     return (this.component as HTMLInputElement).value;
//   }

//   getMin(): string {
//     return (this.component as HTMLInputElement).min;
//   }

//   getMax(): string {
//     return (this.component as HTMLInputElement).max;
//   }

//   attachEventHandlers() {
//     this.component.addEventListener('input', () => {
//       let value = (this.component as HTMLInputElement).value;
//       if (this.type == 'left') {
//         // this.view?.handleLeftInput(+value);
//       }
//       if (this.type == 'right') {
//         // this.view?.handleRightInput(+value);
//       }
//     });

//     this.component.addEventListener('mouseover', () => {
//       this.view?.handleInputMouseover(this.type);
//     });
//     this.component.addEventListener('mouseout', () => {
//       this.view?.handleInputMouseout(this.type);
//     });

//     this.component.addEventListener('mousedown', () => {
//       this.view?.handleInputMousedown(this.type);
//     });
//     this.component.addEventListener('mouseup', () => {
//       this.view?.handleInputMouseup(this.type);
//     });
//   }
// }