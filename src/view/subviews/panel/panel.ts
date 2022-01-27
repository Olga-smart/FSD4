import BaseElement from '../../BaseElement/BaseElement';
import createElement from '../../helpers/createElement';

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

class Panel extends BaseElement {
  private view: any;

  private min: HTMLElement;

  private max: HTMLElement;

  private step: HTMLElement;

  private from: HTMLElement;

  private to: HTMLElement;

  private vertical: HTMLElement;

  private range: HTMLElement;

  private scale: HTMLElement;

  private scaleIntervals: HTMLElement;

  private valueLabels: HTMLElement;

  private minMaxLabels: HTMLElement;

  constructor() {
    super('div', 'range-slider__panel panel');

    this.view = null;

    this.min = createElement('input', 'panel__min panel__input');
    this.max = createElement('input', 'panel__max panel__input');
    this.step = createElement('input', 'panel__step panel__input');
    this.from = createElement('input', 'panel__from panel__input');
    this.to = createElement('input', 'panel__to panel__input');

    this.vertical = createElement('input', 'panel__vertical panel__checkbox');
    this.range = createElement('input', 'panel__range panel__checkbox');
    this.scale = createElement('input', 'panel__scale panel__checkbox');
    this.scaleIntervals = createElement('input', 'panel__scale-intervals panel__input');
    this.valueLabels = createElement('input', 'panel__value-labels panel__checkbox');
    this.minMaxLabels = createElement('input', 'panel__min-max-labels panel__checkbox');

    this.render();
    this.attachEventHandlers();
  }

  registerWith(view: any): void {
    this.view = view;
  }

  setValues(options: PanelOptions): void {
    (this.min as HTMLInputElement).value = `${options.min}`;
    (this.max as HTMLInputElement).value = `${options.max}`;
    (this.step as HTMLInputElement).value = `${options.step}`;
    (this.from as HTMLInputElement).value = `${options.from}`;
    (this.to as HTMLInputElement).value = `${options.to}`;
    (this.vertical as HTMLInputElement).checked = options.vertical;
    (this.range as HTMLInputElement).checked = options.range;
    (this.scale as HTMLInputElement).checked = options.scale;
    (this.scaleIntervals as HTMLInputElement).value = `${options.scaleIntervals}`;
    (this.valueLabels as HTMLInputElement).checked = options.valueLabels;
    (this.minMaxLabels as HTMLInputElement).checked = options.minMaxLabels;

    this.setCheckMarks();
    this.setAttributes(options);
  }

  updateFrom(value: number): void {
    (this.from as HTMLInputElement).value = `${value}`;
    this.updateAttributesAfterFromChange();
  }

  updateTo(value: number | ''): void {
    (this.to as HTMLInputElement).value = `${value}`;
    this.updateAttributesAfterToChange();
  }

  updateStep(value: number): void {
    (this.step as HTMLInputElement).value = `${value}`;
    this.updateAttributesAfterStepChange();
  }

