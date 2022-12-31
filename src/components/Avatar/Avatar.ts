import { tmpl } from './Avatar.tmpl'

type Attributes = 'imgurl' | 'name'

export class Avatar extends HTMLElement {
  _imgUrl: string;
  _name: string;

  _container: HTMLDivElement;
  _img: HTMLImageElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(tmpl.content.cloneNode(true));

    // set elements
    this._img = this.shadowRoot?.querySelector(".img") as HTMLImageElement;
    this._container = this.shadowRoot?.querySelector('.container') as HTMLDivElement;
    // set Attributes 
    this._imgUrl = this.getAttribute('imgurl') || "";
    this._name = this.getAttribute('name') || "";

    this._img.setAttribute("alt", this._name);
    this._img.setAttribute("src", this._imgUrl);
  }
}

export function initAvatar() {
  customElements.define('ypr-avatar', Avatar);
}
