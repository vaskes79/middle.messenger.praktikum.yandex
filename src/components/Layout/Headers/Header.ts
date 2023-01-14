import html from 'bundle-text:./Header.html'

class ChatlistHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
    }
  }
}

export default customElements.define('ypr-header', ChatlistHeader);
