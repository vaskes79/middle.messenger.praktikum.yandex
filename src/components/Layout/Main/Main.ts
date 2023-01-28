import html from 'bundle-text:./Main.html';
import css from 'bundle-text:./Main.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-main';

export class Main extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Main);
