import { EventManager } from './eventManager';

describe('EventManager', () => {
  describe('subscribe(listener)', () => {
    it('add listener to listeners array', () => {
      const eventManager = new EventManager();
      const listener = {
        inform() {},
      };
      eventManager.subscribe(listener);

      expect(eventManager.listeners).toContain(listener);
    });
  });

  describe('unsubscribe(listener)', () => {
    it('remove listener to listeners array', () => {
      const eventManager = new EventManager();
      const listener = {
        inform() {},
      };
      eventManager.subscribe(listener);
      expect(eventManager.listeners).toContain(listener);

      eventManager.unsubscribe(listener);
      expect(eventManager.listeners).not.toContain(listener);
    });
  });

  describe('notify(eventType, data)', () => {
    const eventManager = new EventManager();
    const listener1 = {
      inform() {},
    };
    const listener2 = {
      inform() {},
    };
    const listener3 = {
      inform() {},
    };

    eventManager.subscribe(listener1);
    eventManager.subscribe(listener2);
    eventManager.subscribe(listener3);

    listener1.inform = jest.fn();
    listener2.inform = jest.fn();
    listener3.inform = jest.fn();

    it('call inform methods of all listeners', () => {
      eventManager.notify('someEvent', 5);

      eventManager.listeners.forEach((listener) => {
        expect(listener.inform).toBeCalledWith('someEvent', 5);
      });
    });

    it('if data is not passed it is null by default', () => {
      eventManager.notify('someEvent');

      eventManager.listeners.forEach((listener) => {
        expect(listener.inform).toBeCalledWith('someEvent', null);
      });
    });

    it('if listeners array is empty nothing happens', () => {
      const newEventManager = new EventManager();
      newEventManager.notify('someEvent', 5);
    });
  });
});
