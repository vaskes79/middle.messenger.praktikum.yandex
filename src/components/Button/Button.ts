import html from 'bundle-text:./Button.html';
import css from 'bundle-text:./Button.css';
import { BaseComponent } from '../../core';
import { connectedCallbackMixin } from './connecteCallbackMixin';

const tagName = 'ypr-btn';

export class Button extends BaseComponent {
  _btn: HTMLButtonElement;

  constructor() {
    super({ html, css, tagName, connectedCallbackMixin });
    if (this.shadowRoot) {
      this._btn = this.shadowRoot.querySelector('button') as HTMLButtonElement;
    }
  }
}

export default customElements.define(tagName, Button);
