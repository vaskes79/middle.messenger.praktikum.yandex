import html from './Footer.html';
import css from '!!raw-loader!./Footer.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-footer';

export class Footer extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Footer);
