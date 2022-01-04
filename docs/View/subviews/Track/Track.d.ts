declare class Track {
    view: any;
    component: HTMLElement;
    constructor();
    registerWith(view: any): void;
    getOffsetWidth(): number;
    getOffsetHeight(): number;
    getBoundingClientRect(): DOMRect;
    append(...elements: HTMLElement[]): void;
    private handleClick;
    private attachEventHandlers;
}
export default Track;
//# sourceMappingURL=Track.d.ts.map