import { View } from '../../view';
export declare class Input {
    view: View | null;
    type: 'left' | 'right';
    component: HTMLElement;
    constructor(type?: 'left' | 'right');
    registerWith(view: View): void;
    setMinValue(min: number): void;
    setMaxValue(max: number): void;
    setStep(step: number): void;
    setValue(value: number): void;
    setZIndex(value: number): void;
    getValue(): string;
    getMin(): string;
    getMax(): string;
    attachEventHandlers(): void;
}
//# sourceMappingURL=input.d.ts.map