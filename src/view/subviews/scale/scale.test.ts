import Scale from './Scale';

describe('Scale', () => {
  describe('constructor(min, max, intervalsNumber)', () => {
    describe('set up necessary properties', () => {
      const scale = new Scale(0, 150, 4);

      it('set up view property', () => {
        expect(scale).toHaveProperty('view');
      });

      it('set up component property with necessary class', () => {
        expect(scale.component.classList).toContain('range-slider__scale');
      });

      it('set up min property', () => {
        for (let i = -10; i <= 10; i += 1) {
          const newScale = new Scale(i, 150, 4);
          expect(newScale.min).toBe(i);
        }
      });

      it('set up max property', () => {
        for (let i = -10; i <= 10; i += 1) {
          const newScale = new Scale(-20, i, 4);
          expect(newScale.max).toBe(i);
        }
      });

      it('set up intervalsNumber property', () => {
        for (let i = 1; i <= 10; i += 1) {
          const newScale = new Scale(-20, 150, i);
          expect(newScale.intervalsNumber).toBe(i);
        }
      });

      it('set up intervals property', () => {
        expect(scale.intervals).toBeInstanceOf(Array);
      });

      it('set up values property', () => {
        expect(scale.values).toBeInstanceOf(Array);
      });

      it('set up valueElements property', () => {
        expect(scale.valueElements).toBeInstanceOf(Array);
      });
    });

    describe('create intervals', () => {
      it('create right amount of elements and push them into intervals property', () => {
        for (let i = 1; i <= 20; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.intervals).toHaveLength(i);
        }
      });

      it('add necessary class to all elements', () => {
        const scale = new Scale(0, 150, 10);
        scale.intervals.forEach((item) => {
          expect(item.classList).toContain('range-slider__scale-interval');
        });
      });

      it('create right amount of elements and append them to component', () => {
        for (let i = 1; i <= 20; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.component.querySelectorAll('.range-slider__scale-interval')).toHaveLength(i);
        }
      });
    });

    describe('add marks in intervals', () => {
      it('if intervalsNumber < 5, add 4 marks', () => {
        for (let i = 1; i < 5; i += 1) {
          const scale = new Scale(0, 150, i);
          scale.intervals.forEach((item) => {
            expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(4);
          });
        }
      });

      it('if intervalsNumber > 4 and < 8, add 3 marks', () => {
        for (let i = 5; i < 8; i += 1) {
          const scale = new Scale(0, 150, i);
          scale.intervals.forEach((item) => {
            expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(3);
          });
        }
      });

      it('if intervalsNumber > 7 and < 15, add 2 marks', () => {
        for (let i = 8; i < 15; i += 1) {
          const scale = new Scale(0, 150, i);
          scale.intervals.forEach((item) => {
            expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(2);
          });
        }
      });

      it('if intervalsNumber > 14 and < 29, add 1 mark', () => {
        for (let i = 15; i < 29; i += 1) {
          const scale = new Scale(0, 150, i);
          scale.intervals.forEach((item) => {
            expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(1);
          });
        }
      });

      it('if intervalsNumber > 28, add no marks', () => {
        const scale = new Scale(0, 150, 29);
        scale.intervals.forEach((item) => {
          expect(item.querySelectorAll('.range-slider__scale-mark')).toHaveLength(0);
        });
      });
    });

    describe('add values', () => {
      it('values length is 1 more than intervals length', () => {
        for (let i = 1; i <= 10; i += 1) {
          const scale = new Scale(0, 150, i);
          expect(scale.values.length).toBe(i + 1);
        }
      });

      it('first value is min', () => {
        for (let i = -10; i <= 10; i += 1) {
          const scale = new Scale(i, 150, 4);
          expect(scale.values[0]).toBe(i);
        }
      });

      it('last value is max', () => {
        for (let i = -10; i <= 10; i += 1) {
          const scale = new Scale(-20, i, 4);
          expect(scale.values[scale.values.length - 1]).toBe(i);
        }
      });

      it('every value element has special class', () => {
        const scale = new Scale(0, 150, 4);
        scale.valueElements.forEach((valueElement) => {
          expect(valueElement.classList).toContain('range-slider__scale-interval-value');
        });
      });

      it('first value element has special class', () => {
        const scale = new Scale(0, 150, 4);
        expect(scale.valueElements[0].classList).toContain('range-slider__scale-interval-value_min');
      });

      it('every valueElement contains corresponding value', () => {
        const scale = new Scale(0, 150, 4);
        for (let i = 0; i < scale.valueElements.length; i += 1) {
          expect(scale.valueElements[i].textContent).toBe(`${scale.values[i]}`);
        }
      });
    });
  });

  describe('registerWith(view)', () => {
    const scale = new Scale(0, 150, 4);
    const view: any = {};
    scale.registerWith(view);

    it('set up view', () => {
      expect(scale.view).toBe(view);
    });
  });

  describe('fitWidthForVertical()', () => {
    const scale = new Scale(0, 150, 2);

    scale.valueElements[0].style.width = '100px';
    scale.valueElements[1].style.width = '200px';
    scale.valueElements[2].style.width = '300px';

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          return parseInt(this.style.width, 10);
        },
      },
    });

    scale.fitWidthForVertical();

    it('set up component padding right equal to width of valueElement with max width + 3px', () => {
      expect(scale.component.style.paddingRight).toBe('303px');
    });
  });

  describe('fitHeightForHorizontal()', () => {
    const scale = new Scale(0, 150, 2);

    scale.valueElements[0].style.height = '100px';
    scale.valueElements[1].style.height = '200px';
    scale.valueElements[2].style.height = '300px';

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetHeight: {
        get() {
          return parseInt(this.style.height, 10);
        },
      },
    });

    scale.fitHeightForHorizontal();

    it('set up component padding bottom equal to height of valueElement with max height + 3px', () => {
      expect(scale.component.style.paddingBottom).toBe('303px');
    });
  });

  describe('handleSwitchFromHorizontalToVertical()', () => {
    const scale = new Scale(0, 150, 2);
    scale.fitWidthForVertical = jest.fn();
    scale.handleSwitchFromHorizontalToVertical();

    it('reset bottom padding', () => {
      expect(scale.component.style.paddingBottom).toBe('');
    });

    it('fit width', () => {
      expect(scale.fitWidthForVertical).toBeCalled();
    });
  });

  describe('handleSwitchFromVerticalToHorizontal()', () => {
    const scale = new Scale(0, 150, 2);
    scale.fitHeightForHorizontal = jest.fn();
    scale.handleSwitchFromVerticalToHorizontal();

    it('reset right padding', () => {
      expect(scale.component.style.paddingRight).toBe('');
    });

    it('fit width', () => {
      expect(scale.fitHeightForHorizontal).toBeCalled();
    });
  });

  describe('handle events', () => {
    it('handle click', () => {
      const scale = new Scale(0, 150, 4);
      const view: any = {};
      scale.registerWith(view);
      scale.view!.handleScaleOrTrackClick = jest.fn();
      const event = new Event('click');
      scale.component.dispatchEvent(event);

      const x = (event as MouseEvent).clientX
              - scale.component.getBoundingClientRect().left;
      const y = (event as MouseEvent).clientY
              - scale.component.getBoundingClientRect().top;

      expect(scale.view!.handleScaleOrTrackClick).toBeCalledWith(x, y);
    });
  });
});
