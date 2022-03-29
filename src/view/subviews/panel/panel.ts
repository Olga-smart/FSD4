import BaseElement from '../../BaseElement/BaseElement';

type PanelOptions = {
  min: number,
  max: number,
  step: number,
  from: number,
  to: number | null,
  vertical: boolean,
  range: boolean,
  scale: boolean,
  scaleIntervals: number | null,
  valueLabels: boolean,
  minMaxLabels: boolean
};

type ViewForPanel = {
  isRange(): boolean,
  changeMinFromOutside(value: number): void,
  changeMaxFromOutside(value: number): void,
  changeStepFromOutside(value: number): void,
  changeLeftValueFromOutside(value: number): void,
  changeRightValueFromOutside(value: number): void,
  changeOrientationFromOutside(): void,
  toggleRangeFromOutside(): void,
  toggleScaleFromOutside(): void,
  changeScaleIntervals(value: number): void,
  toggleValueLabels(): void,
  toggleMinMaxLabels(): void,
};

class Panel extends BaseElement<'form'> {
  private view: ViewForPanel;

  private min: HTMLInputElement;

  private max: HTMLInputElement;

  private step: HTMLInputElement;

  private from: HTMLInputElement;

  private to: HTMLInputElement;

  private vertical: HTMLInputElement;

  private range: HTMLInputElement;

  private scale: HTMLInputElement;

  private scaleIntervals: HTMLInputElement;

  private valueLabels: HTMLInputElement;

  private minMaxLabels: HTMLInputElement;

  constructor(view: ViewForPanel) {
    super('form', 'range-slider__panel panel');

    this.view = view;

    this.min = BaseElement.createComponent('input', 'panel__min panel__input');
    this.max = BaseElement.createComponent('input', 'panel__max panel__input');
    this.step = BaseElement.createComponent('input', 'panel__step panel__input');
    this.from = BaseElement.createComponent('input', 'panel__from panel__input');
    this.to = BaseElement.createComponent('input', 'panel__to panel__input');

    this.vertical = BaseElement.createComponent('input', 'panel__vertical panel__checkbox');
    this.range = BaseElement.createComponent('input', 'panel__range panel__checkbox');
    this.scale = BaseElement.createComponent('input', 'panel__scale panel__checkbox');
    this.scaleIntervals = BaseElement.createComponent('input', 'panel__scale-intervals panel__input');
    this.valueLabels = BaseElement.createComponent('input', 'panel__value-labels panel__checkbox');
    this.minMaxLabels = BaseElement.createComponent('input', 'panel__min-max-labels panel__checkbox');

    this.render();
    this.attachEventHandlers();
  }

  setValues(options: PanelOptions): void {
    this.min.value = `${options.min}`;
    this.max.value = `${options.max}`;
    this.step.value = `${options.step}`;
    this.from.value = `${options.from}`;
    this.to.value = `${options.to}`;
    this.vertical.checked = options.vertical;
    this.range.checked = options.range;
    this.scale.checked = options.scale;
    this.scaleIntervals.value = `${options.scaleIntervals}`;
    this.valueLabels.checked = options.valueLabels;
    this.minMaxLabels.checked = options.minMaxLabels;

    this.setCheckMarks();
    this.setAttributes(options);
  }

  updateFrom(value: number): void {
    this.from.value = `${value}`;
    this.updateAttributesAfterFromChange();
  }

  updateTo(value: number | ''): void {
    this.to.value = `${value}`;
    this.updateAttributesAfterToChange();
  }

  updateStep(value: number): void {
    this.step.value = `${value}`;
    this.updateAttributesAfterStepChange();
  }

  updateScaleIntervals(value: number | ''): void {
    this.scaleIntervals.value = `${value}`;
  }

  private static addLabel(input: HTMLElement, name: string, className?: string): HTMLElement {
    const label: HTMLElement = BaseElement.createComponent('label', 'panel__label');
    label.textContent = name;

    if (className) {
      label.classList.add(className);
    }

    label.append(input);

    return label;
  }

