export default class Track {
    view: any;
    component: HTMLElement;
    constructor();
    registerWith(view: any): void;
    getOffsetWidth(): number;
    getOffsetHeight(): number;
    getBoundingClientRect(): DOMRect;
    append(...elements: HTMLElement[]): void;
    handleClick(event: MouseEvent): void;
    attachEventHandlers(): void;
}
//# sourceMappingURL=track.d.ts.map