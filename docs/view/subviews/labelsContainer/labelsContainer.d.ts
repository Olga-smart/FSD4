import Label from '../label/label';
export default class LabelsContainer {
    component: HTMLElement;
    constructor();
    append(...elements: HTMLElement[]): void;
    fixWidthForVertical(labels: Label[]): void;
    fixHeightForHorizontal(labels: Label[]): void;
}
//# sourceMappingURL=labelsContainer.d.ts.map