import html from 'bundle-text:./MessageInput.html';
import css from 'bundle-text:./MessageInput.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-message-input';

export class MessegaInput extends BaseComponent {
  private _textValue = '';
  private _formEl: HTMLFormElement;
  private _inputEl: HTMLInputElement;

  constructor() {
    super({ html, css, tagName });
    this._formEl = this._root.querySelector('form') as HTMLFormElement;
    this._inputEl = this._root.querySelector('input') as HTMLInputElement;
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
    this._eventBuss.emmit('messageinput:send:text', this._textValue);
    this._clearInput();
  };

  protected _mount(): void {
    this._inputEl.addEventListener('input', this._handleChangeInput);
    this._formEl.addEventListener('submit', this._handleSubmitEvent);
  }
}

export default customElements.define(tagName, MessegaInput);
