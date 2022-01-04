declare class Thumb {
    type: 'left' | 'right';
    component: HTMLElement;
    view: any;
    constructor(type?: 'left' | 'right');
    registerWith(view: any): void;
    setLeftIndent(percent: number): void;
    setTopIndent(percent: number): void;
    getLeftIndent(): string;
    getTopIndent(): string;
    setZIndex(value: number): void;
    getBoundingClientRect(): DOMRect;
    getWidth(): number;
    getHeight(): number;
    private static handlePointerOver;
    private static handlePointerOut;
    private handlePointerDown;
    private static handlePointerUp;
    private static handleDragStart;
    private attachEventHandlers;
}
export default Thumb;
//# sourceMappingURL=Thumb.d.ts.map