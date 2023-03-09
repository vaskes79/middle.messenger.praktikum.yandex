import html from './MessageItem.html';
import css from './MessageItem.css';
import { StatusMessage, StatusMessageState } from '../Status/StatusMessage';
import { BaseComponent, DateTimeService } from '../../core';
import { MessageItemType } from '../../types';

const tagName = 'ypr-message-item';

export type OwnerMessage = 'me' | 'user';

export interface MessageItemData {
  owner: OwnerMessage;
  type: MessageItemType;
  time: string;
  status: StatusMessageState;
  content: string;
}

export class MessageItem extends BaseComponent<MessageItemData> {
  private _containerEl: HTMLElement;
  private _contentEl: HTMLElement;
  private _timeEl: HTMLElement;
  private _statusMessageEl: HTMLElement;

  constructor() {
    super({ html, css, tagName });
    this._containerEl = this._root.querySelector('article') as HTMLElement;
    this._contentEl = this._root.querySelector('.content') as HTMLElement;
    this._timeEl = this._root.querySelector('time') as HTMLElement;
    this._statusMessageEl = this._root.querySelector('ypr-status-message') as StatusMessage;
  }

  protected _mount(): void {
    const { owner, time, content, status, type } = this._data;

    this._containerEl?.classList.add(type, owner);

    if (this._timeEl) {
      this._timeEl.innerHTML = DateTimeService.getRelativeDate(time);
    }

    if (this._contentEl && type === 'message') {
      this._contentEl.textContent = content;
    }

    if (this._contentEl && type === 'file') {
      this._contentEl.innerHTML = `<img src="${content}" alt="name"/>`;
    }

    if (this._statusMessageEl) {
      this._statusMessageEl.setAttribute('status', status);
      this._statusMessageEl.setAttribute('small', '');
    }
  }
}

export default customElements.define(tagName, MessageItem);
