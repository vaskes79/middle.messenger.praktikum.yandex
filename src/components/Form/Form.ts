import html from "bundle-text:./Form.html";
import css from "bundle-text:./Form.css";

const tmpl = `<style>${css}</style>${html}`;

export class Form extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = tmpl;
    }
  }
}

export default customElements.define("ypr-form", Form);
