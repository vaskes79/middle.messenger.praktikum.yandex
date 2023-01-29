import html from 'bundle-text:./BasePage.html';
import css from 'bundle-text:./BasePage.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-base-page';

export class BasePage extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, BasePage);
