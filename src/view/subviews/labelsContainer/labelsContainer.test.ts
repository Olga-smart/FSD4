import LabelsContainer from './labelsContainer';
import Label from '../label/label';

describe('LabelsContainer', () => {
  describe('constructor()', () => {
    const labelsContainer = new LabelsContainer();

    it('set up component property', () => {
      expect(labelsContainer).toHaveProperty('component');
    });

    it('component property is div element', () => {
      expect(labelsContainer.component).toBeInstanceOf(HTMLDivElement);
    });

    it('component has necessary class', () => {
      expect(labelsContainer.component.classList).toContain('range-slider__labels-container');
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
      expect(div.parentNode).toBe(labelsContainer.component);
    });

    it('call built-in method append', () => {
      expect(labelsContainer.component.append).toBeCalledWith(div);
    });

    it('work with multiple arguments', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      labelsContainer.append(div1, div2, div3);

      expect(labelsContainer.component.append).toBeCalledWith(div1, div2, div3);
    });
  });

  describe('fixWidthForVertical(labels)', () => {
    const labelsContainer = new LabelsContainer();

    it('set up component width equal to width of label with max width + 4px', () => {
      const label1 = new Label();
      const label2 = new Label();
      const label3 = new Label();

      label1.getOffsetWidth = jest.fn();
      label2.getOffsetWidth = jest.fn();
      label3.getOffsetWidth = jest.fn();

      (label1.getOffsetWidth as jest.Mock).mockReturnValue(100);
      (label2.getOffsetWidth as jest.Mock).mockReturnValue(200);
      (label3.getOffsetWidth as jest.Mock).mockReturnValue(300);

      labelsContainer.fixWidthForVertical([label1, label2, label3]);
      expect(labelsContainer.component.style.paddingLeft).toBe(`${304}px`);
    });
  });

  describe('fixHeightForHorizontal(labels)', () => {
    const labelsContainer = new LabelsContainer();

    it('set up component height equal to height of label with max height + 4px', () => {
      const label1 = new Label();
      const label2 = new Label();
      const label3 = new Label();

      label1.getOffsetHeight = jest.fn();
      label2.getOffsetHeight = jest.fn();
      label3.getOffsetHeight = jest.fn();

      (label1.getOffsetHeight as jest.Mock).mockReturnValue(100);
      (label2.getOffsetHeight as jest.Mock).mockReturnValue(200);
      (label3.getOffsetHeight as jest.Mock).mockReturnValue(300);

      labelsContainer.fixHeightForHorizontal([label1, label2, label3]);
      expect(labelsContainer.component.style.paddingTop).toBe(`${304}px`);
    });
  });
});
