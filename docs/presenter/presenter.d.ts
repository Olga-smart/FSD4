import Model from '../model/model';
import View from '../view/view';
import { IEventListener } from '../eventManager/eventManager';
declare class Presenter implements IEventListener {
    model: Model;
    view: View;
    constructor(model: Model, view: View);
    inform(eventType: string, data: any): void;
    private initViewValues;
    private hasViewLabels;
    private handleViewLeftInput;
    private handleModelLeftSet;
    private handleViewRightInput;
    private handleModelRightSet;
    private passLeftValueToView;
    private passRightValueToView;
    private updateViewInput;
    private convertValueToPx;
    private convertPxToValue;
    private fitToStep;
    static removeCalcInaccuracy(value: number): number;
    private handleChangeLeftValueFromOutside;
    private handleChangeRightValueFromOutside;
    private handleChangeViewMinFromOutside;
    private handleModelChangeMin;
    private handleChangeViewMaxFromOutside;
    private handleModelChangeMax;
    private handleChangeViewStepFromOutside;
    private handleViewOrientationChange;
    private handleViewRangeToggle;
    private handleModelRangeToggle;
    private handleScaleToggle;
    private handleChangeScaleIntervals;
    private handleAddValueLabels;
    private handleAddMinMaxLabels;
}
export default Presenter;
//# sourceMappingURL=presenter.d.ts.map