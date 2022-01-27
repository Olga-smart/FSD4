import LabelsContainer from './LabelsContainer';

describe('LabelsContainer', () => {
  describe('constructor()', () => {
    const labelsContainer = new LabelsContainer();

    it('component property is div element', () => {
      expect(labelsContainer.getComponent()).toBeInstanceOf(HTMLDivElement);
    });

    it('component has necessary class', () => {
      expect(labelsContainer.getComponent().classList).toContain('range-slider__labels-container');
    });
  });

  describe('append(...elements)', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    const labelsContainer = new LabelsContainer();
    const div = document.createElement('div');
    jest.spyOn(HTMLElement.prototype, 'append');
    labelsContainer.append(div);

    it('append element to component', () => {
      expect(div.parentNode).toBe(labelsContainer.getComponent());
    });

    it('call built-in method append', () => {
      expect(labelsContainer.getComponent().append).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      labelsContainer.append(div1, div2, div3);

      expect(labelsContainer.getComponent().append).toBeCalledWith(div1, div2, div3);
    });
  });
});
