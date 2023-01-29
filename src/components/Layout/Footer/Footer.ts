import html from 'bundle-text:./Footer.html';
import css from 'bundle-text:./Footer.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-footer';

export class Footer extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Footer);
