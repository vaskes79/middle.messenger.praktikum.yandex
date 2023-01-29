import html from 'bundle-text:./Form.html';
import css from 'bundle-text:./Form.css';
import { BaseComponent, Validator } from '../../core';
import { Input } from '../Input';

const tagName = 'ypr-form';

export class Form extends BaseComponent {
  _form: HTMLFormElement;
  _submitBtn: HTMLButtonElement;
  _inputs: Input[];

  constructor() {
    super({ html, css, tagName });
    this._form = this._root.querySelector('form') as HTMLFormElement;
    this._submitHandler = this._submitHandler.bind(this);
    const footerSlot = this._root.querySelector('slot[name="footer"]') as HTMLSlotElement;
    this._submitBtn = footerSlot
      .assignedElements()[0]
      .querySelector('[type="submit"]') as HTMLButtonElement;
    const contentSlot = this._root.querySelector('slot[name="content"]') as HTMLSlotElement;
    this._inputs = contentSlot.assignedElements() as Input[];
  }

  protected _mount(): void {
    this._submitBtn.addEventListener('click', this._submitHandler);
  }

  protected _unmount(): void {
    this._submitBtn.addEventListener('click', this._submitHandler);
  }

  _submitHandler(event: Event) {
    event.preventDefault();
    this._inputs.forEach((input) => {
      const { value = '', _typeOfValidate } = input;
      const isNotEmpty = Validator.isNotEmpty(value);
      const valid = Validator[_typeOfValidate](value);
      if (!valid) {
        input.showError(input._validateErrorMessage);
      }
      if (!isNotEmpty) {
        input.showError('Inupt should field');
      }
    });
  }
}

export default customElements.define(tagName, Form);
