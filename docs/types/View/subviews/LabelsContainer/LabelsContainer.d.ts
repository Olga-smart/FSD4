import BaseElement from '../../BaseElement/BaseElement';
declare class LabelsContainer extends BaseElement<'div'> {
    constructor();
    append(...elements: HTMLElement[]): void;
    fixWidthForVertical(labels: HTMLElement[]): void;
    fixHeightForHorizontal(labels: HTMLElement[]): void;
}
export default LabelsContainer;
//# sourceMappingURL=LabelsContainer.d.ts.map