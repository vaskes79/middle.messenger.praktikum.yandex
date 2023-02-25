import html from 'bundle-text:./Profile.html';
import css from 'bundle-text:./Profile.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-profile';

export class Profile extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, Profile);
