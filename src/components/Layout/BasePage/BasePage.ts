import html from 'bundle-text:./BasePage.html'

export class BasePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
    }
  }
}

export default customElements.define('ypr-base-page', BasePage);
