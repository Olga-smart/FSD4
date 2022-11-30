import Track from './Track';

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
});
