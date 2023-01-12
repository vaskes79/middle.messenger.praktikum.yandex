import html from 'bundle-text:./Input.html';

export class Input extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
    }
  }
}

export default customElements.define('ypr-input', Input)
