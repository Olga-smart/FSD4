import createElement from '../../helpers/createElement';

class Input {
  component: HTMLElement;

  constructor() {
    this.component = createElement('input', 'range-slider__input');
    this.setAttributes();
  }

  setAttributes(): void {
    const component = this.component as HTMLInputElement;

    component.type = 'text';
    component.tabIndex = -1;
    component.readOnly = true;
  }

  setValue(value1: number, value2: number | null = null): void {
    const component = this.component as HTMLInputElement;

    if (value2 === null) {
      component.value = `${value1}`;
    } else {
      component.value = `${value1} - ${value2}`;
    }
  }
}

export default Input;
