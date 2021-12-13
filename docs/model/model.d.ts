import { EventManager } from '../eventManager/eventManager';
declare type ModelOptions = {
    min: number;
    max: number;
    leftValue: number;
    rightValue?: number;
    step: number;
    range?: boolean;
};
declare class Model {
    eventManager: EventManager;
    min: number;
    max: number;
    leftValue: number;
    rightValue?: number;
    step: number;
    isRange: boolean;
    constructor(options: ModelOptions);
    setLeftValue(value: number): void;
    setRightValue(value?: number): void;
    removeRightValue(): void;
    changeMinFromOutside(value: number): void;
    changeMaxFromOutside(value: number): void;
    setStep(value: number): void;
    toggleRange(): void;
}
export default Model;
//# sourceMappingURL=model.d.ts.map