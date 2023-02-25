import html from 'bundle-text:./ProfileImg.html';
import css from 'bundle-text:./ProfileImg.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-profile-input';

export class ProfileImg extends BaseComponent {
  private _containerEl: HTMLElement;

  constructor() {
    super({ html, css, tagName });
    this._containerEl = this._root.querySelector('label') as HTMLElement;
  }

  protected static get observedAttributes(): string[] {
    return ['avatar'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === 'avatar' && oldValue !== newValue) {
      this._containerEl.style.backgroundImage = `url(${newValue})`;
      this._containerEl.style.backgroundSize = `cover`;
    }
  }
}

export default customElements.define(tagName, ProfileImg);
