import { IEventListener } from '../EventManager/EventManager';
import ModelOptions from './ModelOptions';
declare class Model {
    static defaults: Readonly<ModelOptions>;
    private eventManager;
    private min;
    private max;
    private leftValue;
    private rightValue?;
    private step;
    private range;
    constructor(options: Partial<ModelOptions>);
    subscribe(listener: IEventListener): void;
    setLeftValue(value: number): void;
    setRightValue(value?: number): void;
    setLeftValueFromPx(px: number, trackLengthInPx: number): void;
    setRightValueFromPx(px: number, trackLengthInPx: number): void;
    removeRightValue(): void;
    setMin(value: number): void;
    setMax(value: number): void;
    setStep(value: number): void;
    toggleRange(): void;
    getOptions(): ModelOptions;
    convertValueToPercent(value: number): number;
    static isTwoLabelsClose(distanceInPx: number): boolean;
    private static validate;
    private static removeCalcInaccuracy;
    private convertPxToValue;
    private fitToStep;
}
export default Model;
//# sourceMappingURL=Model.d.ts.map