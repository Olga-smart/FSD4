import Label from '../label/label';
declare class LabelsContainer {
    component: HTMLElement;
    constructor();
    append(...elements: HTMLElement[]): void;
    fixWidthForVertical(labels: Label[]): void;
    fixHeightForHorizontal(labels: Label[]): void;
}
export default LabelsContainer;
//# sourceMappingURL=labelsContainer.d.ts.map