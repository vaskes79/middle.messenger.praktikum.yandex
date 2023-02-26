import html from 'bundle-text:./StatusMessage.html';
import css from 'bundle-text:./StatusMessage.css';
import { Icon } from '../Icons';
import { BaseComponent } from '../../core';

export type StatusMessageState = 'read' | 'seen' | 'sent';
export type AttributeNames = 'small' | 'status';

const tagName = 'ypr-status-message';

export class StatusMessage extends BaseComponent {
  // Elements
  private _icons: NodeList | null;
  private _iconContainer: HTMLElement | null;
  private _container: HTMLElement | null;
  private _sizes: '12px' | '16px' = '16px';
  // Attributes
  private _small = false;
  private _status: StatusMessageState = 'sent';

  constructor() {
    super({ html, css, tagName });
    this._icons = this._root.querySelectorAll<Icon>('ypr-icon');
    this._iconContainer = this._root.querySelector('.icon-container');
    this._container = this._root.querySelector('.container');
  }

  static get observedAttributes() {
    return ['small', 'status'];
  }

  attributeChangedCallback(name: AttributeNames, oldValue: string, newValue: string) {
    if (name === 'small') {
      this._sizes = '12px';
      this._small = true;
    }
    if (name === 'status' && oldValue !== newValue) {
      this._status = newValue as StatusMessageState;
    }

    // todo: remake logic check working afte eslint fix
    // this._sizes = this._sizes;
    // this._small = this._small;
    // this.status = this.status;
    this._updateSize();
    this._updateState();
  }

  _changeSizeIcon = () => {
    this._icons?.forEach((item) => {
      (item as Icon).updateSize({ width: this._sizes, height: this._sizes });
    });
  };

  private _updateSize = () => {
    if (this._small) {
      this._container?.classList.add('small');
      this._changeSizeIcon();
    }
  };

  private _updateState = () => {
    this._container?.classList.remove('read', 'sent', 'seen');
    this._container?.classList.add(this.status);
  };
}

export default customElements.define(tagName, StatusMessage);
