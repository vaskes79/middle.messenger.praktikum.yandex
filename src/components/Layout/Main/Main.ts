import html from 'bundle-text:./Main.html'

export class Main extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
    }
  }
}

export default customElements.define('ypr-main', Main);
