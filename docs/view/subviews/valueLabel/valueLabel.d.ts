import { Label } from '../label/label';
export declare class ValueLabel extends Label {
    component: HTMLElement;
    constructor(type?: 'left' | 'right' | 'common');
    setLeftIndent(value: string): void;
    getLeftIndent(): string;
    setRightIndent(value: string): void;
    getRightIndent(): string;
    fixPositionForVertical(): void;
}
//# sourceMappingURL=valueLabel.d.ts.map