import html from './Main.html';
import css from './Main.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-main';

export class Main extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Main);
