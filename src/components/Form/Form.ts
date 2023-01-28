import html from 'bundle-text:./Form.html';
import css from 'bundle-text:./Form.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-form';

export class Form extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Form);
