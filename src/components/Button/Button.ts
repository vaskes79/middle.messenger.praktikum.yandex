import html from './Button.html';
import css from './Button.css';
import { BaseComponent } from '../../core';
import { connectedCallbackMixin } from './connecteCallbackMixin';

const tagName = 'ypr-btn';

export class Button extends BaseComponent {
  _btn: HTMLButtonElement;

  constructor() {
    super({ html, css, tagName, connectedCallbackMixin });
    this._btn = this._root.querySelector('button') as HTMLButtonElement;
  }

  action() {
    return;
  }

  hide() {
    this._btn.classList.add('hide');
  }

  show() {
    this._btn.classList.remove('hide');
  }
}

export default customElements.define(tagName, Button);
