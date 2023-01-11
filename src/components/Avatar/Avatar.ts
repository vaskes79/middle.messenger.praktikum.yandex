import tmpl from 'bundle-text:./Avatar.html';
import { StatusUser } from '../Status';
import defaultAvatar from './default-avatar.svg';

type Attributes = 'imgurl' | 'name'

export class Avatar extends HTMLElement {
  _imgUrl: string = defaultAvatar;
  _name: string = "Display Name";
  _initial: string = "DN"

  _container: HTMLDivElement;
  _img: HTMLImageElement;
  _nameEl: HTMLElement;
  _statusUserEl: StatusUser;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = tmpl;
    }
  }
  static get observedAttributes() {
    return ['name', 'status'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "name" && oldValue !== newValue) {
      console.log({ name, oldValue, newValue });
      this.updateName(newValue);
    }

    if (name === "status" && oldValue !== newValue) {
      this._statusUserEl.setAttribute('status', newValue);
    }
  }

  connectedCallback() {
    if (this.shadowRoot) {
      // set elements
      this._img = this.shadowRoot?.querySelector(".img") as HTMLImageElement;
      this._container = this.shadowRoot?.querySelector('.container') as HTMLDivElement;
      this._nameEl = this.shadowRoot?.querySelector('.name') as HTMLElement;
      this._statusUserEl = this.shadowRoot?.querySelector('ypr-status-user') as StatusUser;
      this._statusUserEl.setAttribute('status', "ofline");
      // set Attributes 
      this._imgUrl = this.getAttribute('imgurl') || this._imgUrl;
      this._img.setAttribute("src", this._imgUrl);
    }
    this.updateName();
  }

  public updateName(name?: string) {
    this._name = this.getAttribute('name') || this._name;
    this._img.setAttribute("alt", this._name);

    if (!this.hasAttribute('imgurl')) {
      this._createInitials();
      this._nameEl.innerHTML = this._initial;
      this._nameEl.style.display = "flex";
    }
  }

  _createInitials = () => {
    const [firstName, lastName] = this._name.split(' ')
    this._initial = firstName[0] + lastName[0];
  }

}

export default customElements.define('ypr-avatar', Avatar);

declare global {
  export interface HTMLElementTagNameMap {
    'ypr-avatar': Avatar
  }
}
