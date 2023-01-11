import html from 'bundle-text:./StatusUser.html'

export type StatusUserValue = 'online' | 'ofline' | 'empty' | 'not-set';

export class StatusUser extends HTMLElement {
  _container: HTMLElement | null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = html;
      this._container = this.shadowRoot.querySelector('.container');
    }
  }

  static get observedAttributes() {
    return ['status']
  }

  _clearStatus = () => {
    this._container?.classList.remove('online', 'ofline', 'empty', 'not-set');
  }

  _updateStatus = (status: StatusUserValue) => {
    this._clearStatus();
    this._container?.classList.add(status);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "status" && oldValue !== newValue) {
      this._updateStatus(newValue as StatusUserValue);
    }
  }
}

export default customElements.define('ypr-status-user', StatusUser);
