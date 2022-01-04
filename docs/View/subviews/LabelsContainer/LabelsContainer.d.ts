import Label from '../Label/Label';
declare class LabelsContainer {
    component: HTMLElement;
    constructor();
    append(...elements: HTMLElement[]): void;
    fixWidthForVertical(labels: Label[]): void;
    fixHeightForHorizontal(labels: Label[]): void;
}
export default LabelsContainer;
//# sourceMappingURL=LabelsContainer.d.ts.map