import BaseElement from '../../BaseElement/BaseElement';
import { IEventListener } from '../../../EventManager/EventManager';
declare class Thumb extends BaseElement<'div'> {
    private type;
    private eventManager;
    constructor(type?: 'left' | 'right');
    subscribe(listener: IEventListener): void;
    getLeftIndent(): string;
    getTopIndent(): string;
    setZIndex(value: number): void;
    private static handlePointerOver;
    private static handlePointerOut;
    private static handlePointerUp;
    private static handleDragStart;
    private handlePointerDown;
    private attachEventHandlers;
}
export default Thumb;
//# sourceMappingURL=Thumb.d.ts.map