  updateScaleIntervals(value: number | ''): void {
    (this.scaleIntervals as HTMLInputElement).value = `${value}`;
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

  private static addLabel(input: HTMLElement, name: string, className?: string): HTMLElement {
    const label: HTMLElement = createElement('label', 'panel__label');
    label.textContent = name;

    if (className) {
      label.classList.add(className);
    }

    label.append(input);

    return label;
  }

  private setTypes(): void {
    (this.min as HTMLInputElement).type = 'number';
    (this.max as HTMLInputElement).type = 'number';
    (this.step as HTMLInputElement).type = 'number';
    (this.from as HTMLInputElement).type = 'number';
    (this.to as HTMLInputElement).type = 'number';
    (this.vertical as HTMLInputElement).type = 'checkbox';
    (this.range as HTMLInputElement).type = 'checkbox';
    (this.scale as HTMLInputElement).type = 'checkbox';
    (this.scaleIntervals as HTMLInputElement).type = 'number';
    (this.valueLabels as HTMLInputElement).type = 'checkbox';
    (this.minMaxLabels as HTMLInputElement).type = 'checkbox';
  }

  private setAttributes(options: PanelOptions): void {
    (this.from as HTMLInputElement).min = `${options.min}`;
    (this.from as HTMLInputElement).max = options.range ? `${options.to}` : `${options.max}`;

    (this.to as HTMLInputElement).min = `${options.from}`;
    (this.to as HTMLInputElement).max = `${options.max}`;

    (this.from as HTMLInputElement).step = `${options.step}`;
    (this.to as HTMLInputElement).step = `${options.step}`;

    (this.min as HTMLInputElement).max = `${options.from}`;
    (this.max as HTMLInputElement).min = options.range ? `${options.to}` : `${options.from}`;

    (this.step as HTMLInputElement).min = `${Panel.calcStepMin(options.step)}`;
    (this.step as HTMLInputElement).step = (this.step as HTMLInputElement).min;
    (this.step as HTMLInputElement).max = `${Math.abs(options.max - options.min)}`;

    if (!options.range) {
      (this.to as HTMLInputElement).disabled = true;
    }

    (this.scaleIntervals as HTMLInputElement).min = '1';

    if (!options.scale) {
      (this.scaleIntervals as HTMLInputElement).disabled = true;
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
      if ((checkbox as HTMLInputElement).checked) {
        Panel.toggleCheckbox(checkbox);
      }
    });
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

  private updateAttributesAfterFromChange(): void {
    const from = this.from as HTMLInputElement;

    (this.min as HTMLInputElement).max = from.value;

    if (this.view?.isRange()) {
      (this.to as HTMLInputElement).min = from.value;
    }

    if (!this.view?.isRange()) {
      (this.max as HTMLInputElement).min = from.value;
    }
  }

  private updateAttributesAfterToChange(): void {
    const to = this.to as HTMLInputElement;

    (this.from as HTMLInputElement).max = to.value;
    (this.max as HTMLInputElement).min = to.value;
  }

  private updateAttributesAfterStepChange(): void {
    const step = this.step as HTMLInputElement;

    step.min = `${Panel.calcStepMin(Number(step.value))}`;
    step.step = `${Panel.calcStepMin(Number(step.value))}`;
  }

  private updateAttributesAfterMinChange(): void {
    (this.from as HTMLInputElement).min = (this.min as HTMLInputElement).value;
  }

  private updateAttributesAfterMaxChange(): void {
    if (!this.view?.isRange()) {
      (this.from as HTMLInputElement).max = (this.max as HTMLInputElement).value;
    }

    if (this.view?.isRange()) {
      (this.to as HTMLInputElement).max = (this.max as HTMLInputElement).value;
    }
  }

  private handleMinChange(): void {
    const min = this.min as HTMLInputElement;
    const from = this.from as HTMLInputElement;

    if (Number(min.value) > Number(from.value)) {
      min.value = from.value;
    }

    this.view?.changeMinFromOutside(Number(min.value));
    this.updateAttributesAfterMinChange();
  }

  private handleMaxChange(): void {
    const max = this.max as HTMLInputElement;

    if (!this.view?.isRange()) {
      const from = this.from as HTMLInputElement;

      if (Number(max.value) < Number(from.value)) {
        max.value = from.value;
      }
    }

    if (this.view?.isRange()) {
      const to = this.to as HTMLInputElement;

      if (Number(max.value) < Number(to.value)) {
        max.value = to.value;
      }
    }

    this.view?.changeMaxFromOutside(Number(max.value));

    const min = this.min as HTMLInputElement;
    (this.step as HTMLInputElement).max = `${Math.abs(Number(max.value) - Number(min.value))}`;

    this.updateAttributesAfterMaxChange();
  }

  private handleStepChange(): void {
    const step = this.step as HTMLInputElement;

    if (Number(step.value) > Number(step.max)) {
      step.value = step.max;
    }

    if (Number(step.value) <= 0) {
      step.value = step.min;
    }

    this.view?.changeStepFromOutside(Number(step.value));

    this.updateAttributesAfterStepChange();
  }

  private handleFromChange(): void {
    const from = this.from as HTMLInputElement;

    if (Number(from.value) > Number(from.max)) {
      from.value = from.max;
    }

    if (Number(from.value) < Number(from.min)) {
      from.value = from.min;
    }

    this.view?.changeLeftValueFromOutside(Number(from.value));
    this.updateAttributesAfterFromChange();
  }

  private handleToChange(): void {
    const to = this.to as HTMLInputElement;

    if (Number(to.value) > Number(to.max)) {
      to.value = to.max;
    }

    if (Number(to.value) < Number(to.min)) {
      to.value = to.min;
    }

    this.view?.changeRightValueFromOutside(Number(to.value));
    this.updateAttributesAfterToChange();
  }

  private handleVerticalChange(): void {
    this.view?.changeOrientationFromOutside();
    Panel.toggleCheckbox(this.vertical);
  }

  private handleRangeChange(): void {
    this.view?.toggleRangeFromOutside();

    const to = this.to as HTMLInputElement;
    to.disabled = !to.disabled;

    const from = this.from as HTMLInputElement;
    const range = this.range as HTMLInputElement;

    if (range.checked) {
      from.max = to.value;
    } else {
      from.max = (this.max as HTMLInputElement).value;
    }

    Panel.toggleCheckbox(this.range);
  }

  private handleScaleChange(): void {
    this.view?.toggleScaleFromOutside();

    const scaleIntervals = this.scaleIntervals as HTMLInputElement;
    scaleIntervals.disabled = !scaleIntervals.disabled;

    Panel.toggleCheckbox(this.scale);
  }

  private handleScaleIntervalsChange(): void {
    const scaleIntervals = this.scaleIntervals as HTMLInputElement;

    if (Number(scaleIntervals.value) < Number(scaleIntervals.min)) {
      scaleIntervals.value = scaleIntervals.min;
    }

    if (!Number.isInteger(scaleIntervals.value)) {
      scaleIntervals.value = `${Math.floor(Number(scaleIntervals.value))}`;
    }

    this.view?.changeScaleIntervals(Number(scaleIntervals.value));
  }

  private handleValueLabelsChange(): void {
    this.view?.toggleValueLabels();
    Panel.toggleCheckbox(this.valueLabels);
  }

  private handleMinMaxLabelsChange(): void {
    this.view?.toggleMinMaxLabels();
    Panel.toggleCheckbox(this.minMaxLabels);
  }

  private static toggleCheckbox(input: HTMLElement): void {
    const label: HTMLLabelElement | null = input.closest('label');
    label?.classList.toggle('panel__label_for-checkbox_checked');
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
