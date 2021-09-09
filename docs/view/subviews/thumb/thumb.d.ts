import { View } from '../../view';
export declare class Thumb {
    type: 'left' | 'right';
    component: HTMLElement;
    view: View | null;
    constructor(type?: 'left' | 'right');
    registerWith(view: View): void;
    setLeftIndentInPx(px: number): void;
    setTopIndentInPx(px: number): void;
    getLeftIndent(): string;
    getTopIndent(): string;
    setZIndex(value: number): void;
    getBoundingClientRect(): DOMRect;
    attachEventHandlers(): void;
}
//# sourceMappingURL=thumb.d.ts.map