import { API } from '../api';
import { BaseComponent, BaseComponentOptions } from './BaseComponent';

export function createPage(options: BaseComponentOptions) {
  class Page extends BaseComponent {
    constructor() {
      super(options);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (options.attributeChangedCallback) {
        options.attributeChangedCallback(name, oldValue, newValue);
      }
    }

    static get observedAttributes() {
      return options.attributes || [];
    }

    protected async _mount(): Promise<void> {
      const isProtectedRoute = this.hasAttribute('private');
      if (isProtectedRoute) {
        await API.auth.getUser();
      }
    }
  }

  return customElements.define(options.tagName, Page);
}
