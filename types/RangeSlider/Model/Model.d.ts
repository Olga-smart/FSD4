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
    static validate(options: ModelOptions): ModelOptions;
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
    getMin(): number;
    getMax(): number;
    getLeftValue(): number;
    getRightValue(): number | undefined;
    getStep(): number;
    isRange(): boolean;
    getOptions(): ModelOptions;
    convertValueToPercent(value: number): number;
    convertPxToValue(px: number, trackLengthInPx: number): number;
    static isTwoLabelsClose(distanceInPx: number): boolean;
    private static removeCalcInaccuracy;
    private fitToStep;
}
export default Model;
//# sourceMappingURL=Model.d.ts.map