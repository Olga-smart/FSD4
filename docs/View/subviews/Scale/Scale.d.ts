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
    fitWidthForVertical(): void;
    fitHeightForHorizontal(): void;
    handleSwitchFromHorizontalToVertical(): void;
    handleSwitchFromVerticalToHorizontal(): void;
    private createIntervals;
    private addMarksInIntervals;
    private addValues;
    private handleClick;
    private attachEventHandlers;
}
export default Scale;
//# sourceMappingURL=Scale.d.ts.map