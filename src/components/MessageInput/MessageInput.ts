import html from 'bundle-text:./MessageInput.html';
import css from 'bundle-text:./MessageInput.css';
import { BaseComponent } from '../../core';
import { handlers } from './handlers';

const tagName = 'ypr-message-input';

export class MessegaInput extends BaseComponent {
  value = '';

  constructor() {
    super({ html, css, tagName, handlers });
  }
}

export default customElements.define(tagName, MessegaInput);
