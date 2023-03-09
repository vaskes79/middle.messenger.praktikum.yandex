import html from './Nav.html';
import css from '!!raw-loader!./Nav.css';
import { BaseComponent } from '../../../core';

const tagName = 'ypr-nav';

class Nav extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Nav);

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Nav;
  }
}
