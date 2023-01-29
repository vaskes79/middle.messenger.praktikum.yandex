import html from 'bundle-text:./Form.html';
import css from 'bundle-text:./Form.css';
import { BaseComponent, Validator } from '../../core';
import { nanoid } from 'nanoid';
import { Input } from '../Input';

const tagName = 'ypr-form';

export class Form extends BaseComponent {
  private _inputs: Input[];
  id: string = nanoid();

  constructor() {
    super({ html, css, tagName });
    const contentSlot = this._root.querySelector('slot[name="content"]') as HTMLSlotElement;
    this._inputs = contentSlot.assignedElements() as Input[];
  }

  protected _mount(): void {
    this.setAttribute('id', this.id);
    this._eventBuss.on('submit', (id: string) => {
      if (id === this.id) {
        this._submitHandler();
      }
    });
  }

  private _submitHandler() {
    const data: { name: string; value: string }[] = [];
    this._inputs.forEach((input) => {
      const { value = '', _typeOfValidate, name } = input;
      const isNotEmpty = Validator.isNotEmpty(value);
      const valid = Validator[_typeOfValidate](value);
      if (!valid) {
        input.showError(input._validateErrorMessage);
      }
      if (!isNotEmpty) {
        input.showError('Inupt should field');
      }
      if (valid || isNotEmpty) {
        data.push({ name, value });
      }
    });
    const formIsValid = this._inputs.length === data.length;
    if (formIsValid) {
      console.log(data);
    }
  }
}

export default customElements.define(tagName, Form);
