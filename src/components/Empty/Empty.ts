import html from './Empty.html';
import css from './Empty.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-empty';

export class Empty extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Empty);
