import html from './Search.html';
import css from './Search.css';
import { BaseComponent } from '../../core';
import { handlers } from './handlers';

const tagName = 'ypr-search';

export class Search extends BaseComponent {
  constructor() {
    super({ html, css, tagName, handlers });
  }
}

export default customElements.define(tagName, Search);
