import html from 'bundle-text:./MessageInput.html';
import css from 'bundle-text:./MessageInput.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-message-input';

export class MessegaInput extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, MessegaInput);
