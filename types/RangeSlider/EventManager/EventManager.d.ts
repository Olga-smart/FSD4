import SliderEvents from '../Presenter/SliderEvents';
import ModelEvents from '../Model/ModelEvents';
import ViewEvents from '../View/ViewEvents';
import ScaleEvents from '../View/subviews/Scale/ScaleEvents';
import ThumbEvents from '../View/subviews/Thumb/ThumbEvents';
import TrackEvents from '../View/subviews/Track/TrackEvents';
declare type PossibleEvents = SliderEvents & ModelEvents & ViewEvents & ScaleEvents & ThumbEvents & TrackEvents;
declare class EventManager {
    private listeners;
    subscribe(listener: IEventListener): void;
    unsubscribe(listener: IEventListener): void;
    notify<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void;
}
interface IEventListener {
    inform<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void;
}
export { EventManager, IEventListener, PossibleEvents };
//# sourceMappingURL=EventManager.d.ts.map