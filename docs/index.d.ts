import 'airbnb-browser-shims';
import './style.scss';
declare global {
    interface JQuery {
        rangeSlider: IRangeSlider;
    }
    interface IRangeSlider {
        (options?: object): JQuery<HTMLElement>;
        defaults?: RangeSliderOptions;
        validate?: (settings: RangeSliderOptions) => RangeSliderOptions;
    }
    type RangeSliderOptions = {
        min: number;
        max: number;
        leftValue: number;
        rightValue: number;
        range: boolean;
        step: number;
        minMaxLabels: boolean;
        valueLabels: boolean;
        vertical: boolean;
        scale: boolean;
        scaleIntervals: number;
        panel: boolean;
    };
}
//# sourceMappingURL=index.d.ts.map