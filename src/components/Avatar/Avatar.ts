import tmpl from 'bundle-text:./Avatar.html'

type Attributes = 'imgurl' | 'name'

export class Avatar extends HTMLElement {
  _imgUrl: string;
  _name: string;

  _container: HTMLDivElement;
  _img: HTMLImageElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = tmpl;
    }

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

export default customElements.define('ypr-avatar', Avatar);

declare global {
  export interface HTMLElementTagNameMap {
    'ypr-avatar': Avatar
  }
}
