import html from 'bundle-text:./Button.html';

export class Button extends HTMLElement {
  _btn: HTMLButtonElement | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._btn = this.shadowRoot.querySelector('button');
    }
  }

  connectedCallback() {
    if (this.hasAttribute('disabled')) {
      this._btn?.setAttribute('disabled', '')
    }

    if (this.hasAttribute('natural')) {
      this._btn?.classList.add('natural')
    }

    if (this.hasAttribute('outline')) {
      this._btn?.classList.add('outline')
    }

    if (this.hasAttribute('link')) {
      this._btn?.classList.add('link')
    }

    if (this.hasAttribute('distructive')) {
      this._btn?.classList.add('distructive')
    }
  }

}

export default customElements.define('ypr-btn', Button);
