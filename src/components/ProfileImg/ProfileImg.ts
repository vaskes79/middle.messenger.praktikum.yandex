import html from 'bundle-text:./ProfileImg.html';
import css from 'bundle-text:./ProfileImg.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-profile-input';

export class ProfileImg extends BaseComponent {
  constructor() {
    super({ html, css, tagName });
  }
}

export default customElements.define(tagName, ProfileImg);
