import Model from '../model/model';
import View from '../view/view';
import { IEventListener } from '../eventManager/eventManager';
export default class Presenter implements IEventListener {
    model: Model;
    view: View;
    constructor(model: Model, view: View);
    inform(eventType: string, data: any): void;
    hasViewLabels(): boolean;
    handleViewLeftInput(px: number): void;
    handleModelLeftSet(): void;
    handleViewRightInput(px: number): void;
    handleModelRightSet(): void;
    passLeftValueToView(value: number): void;
    passRightValueToView(value: number): void;
    updateViewInput(): void;
    convertValueToPx(value: number): number;
    convertPxToValue(px: number): number;
    fitToStep(value: number): number;
    static removeCalcInaccuracy(value: number): number;
    changeLeftValueFromOutside(value: number): void;
    changeRightValueFromOutside(value: number): void;
    handleChangeViewMinFromOutside(value: number): void;
    handleModelChangeMin(): void;
    handleChangeViewMaxFromOutside(value: number): void;
    handleModelChangeMax(): void;
    handleChangeViewStepFromOutside(value: number): void;
    handleViewOrientationChange(): void;
    handleViewRangeToggle(): void;
    handleModelRangeToggle(): void;
    handleScaleToggle(): void;
    handleChangeScaleIntervals(): void;
    handleAddValueLabels(): void;
    handleAddMinMaxLabels(): void;
}
//# sourceMappingURL=presenter.d.ts.map