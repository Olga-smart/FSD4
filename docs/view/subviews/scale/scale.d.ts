import { View } from '../../view';
export declare class Scale {
    view: View | null;
    component: HTMLElement;
    min: number;
    max: number;
    intervalsNumber: number;
    intervals: HTMLElement[];
    values: number[];
    valueElements: HTMLElement[];
    constructor(min: number, max: number, intervalsNumber?: number);
    registerWith(view: View): void;
    createIntervals(): void;
    addMarksInIntervals(): void;
    addValues(): void;
    fitWidthForVertical(): void;
    fitHeightForHorizontal(): void;
    getBoundingClientRect(): DOMRect;
    attachEventHandlers(): void;
}
//# sourceMappingURL=scale.d.ts.map