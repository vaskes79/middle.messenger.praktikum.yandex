import html from './MessageInput.html';
import css from '!!raw-loader!./MessageInput.css';
import { BaseComponent, Validator } from '../../core';

const tagName = 'ypr-message-input';

export class MessegaInput extends BaseComponent {
  private _textValue = '';
  private _formEl: HTMLFormElement;
  private _inputEl: HTMLInputElement;
  private _btnEl: HTMLButtonElement;

  constructor() {
    super({ html, css, tagName });
    this._formEl = this._root.querySelector('form') as HTMLFormElement;
    this._inputEl = this._root.querySelector('input') as HTMLInputElement;
    this._btnEl = this._root.getElementById('btnSubmit') as HTMLButtonElement;
  }

  private _handleChangeInput = (event: InputEvent) => {
    const { value } = event.currentTarget as HTMLInputElement;
    if (value) {
      this._textValue = value;
    }
  };

  private _clearInput() {
    this._inputEl.value = '';
    this._textValue = '';
  }

  private _handleSubmitEvent = (event: FormDataEvent) => {
    event.preventDefault();
    if (Validator.isNotEmpty(this._textValue)) {
      this._eventBus.emmit('messageinput:send:text', this._textValue);
      this._clearInput();
    }
  };

  protected _mount(): void {
    this._inputEl.addEventListener('input', this._handleChangeInput);
    this._formEl.addEventListener('submit', this._handleSubmitEvent);
    this._btnEl.addEventListener('click', this._handleSubmitEvent);
  }

  protected _unmount(): void {
    this._inputEl.removeEventListener('input', this._handleChangeInput);
    this._formEl.removeEventListener('submit', this._handleSubmitEvent);
    this._btnEl.removeEventListener('click', this._handleSubmitEvent);
  }
}

export default customElements.define(tagName, MessegaInput);
