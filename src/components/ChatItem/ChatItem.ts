import html from 'bundle-text:./ChatItem.html';
import css from 'bundle-text:./ChatItem.css';
import { Avatar } from '../Avatar';
import { defaultData } from './data';
import type { StatusUserValue, StatusMessageState, StatusMessage } from '../Status';
import { BaseComponent } from '../../core';

export interface ChatItemData {
  name: string;
  imgurl: string;
  time: string;
  statusUser: StatusUserValue;
  statusMessage: StatusMessageState;
  lastMessage: string;
  conterMessages: string | number;
}

const tagName = 'ypr-chat-item';

export class ChatItem extends BaseComponent<ChatItemData> {
  _lastMessageEl: HTMLSpanElement;
  _timeEl: HTMLSpanElement;
  _counterMessageEl: HTMLSpanElement;
  _titleEl: HTMLHeadingElement;
  _avatarEl: Avatar;
  _messageStatusEl: StatusMessage;

  constructor() {
    super({ html, css, tagName });
    this._titleEl = this._root.querySelector('.title') as HTMLHeadingElement;
    this._lastMessageEl = this._root.querySelector('.last-message') as HTMLSpanElement;
    this._timeEl = this._root.querySelector('.time') as HTMLSpanElement;
    this._counterMessageEl = this._root.querySelector('.counter') as HTMLSpanElement;
    this._avatarEl = this._root.querySelector('ypr-avatar') as Avatar;
    this._messageStatusEl = this._root.querySelector('ypr-status-message') as StatusMessage;

    this._data = defaultData;
  }

  _mount(): void {
    try {
      this._lastMessageEl.textContent = this._data.lastMessage;
      this._titleEl.textContent = this._data.name;
      this._timeEl.textContent = this._data.time;
      this._counterMessageEl.textContent = `${this._data.conterMessages}`;
    } catch (error) {
      this.errorHandler(`ChatItem: Not found element ${error}`);
    }
  }
}

export default customElements.define(tagName, ChatItem);
