import html from 'bundle-text:./Search.html';
import css from 'bundle-text:./Search.css';
import { BaseComponent } from '../../core';
import { handlers } from './handlers';

const tagName = 'ypr-search';

export class Search extends BaseComponent {
  constructor() {
    super({ html, css, tagName, handlers });
  }
}

export default customElements.define(tagName, Search);
