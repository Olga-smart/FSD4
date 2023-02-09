import Scale from './Scale';

describe('Scale', () => {
  describe('constructor(min, max, intervalsNumber)', () => {
    it('set up component property with necessary class', () => {
      const scale = new Scale(0, 150);
      expect(scale.getComponent().classList).toContain('range-slider__scale');
    });

    describe('create intervals', () => {
      it('create right amount of elements and append them to component', () => {
        for (let i = 1; i <= 20; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.getComponent().querySelectorAll('.range-slider__scale-interval')).toHaveLength(i);
        }
      });
    });

    describe('add marks in intervals', () => {
      it('if intervalsNumber < 5, add 4 marks', () => {
        for (let i = 1; i < 5; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.getComponent().querySelectorAll('.range-slider__scale-mark')).toHaveLength(i * 4);
        }
      });

      it('if intervalsNumber > 4 and < 8, add 3 marks', () => {
        for (let i = 5; i < 8; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.getComponent().querySelectorAll('.range-slider__scale-mark')).toHaveLength(i * 3);
        }
      });

      it('if intervalsNumber > 7 and < 15, add 2 marks', () => {
        for (let i = 8; i < 15; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.getComponent().querySelectorAll('.range-slider__scale-mark')).toHaveLength(i * 2);
        }
      });

      it('if intervalsNumber > 14 and < 29, add 1 mark', () => {
        for (let i = 15; i < 29; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.getComponent().querySelectorAll('.range-slider__scale-mark')).toHaveLength(i);
        }
      });

      it('if intervalsNumber > 28, add no marks', () => {
        const scale = new Scale(0, 150, 29);
        expect(scale.getComponent().querySelectorAll('.range-slider__scale-mark')).toHaveLength(0);
      });
    });

    describe('add values', () => {
      it('values length is 1 more than intervals length', () => {
        for (let i = 1; i <= 10; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.getComponent().querySelectorAll('.range-slider__scale-interval-value')).toHaveLength(i + 1);
        }
      });

      it('first value is min', () => {
        for (let i = -10; i <= 10; i += 1) {
          const scale = new Scale(i, 150);
          expect(scale.getComponent().querySelector('.range-slider__scale-interval-value_min')?.textContent).toBe(`${i}`);
        }
      });

      it('last value is max', () => {
        for (let i = -10; i <= 10; i += 1) {
          const scale = new Scale(-20, i);
          const valuesCollection = scale.getComponent().querySelectorAll('.range-slider__scale-interval-value');
          expect(valuesCollection[valuesCollection.length - 1].textContent).toBe(`${i}`);
        }
      });

      it('float values are supported', () => {
        const scale = new Scale(0, 1, 4);
        const values = scale.getComponent().querySelectorAll('.range-slider__scale-interval-value');

        for (let i = 0; i < 4; i += 1) {
          expect(values[i].textContent).not.toEqual(values[i + 1].textContent);
        }
      });
    });

    describe('attach event handlers', () => {
      it('notify subscribers, if click occurs', () => {
        const scale = new Scale(0, 150);

        const subscriber = {
          inform() {},
        };
        subscriber.inform = jest.fn();
        scale.subscribe(subscriber);

        const event = new MouseEvent('click', {
          clientX: 100,
          clientY: 100,
        });
        scale.getComponent().dispatchEvent(event);

        expect(subscriber.inform).toBeCalledWith('scaleClick', [event.clientX, event.clientY]);
      });
    });
  });

  describe('fitWidthForVertical()', () => {
    const scale = new Scale(0, 150);

    const valueElements: NodeListOf<HTMLDivElement> = scale.getComponent().querySelectorAll('.range-slider__scale-interval-value');
    valueElements[0].style.width = '100px';
    valueElements[1].style.width = '200px';
    valueElements[2].style.width = '300px';

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return parseInt(this.style.width, 10);
        },
      },
    });

    it('set up component padding right equal to width of valueElement with max width + 3px by default', () => {
      scale.fitWidthForVertical();
      expect(scale.getComponent().style.paddingRight).toBe('303px');
    });

    it('set up component padding right equal to width of valueElement with max width + indent, passed to method', () => {
      for (let i = 1; i <= 10; i += 1) {
        scale.fitWidthForVertical(i);
        expect(scale.getComponent().style.paddingRight).toBe(`${300 + i}px`);
      }
    });
  });

  describe('fitHeightForHorizontal()', () => {
    const scale = new Scale(0, 150);

    const valueElements: NodeListOf<HTMLDivElement> = scale.getComponent().querySelectorAll('.range-slider__scale-interval-value');
    valueElements[0].style.height = '100px';
    valueElements[1].style.height = '200px';
    valueElements[2].style.height = '300px';

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetHeight: {
        get() {
          return parseInt(this.style.height, 10);
        },
      },
    });

    it('set up component padding bottom equal to height of valueElement with max height + 3px by default', () => {
      scale.fitHeightForHorizontal();
      expect(scale.getComponent().style.paddingBottom).toBe('303px');
    });

    it('set up component padding bottom equal to height of valueElement with max height + indent, passed to method', () => {
      for (let i = 1; i <= 10; i += 1) {
        scale.fitHeightForHorizontal(i);
        expect(scale.getComponent().style.paddingBottom).toBe(`${300 + i}px`);
      }
    });
  });

  describe('handleSwitchFromHorizontalToVertical()', () => {
    const scale = new Scale(0, 150);
    scale.fitWidthForVertical = jest.fn();
    scale.handleSwitchFromHorizontalToVertical();

    it('reset bottom padding', () => {
      expect(scale.getComponent().style.paddingBottom).toBe('');
    });

    it('fit width', () => {
      expect(scale.fitWidthForVertical).toBeCalled();
    });
  });

  describe('handleSwitchFromVerticalToHorizontal()', () => {
    const scale = new Scale(0, 150);
    scale.fitHeightForHorizontal = jest.fn();
    scale.handleSwitchFromVerticalToHorizontal();

    it('reset right padding', () => {
      expect(scale.getComponent().style.paddingRight).toBe('');
    });

    it('fit width', () => {
      expect(scale.fitHeightForHorizontal).toBeCalled();
    });
  });
});