  private static calcStepMin(step: number): number {
    if (Number.isInteger(step)) {
      return 1;
    }

    const numberOfSymbolsAfterComma = step.toString().split('.')[1].length;
    let result: string = '1';

    for (let i = numberOfSymbolsAfterComma; i > 1; i -= 1) {
      result = `0${result}`;
    }

    result = `0.${result}`;

    return Number(result);
  }

  private static toggleCheckbox(input: HTMLElement): void {
    const label: HTMLLabelElement | null = input.closest('label');
    label?.classList.toggle('panel__label_for-checkbox_checked');
  }

  private render(): void {
    this.setTypes();
    this.component.append(
      Panel.addLabel(this.range, 'Range:', 'panel__label_for-checkbox'),
      Panel.addLabel(this.vertical, 'Vertical:', 'panel__label_for-checkbox'),
      Panel.addLabel(this.valueLabels, 'Value labels:', 'panel__label_for-checkbox'),
      Panel.addLabel(this.minMaxLabels, 'Min&max labels:', 'panel__label_for-checkbox'),
      Panel.addLabel(this.scale, 'Scale:', 'panel__label_for-checkbox'),
      Panel.addLabel(this.scaleIntervals, 'Scale intervals:'),
      Panel.addLabel(this.min, 'Min:'),
      Panel.addLabel(this.max, 'Max:'),
      Panel.addLabel(this.from, 'From:'),
      Panel.addLabel(this.to, 'To:'),
      Panel.addLabel(this.step, 'Step:'),
    );
  }

  private setTypes(): void {
    this.min.type = 'number';
    this.max.type = 'number';
    this.step.type = 'number';
    this.from.type = 'number';
    this.to.type = 'number';
    this.vertical.type = 'checkbox';
    this.range.type = 'checkbox';
    this.scale.type = 'checkbox';
    this.scaleIntervals.type = 'number';
    this.valueLabels.type = 'checkbox';
    this.minMaxLabels.type = 'checkbox';
  }

  private setAttributes(options: PanelOptions): void {
    this.from.min = `${options.min}`;
    this.from.max = options.range ? `${options.to}` : `${options.max}`;

    this.to.min = `${options.from}`;
    this.to.max = `${options.max}`;

    this.from.step = `${options.step}`;
    this.to.step = `${options.step}`;

    this.min.max = `${options.from}`;
    this.max.min = options.range ? `${options.to}` : `${options.from}`;

    this.step.min = `${Panel.calcStepMin(options.step)}`;
    this.step.step = this.step.min;
    this.step.max = `${Math.abs(options.max - options.min)}`;

    if (!options.range) {
      this.to.disabled = true;
    }

    this.scaleIntervals.min = '1';

    if (!options.scale) {
      this.scaleIntervals.disabled = true;
    }
  }

