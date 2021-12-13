declare class Scale {
    view: any;
    component: HTMLElement;
    min: number;
    max: number;
    intervalsNumber: number;
    intervals: HTMLElement[];
    values: number[];
    valueElements: HTMLElement[];
    constructor(min: number, max: number, intervalsNumber: number);
    registerWith(view: any): void;
    createIntervals(): void;
    addMarksInIntervals(): void;
    addValues(): void;
    fitWidthForVertical(): void;
    fitHeightForHorizontal(): void;
    handleClick(event: MouseEvent): void;
    attachEventHandlers(): void;
}
export default Scale;
//# sourceMappingURL=scale.d.ts.map