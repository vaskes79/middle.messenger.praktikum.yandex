import html from 'bundle-text:./MessageItem.html'
import { Elem } from '../../types/Components';
import { StatusMessageState } from '../Status/StatusMessage';
import { defaultData } from './data';

export type TypeContentMessage = 'text' | 'image';
export type OwnerMessage = "me" | "user";

export interface MessageItemData {
  owner: OwnerMessage,
  type: TypeContentMessage,
  time: string,
  status: StatusMessageState,
  content: string
}

export class MessageItem extends HTMLElement {
  _containerEl: Elem;
  _contentEl: Elem;
  _footerEl: Elem;
  _timeEl: Elem;
  _statusMessageEl: Elem;
  data: MessageItemData;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._containerEl = this.shadowRoot.querySelector("article");
      this._contentEl = this.shadowRoot.querySelector(".content");
      this._footerEl = this.shadowRoot.querySelector("footer");
      this._timeEl = this.shadowRoot.querySelector("time");
      this._statusMessageEl = this.shadowRoot.querySelector("ypr-status-message");
    }
  }

  static get observedAttributes() {
    return ['data'];
  }

  clear = () => {
    this._containerEl?.classList.remove('text', 'image');
  }

  updateData = (data?: MessageItemData) => {
    data = data || this.data;
    this.clear();

    this._containerEl?.classList.add(data.type, data.owner);

    if (this._timeEl) {
      this._timeEl.innerHTML = data.time;
    }

    if (this._contentEl && data.type === "text") {
      this._contentEl.textContent = data.content;
    }

    if (this._contentEl && data.type === "image") {
      this._contentEl.innerHTML = `<img src="${data.content}" alt="name"/>`;
    }

    if (this._statusMessageEl) {
      this._statusMessageEl.setAttribute('status', data.status)
      this._statusMessageEl.setAttribute('small', '')
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "data" && oldValue !== newValue) {
      this.data = JSON.parse(newValue);
      this.updateData();
    }
  }

}

export default customElements.define('ypr-message-item', MessageItem);
