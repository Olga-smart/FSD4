import { Slider } from './slider';

describe('Slider', () => {
  describe('constructor()', () => {
    describe('set up component property with necessary classes', () => {
      const slider = new Slider();

      it('common class', () => {
        expect(slider.component.classList).toContain('range-slider__slider');
      });

      it('component property is div element', () => {
        expect(slider.component).toBeInstanceOf(HTMLDivElement);
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
      expect(div.parentNode).toBe(slider.component);
    });

    it('call built-in method append', () => {
      expect(slider.component.append).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      slider.append(div1, div2, div3);

      expect(slider.component.append).toBeCalledWith(div1, div2, div3);
    });
  });

  describe('before(...elements)', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    const slider = new Slider();
    const div = document.createElement('div');
    slider.component.before = jest.fn();
    slider.before(div);

    it('call built-in method before', () => {
      expect(slider.component.before).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      slider.before(div1, div2, div3);

      expect(slider.component.before).toBeCalledWith(div1, div2, div3);
    });
  });
});
