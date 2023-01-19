import BaseElement from '../../RangeSlider/View/BaseElement/BaseElement';
import { IEventListener, PossibleEvents } from '../../RangeSlider/EventManager/EventManager';
import SliderOptions from '../../RangeSlider/Presenter/SliderOptions';
import { InputSliderPublicMethods, ToggleSliderPublicMethods } from '../../RangeSlider/Presenter/SliderPublicMethods';
import Presenter from '../../RangeSlider/Presenter/Presenter';

type PanelInputs = 'min' | 'max' | 'step' | 'from' | 'to' | 'scaleIntervals';
type PanelCheckboxes = 'vertical' | 'range' | 'scale' | 'valueLabels' | 'minMaxLabels';

class Panel extends BaseElement<'form'> implements IEventListener {
  private slider: Presenter;

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

  constructor(component: HTMLFormElement, slider: Presenter) {
    super('form');
    this.slider = slider;
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

    this.render(component);
    this.setValues(slider.getValues());
    this.attachEventHandlers();
    slider.subscribe(this);
  }

  static init(component: HTMLFormElement, slider: Presenter) {
    return new Panel(component, slider);
  }

  inform<E extends keyof PossibleEvents>(eventType: E, data: PossibleEvents[E]): void {
    switch (eventType) {
      case 'sliderSetLeft':
        if (typeof data === 'number') {
          this.handleSliderChangeValue('from', data);
        }
        break;
      case 'sliderSetRight':
        if (typeof data === 'number') {
          this.handleSliderChangeValue('to', data);
        }
        break;
      case 'sliderSetMin':
        if (typeof data === 'number') {
          this.handleSliderChangeValue('min', data);
        }
        break;
      case 'sliderSetMax':
        if (typeof data === 'number') {
          this.handleSliderChangeValue('max', data);
        }
        break;
      case 'sliderSetStep':
        if (typeof data === 'number') {
          this.handleSliderChangeValue('step', data);
        }
        break;
      case 'sliderToggleRange':
        this.handleSliderToggle('range');
        break;
      case 'sliderToggleOrientation':
        this.handleSliderToggle('vertical');
        break;
      case 'sliderToggleValueLabels':
        this.handleSliderToggle('valueLabels');
        break;
      case 'sliderToggleMinMaxLabels':
        this.handleSliderToggle('minMaxLabels');
        break;
      case 'sliderToggleScale':
        this.handleSliderToggle('scale');
        break;
      case 'sliderSetScaleIntervals':
        if (typeof data === 'number') {
          this.handleSliderChangeValue('scaleIntervals', data);
        }
        break;

      default:
        break;
    }
  }

  private static toggleCheckbox(input: HTMLInputElement): void {
    const label: HTMLLabelElement | null = input.closest('label');
    label?.classList.toggle('panel__label_for-checkbox_checked');
  }

  private render(component: HTMLFormElement): void {
    const setTypes = () => {
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
    };
    setTypes();

    const addLabel = (
      input: HTMLInputElement, name: string, className?: string,
    ): HTMLLabelElement => {
      const label: HTMLLabelElement = BaseElement.createComponent('label', 'panel__label');
      label.textContent = name;

      if (className) {
        label.classList.add(className);
      }

      label.append(input);

      return label;
    };
    component.append(
      addLabel(this.range, 'Range:', 'panel__label_for-checkbox'),
      addLabel(this.vertical, 'Vertical:', 'panel__label_for-checkbox'),
      addLabel(this.valueLabels, 'Value labels:', 'panel__label_for-checkbox'),
      addLabel(this.minMaxLabels, 'Min&max labels:', 'panel__label_for-checkbox'),
      addLabel(this.scale, 'Scale:', 'panel__label_for-checkbox'),
      addLabel(this.scaleIntervals, 'Scale intervals:'),
      addLabel(this.min, 'Min:'),
      addLabel(this.max, 'Max:'),
      addLabel(this.from, 'From:'),
      addLabel(this.to, 'To:'),
      addLabel(this.step, 'Step:'),
    );
  }

  private setValues(options: SliderOptions): void {
    this.min.setAttribute('value', `${options.min}`);
    this.max.setAttribute('value', `${options.max}`);
    this.step.setAttribute('value', `${options.step}`);
    this.from.setAttribute('value', `${options.leftValue}`);
    this.to.setAttribute('value', options.rightValue !== undefined ? `${options.rightValue}` : '');
    this.vertical.checked = options.vertical;
    this.range.checked = options.range;
    this.scale.checked = options.scale;
    this.scaleIntervals.setAttribute('value', `${options.scaleIntervals}`);
    this.valueLabels.checked = options.valueLabels;
    this.minMaxLabels.checked = options.minMaxLabels;

    const setCheckMarks = () => {
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
    };
    setCheckMarks();
  }

  private handleInput(method: InputSliderPublicMethods, event: Event): void {
    const { target } = event;
    if (target instanceof HTMLInputElement && target.hasAttribute('value')) {
      this.slider[method](Number(target.value));
    }
  }

  private handleToggle(method: ToggleSliderPublicMethods): void {
    this.slider[method]();
  }

  private handleSliderChangeValue(property: PanelInputs, value: number): void {
    this[property].value = `${value}`;
  }

  private handleSliderToggle(property: PanelCheckboxes): void {
    Panel.toggleCheckbox(this[property]);
  }

  private attachEventHandlers(): void {
    this.range.addEventListener('change', this.handleToggle.bind(this, 'toggleRange'));
    this.vertical.addEventListener('change', this.handleToggle.bind(this, 'toggleOrientation'));
    this.valueLabels.addEventListener('change', this.handleToggle.bind(this, 'toggleValueLabels'));
    this.minMaxLabels.addEventListener('change', this.handleToggle.bind(this, 'toggleMinMaxLabels'));
    this.scale.addEventListener('change', this.handleToggle.bind(this, 'toggleScale'));
    this.scaleIntervals.addEventListener('change', this.handleInput.bind(this, 'setScaleIntervals'));
    this.min.addEventListener('change', this.handleInput.bind(this, 'setMin'));
    this.max.addEventListener('change', this.handleInput.bind(this, 'setMax'));
    this.from.addEventListener('change', this.handleInput.bind(this, 'setLeftValue'));
    this.to.addEventListener('change', this.handleInput.bind(this, 'setRightValue'));
    this.step.addEventListener('change', this.handleInput.bind(this, 'setStep'));
  }
}

export default Panel;
