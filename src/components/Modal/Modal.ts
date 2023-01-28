import html from 'bundle-text:./Modal.html';
import css from 'bundle-text:./Modal.css';
import { BaseComponent } from '../../core';
import { handlers } from './handlers';

export enum ModalEvents {
  OPEN = 'modal:open',
  CLOSE = 'modal:close'
}

const tagName = 'ypr-modal';

export class Modal extends BaseComponent {
  constructor() {
    super({ html, css, tagName, handlers });
  }

  protected _mount(): void {
    this._eventBuss.on(ModalEvents.OPEN, (id: string) => {
      this.open();
      console.log('open:modal', id);
    });

    this._eventBuss.on(ModalEvents.CLOSE, (id: string) => {
      this.close();
      console.log('close:modal', id);
    });
  }

  static get observedAttributes() {
    return ['open'];
  }

  public open() {
    this.setAttribute('open', '');
  }

  public close() {
    this.removeAttribute('open');
  }
}

customElements.define(tagName, Modal);

declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Modal;
  }
}
