import { tmpl } from "./Colors.tmpl";

export class Colors extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(tmpl.content.cloneNode(true))
  }
}

export function initColors() {
  customElements.define('ypr-colors', Colors);
}

