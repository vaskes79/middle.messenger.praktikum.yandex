import html from 'bundle-text:./Form.html'

export class Form extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
    }
  }
}

export default customElements.define('ypr-form', Form);
