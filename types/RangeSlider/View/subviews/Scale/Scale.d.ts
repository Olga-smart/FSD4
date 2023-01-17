import BaseElement from '../../BaseElement/BaseElement';
import { IEventListener } from '../../../EventManager/EventManager';
declare class Scale extends BaseElement<'div'> {
    private eventManager;
    private intervals;
    private values;
    private valueElements;
    constructor(min: number, max: number, intervalsNumber?: number);
    subscribe(listener: IEventListener): void;
    fitWidthForVertical(indent?: number): void;
    fitHeightForHorizontal(indent?: number): void;
    handleSwitchFromHorizontalToVertical(): void;
    handleSwitchFromVerticalToHorizontal(): void;
    private createIntervals;
    private addMarksInIntervals;
    private addValues;
    private handleClick;
    private attachEventHandlers;
}
export default Scale;
//# sourceMappingURL=Scale.d.ts.map