import { Label } from '../label/label';
export declare class ValueLabel extends Label {
    component: HTMLElement;
    constructor(type?: 'left' | 'right' | 'common');
    setLeftIndent(value: string): void;
    getLeftIndent(): string;
    setTopIndent(value: string): void;
    getTopIndent(): string;
}
//# sourceMappingURL=valueLabel.d.ts.map