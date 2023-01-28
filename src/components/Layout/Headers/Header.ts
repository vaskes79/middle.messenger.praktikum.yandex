import html from 'bundle-text:./Header.html';
import css from 'bundle-text:./Header.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-header';

class ChatlistHeader extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, ChatlistHeader);
