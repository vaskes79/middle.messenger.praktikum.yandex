import html from 'bundle-text:./ChatItem.html';
import css from 'bundle-text:./ChatItem.css';
import { Avatar } from '../Avatar';
import type { StatusUserValue, StatusMessageState, StatusMessage } from '../Status';
import { BaseComponent, DateTimeService } from '../../core';
import { handlers } from './handlers';
import { StoreProps } from '../../types';

export interface ChatItemData {
  name: string;
  imgurl: string | null;
  time: string | null;
  statusUser: StatusUserValue;
  statusMessage: StatusMessageState;
  lastMessage: string | null;
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
      if (this._data.lastMessage) {
        this._lastMessageEl.textContent = this._data.lastMessage;
      }
      this._titleEl.textContent = this._data.name;
      if (this._data.time) {
        this._timeEl.textContent = DateTimeService.getRelativeDate(this._data.time);
      }
      this._counterMessageEl.textContent = `${this._data.conterMessages}`;
      this._messageStatusEl.setAttribute('status', 'sent');
      if (this._data.imgurl) {
        this._avatarEl.setAttribute('imgurl', this._data.imgurl);
      }
      this._btnEl.setAttribute('id', `${this._data.id}`);
      this._eventBus.on('store:update', (props: StoreProps) => {
        const {
          key,
          newState: { currentChat }
        } = props;
        if (key === 'currentChat') {
          this._active = currentChat === this._data.id;
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
