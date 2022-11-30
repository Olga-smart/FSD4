class EventManager {
  private listeners: IEventListener[] = [];

  subscribe(listener: IEventListener): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: IEventListener): void {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  notify(eventType: string, data1: number | null = null, data2: number | null = null): void {
    if (this.listeners.length === 0) { return; }
    if (data2 !== null) {
      this.listeners.forEach((item) => item.inform(eventType, data1, data2));
    } else {
      this.listeners.forEach((item) => item.inform(eventType, data1));
    }
  }
}

interface IEventListener {
  inform(eventType: string, data1: number | null, data2?: number | null): void;
}

export { EventManager, IEventListener };
