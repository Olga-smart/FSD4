export default class Thumb {
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
    handlePointerOver(): void;
    handlePointerOut(): void;
    handlePointerDown(event: PointerEvent): void;
    handlePointerUp(): void;
    static handleDragStart(): false;
    attachEventHandlers(): void;
}
//# sourceMappingURL=thumb.d.ts.map