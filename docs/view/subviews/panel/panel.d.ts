import { View } from '../../view';
export declare type PanelOptions = {
    min: number;
    max: number;
    step: number;
    from: number;
    to: number | null;
    vertical: boolean;
    range: boolean;
    scale: boolean;
    scaleIntervals: number | null;
    valueLabels: boolean;
    minMaxLabels: boolean;
};
export declare class Panel {
    view: View | null;
    component: HTMLElement;
    min: HTMLElement;
    max: HTMLElement;
    step: HTMLElement;
    from: HTMLElement;
    to: HTMLElement;
    vertical: HTMLElement;
    range: HTMLElement;
    scale: HTMLElement;
    scaleIntervals: HTMLElement;
    valueLabels: HTMLElement;
    minMaxLabels: HTMLElement;
    constructor();
    registerWith(view: View): void;
    render(): void;
    setType(input: HTMLElement, type: string): HTMLElement;
    addLabel(input: HTMLElement, name: string): HTMLElement;
    wrap(input: HTMLElement): HTMLElement;
    setValues(options: PanelOptions): void;
    setAttributes(options: PanelOptions): void;
    updateFrom(value: number): void;
    updateTo(value: number | ''): void;
    updateScaleIntervals(value: number | ''): void;
    attachEventHandlers(): void;
}
//# sourceMappingURL=panel.d.ts.map