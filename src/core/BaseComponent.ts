import { Handlers } from '../types';
import { EventBus } from './EventBus';

export type AttributeChangedCallback = (name: string, oldValue: string, newValue: string) => void;

type RemoveEventListener = () => void;

export interface BaseComponentOptions {
  html: string;
  tagName: string;
  css?: string;
  handlers?: Handlers[];
  attributes?: string[];
  connectedCallbackMixin?: (root: ShadowRoot) => void;
  disconnectedCallbackMixin?: (root?: ShadowRoot) => void;
  attributeChangedCallback?: AttributeChangedCallback;
}

export enum BaseComponentEvents {
  MOUNT = 'component:mount',
  UNMOUNT = 'component:unmount'
}

export abstract class BaseComponent extends HTMLElement {
  protected static _attributes: string[];
  protected _removeEventListener: RemoveEventListener;
  protected _handlers: Handlers[];
  protected _eventBuss: EventBus;
  protected _connectedCallbackMixin: (root: ShadowRoot) => void;
  protected _disconnectedCallbackMixin: (root?: ShadowRoot | null) => void;
  static tagName: string;

  constructor(options: BaseComponentOptions) {
    super();
    const {
      html,
      tagName = 'base-component',
      css,
      attributes = [],
      handlers = [],
      connectedCallbackMixin = () => {},
      disconnectedCallbackMixin = () => {}
    } = options;
    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      this.errorHandler('Error: this.shadowRoot is not exist');
    }
    (this.shadowRoot as ShadowRoot).innerHTML = css ? `<style>${css}</style>${html}` : html;
    BaseComponent._attributes = attributes;
    BaseComponent.tagName = tagName;
    this._handlers = handlers;
    this._eventBuss = EventBus.getInstance();
    this._connectedCallbackMixin = connectedCallbackMixin.bind(this);
    this._disconnectedCallbackMixin = disconnectedCallbackMixin.bind(this);
  }

  protected static get observedAttributes() {
    return BaseComponent._attributes;
  }

  abstract attributeChangedCallback(name: string, oldValue: string, newValue: string): void;

  errorHandler = (msg: string) => {
    msg = msg || 'Error: BaseComponent';
    // todo: add this._eventBuss.emmit('error', msg)
    throw Error(msg);
  };

  _addEventListeners() {
    if (!this.shadowRoot) {
      this.errorHandler('Error: no shadowRoot');
    }
    if (!this._handlers) {
      this.errorHandler('Error: no handlers');
    }
    this._handlers.forEach((handle) => {
      this.shadowRoot
        ?.querySelector(handle.selector)
        ?.addEventListener(handle.event, handle.handler);
    });

    return () => {
      this._handlers.forEach((handle) => {
        this.shadowRoot
          ?.querySelector(handle.selector)
          ?.removeEventListener(handle.event, handle.handler);
      });
    };
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this._connectedCallbackMixin(this.shadowRoot);
    }
    this._eventBuss.emmit(BaseComponentEvents.MOUNT, BaseComponent.tagName);
    this._removeEventListener = this._addEventListeners();
  }

  disconnectedCallback() {
    this._disconnectedCallbackMixin(this.shadowRoot);
    this._eventBuss.emmit(BaseComponentEvents.UNMOUNT, BaseComponent.tagName);
    this._removeEventListener;
  }
}
