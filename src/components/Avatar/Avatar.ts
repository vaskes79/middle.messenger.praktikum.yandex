import html from 'bundle-text:./Avatar.html';
import css from 'bundle-text:./Avatar.css';
import { BaseComponent } from '../../core';
import { StatusUser } from '../Status';
import { handlers } from './handlers';
import defaultAvatar from './default-avatar.svg';
import { connectedCallbackMixin } from './connectedCallbackMixin';

const TAG = 'ypr-avatar';

export class Avatar extends BaseComponent {
  _imgUrl: string = defaultAvatar;
  _name = 'Display Name';
  _initial = 'DN';

  _container: HTMLDivElement;
  _img: HTMLImageElement;
  _nameEl: HTMLElement;
  _statusUserEl: StatusUser;

  constructor() {
    super({ html, tagName: TAG, css, handlers, connectedCallbackMixin });
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
      this._img.setAttribute('src', newValue);
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

export default customElements.define(TAG, Avatar);
