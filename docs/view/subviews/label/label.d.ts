export declare abstract class Label {
    type: 'left' | 'right' | 'common';
    component: HTMLElement;
    constructor(type?: 'left' | 'right' | 'common');
    setOpacity(value: number): void;
    setValue(value: number | string): void;
    getBoundingClientRect(): DOMRect;
}
//# sourceMappingURL=label.d.ts.map