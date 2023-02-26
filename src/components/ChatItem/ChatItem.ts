import html from 'bundle-text:./ChatItem.html';
import css from 'bundle-text:./ChatItem.css';
import { Avatar } from '../Avatar';
import type { StatusUserValue, StatusMessageState, StatusMessage } from '../Status';
import { BaseComponent, Store } from '../../core';
import { handlers } from './handlers';
import { KeysOfState } from '../../types';

export interface ChatItemData {
  name: string;
  imgurl: string | null;
  time: Date;
  statusUser: StatusUserValue;
  statusMessage: StatusMessageState;
  lastMessage: string;
  conterMessages: string | number;
  id: number;
}

const tagName = 'ypr-chat-item';

export class ChatItem extends BaseComponent<ChatItemData> {
  private _lastMessageEl: HTMLSpanElement;
  private _timeEl: HTMLSpanElement;
  private _counterMessageEl: HTMLSpanElement;
  private _titleEl: HTMLHeadingElement;
  private _avatarEl: Avatar;
  private _messageStatusEl: StatusMessage;
  private _btnEl: HTMLButtonElement;
  private _store: typeof Store = Store;
  private _active = false;

  constructor() {
    super({ html, css, tagName, handlers });
    this._titleEl = this._root.querySelector('.title') as HTMLHeadingElement;
    this._lastMessageEl = this._root.querySelector('.last-message') as HTMLSpanElement;
    this._timeEl = this._root.querySelector('.time') as HTMLSpanElement;
    this._counterMessageEl = this._root.querySelector('.counter') as HTMLSpanElement;
    this._avatarEl = this._root.querySelector('ypr-avatar') as Avatar;
    this._messageStatusEl = this._root.querySelector('ypr-status-message') as StatusMessage;
    this._btnEl = this._root.querySelector('.container') as HTMLButtonElement;
  }

  set data(data: ChatItemData) {
    this._data = data;
  }

  _mount(): void {
    try {
      this._lastMessageEl.textContent = this._data.lastMessage;
      this._titleEl.textContent = this._data.name;
      this._timeEl.textContent = this._data.time;
      this._counterMessageEl.textContent = `${this._data.conterMessages}`;
      this._messageStatusEl.setAttribute('status', 'sent');
      this._avatarEl.setAttribute('imgurl', this._data.imgurl);
      this._btnEl.setAttribute('id', `${this._data.id}`);
      this._eventBuss.on('store:update', (key: KeysOfState) => {
        if (key === 'currentChat') {
          this._active = this._store.getState('currentChat') === this._data.id;
          this._active
            ? this._btnEl.classList.add('active')
            : this._btnEl.classList.remove('active');
        }
      });
    } catch (error) {
      this.errorHandler(`ChatItem: Not found element ${error}`);
    }
  }
}

export default customElements.define(tagName, ChatItem);
