import tmpl from 'bundle-text:./Header.tmpl.html'

class ChatlistHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = tmpl
    }
  }
}

export default customElements.define('ypr-header', ChatlistHeader);
