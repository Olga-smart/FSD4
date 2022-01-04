declare class EventManager {
    listeners: IEventListener[];
    subscribe(listener: IEventListener): void;
    unsubscribe(listener: IEventListener): void;
    notify(eventType: string, data?: any): void;
}
interface IEventListener {
    inform(eventType: string, data: any): void;
}
export { EventManager, IEventListener };
//# sourceMappingURL=EventManager.d.ts.map