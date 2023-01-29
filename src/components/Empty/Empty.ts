import html from 'bundle-text:./Empty.html';
import css from 'bundle-text:./Empty.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-empty';

export class Empty extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Empty);
