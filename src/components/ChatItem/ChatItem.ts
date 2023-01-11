import html from 'bundle-text:./ChatItem.html';
import { Avatar } from '../Avatar'
import { defaultData } from './data'
import type { StatusUserValue, StatusMessageState, StatusMessage } from '../Status'

export interface ChatItemData {
  name: string,
  imgurl: string,
  time: string,
  statusUser: StatusUserValue,
  statusMessage: StatusMessageState,
  lastMessage: string,
  conterMessages: string | number
}

class ChatItem extends HTMLElement {
  _avatarEl: Avatar | null;
  _messageStatusEl: StatusMessage | null;
  _lastMessageEl: HTMLSpanElement | null;
  _timeEl: HTMLSpanElement | null;
  _counterMessageEl: HTMLSpanElement | null;
  _titleEl: HTMLHeadingElement | null;
  data: ChatItemData = defaultData;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html
      this._avatarEl = this.shadowRoot.querySelector('ypr-avatar');
      this._messageStatusEl = this.shadowRoot.querySelector('ypr-status-message');
      this._lastMessageEl = this.shadowRoot.querySelector('.last-message');
      this._timeEl = this.shadowRoot.querySelector('.time');
      this._counterMessageEl = this.shadowRoot.querySelector('.counter');
      this._titleEl = this.shadowRoot.querySelector('.title');
    }
  }

  connectedCallback() {
    this._avatarEl?.setAttribute('name', this.data.name);
    this._avatarEl?.setAttribute('status', this.data.statusUser);
    this._messageStatusEl?.setAttribute('status', this.data.statusMessage);
    if (this._lastMessageEl) {
      this._lastMessageEl.textContent = this.data.lastMessage;
    }
    if (this._timeEl) {
      this._timeEl.textContent = this.data.time;
    }
    if (this._counterMessageEl) {
      this._counterMessageEl.textContent = `${this.data.conterMessages}`;
    }
    if (this._titleEl) {
      this._titleEl.textContent = this.data.name;
    }
    this._updateData();
  }

  _updateData() {
    if (this.hasAttribute('data')) {
      const loData = this.getAttribute('data');
      if (loData) {
        this.data = JSON.parse(loData);
      }
    }
  }

  static get observedAttributes() {
    return ['data'];
  }


  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data' && oldValue !== newValue) {
      this._updateData();
    }
  }


}

export default customElements.define('ypr-chat-item', ChatItem);
