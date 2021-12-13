import Label from '../label/label';
declare class ValueLabel extends Label {
    component: HTMLElement;
    constructor(type?: 'left' | 'right' | 'common');
    setLeftIndent(value: string): void;
    getLeftIndent(): string;
    setTopIndent(value: string): void;
    getTopIndent(): string;
}
export default ValueLabel;
//# sourceMappingURL=valueLabel.d.ts.map