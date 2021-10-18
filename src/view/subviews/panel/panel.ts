import createElement from '../../helpers/createElement';

export type PanelOptions = {
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

export class Panel {
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

    this.min = createElement('input', 'panel__min');
    this.max = createElement('input', 'panel__max');
    this.step = createElement('input', 'panel__step');
    this.from = createElement('input', 'panel__from');
    this.to = createElement('input', 'panel__to');

    this.vertical = createElement('input', 'panel__vertical');
    this.range = createElement('input', 'panel__range');
    this.scale = createElement('input', 'panel__scale');
    this.scaleIntervals = createElement('input', 'panel__scale-intervals');
    this.valueLabels = createElement('input', 'panel__value-labels');
    this.minMaxLabels = createElement('input', 'panel__min-max-labels');

    this.render();
    this.attachEventHandlers();
  }

  registerWith(view: any): void {
    this.view = view;
  }

  render(): void {
    this.setTypes();
    this.component.append(
      Panel.wrap(Panel.addLabel(this.min, 'Min:')),
      Panel.wrap(Panel.addLabel(this.max, 'Max:')),
      Panel.wrap(Panel.addLabel(this.step, 'Step:')),
      Panel.wrap(Panel.addLabel(this.from, 'From:')),
      Panel.wrap(Panel.addLabel(this.to, 'To:')),
      Panel.wrap(Panel.addLabel(this.vertical, 'Vertical:')),
      Panel.wrap(Panel.addLabel(this.range, 'Range:')),
      Panel.wrap(Panel.addLabel(this.scale, 'Scale:')),
      Panel.wrap(Panel.addLabel(this.scaleIntervals, 'Scale intervals:')),
      Panel.wrap(Panel.addLabel(this.valueLabels, 'Value labels:')),
      Panel.wrap(Panel.addLabel(this.minMaxLabels, 'Min&max labels:')),
    );
  }

  static addLabel(input: HTMLElement, name: string): HTMLElement {
    const label: HTMLElement = createElement('label', 'panel__label');
    label.textContent = name;
    label.append(input);

    return label;
  }

  static wrap(input: HTMLElement): HTMLElement {
    const wrapper: HTMLElement = createElement('div', 'panel__input-wrapper');
    wrapper.append(input);

    return wrapper;
  }

  setTypes(): void {
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

  setAttributes(options: PanelOptions): void {
    (this.from as HTMLInputElement).min = `${options.min}`;
    (this.from as HTMLInputElement).max = options.range ? `${options.to}` : `${options.max}`;

    (this.to as HTMLInputElement).min = `${options.from}`;
    (this.to as HTMLInputElement).max = `${options.max}`;

    (this.from as HTMLInputElement).step = `${options.step}`;
    (this.to as HTMLInputElement).step = `${options.step}`;

    (this.min as HTMLInputElement).max = `${options.from}`;
    (this.max as HTMLInputElement).min = options.range ? `${options.to}` : `${options.from}`;

    (this.step as HTMLInputElement).min = '1';
    (this.step as HTMLInputElement).max = `${options.max}`;

    if (!options.range) {
      (this.to as HTMLInputElement).disabled = true;
    }

    (this.scaleIntervals as HTMLInputElement).min = '1';

    if (!options.scale) {
      (this.scaleIntervals as HTMLInputElement).disabled = true;
    }
  }

  updateFrom(value: number): void {
    (this.from as HTMLInputElement).value = `${value}`;
    if (this.view?.isRange) {
      (this.to as HTMLInputElement).min = `${value}`;
    }
  }

  updateTo(value: number | ''): void {
    (this.to as HTMLInputElement).value = `${value}`;
    (this.from as HTMLInputElement).max = `${value}`;
  }

  updateScaleIntervals(value: number | ''): void {
    (this.scaleIntervals as HTMLInputElement).value = `${value}`;
  }

  handleMinInput(): void {
    this.view?.changeMinFromOutside(+(this.min as HTMLInputElement).value);
  }

  handleMinChange(): void {
    if (+(this.min as HTMLInputElement).value > +(this.from as HTMLInputElement).value) {
      (this.min as HTMLInputElement).value = (this.from as HTMLInputElement).value;
    }
  }

  handleMaxInput(): void {
    this.view?.changeMaxFromOutside(+(this.max as HTMLInputElement).value);
    (this.step as HTMLInputElement).max = (this.max as HTMLInputElement).value;
  }

  handleMaxChange(): void {
    if (!this.view?.isRange) {
      if (+(this.max as HTMLInputElement).value < +(this.from as HTMLInputElement).value) {
        (this.max as HTMLInputElement).value = (this.from as HTMLInputElement).value;
      }
    }

    if (this.view?.isRange) {
      if (+(this.max as HTMLInputElement).value < +(this.to as HTMLInputElement).value) {
        (this.max as HTMLInputElement).value = (this.to as HTMLInputElement).value;
      }
    }
  }

  handleStepInput(): void {
    this.view?.changeStepFromOutside(+(this.step as HTMLInputElement).value);
  }

  handleStepChange(): void {
    if (+(this.step as HTMLInputElement).value < +(this.step as HTMLInputElement).min) {
      (this.step as HTMLInputElement).value = (this.step as HTMLInputElement).min;
    }

    if (+(this.step as HTMLInputElement).value > +(this.step as HTMLInputElement).max) {
      (this.step as HTMLInputElement).value = (this.step as HTMLInputElement).max;
    }
  }

  handleFromInput(): void {
    this.view?.changeLeftValueFromOutside(+(this.from as HTMLInputElement).value);

    if (this.view?.isRange) {
      (this.to as HTMLInputElement).min = `${(this.from as HTMLInputElement).value}`;
    }
  }

  handleFromChange(): void {
    if (+(this.from as HTMLInputElement).value < +(this.from as HTMLInputElement).min) {
      (this.from as HTMLInputElement).value = (this.from as HTMLInputElement).min;
    }

    if (+(this.from as HTMLInputElement).value > +(this.from as HTMLInputElement).max) {
      (this.from as HTMLInputElement).value = (this.from as HTMLInputElement).max;
    }
  }

  handleToInput(): void {
    this.view?.changeRightValueFromOutside(+(this.to as HTMLInputElement).value);

    (this.from as HTMLInputElement).max = (this.to as HTMLInputElement).value;
  }

  handleToChange(): void {
    if (+(this.to as HTMLInputElement).value < +(this.to as HTMLInputElement).min) {
      (this.to as HTMLInputElement).value = (this.to as HTMLInputElement).min;
    }

    if (+(this.to as HTMLInputElement).value > +(this.to as HTMLInputElement).max) {
      (this.to as HTMLInputElement).value = (this.to as HTMLInputElement).max;
    }
  }

  handleVerticalChange(): void {
    this.view?.changeOrientationFromOutside();
  }

  handleRangeChange(): void {
    this.view?.toggleRangeFromOutside();
    (this.to as HTMLInputElement).disabled = !(this.to as HTMLInputElement).disabled;
  }

  handleScaleChange(): void {
    this.view?.toggleScaleFromOutside();
    (this.scaleIntervals as HTMLInputElement).disabled = (
      !(this.scaleIntervals as HTMLInputElement).disabled
    );
  }

  handleScaleIntervalsInput(): void {
    this.view?.changeScaleIntervals(+(this.scaleIntervals as HTMLInputElement).value);
  }

  handleScaleIntervalsChange(): void {
    if (
      +(this.scaleIntervals as HTMLInputElement).value
      < +(this.scaleIntervals as HTMLInputElement).min
    ) {
      (this.scaleIntervals as HTMLInputElement).value = (
        (this.scaleIntervals as HTMLInputElement).min
      );
      this.view?.changeScaleIntervals(+(this.scaleIntervals as HTMLInputElement).value);
    }
  }

  handleValueLabelsChange(): void {
    this.view?.toggleValueLabels();
  }

  handleMinMaxLabelsChange(): void {
    this.view?.toggleMinMaxLabels();
  }

  attachEventHandlers(): void {
    this.min.addEventListener('input', this.handleMinInput.bind(this));
    this.min.addEventListener('change', this.handleMinChange.bind(this));
    this.max.addEventListener('input', this.handleMaxInput.bind(this));
    this.max.addEventListener('change', this.handleMaxChange.bind(this));
    this.step.addEventListener('input', this.handleStepInput.bind(this));
    this.step.addEventListener('change', this.handleStepChange.bind(this));
    this.from.addEventListener('input', this.handleFromInput.bind(this));
    this.from.addEventListener('change', this.handleFromChange.bind(this));
    this.to.addEventListener('input', this.handleToInput.bind(this));
    this.to.addEventListener('change', this.handleToChange.bind(this));
    this.vertical.addEventListener('change', this.handleVerticalChange.bind(this));
    this.range.addEventListener('change', this.handleRangeChange.bind(this));
    this.scale.addEventListener('change', this.handleScaleChange.bind(this));
    this.scaleIntervals.addEventListener('input', this.handleScaleIntervalsInput.bind(this));
    this.scaleIntervals.addEventListener('change', this.handleScaleIntervalsChange.bind(this));
    this.valueLabels.addEventListener('change', this.handleValueLabelsChange.bind(this));
    this.minMaxLabels.addEventListener('change', this.handleMinMaxLabelsChange.bind(this));
  }
}
