import Slider from './Slider';

describe('Slider', () => {
  describe('constructor()', () => {
    describe('set up component property with necessary classes', () => {
      const slider = new Slider();

      it('common class', () => {
        expect(slider.getComponent().classList).toContain('range-slider__slider');
      });

      it('component property is div element', () => {
        expect(slider.getComponent()).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('append(...elements)', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    const slider = new Slider();
    const div = document.createElement('div');
    jest.spyOn(HTMLElement.prototype, 'append');
    slider.append(div);

    it('append elements to slider component', () => {
      expect(div.parentNode).toBe(slider.getComponent());
    });

    it('call built-in method append', () => {
      expect(slider.getComponent().append).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      slider.append(div1, div2, div3);

      expect(slider.getComponent().append).toBeCalledWith(div1, div2, div3);
    });
  });

  describe('before(...elements)', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    const slider = new Slider();
    const div = document.createElement('div');
    slider.getComponent().before = jest.fn();
    slider.before(div);

    it('call built-in method before', () => {
      expect(slider.getComponent().before).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      slider.before(div1, div2, div3);

      expect(slider.getComponent().before).toBeCalledWith(div1, div2, div3);
    });
  });

  describe('after(...elements)', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    const slider = new Slider();
    const div = document.createElement('div');
    slider.getComponent().after = jest.fn();
    slider.after(div);

    it('call built-in method after', () => {
      expect(slider.getComponent().after).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      slider.after(div1, div2, div3);

      expect(slider.getComponent().after).toBeCalledWith(div1, div2, div3);
    });
  });
});
