import Model from '../Model/Model';
import View from '../View/View';
import { IEventListener } from '../EventManager/EventManager';
declare class Presenter implements IEventListener {
    private model;
    private view;
    constructor(model: Model, view: View);
    inform(eventType: string, data?: number | null): void;
    private static removeCalcInaccuracy;
    private initViewValues;
    private handleViewLeftInput;
    private handleModelLeftSet;
    private handleViewRightInput;
    private handleModelRightSet;
    private passLeftValueToView;
    private passRightValueToView;
    private updateViewInput;
    private convertValueToPercent;
    private convertPxToValue;
    private fitToStep;
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
    private handleModelStepSet;
    private handleScaleToggle;
    private handleChangeScaleIntervals;
    private handleAddValueLabels;
    private handleAddMinMaxLabels;
}
export default Presenter;
//# sourceMappingURL=Presenter.d.ts.map