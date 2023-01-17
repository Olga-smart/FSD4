import SliderEvents from '../Presenter/SliderEvents';
import ModelEvents from '../Model/ModelEvents';
import ViewEvents from '../View/ViewEvents';
import ScaleEvents from '../View/subviews/Scale/ScaleEvents';
import ThumbEvents from '../View/subviews/Thumb/ThumbEvents';
import TrackEvents from '../View/subviews/Track/TrackEvents';

type PossibleEvents = SliderEvents
& ModelEvents
& ViewEvents
& ScaleEvents
& ThumbEvents
& TrackEvents;

class EventManager {
  private listeners: IEventListener[] = [];

  subscribe(listener: IEventListener): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: IEventListener): void {
    this.listeners = this.listeners.filter((item) => item !== listener);
  }

  notify<E extends keyof PossibleEvents>(
    eventType: E,
    data: PossibleEvents[E],
  ): void {
    if (this.listeners.length === 0) { return; }
    this.listeners.forEach((item) => item.inform(eventType, data));
  }
}

interface IEventListener {
  inform<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void;
}

export { EventManager, IEventListener, PossibleEvents };
