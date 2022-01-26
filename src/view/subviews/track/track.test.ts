import Track from './Track';
import View from '../../View';

describe('Track', () => {
  describe('constructor()', () => {
    const track = new Track();

    describe('set up component property with necessary classes', () => {
      it('common class', () => {
        expect(track.getComponent().classList).toContain('range-slider__track');
      });

      it('component property is div element', () => {
        expect(track.getComponent()).toBeInstanceOf(HTMLDivElement);
      });
    });

    it('set up view property', () => {
      expect(track).toHaveProperty('view');
    });
  });

  describe('getOffsetWidth()', () => {
    const track = new Track();
    const width = track.getOffsetWidth();

    it('return component width', () => {
      expect(width).toBe(track.getComponent().offsetWidth);
    });
  });

  describe('getOffsetHeight()', () => {
    const track = new Track();
    const height = track.getOffsetHeight();

    it('return component height', () => {
      expect(height).toBe(track.getComponent().offsetWidth);
    });
  });

  describe('getBoundingClientRect()', () => {
    const track = new Track();
    const coords = track.getBoundingClientRect();

    it('return component coordinates', () => {
      expect(coords).toEqual(track.getComponent().getBoundingClientRect());
    });
  });

  describe('append(...elements)', () => {
    const track = new Track();
    const div = document.createElement('div');
    jest.spyOn(HTMLElement.prototype, 'append');
    track.append(div);

    it('append element to component', () => {
      expect(div.parentNode).toBe(track.getComponent());
    });

    it('call built-in method append', () => {
      expect(track.getComponent().append).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      track.append(div1, div2, div3);

      expect(track.getComponent().append).toBeCalledWith(div1, div2, div3);
    });
  });

  describe('getComponent()', () => {
    it('return HTML element', () => {
      const track = new Track();
      expect(track.getComponent()).toBeInstanceOf(HTMLElement);
    });
  });

  describe('handle events', () => {
    it('handle click', () => {
      const track = new Track();
      const view: any = {};
      track.registerWith(view);
      view.handleScaleOrTrackClick = jest.fn();
      const event = new Event('click');
      track.getComponent().dispatchEvent(event);

      const x = (event as MouseEvent).clientX - track.getBoundingClientRect().left;
      const y = (event as MouseEvent).clientY - track.getBoundingClientRect().top;

      expect(view.handleScaleOrTrackClick).toBeCalledWith(x, y);
    });

    it('if view is not registered nothing happens on click', () => {
      const track = new Track();
      const event = new Event('click');
      track.getComponent().dispatchEvent(event);
      jest.spyOn(View.prototype, 'handleScaleOrTrackClick');

      expect(View.prototype.handleScaleOrTrackClick).not.toBeCalled();
    });
  });
});
