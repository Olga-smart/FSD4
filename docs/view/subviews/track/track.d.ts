import { View } from '../../view';
export declare class Track {
    view: View | null;
    component: HTMLElement;
    constructor();
    registerWith(view: View): void;
    getOffsetWidth(): number;
    getOffsetHeight(): number;
    getBoundingClientRect(): DOMRect;
    append(...elements: HTMLElement[]): void;
    attachEventHandlers(): void;
}
//# sourceMappingURL=track.d.ts.map