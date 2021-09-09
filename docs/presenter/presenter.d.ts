import { Model } from '../model/model';
import { View } from '../view/view';
export declare class Presenter {
    model: Model;
    view: View;
    constructor(model: Model, view: View);
    handleLeftInput(px: number): void;
    handleRightInput(px: number): void;
    passLeftValueToView(value: number): void;
    passRightValueToView(value: number): void;
    convertValueToPx(value: number): number;
    convertPxToValue(px: number): number;
    fitToStep(value: number): number;
    removeCalcInaccuracy(value: number): number;
}
//# sourceMappingURL=presenter.d.ts.map