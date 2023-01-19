import html from 'bundle-text:./MessageInput.html';

export class MessegaInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
    }
  }
}

export default customElements.define('ypr-message-input', MessegaInput);
