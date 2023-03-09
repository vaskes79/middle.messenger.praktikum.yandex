import html from 'bundle-text:./Avatar.html';
import css from 'bundle-text:./Avatar.css';
import { BaseComponent } from '../../core';
import { StatusUser } from '../Status';
import defaultAvatar from './default-avatar.svg';

const tagName = 'ypr-avatar';

export class Avatar extends BaseComponent {
  private _imgUrl: string = defaultAvatar;
  private _name = 'Display Name';
  private _initial = 'DN';

  private _img: HTMLImageElement;
  private _nameEl: HTMLElement;
  private _statusUserEl: StatusUser;

  constructor() {
    super({ html, css, tagName });
    this._img = this._root.querySelector('.img') as HTMLImageElement;
    this._nameEl = this._root.querySelector('.name') as HTMLElement;
    this._statusUserEl = this._root.querySelector('ypr-status-user') as StatusUser;
    this._statusUserEl.setAttribute('status', 'ofline');
    this._imgUrl = this.getAttribute('imgurl') || this._imgUrl;
    this._img.setAttribute('src', this._imgUrl);
  }

  static get observedAttributes() {
    return ['name', 'status', 'imgurl'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === 'name' && oldValue !== newValue) {
      this.updateName(newValue);
    }

    if (name === 'status' && oldValue !== newValue) {
      this._statusUserEl.setAttribute('status', newValue);
    }

    if (name === 'imgurl' && oldValue !== newValue) {
      const urlAvatar = newValue === 'null' ? defaultAvatar : newValue;
      this._img.setAttribute('src', urlAvatar);
      this._nameEl.style.display = 'none';
    }
  }

  public updateName(name?: string) {
    this._name = name || this.getAttribute('name') || this._name;
    this._img.setAttribute('alt', this._name);

    if (!this.hasAttribute('imgurl')) {
      this._createInitials();
      this._nameEl.innerHTML = this._initial;
      this._nameEl.style.display = 'flex';
    }
  }

  _createInitials = () => {
    const [firstName, lastName] = this._name.split(' ');
    this._initial = firstName[0] + lastName[0];
  };
}

export default customElements.define(tagName, Avatar);
