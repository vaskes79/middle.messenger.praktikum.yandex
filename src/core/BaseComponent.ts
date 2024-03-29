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
  connectedCallbackMixin?: (root?: ShadowRoot) => void;
  disconnectedCallbackMixin?: (root?: ShadowRoot) => void;
  attributeChangedCallback?: AttributeChangedCallback;
}

export enum BaseComponentEvents {
  MOUNT = 'component:mount',
  UNMOUNT = 'component:unmount'
}

export abstract class BaseComponent<TData = unknown> extends HTMLElement {
  protected _root: ShadowRoot;
  protected _removeEventListener?: RemoveEventListener;
  protected _handlers: Handlers[];
  protected _eventBus: EventBus;
  protected _connectedCallbackMixin: (root?: ShadowRoot | null) => void;
  protected _disconnectedCallbackMixin: (root?: ShadowRoot | null) => void;
  protected _data: TData;
  static _attributes: string[];
  static tagName: string;

  constructor(options: BaseComponentOptions) {
    super();
    const {
      html,
      tagName = 'base-component',
      css,
      attributes = [],
      handlers = [],
      connectedCallbackMixin,
      disconnectedCallbackMixin
    } = options;
    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      return this.errorHandler('Error: this.shadowRoot is not exist');
    }
    this._root = this.shadowRoot;
    this._root.innerHTML = css ? `<style>${css}</style>${html}` : html;
    BaseComponent._attributes = attributes;
    BaseComponent.tagName = tagName;
    this._handlers = handlers;
    this._eventBus = EventBus.getInstance();
    if (connectedCallbackMixin) {
      this._connectedCallbackMixin = connectedCallbackMixin.bind(this);
    }
    if (disconnectedCallbackMixin) {
      this._disconnectedCallbackMixin = disconnectedCallbackMixin.bind(this);
    }
  }

  protected static get observedAttributes() {
    return BaseComponent._attributes;
  }

  get data() {
    return this._data;
  }

  set data(data: TData) {
    this._data = data;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'name' && oldValue !== newValue) {
      console.log({ name, oldValue, newValue });
    }
  }

  errorHandler = (msg: string) => {
    msg = msg || 'Error: BaseComponent';
    throw Error(msg);
  };

  protected _addEventListeners() {
    if (this._handlers.length > 0) {
      this._handlers.forEach((handle) => {
        const { multi, selector, event, handler } = handle;
        if (multi) {
          const elems = [...this._root.querySelectorAll(selector)];

          if (elems.length > 0) {
            elems.forEach((elem) => elem.addEventListener(event, handler.bind(this)));
          }
          return;
        }
        const elem = this._root.querySelector(selector);

        if (elem) {
          elem.addEventListener(event, handler.bind(this));
        }
      });

      return () => {
        this._handlers.forEach((handle) => {
          const { multi, selector, event, handler } = handle;
          if (multi) {
            const elems = [...this._root.querySelectorAll(selector)];

            if (elems.length > 0) {
              elems.forEach((elem) => elem.removeEventListener(event, handler.bind(this)));
            }
            return;
          }

          const elem = this._root.querySelector(selector);

          if (elem) {
            elem.removeEventListener(event, handler.bind(this));
          }
        });
      };
    }
  }

  protected _mount(): void {
    return;
  }

  protected _unmount(): void {
    return;
  }

  connectedCallback() {
    if (this._connectedCallbackMixin) {
      this._connectedCallbackMixin(this._root);
    }
    this._mount();
    this._removeEventListener = this._addEventListeners();
  }

  disconnectedCallback() {
    if (this._disconnectedCallbackMixin) {
      this._disconnectedCallbackMixin(this._root);
    }
    this._unmount();
    if (typeof this._removeEventListener === 'function') {
      this._removeEventListener();
    }
  }
}
