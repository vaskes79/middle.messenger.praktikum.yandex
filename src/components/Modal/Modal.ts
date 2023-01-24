import { EventBus } from '../../core';
import { tmpl } from './Modal.tmpl';

export enum ModalEvents {
  OPEN = 'modal:open',
  CLOSE = 'modal:close'
}

export class Modal extends HTMLElement {
  _confirmBtn: HTMLButtonElement | null;
  _cancelBtn: HTMLButtonElement | null;
  _bg: HTMLDivElement | null;
  _removeEventListeners: () => void;
  _eventBuss: EventBus = EventBus.getInstance();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this._confirmBtn = this.shadowRoot.getElementById('confirmBtn') as HTMLButtonElement;
      this._cancelBtn = this.shadowRoot.getElementById('cancelBtn') as HTMLButtonElement;
      this._cancelBtn = this.shadowRoot.getElementById('cancelBtn') as HTMLButtonElement;
      this._bg = this.shadowRoot.querySelector('.bg') as HTMLDivElement;
    }
  }

  _closeEventListener = () => {
    this.close();
  };

  _addEventListeners() {
    this._cancelBtn?.addEventListener('click', this._closeEventListener);
    this._confirmBtn?.addEventListener('click', this._closeEventListener);
    this._bg?.addEventListener('click', this._closeEventListener);

    this._eventBuss.on(ModalEvents.OPEN, (id: string) => {
      this.open();
      console.log('open:modal', id);
    });

    this._eventBuss.on(ModalEvents.CLOSE, (id: string) => {
      this.close();
      console.log('close:modal', id);
    });

    return () => {
      this._cancelBtn?.removeEventListener('click', this._closeEventListener);
      this._confirmBtn?.removeEventListener('click', this._closeEventListener);
      this._bg?.removeEventListener('click', this._closeEventListener);
    };
  }

  connectedCallback() {
    this._removeEventListeners = this._addEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  static get observedAttributes() {
    return ['open'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log({ name, oldValue, newValue });
  }

  public open() {
    this.setAttribute('open', '');
  }

  public close() {
    this.removeAttribute('open');
  }
}

customElements.define('ypr-modal', Modal);

declare global {
  interface HTMLElementTagNameMap {
    'ypr-modal': Modal;
  }
}
