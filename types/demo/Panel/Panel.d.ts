import BaseElement from '../../RangeSlider/View/BaseElement/BaseElement';
import { IEventListener, PossibleEvents } from '../../RangeSlider/EventManager/EventManager';
import Presenter from '../../RangeSlider/Presenter/Presenter';
declare class Panel extends BaseElement<'form'> implements IEventListener {
    private slider;
    private min;
    private max;
    private step;
    private from;
    private to;
    private vertical;
    private range;
    private scale;
    private scaleIntervals;
    private valueLabels;
    private minMaxLabels;
    constructor(component: HTMLFormElement, slider: Presenter);
    static init(component: HTMLFormElement, slider: Presenter): Panel;
    inform<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void;
    private static toggleCheckbox;
    private render;
    private setValues;
    private handleInput;
    private handleToggle;
    private handleSliderChangeValue;
    private handleSliderToggle;
    private attachEventHandlers;
}
export default Panel;
//# sourceMappingURL=Panel.d.ts.map