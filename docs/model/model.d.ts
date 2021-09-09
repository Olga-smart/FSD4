declare type ModelOptions = {
    min?: number;
    max?: number;
    leftValue?: number;
    rightValue?: number;
    step?: number;
    range?: boolean;
};
export declare class Model {
    min: number;
    max: number;
    leftValue: number;
    rightValue?: number;
    step: number;
    isRange: boolean;
    constructor(options?: ModelOptions);
    setLeftValue(value: number): void;
    setRightValue(value: number): void;
}
export {};
//# sourceMappingURL=model.d.ts.map