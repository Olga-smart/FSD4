export declare class EventManager {
    listeners: IEventListener[];
    subscribe(listener: IEventListener): void;
    unsubscribe(listener: IEventListener): void;
    notify(eventType: string, data?: any): void;
}
export interface IEventListener {
    inform(eventType: string, data: any): void;
}
//# sourceMappingURL=eventManager.d.ts.map