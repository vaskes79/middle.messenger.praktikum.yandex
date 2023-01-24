import { Handlers, AttributeChangedCallback } from '../types';

export interface createBaseComponeOptions {
  html: string;
  tagName: string;
  css?: string;
  handlers?: Handlers[];
  attributes?: string[];
  attributeChangedCallback?: AttributeChangedCallback;
  connectedCallbackMixin?: () => void;
  disconnectedCallbackMixin?: () => void;
}
/**
 * @description: Create custom element for pages
 */
export function createBaseCompone(options: createBaseComponeOptions) {
  const {
    html,
    tagName,
    css,
    handlers,
    attributes = [],
    attributeChangedCallback,
    connectedCallbackMixin,
    disconnectedCallbackMixin
  } = options;

  class Page extends HTMLElement {
    private _removeEventListeners: () => void;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = css ? `<style>${css}</style>${html}` : html;
      }
    }

    static get observedAttributes() {
      return attributes;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (attributeChangedCallback) {
        attributeChangedCallback(name, oldValue, newValue);
      }
    }

    _addEventListeners = () => {
      if (!this.shadowRoot) {
        throw Error('Error: no shadowRoot');
      }
      if (!handlers) {
        throw Error('Error: no handlers');
      }
      handlers.forEach((handle) => {
        this.shadowRoot
          ?.querySelector(handle.selector)
          ?.addEventListener(handle.event, handle.handler);
      });

      return () => {
        handlers.forEach((handle) => {
          this.shadowRoot
            ?.querySelector(handle.selector)
            ?.removeEventListener(handle.event, handle.handler);
        });
      };
    };

    connectedCallback() {
      if (this.shadowRoot) {
        this._removeEventListeners = this._addEventListeners();
      }
      if (connectedCallbackMixin) {
        connectedCallbackMixin();
      }
    }

    disconnectedCallback() {
      this._removeEventListeners();
      if (disconnectedCallbackMixin) {
        disconnectedCallbackMixin();
      }
    }
  }

  return customElements.define(tagName, Page);
}
