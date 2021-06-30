import {Track} from "./track.js";

describe('Track', function() {

  describe('constructor()', function() {

    describe('set up component property with necessary classes', function() {

      let track = new Track();

      it('common class', function() {        
        expect(track.component.classList).toContain('range-slider__track');
      });

    });

  });

  describe('registerWith(view)', function() {

    let track = new Track();
    let view = {};
    track.registerWith(view);

    it('set up view', function() {
      expect(track.view).toBe(view);
    });

  });

  describe('attachEventHandlers()', function() {

    it('handle click', function() {
      let track = new Track();
      let view = {};
      track.registerWith(view);
      track.view.handleScaleClick = jest.fn();
      let event = new Event('click');
      track.component.dispatchEvent(event);

      expect(track.view.handleScaleClick).toBeCalledWith(event.clientX, event.clientY);
    });

  });

});