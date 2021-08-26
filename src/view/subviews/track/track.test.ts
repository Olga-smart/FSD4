import {Track} from "./track";

describe('Track', function() {

  describe('constructor()', function() {

    jest.spyOn(Track.prototype, 'attachEventHandlers');
    let track = new Track();

    describe('set up component property with necessary classes', function() {      

      it('common class', function() {        
        expect(track.component.classList).toContain('range-slider__track');
      });

      it('component property is div element', function() {
        expect(track.component).toBeInstanceOf(HTMLDivElement);
      });

    });

    it('set up view property', function() {
      expect(track).toHaveProperty('view');
    });

    it('attach event handlers', function() {
      expect(track.attachEventHandlers).toBeCalled();
    });

  });

  describe('registerWith(view)', function() {

    let track = new Track();
    let view: any = {};
    track.registerWith(view);

    it('set up view', function() {
      expect(track.view).toBe(view);
    });

  });

  describe('getOffsetWidth()', function() {

    let track = new Track();
    let width = track.getOffsetWidth();

    it('return component width', function() {
      expect(width).toBe(track.component.offsetWidth);
    });

  });

  describe('getOffsetHeight()', function() {

    let track = new Track();
    let height = track.getOffsetHeight();

    it('return component height', function() {
      expect(height).toBe(track.component.offsetWidth);
    });

  });

  describe('getBoundingClientRect()', function() {

    let track = new Track();
    let coords = track.getBoundingClientRect();

    it('return component coordinates', function() {
      expect(coords).toEqual(track.component.getBoundingClientRect());
    });

  });

  describe('append(...elements)', function() {

    let track = new Track();
    let div = document.createElement('div');
    jest.spyOn(HTMLElement.prototype, 'append');
    track.append(div);

    it('append element to component', function() {
      expect(div.parentNode).toBe(track.component);
    });

    it('call built-in method append', function() {
      expect(track.component.append).toBeCalledWith(div);
    });

    it('work with multiple arguments', function() {
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let div3 = document.createElement('div');
      track.append(div1, div2, div3);

      expect(track.component.append).toBeCalledWith(div1, div2, div3);
    });

  });

  describe('attachEventHandlers()', function() {

    it('handle click', function() {
      let track = new Track();
      let view: any = {};
      track.registerWith(view);
      track.view!.handleScaleOrTrackClick = jest.fn();
      let event = new Event('click');
      track.component.dispatchEvent(event);

      let x = (event as MouseEvent).clientX - track.getBoundingClientRect().left;
      let y = (event as MouseEvent).clientY - track.getBoundingClientRect().top;

      expect(track.view!.handleScaleOrTrackClick).toBeCalledWith(x, y);
    });

    it('if view is not registered nothing happens on click', function() {
      let track = new Track();
      let event = new Event('click');
      track.component.dispatchEvent(event);

      expect(track.view?.handleScaleOrTrackClick).not.toBeCalled;
    });

  });

});