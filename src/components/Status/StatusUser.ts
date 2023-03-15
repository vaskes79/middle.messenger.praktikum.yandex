import html from './StatusUser.html';
import css from '!!raw-loader!./StatusUser.css';
import { BaseComponent } from '../../core';

export type StatusUserValue = 'online' | 'ofline' | 'empty' | 'not-set';

const tagName = 'ypr-status-user';

export class StatusUser extends BaseComponent {
  _container: HTMLElement | null;

  constructor() {
    super({ html, css, tagName });
    this._container = this._root.querySelector('.container');
  }

  static get observedAttributes() {
    return ['status'];
  }

  _clearStatus = () => {
    this._container?.classList.remove('online', 'ofline', 'empty', 'not-set');
  };

  _updateStatus = (status: StatusUserValue) => {
    this._clearStatus();
    this._container?.classList.add(status);
  };

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'status' && oldValue !== newValue) {
      this._updateStatus(newValue as StatusUserValue);
    }
  }
}

export default customElements.define(tagName, StatusUser);
