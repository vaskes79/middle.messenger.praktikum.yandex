import { tmpl } from "./Layout.tmp";

export class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })
    this.shadowRoot?.appendChild(tmpl.content.cloneNode(true))
  }
}

export default customElements.define('ypr-layout', Layout);
