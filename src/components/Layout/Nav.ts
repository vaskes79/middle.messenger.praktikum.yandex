import { Paths } from "../../types";

class Nav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <nav>
        <ul>
          <li><a href="${Paths.signIn}">sign in</a></li>
          <li><a href="${Paths.signUp}">sign up</a></li>
          <li><a href="${Paths.error404}">404</a></li>
          <li><a href="${Paths.error500}">500</a></li>
          <li><a href="${Paths.home}">chat</a></li>
          <li><a href="${Paths.dev}">dev page</a></li>
          <li><a href="${Paths.pageNotFound}">page not found</a></li>
        </ul>
      </nav>
      `
    }
  }
}

export default customElements.define('ypr-nav', Nav);

declare global {
  interface HTMLElementTagNameMap {
    'ypr-nav': Nav
  }
}
