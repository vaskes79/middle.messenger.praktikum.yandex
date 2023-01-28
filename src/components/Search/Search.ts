import html from 'bundle-text:./Search.html';
import css from 'bundle-text:./Search.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-search';

export class Search extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Search);
