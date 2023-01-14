import { openPanel } from "./actions";
import html from "bundle-text:./Layout.html";

export class Layout extends HTMLElement {
  _chatlistPanel: HTMLDivElement;
  _chatPanel: HTMLDivElement;
  _settingsPanel: HTMLDivElement;
  _chatSettingsPanel: HTMLDivElement;
  _removeEventListeners: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" })

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._chatlistPanel = this.shadowRoot.querySelector('.chatlist') as HTMLDivElement;
      this._settingsPanel = this.shadowRoot.querySelector('.settings') as HTMLDivElement;
      this._chatPanel = this.shadowRoot.querySelector('.chat') as HTMLDivElement;
      this._chatSettingsPanel = this.shadowRoot.querySelector('.chatsettings') as HTMLDivElement;
    }
  }

  connectedCallback() {
    this._removeEventListeners = this._addEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  static get observedAttributes() {
    return ['activepanel']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log({ name, oldValue, newValue });
  }

  _switchPanel(name: string) {
    if (name === 'settings' && this._settingsPanel) {
      this._settingsPanel.classList.toggle('panel--open');
    }
    if (name === 'chatlist' && this._chatlistPanel) {
      this._chatlistPanel.classList.toggle('panel--open');
    }
    if (name === 'chatsettings' && this._chatSettingsPanel) {
      this._chatSettingsPanel.classList.toggle('panel--open');
    }
  }

  _togglePanel = (event: CustomEventInit<{ name: string }>) => {
    const { detail } = event;
    if (detail) {
      this._switchPanel(detail.name);
    }
  }

  _addEventListeners() {
    window.addEventListener(openPanel, this._togglePanel);

    return () => {
      window.removeEventListener(openPanel, this._togglePanel)
    };
  }

}

export default customElements.define('ypr-layout', Layout);

declare global {
  interface HTMLElementTagNameMap {
    'ypr-layout': Layout
  }
}
