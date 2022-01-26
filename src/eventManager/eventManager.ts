class EventManager {
  private listeners: IEventListener[] = [];

  subscribe(listener: IEventListener): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: IEventListener): void {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  notify(eventType: string, data: any = null): void {
    if (this.listeners.length === 0) { return; }
    this.listeners.forEach((item) => item.inform(eventType, data));
  }
}

interface IEventListener {
  inform(eventType: string, data: any): void;
}

export { EventManager, IEventListener };
