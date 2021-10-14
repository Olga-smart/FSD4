import { createElement } from '../../helpers/createElement';
import { View } from '../../view';

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
  view: View | null;

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

  registerWith(view: View): void {
    this.view = view;
  }

  render(): void {
    this.component.append(
      this.wrap(this.addLabel(this.setType(this.min, 'number'), 'Min:')),
      this.wrap(this.addLabel(this.setType(this.max, 'number'), 'Max:')),
      this.wrap(this.addLabel(this.setType(this.step, 'number'), 'Step:')),
      this.wrap(this.addLabel(this.setType(this.from, 'number'), 'From:')),
      this.wrap(this.addLabel(this.setType(this.to, 'number'), 'To:')),
      this.wrap(this.addLabel(this.setType(this.vertical, 'checkbox'), 'Vertical:')),
      this.wrap(this.addLabel(this.setType(this.range, 'checkbox'), 'Range:')),
      this.wrap(this.addLabel(this.setType(this.scale, 'checkbox'), 'Scale:')),
      this.wrap(this.addLabel(this.setType(this.scaleIntervals, 'number'), 'Scale intervals:')),
      this.wrap(this.addLabel(this.setType(this.valueLabels, 'checkbox'), 'Value labels:')),
      this.wrap(this.addLabel(this.setType(this.minMaxLabels, 'checkbox'), 'Min&max labels:')),
    );
  }

  static setType(input: HTMLElement, type: string): HTMLElement {
    (input as HTMLInputElement).type = type;

    return input;
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

  attachEventHandlers(): void {
    this.min.addEventListener('input', () => {
      this.view?.changeMinFromOutside(+(this.min as HTMLInputElement).value);
    });

    this.min.addEventListener('change', () => {
      if (+(this.min as HTMLInputElement).value > +(this.from as HTMLInputElement).value) {
        (this.min as HTMLInputElement).value = (this.from as HTMLInputElement).value;
      }
    });

    this.max.addEventListener('input', () => {
      this.view?.changeMaxFromOutside(+(this.max as HTMLInputElement).value);
      (this.step as HTMLInputElement).max = (this.max as HTMLInputElement).value;
    });

    this.max.addEventListener('change', () => {
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
    });

    this.step.addEventListener('input', () => {
      this.view?.changeStepFromOutside(+(this.step as HTMLInputElement).value);
    });

    this.step.addEventListener('change', () => {
      if (+(this.step as HTMLInputElement).value < +(this.step as HTMLInputElement).min) {
        (this.step as HTMLInputElement).value = (this.step as HTMLInputElement).min;
      }

      if (+(this.step as HTMLInputElement).value > +(this.step as HTMLInputElement).max) {
        (this.step as HTMLInputElement).value = (this.step as HTMLInputElement).max;
      }
    });

    this.from.addEventListener('input', () => {
      this.view?.changeLeftValueFromOutside(+(this.from as HTMLInputElement).value);

      if (this.view?.isRange) {
        (this.to as HTMLInputElement).min = `${(this.from as HTMLInputElement).value}`;
      }
    });

    this.from.addEventListener('change', () => {
      if (+(this.from as HTMLInputElement).value < +(this.from as HTMLInputElement).min) {
        (this.from as HTMLInputElement).value = (this.from as HTMLInputElement).min;
      }

      if (+(this.from as HTMLInputElement).value > +(this.from as HTMLInputElement).max) {
        (this.from as HTMLInputElement).value = (this.from as HTMLInputElement).max;
      }
    });

    this.to.addEventListener('input', () => {
      this.view?.changeRightValueFromOutside(+(this.to as HTMLInputElement).value);

      (this.from as HTMLInputElement).max = (this.to as HTMLInputElement).value;
    });

    this.to.addEventListener('change', () => {
      if (+(this.to as HTMLInputElement).value < +(this.to as HTMLInputElement).min) {
        (this.to as HTMLInputElement).value = (this.to as HTMLInputElement).min;
      }

      if (+(this.to as HTMLInputElement).value > +(this.to as HTMLInputElement).max) {
        (this.to as HTMLInputElement).value = (this.to as HTMLInputElement).max;
      }
    });

    this.vertical.addEventListener('change', () => {
      this.view?.changeOrientationFromOutside();
    });

    this.range.addEventListener('change', () => {
      this.view?.toggleRangeFromOutside();
      (this.to as HTMLInputElement).disabled = !(this.to as HTMLInputElement).disabled;
    });

    this.scale.addEventListener('change', () => {
      this.view?.toggleScaleFromOutside();
      (this.scaleIntervals as HTMLInputElement).disabled = !(this.scaleIntervals as HTMLInputElement).disabled;
    });

    this.scaleIntervals.addEventListener('input', () => {
      this.view?.changeScaleIntervals(+(this.scaleIntervals as HTMLInputElement).value);
    });

    this.scaleIntervals.addEventListener('change', () => {
      if (+(this.scaleIntervals as HTMLInputElement).value < +(this.scaleIntervals as HTMLInputElement).min) {
        (this.scaleIntervals as HTMLInputElement).value = (this.scaleIntervals as HTMLInputElement).min;
        this.view?.changeScaleIntervals(+(this.scaleIntervals as HTMLInputElement).value);
      }
    });

    this.valueLabels.addEventListener('change', () => {
      this.view?.toggleValueLabels();
    });

    this.minMaxLabels.addEventListener('change', () => {
      this.view?.toggleMinMaxLabels();
    });
  }
}
