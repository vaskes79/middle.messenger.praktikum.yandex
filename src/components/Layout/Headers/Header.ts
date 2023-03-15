import html from './Header.html';
import css from '!!raw-loader!./Header.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-header';

class ChatlistHeader extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, ChatlistHeader);
