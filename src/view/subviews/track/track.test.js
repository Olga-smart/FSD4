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

});