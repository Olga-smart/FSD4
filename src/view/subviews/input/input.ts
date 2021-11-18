import createElement from '../../helpers/createElement';

class Input {
  component: HTMLElement;

  constructor() {
    this.component = createElement('input', 'range-slider__input');
    this.setAttributes();
  }

  setAttributes(): void {
    const { component } = this;
    (component as HTMLInputElement).type = 'text';
    component.tabIndex = -1;
    (component as HTMLInputElement).readOnly = true;
  }

  setValue(value1: number, value2: number | null = null): void {
    if (value2 === null) {
      (this.component as HTMLInputElement).value = `${value1}`;
    }

    if (value2 !== null) {
      (this.component as HTMLInputElement).value = `${value1} - ${value2}`;
    }
  }
}

export default Input;
