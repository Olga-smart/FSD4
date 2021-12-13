declare class Label {
    type: 'left' | 'right' | 'common';
    component: HTMLElement;
    constructor(type?: 'left' | 'right' | 'common');
    setOpacity(value: number): void;
    setValue(value: number | string): void;
    getValue(): string | null;
    getBoundingClientRect(): DOMRect;
    getOffsetWidth(): number;
    getOffsetHeight(): number;
}
export default Label;
//# sourceMappingURL=label.d.ts.map