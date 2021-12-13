declare class Thumb {
    type: 'left' | 'right';
    component: HTMLElement;
    view: any;
    constructor(type?: 'left' | 'right');
    registerWith(view: any): void;
    setLeftIndentInPx(px: number): void;
    setTopIndentInPx(px: number): void;
    getLeftIndent(): string;
    getTopIndent(): string;
    setZIndex(value: number): void;
    getBoundingClientRect(): DOMRect;
    static handlePointerOver(event: PointerEvent): void;
    static handlePointerOut(event: PointerEvent): void;
    handlePointerDown(event: PointerEvent): void;
    static handlePointerUp(event: PointerEvent): void;
    static handleDragStart(): false;
    attachEventHandlers(): void;
}
export default Thumb;
//# sourceMappingURL=thumb.d.ts.map