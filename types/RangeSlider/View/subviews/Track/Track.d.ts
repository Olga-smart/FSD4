import BaseElement from '../../BaseElement/BaseElement';
import { IEventListener } from '../../../EventManager/EventManager';
declare class Track extends BaseElement<'div'> {
    private eventManager;
    constructor();
    subscribe(listener: IEventListener): void;
    append(...elements: HTMLElement[]): void;
    private handleClick;
    private attachEventHandlers;
}
export default Track;
//# sourceMappingURL=Track.d.ts.map