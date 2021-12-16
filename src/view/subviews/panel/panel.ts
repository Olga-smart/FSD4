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

class Panel {
  view: any;

  component: HTMLElement;

  min: HTMLElement;

  max: HTMLElement;

  step: HTMLElement;

  from: HTMLElement;

  to: HTMLElement;

  vertical: HTMLElement;

  range: HTMLElement;

  scale: HTMLElement;

  scaleIntervals: HTMLElement;

  valueLabels: HTMLElement;

  minMaxLabels: HTMLElement;

  constructor() {
    this.view = null;
    this.component = createElement('div', 'range-slider__panel panel');

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

  updateScaleIntervals(value: number | ''): void {
    (this.scaleIntervals as HTMLInputElement).value = `${value}`;
  }

  private render(): void {
    this.setTypes();
    this.setIds();
    this.component.append(
      Panel.wrap(Panel.addLabel(this.range, 'Range:', 'panel__label_for-checkbox')),
      Panel.wrap(Panel.addLabel(this.vertical, 'Vertical:', 'panel__label_for-checkbox')),
      Panel.wrap(Panel.addLabel(this.valueLabels, 'Value labels:', 'panel__label_for-checkbox')),
      Panel.wrap(Panel.addLabel(this.minMaxLabels, 'Min&max labels:', 'panel__label_for-checkbox')),
      Panel.wrap(Panel.addLabel(this.scale, 'Scale:', 'panel__label_for-checkbox')),
      Panel.wrap(Panel.addLabel(this.scaleIntervals, 'Scale intervals:')),
      Panel.wrap(Panel.addLabel(this.min, 'Min:')),
      Panel.wrap(Panel.addLabel(this.max, 'Max:')),
      Panel.wrap(Panel.addLabel(this.from, 'From:')),
      Panel.wrap(Panel.addLabel(this.to, 'To:')),
      Panel.wrap(Panel.addLabel(this.step, 'Step:')),
    );
  }

  private static addLabel(input: HTMLElement, name: string, className?: string): DocumentFragment {
    const label: HTMLElement = createElement('label', 'panel__label');
    label.textContent = name;
    label.setAttribute('for', input.id);

    if (className) {
      label.classList.add(className);
    }

    const fragment = new DocumentFragment();

    if ((input as HTMLInputElement).type === 'checkbox') {
      fragment.append(input);
      fragment.append(label);
    } else {
      fragment.append(label);
      fragment.append(input);
    }

    return fragment;
  }

  private static wrap(fragment: DocumentFragment, className?: string): HTMLElement {
    const wrapper: HTMLElement = createElement('div', `panel__input-wrapper ${className}`);
    wrapper.append(fragment);

    return wrapper;
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

  private setIds(): void {
    this.range.id = 'range';
    this.vertical.id = 'vertical';
    this.valueLabels.id = 'valueLabels';
    this.minMaxLabels.id = 'minMaxLabels';
    this.scale.id = 'scale';
    this.scaleIntervals.id = 'scaleIntervals';
    this.min.id = 'min';
    this.max.id = 'max';
    this.from.id = 'from';
    this.to.id = 'to';
    this.step.id = 'step';
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
    (this.step as HTMLInputElement).max = `${options.max}`;

    if (!options.range) {
      (this.to as HTMLInputElement).disabled = true;
    }

    (this.scaleIntervals as HTMLInputElement).min = '1';

    if (!options.scale) {
      (this.scaleIntervals as HTMLInputElement).disabled = true;
    }
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

    return +result;
  }

  private updateAttributesAfterFromChange(): void {
    const from = this.from as HTMLInputElement;

    (this.min as HTMLInputElement).max = from.value;

    if (this.view?.isRange) {
      (this.to as HTMLInputElement).min = from.value;
    }

    if (!this.view?.isRange) {
      (this.max as HTMLInputElement).min = from.value;
    }
  }

  private updateAttributesAfterToChange(): void {
    const to = this.to as HTMLInputElement;

    (this.from as HTMLInputElement).max = to.value;
    (this.max as HTMLInputElement).min = to.value;
  }

  private handleMinChange(): void {
    const min = this.min as HTMLInputElement;
    const from = this.from as HTMLInputElement;

    if (+min.value > +from.value) {
      min.value = from.value;
    }

    this.view?.changeMinFromOutside(+min.value);
  }

  private handleMaxChange(): void {
    const max = this.max as HTMLInputElement;

    if (!this.view?.isRange) {
      const from = this.from as HTMLInputElement;

      if (+max.value < +from.value) {
        max.value = from.value;
      }
    }

    if (this.view?.isRange) {
      const to = this.to as HTMLInputElement;

      if (+max.value < +to.value) {
        max.value = to.value;
      }
    }

    this.view?.changeMaxFromOutside(+max.value);
    (this.step as HTMLInputElement).max = max.value;
  }

  private handleStepChange(): void {
    const step = this.step as HTMLInputElement;

    if (+step.value > +step.max) {
      step.value = step.max;
    }

    if (+step.value < 0) {
      step.value = step.min;
    }

    this.view?.changeStepFromOutside(+step.value);

    (this.step as HTMLInputElement).min = `${Panel.calcStepMin(+step.value)}`;
    (this.step as HTMLInputElement).step = `${Panel.calcStepMin(+step.value)}`;
  }

  private handleFromChange(): void {
    const from = this.from as HTMLInputElement;

    if (+from.value > +from.max) {
      from.value = from.max;
    }

    if (+from.value < +from.min) {
      from.value = from.min;
    }

    this.view?.changeLeftValueFromOutside(+from.value);
    this.updateAttributesAfterFromChange();
  }

  private handleToChange(): void {
    const to = this.to as HTMLInputElement;

    if (+to.value > +to.max) {
      to.value = to.max;
    }

    if (+to.value < +to.min) {
      to.value = to.min;
    }

    this.view?.changeRightValueFromOutside(+to.value);
    this.updateAttributesAfterToChange();
  }

  private handleVerticalChange(): void {
    this.view?.changeOrientationFromOutside();
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
  }

  private handleScaleChange(): void {
    this.view?.toggleScaleFromOutside();

    const scaleIntervals = this.scaleIntervals as HTMLInputElement;
    scaleIntervals.disabled = !scaleIntervals.disabled;
  }

  private handleScaleIntervalsChange(): void {
    const scaleIntervals = this.scaleIntervals as HTMLInputElement;

    if (+scaleIntervals.value < +scaleIntervals.min) {
      scaleIntervals.value = scaleIntervals.min;
    }

    this.view?.changeScaleIntervals(+scaleIntervals.value);
  }

  private handleValueLabelsChange(): void {
    this.view?.toggleValueLabels();
  }

  private handleMinMaxLabelsChange(): void {
    this.view?.toggleMinMaxLabels();
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
