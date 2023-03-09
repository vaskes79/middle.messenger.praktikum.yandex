import html from './Modal.html';
import css from '!!raw-loader!./Modal.css';
import { BaseComponent, EventBus } from '../../core';
import { handlers } from './handlers';
import type { ModalData } from './types';

const eventBus = EventBus.getInstance();

const tagName = 'ypr-modal';

export class Modal extends BaseComponent<ModalData> {
  constructor() {
    super({ html, css, tagName, handlers });
  }

  private _openCallback = (id: string) => {
    if (id === this.id) {
      this.setAttribute('open', '');
      this.openAction();
    }
  };

  private _closeCallback = (id: string) => {
    if (id == this.id) {
      this.removeAttribute('open');
      this.closeAction();
    }
  };

  private _confirmCallback = async (id: string) => {
    if (id === this.id) {
      const isConfirmed = await this.confirmRules();

      if (isConfirmed) {
        this.removeAttribute('open');
        this.closeAction();
      }
    }
  };

  protected _mount(): void {
    this._eventBus.on('modal:open', this._openCallback);
    this._eventBus.on('modal:close', this._closeCallback);
    this._eventBus.on('modal:confirm', this._confirmCallback);
  }

  protected _unmount(): void {
    this._eventBus.off('modal:open', this._openCallback);
    this._eventBus.off('modal:close', this._closeCallback);
    this._eventBus.off('modal:confirm', this._confirmCallback);
  }

  static get observedAttributes() {
    return ['open'];
  }

  public openAction() {
    console.log('openAction: ', this.id);
  }

  public closeAction() {
    console.log('closeAction: ', this.id);
  }

  public async confirmRules() {
    return true;
  }

  static open(id: string) {
    eventBus.emmit('modal:open', id);
  }

  static close(id: string) {
    eventBus.emmit('modal:close', id);
  }

  static confirm(id: string) {
    eventBus.emmit('modal:confirm', id);
  }
}

customElements.define(tagName, Modal);

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Modal;
  }
}
