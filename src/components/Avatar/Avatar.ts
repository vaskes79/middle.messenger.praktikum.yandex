import tmpl from 'bundle-text:./Avatar.html';
import defaultAvatar from './default-avatar.svg';

type Attributes = 'imgurl' | 'name'

export class Avatar extends HTMLElement {
  _imgUrl: string = defaultAvatar;
  _name: string = "Display Name";
  _initial: string = "DN"

  _container: HTMLDivElement;
  _img: HTMLImageElement;
  _nameEl: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = tmpl;
    }
  }

  connectedCallback() {
    if (this.shadowRoot) {
      // set elements
      this._img = this.shadowRoot?.querySelector(".img") as HTMLImageElement;
      this._container = this.shadowRoot?.querySelector('.container') as HTMLDivElement;
      this._nameEl = this.shadowRoot?.querySelector('.name') as HTMLElement;
      // set Attributes 
      this._imgUrl = this.getAttribute('imgurl') || this._imgUrl;
      this._name = this.getAttribute('name') || this._name;

      this._img.setAttribute("alt", this._name);
      this._img.setAttribute("src", this._imgUrl);

      if (!this.hasAttribute('imgurl')) {
        this._createInitials();
        this._nameEl.innerHTML = this._initial;
        this._nameEl.style.display = "flex";
      }
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
