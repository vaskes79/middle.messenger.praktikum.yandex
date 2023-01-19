import html from 'bundle-text:./Nav.html';

class Nav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
    }
  }
}

export default customElements.define('ypr-nav', Nav);

declare global {
  interface HTMLElementTagNameMap {
    'ypr-nav': Nav;
  }
}
