import html from 'bundle-text:./Layout.html';
import css from 'bundle-text:./Layout.css';
import { BaseComponent } from '../../core';

const tagName = 'ypr-layout';

export enum LayoutEvents {
  TOGGLE_PANEL = 'panel:toggle'
}

export type PanelNames = 'settings' | 'chatlist' | 'chatsettings';

export class Layout extends BaseComponent {
  _chatlistPanel: HTMLDivElement;
  _chatPanel: HTMLDivElement;
  _settingsPanel: HTMLDivElement;
  _chatSettingsPanel: HTMLDivElement;
  _removeEventListeners: () => void;

  constructor() {
    super({ html, css, tagName });

    this._chatlistPanel = this._root.querySelector('.chatlist') as HTMLDivElement;
    this._settingsPanel = this._root.querySelector('.settings') as HTMLDivElement;
    this._chatPanel = this._root.querySelector('.chat') as HTMLDivElement;
    this._chatSettingsPanel = this._root.querySelector('.chatsettings') as HTMLDivElement;
  }

  static get observedAttributes() {
    return ['activepanel'];
  }

  protected _mount(): void {
    this._eventBuss.on('panel:toggle', (name?: PanelNames) => {
      this._closePanel();
      if (name) {
        this._switchPanel(name);
      }
    });
  }

  _closePanel(name?: PanelNames) {
    switch (name) {
      case 'settings':
        this._settingsPanel.classList.remove('panel--open');
        break;
      case 'chatlist':
        this._chatlistPanel.classList.remove('panel--open');
        break;
      case 'chatsettings':
        this._chatSettingsPanel.classList.remove('panel--open');
        break;
      default:
        this._chatSettingsPanel.classList.remove('panel--open');
        this._chatlistPanel.classList.remove('panel--open');
        this._settingsPanel.classList.remove('panel--open');
    }
  }

  _switchPanel(name: PanelNames) {
    if (name === 'settings') {
      this._settingsPanel.classList.toggle('panel--open');
    }
    if (name === 'chatlist') {
      this._chatlistPanel.classList.toggle('panel--open');
    }
    if (name === 'chatsettings') {
      this._chatSettingsPanel.classList.toggle('panel--open');
    }
  }
}

export default customElements.define(tagName, Layout);

declare global {
  interface HTMLElementTagNameMap {
    tagName: Layout;
  }
}
