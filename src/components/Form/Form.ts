import html from './Form.html';
import css from '!!raw-loader!./Form.css';
import { BaseComponent, Validator } from '../../core';
import { nanoid } from 'nanoid';
import { Input } from '../Input';
import type { FormDataYpr } from './types';

const tagName = 'ypr-form';

export class Form extends BaseComponent {
  private _inputs: Input[];
  private _errorSlot: HTMLSlotElement;
  id: string = nanoid();

  constructor() {
    super({ html, css, tagName });
    const contentSlot = this._root.querySelector('slot[name="content"]') as HTMLSlotElement;
    this._errorSlot = this._root.querySelector('slot[name="error"]') as HTMLSlotElement;
    this._inputs = contentSlot.assignedElements() as Input[];
  }

  protected _mount(): void {
    this.setAttribute('id', this.id);
    this._eventBus.on('submit', (id: string) => {
      if (id === this.id) {
        this._submitHandler();
      }
    });

    this._eventBus.on('form:error', (errorMsg: string) => {
      this._setError(errorMsg);
    });

    this._root.addEventListener('keyup', this._keyboardEventHandler);
    this._inputs.forEach((input) => {
      input.addEventListener('input', this._clearErrorHandlerCallback);
    });
  }

  protected _clearErrorHandlerCallback = (event: InputEvent) => {
    const input = event.target as Input;
    input.clearError();
    this._clearError();
  };

  private _setError = (errMsg: string) => {
    this._errorSlot.innerHTML = `<div class="error">${errMsg}</div>`;
  };

  private _clearError = () => {
    this._errorSlot.innerHTML = '';
  };

  protected _unmount(): void {
    this._root.removeEventListener('keyup', this._keyboardEventHandler);
    this._inputs.forEach((input) => {
      input.removeEventListener('input', this._clearErrorHandlerCallback);
    });
  }

  actions(data: unknown) {
    console.log('actions data handler: ', data);
  }

  private _keyboardEventHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && this.id) {
      this._submitHandler();
    }
  };

  clearInputs() {
    this._inputs.forEach((input) => {
      input.clearValue();
      input.clearError();
    });
  }

  private _submitHandler() {
    const data: FormDataYpr = [];
    this._inputs.forEach((input) => {
      const { value = '', typeOfValidate, name } = input;
      const isNotEmpty = Validator.isNotEmpty(value);
      const valid = Validator[typeOfValidate](value);
      if (!valid) {
        input.showError(input.validateErrorMessage);
      }
      if (!isNotEmpty) {
        input.showError('Not Correct value');
      }
      if (valid || isNotEmpty) {
        data.push({ name, value });
      }
    });
    const formIsValid = this._inputs.length === data.length;
    if (formIsValid) {
      this.actions(data);
    }
  }
}

export default customElements.define(tagName, Form);
