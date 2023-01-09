import { openPanel } from "./actions";
import { tmpl } from "./Layout.tmp";

export class Layout extends HTMLElement {
  _chatlistPanel: HTMLDivElement | null;
  _chatPanel: HTMLDivElement | null;
  _settingsPanel: HTMLDivElement | null;
  _chatSettingsPanel: HTMLDivElement | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" })
    this.shadowRoot?.appendChild(tmpl.content.cloneNode(true))

    if (this.shadowRoot) {
      this._chatlistPanel = this.shadowRoot.querySelector('.chatlist');
      this._settingsPanel = this.shadowRoot.querySelector('.settings');
      this._chatPanel = this.shadowRoot.querySelector('.chat');
      this._chatSettingsPanel = this.shadowRoot.querySelector('.chatsettings');
    }

    this._addEventListeners();
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
    window.addEventListener(openPanel, this._togglePanel)
  }
}

export default customElements.define('ypr-layout', Layout);

declare global {
  interface HTMLElementTagNameMap {
    'ypr-layout': Layout
  }
}
