import { Model } from '../model/model';
import { View } from '../view/view';
export declare class Presenter {
    model: Model;
    view: View;
    constructor(model: Model, view: View);
    handleLeftInput(value: number): void;
    handleRightInput(value: number): void;
}
//# sourceMappingURL=presenter.d.ts.map