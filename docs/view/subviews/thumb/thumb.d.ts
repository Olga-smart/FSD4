export declare class Thumb {
    type: 'left' | 'right';
    component: HTMLElement;
    constructor(type?: 'left' | 'right');
    addHover(): void;
    removeHover(): void;
    makeActive(): void;
    makeInactive(): void;
    setLeftIndent(percent: number): void;
    setRightIndent(percent: number): void;
    getLeftIndent(): string;
    getRightIndent(): string;
    getBoundingClientRect(): DOMRect;
}
//# sourceMappingURL=thumb.d.ts.map