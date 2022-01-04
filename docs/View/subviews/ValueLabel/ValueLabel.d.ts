import Label from '../Label/Label';
declare class ValueLabel extends Label {
    component: HTMLElement;
    constructor(type?: 'left' | 'right' | 'common');
    setLeftIndent(value: string): void;
    getLeftIndent(): string;
    setTopIndent(value: string): void;
    getTopIndent(): string;
}
export default ValueLabel;
//# sourceMappingURL=ValueLabel.d.ts.map