  private setCheckMarks(): void {
    const checkboxes = [
      this.vertical,
      this.range,
      this.scale,
      this.valueLabels,
      this.minMaxLabels,
    ];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        Panel.toggleCheckbox(checkbox);
      }
    });
  }

  private updateAttributesAfterFromChange(): void {
    this.min.max = this.from.value;

    if (this.view.isRange()) {
      this.to.min = this.from.value;
    }

    if (!this.view.isRange()) {
      this.max.min = this.from.value;
    }
  }

  private updateAttributesAfterToChange(): void {
    this.from.max = this.to.value;
    this.max.min = this.to.value;
  }

  private updateAttributesAfterStepChange(): void {
    this.step.min = `${Panel.calcStepMin(Number(this.step.value))}`;
    this.step.step = `${Panel.calcStepMin(Number(this.step.value))}`;
  }

  private updateAttributesAfterMinChange(): void {
    this.from.min = this.min.value;
  }

  private updateAttributesAfterMaxChange(): void {
    if (!this.view.isRange()) {
      this.from.max = this.max.value;
    }

    if (this.view.isRange()) {
      this.to.max = this.max.value;
    }
  }

  private handleMinChange(): void {
    if (Number(this.min.value) > Number(this.from.value)) {
      this.min.value = this.from.value;
    }

    this.view.changeMinFromOutside(Number(this.min.value));
    this.updateAttributesAfterMinChange();
  }

  private handleMaxChange(): void {
    if (!this.view.isRange()) {
      if (Number(this.max.value) < Number(this.from.value)) {
        this.max.value = this.from.value;
      }
    }

    if (this.view.isRange()) {
      if (Number(this.max.value) < Number(this.to.value)) {
        this.max.value = this.to.value;
      }
    }

    this.view.changeMaxFromOutside(Number(this.max.value));
    this.step.max = `${Math.abs(Number(this.max.value) - Number(this.min.value))}`;
    this.updateAttributesAfterMaxChange();
  }

  private handleStepChange(): void {
    if (Number(this.step.value) > Number(this.step.max)) {
      this.step.value = this.step.max;
    }

    if (Number(this.step.value) <= 0) {
      this.step.value = this.step.min;
    }

    this.view.changeStepFromOutside(Number(this.step.value));
    this.updateAttributesAfterStepChange();
  }

  private handleFromChange(): void {
    if (Number(this.from.value) > Number(this.from.max)) {
      this.from.value = this.from.max;
    }

    if (Number(this.from.value) < Number(this.from.min)) {
      this.from.value = this.from.min;
    }

    this.view.changeLeftValueFromOutside(Number(this.from.value));
    this.updateAttributesAfterFromChange();
  }

  private handleToChange(): void {
    if (Number(this.to.value) > Number(this.to.max)) {
      this.to.value = this.to.max;
    }

    if (Number(this.to.value) < Number(this.to.min)) {
      this.to.value = this.to.min;
    }

    this.view.changeRightValueFromOutside(Number(this.to.value));
    this.updateAttributesAfterToChange();
  }

  private handleVerticalChange(): void {
    this.view.changeOrientationFromOutside();
    Panel.toggleCheckbox(this.vertical);
  }

  private handleRangeChange(): void {
    this.view.toggleRangeFromOutside();

    this.to.disabled = !this.to.disabled;

    if (this.range.checked) {
      this.from.max = this.to.value;
    } else {
      this.from.max = this.max.value;
    }

    Panel.toggleCheckbox(this.range);
  }

  private handleScaleChange(): void {
    this.view.toggleScaleFromOutside();

    this.scaleIntervals.disabled = !this.scaleIntervals.disabled;

    Panel.toggleCheckbox(this.scale);
  }

  private handleScaleIntervalsChange(): void {
    if (Number(this.scaleIntervals.value) < Number(this.scaleIntervals.min)) {
      this.scaleIntervals.value = this.scaleIntervals.min;
    }

    if (!Number.isInteger(this.scaleIntervals.value)) {
      this.scaleIntervals.value = `${Math.floor(Number(this.scaleIntervals.value))}`;
    }

    this.view.changeScaleIntervals(Number(this.scaleIntervals.value));
  }

  private handleValueLabelsChange(): void {
    this.view.toggleValueLabels();
    Panel.toggleCheckbox(this.valueLabels);
  }

  private handleMinMaxLabelsChange(): void {
    this.view.toggleMinMaxLabels();
    Panel.toggleCheckbox(this.minMaxLabels);
  }

  private attachEventHandlers(): void {
    this.min.addEventListener('change', this.handleMinChange.bind(this));
    this.max.addEventListener('change', this.handleMaxChange.bind(this));
    this.step.addEventListener('change', this.handleStepChange.bind(this));
    this.from.addEventListener('change', this.handleFromChange.bind(this));
    this.to.addEventListener('change', this.handleToChange.bind(this));
    this.vertical.addEventListener('change', this.handleVerticalChange.bind(this));
    this.range.addEventListener('change', this.handleRangeChange.bind(this));
    this.scale.addEventListener('change', this.handleScaleChange.bind(this));
    this.scaleIntervals.addEventListener('change', this.handleScaleIntervalsChange.bind(this));
    this.valueLabels.addEventListener('change', this.handleValueLabelsChange.bind(this));
    this.minMaxLabels.addEventListener('change', this.handleMinMaxLabelsChange.bind(this));
  }
}

export { PanelOptions, Panel };
